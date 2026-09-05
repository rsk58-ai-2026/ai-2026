/**
 * PROJECT AI 〜人類最後のアップデートが始まる〜
 * js/app.js - メインコントローラー（完全スタンドアロン・ローカル設定版）
 */

const App = {
  // 設定 (localStorageで永続化)
  settings: {
    timeLimit: 60,
    penaltyRule: 'instant_out',
    sound: 'on'
  },

  // 進行コンテキスト
  currentSession: {
    difficulty: 'normal',
    questions: [],
    currentIndex: 0,
    results: [],
    timeLeft: 60,
    hintsRevealed: 0
  },

  timerInterval: null,

  init() {
    this.loadSettings();
    this.updateHomeUI();
  },

  // ==========================================
  // 1. 設定マネージャー
  // ==========================================
  loadSettings() {
    try {
      const saved = localStorage.getItem('PROJAI_CONFIG');
      if (saved) {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
      }
    } catch (e) {}

    const timeElem = document.getElementById('set-time-limit');
    const penaltyElem = document.getElementById('set-penalty-rule');
    const soundElem = document.getElementById('set-sound');

    if (timeElem) timeElem.value = String(this.settings.timeLimit);
    if (penaltyElem) penaltyElem.value = this.settings.penaltyRule;
    if (soundElem) soundElem.value = this.settings.sound;
  },

  saveSettings(e) {
    if (e) e.preventDefault();
    const timeVal = parseInt(document.getElementById('set-time-limit').value, 10);
    const penaltyVal = document.getElementById('set-penalty-rule').value;
    const soundVal = document.getElementById('set-sound').value;

    this.settings.timeLimit = isNaN(timeVal) ? 60 : timeVal;
    this.settings.penaltyRule = penaltyVal;
    this.settings.sound = soundVal;

    localStorage.setItem('PROJAI_CONFIG', JSON.stringify(this.settings));
    this.closeSettings();
    this.updateHomeUI();
  },

  updateHomeUI() {
    const timeElem = document.getElementById('summary-timelimit');
    const penaltyElem = document.getElementById('summary-penalty');

    if (timeElem) {
      timeElem.textContent = this.settings.timeLimit === 0 ? '無制限' : `${this.settings.timeLimit}秒`;
    }
    if (penaltyElem) {
      if (this.settings.penaltyRule === 'instant_out') penaltyElem.textContent = '即アウト';
      else if (this.settings.penaltyRule === 'time_deduct') penaltyElem.textContent = '誤答時 -15秒';
      else penaltyElem.textContent = 'なし';
    }
  },

  openSettings() {
    document.getElementById('settings-modal').classList.remove('hidden');
  },

  closeSettings() {
    document.getElementById('settings-modal').classList.add('hidden');
  },

  // ==========================================
  // 2. クイズ進行ロジック (3問チャレンジ)
  // ==========================================
  startChallenge(selectedDiff) {
    const r1List = QUESTIONS_MASTER.filter(q => q.room === 1);
    const r2List = QUESTIONS_MASTER.filter(q => q.room === 2);
    const r3List = QUESTIONS_MASTER.filter(q => q.room === 3);

    const pick = (list, diff) => {
      let filtered = diff === 'mix' ? list : list.filter(q => q.difficulty === diff);
      if (filtered.length === 0) filtered = list; // 万一該当なし時は全開放
      return filtered[Math.floor(Math.random() * filtered.length)];
    };

    const q1 = pick(r1List, selectedDiff);
    const q2 = pick(r2List, selectedDiff);
    const q3 = pick(r3List, selectedDiff);

    this.currentSession = {
      difficulty: selectedDiff,
      questions: [q1, q2, q3],
      currentIndex: 0,
      results: [],
      timeLeft: this.settings.timeLimit,
      hintsRevealed: 0
    };

    this.showScreen('quiz');
    this.loadQuestion(0);
  },

  loadQuestion(index) {
    this.stopTimer();
    const q = this.currentSession.questions[index];
    if (!q) return;

    this.currentSession.currentIndex = index;
    this.currentSession.hintsRevealed = 0;
    this.currentSession.timeLeft = this.settings.timeLimit;

    // UI更新
    const roomNames = ['ALPHA', 'BETA', 'CORE'];
    document.getElementById('quiz-node-badge').textContent = `NODE ${index + 1} [${roomNames[index] || 'SYSTEM'}]`;
    document.getElementById('quiz-progress-badge').textContent = `QUESTION ${index + 1} / 3`;
    document.getElementById('quiz-diff-tag').textContent = String(q.difficulty).toUpperCase();
    document.getElementById('quiz-q-id').textContent = q.id || `Q${index + 1}-01`;
    document.getElementById('quiz-question-text').textContent = q.question_text || '';

    // メディア
    const mediaContainer = document.getElementById('quiz-media-container');
    mediaContainer.innerHTML = '';
    if (q.media_url) {
      mediaContainer.classList.remove('hidden');
      const img = document.createElement('img');
      img.src = q.media_url;
      img.className = 'quiz-media';
      img.alt = '問題画像';
      img.onclick = () => this.openMediaFullscreen(q.media_url);
      mediaContainer.appendChild(img);
    } else {
      mediaContainer.classList.add('hidden');
    }

    // ヒント初期化
    const hintList = document.getElementById('quiz-hint-list');
    hintList.innerHTML = '<div class="hint-empty">開示された解析ヒントはありません</div>';
    const btnHint = document.getElementById('btn-reveal-hint');
    if (btnHint) btnHint.disabled = false;

    // 答えエリア初期化
    document.getElementById('answer-reveal-box').classList.add('hidden');
    document.getElementById('label-toggle-ans').textContent = '答えを見る';
    document.getElementById('quiz-ans-text').textContent = q.answer || '--';
    document.getElementById('quiz-ans-exp').textContent = q.explanation || '解説はありません。';

    // タイマースタート
    if (this.settings.timeLimit > 0) {
      document.getElementById('quiz-timer-box').classList.remove('hidden');
      this.startTimer();
    } else {
      document.getElementById('quiz-timer-box').classList.add('hidden');
    }
  },

  revealNextHint() {
    const q = this.currentSession.questions[this.currentSession.currentIndex];
    if (!q || !q.hints || q.hints.length === 0) return;

    const list = document.getElementById('quiz-hint-list');
    if (this.currentSession.hintsRevealed === 0) list.innerHTML = '';

    if (this.currentSession.hintsRevealed < q.hints.length) {
      const hintText = q.hints[this.currentSession.hintsRevealed];
      this.currentSession.hintsRevealed++;

      const item = document.createElement('div');
      item.className = 'hint-item';
      item.innerHTML = `<span class="material-symbols-outlined icon-xs icon-gold">lightbulb</span> <strong>HINT ${this.currentSession.hintsRevealed}:</strong> ${hintText}`;
      list.appendChild(item);
      this.playBeep(1200, 0.05);

      if (this.currentSession.hintsRevealed >= q.hints.length) {
        document.getElementById('btn-reveal-hint').disabled = true;
      }
    }
  },

  toggleAnswerVisibility() {
    const box = document.getElementById('answer-reveal-box');
    const label = document.getElementById('label-toggle-ans');
    const isHidden = box.classList.contains('hidden');

    if (isHidden) {
      box.classList.remove('hidden');
      label.textContent = '答えを隠す';
    } else {
      box.classList.add('hidden');
      label.textContent = '答えを見る';
    }
  },

  // タイマー制御
  startTimer() {
    this.updateTimerUI();
    this.timerInterval = setInterval(() => {
      this.currentSession.timeLeft--;
      this.updateTimerUI();

      if (this.currentSession.timeLeft <= 0) {
        this.stopTimer();
        this.handleJudge(false, true); // 時間切れ誤答
      }
    }, 1000);
  },

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  updateTimerUI() {
    const t = Math.max(0, this.currentSession.timeLeft);
    const min = Math.floor(t / 60);
    const sec = t % 60;
    const formatted = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    const timerElem = document.getElementById('quiz-timer');
    const box = document.getElementById('quiz-timer-box');

    if (timerElem) timerElem.textContent = formatted;
    if (box) box.classList.toggle('timer-warning', t <= 10 && t > 0);
  },

  // 正誤判定処理
  async handleJudge(isCorrect, isTimeout = false) {
    if (!isCorrect && !isTimeout && this.settings.penaltyRule === 'time_deduct') {
      this.currentSession.timeLeft = Math.max(0, this.currentSession.timeLeft - 15);
      this.updateTimerUI();
      this.playBeep(220, 0.2, 'sawtooth');
      if (this.currentSession.timeLeft <= 0) {
        this.handleJudge(false, true);
      }
      return;
    }

    this.stopTimer();

    // 演出
    if (isCorrect) {
      this.playPurgedSound();
      const ov = document.getElementById('effect-overlay-purged');
      ov.classList.remove('hidden');
      await new Promise(r => setTimeout(r, 1200));
      ov.classList.add('hidden');
    } else {
      this.playBreachSound();
      const ov = document.getElementById('effect-overlay-breach');
      ov.classList.remove('hidden');
      await new Promise(r => setTimeout(r, 1200));
      ov.classList.add('hidden');
    }

    const currentQ = this.currentSession.questions[this.currentSession.currentIndex];
    this.currentSession.results.push({
      question: currentQ,
      isCorrect: isCorrect
    });

    if (this.currentSession.currentIndex < 2) {
      this.loadQuestion(this.currentSession.currentIndex + 1);
    } else {
      this.showResult();
    }
  },

  // ==========================================
  // 3. リザルト画面
  // ==========================================
  showResult() {
    this.showScreen('result');

    const scoreMap = { easy: 10, normal: 20, hard: 30, ex: 40 };
    let totalScore = 0;
    let correctCount = 0;

    this.currentSession.results.forEach(r => {
      if (r.isCorrect) {
        correctCount++;
        totalScore += (scoreMap[r.question.difficulty] || 20);
      }
    });

    // パーフェクトボーナス
    if (correctCount === 3) totalScore += 30;

    document.getElementById('res-score-val').textContent = totalScore;
    document.getElementById('res-msg-text').textContent = `クリア数: ${correctCount} / 3 問 ${correctCount === 3 ? '【PERFECT CLEAR!!】' : ''}`;

    // EXバナー制御
    const exBanner = document.getElementById('res-ex-banner');
    if (correctCount === 3 || this.currentSession.difficulty === 'ex') {
      exBanner.classList.remove('hidden');
    } else {
      exBanner.classList.add('hidden');
    }

    // 各問解説カード
    const listContainer = document.getElementById('result-breakdown-list');
    listContainer.innerHTML = this.currentSession.results.map((r, i) => {
      const q = r.question;
      return `
        <div class="exit-q-mini-card ${r.isCorrect ? 'is-correct' : 'is-wrong'}">
          <div class="exit-q-mini-head font-cyber">
            第${i + 1}問 [${String(q.difficulty).toUpperCase()}]: ${r.isCorrect ? '⭕ CLEAR' : '❌ FAILED'} (${q.id || ''})
          </div>
          <p class="text-white mt-1"><strong>問題:</strong> ${q.question_text || ''}</p>
          ${q.media_url ? `
            <div class="exit-q-mini-media">
              <img src="${q.media_url}" class="result-media-thumb" alt="問題画像" onclick="App.openMediaFullscreen('${q.media_url}')">
            </div>
          ` : ''}
          <p class="text-highlight mt-1 font-mono"><strong>模範解答:</strong> ${q.answer || '--'}</p>
          ${q.explanation ? `<p class="text-muted mt-1" style="font-size:13px;"><strong>解説:</strong> ${q.explanation}</p>` : ''}
        </div>
      `;
    }).join('');
  },

  // ==========================================
  // 4. アーカイブ画面
  // ==========================================
  showArchive() {
    this.showScreen('archive');
    this.filterArchive('all');
  },

  filterArchive(diff, chipElem) {
    if (chipElem) {
      document.querySelectorAll('.db-filter-chip').forEach(c => c.classList.remove('active'));
      chipElem.classList.add('active');
    }

    let list = QUESTIONS_MASTER;
    if (diff !== 'all') {
      list = list.filter(q => q.difficulty === diff);
    }

    document.getElementById('archive-count').textContent = `${list.length} 問`;

    const container = document.getElementById('archive-cards-list');
    container.innerHTML = list.map(q => `
      <div class="manual-db-card cyber-border">
        <div class="cheat-item-head">
          <span class="badge badge-secondary font-mono">${q.id || '--'}</span>
          <span class="badge badge-quiz font-cyber">NODE ${q.room || '-'}</span>
          <span class="font-cyber font-bold text-highlight">[${String(q.difficulty || '').toUpperCase()}]</span>
        </div>
        <p class="text-white mt-1"><strong>問題:</strong> ${q.question_text || ''}</p>
        ${q.media_url ? `
          <div class="my-2">
            <img src="${q.media_url}" class="result-media-thumb" alt="問題画像" onclick="App.openMediaFullscreen('${q.media_url}')">
          </div>
        ` : ''}
        <div class="mt-2" style="background: rgba(0, 240, 255, 0.08); padding: 6px 10px; border-radius: 4px;">
          <span class="text-muted">正解: </span>
          <strong class="text-success font-mono font-bold">${q.answer || '--'}</strong>
        </div>
        ${q.hints && q.hints.length > 0 ? `<p class="text-warning mt-1" style="font-size:12px;"><strong>ヒント:</strong> ${q.hints.join(' / ')}</p>` : ''}
        ${q.explanation ? `<p class="text-muted mt-1" style="font-size:12px;"><strong>解説:</strong> ${q.explanation}</p>` : ''}
      </div>
    `).join('');
  },

  // ==========================================
  // 5. 画面切り替え & サウンド・メディア
  // ==========================================
  showScreen(screenKey) {
    ['home', 'quiz', 'result', 'archive'].forEach(k => {
      const el = document.getElementById(`screen-${k}`);
      if (el) el.classList.toggle('hidden', k !== screenKey);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  goHome() {
    this.stopTimer();
    this.updateHomeUI();
    this.showScreen('home');
  },

  abortToHome() {
    if (confirm('現在のチャレンジを中断してホームに戻りますか？')) {
      this.goHome();
    }
  },

  openMediaFullscreen(url) {
    const modal = document.getElementById('media-fullscreen-modal');
    const container = document.getElementById('fullscreen-media-content');
    container.innerHTML = `<img src="${url}" class="fullscreen-media-elem" alt="全画面画像">`;
    modal.classList.remove('hidden');
  },

  closeMediaFullscreen() {
    document.getElementById('media-fullscreen-modal').classList.add('hidden');
  },

  // Web Audio サウンドエフェクト
  playBeep(freq = 1760, duration = 0.1, type = 'sine') {
    if (this.settings.sound !== 'on') return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  },

  playPurgedSound() {
    if (this.settings.sound !== 'on') return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, now);
      osc.frequency.exponentialRampToValueAtTime(2349, now + 0.15);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  },

  playBreachSound() {
    if (this.settings.sound !== 'on') return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.3);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});