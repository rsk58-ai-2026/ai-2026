/**
 * PROJECT AI 〜人類最後のアップデートが始まる〜
 * js/questions.js - 文化祭全問題マスタデータベース
 */
const QUESTIONS_MASTER = [
  {
    id: "Q1-E-1",
    room: 1,
    difficulty: "easy",
    question_text: "クワガタを🪞になるようにすると、クワガタのまま。\nかんかんぜかを🪞になるようにするとどうなる？",
    media_url: "",
    answer: "みんみんぜみ",
    hints: ["絵文字をひらがなにする"],
    explanation: "「か」が「み」になるので、かんかんぜかの「か」をみに変える。"
  },
  {
    id: "Q1-E-2",
    room: 1,
    difficulty: "easy",
    question_text: "□に入る言葉は？",
    media_url: "media/4.png",
    answer: "本",
    hints: ["「絵」から考えるのが一番簡単"],
    explanation: "絵（本）、台（本）、見（本）など、「本」を入れるとすべて熟語になります。"
  },
  {
    id: "Q1-E-3",
    room: 1,
    difficulty: "easy",
    question_text: "？に入る言葉は?",
    media_url: "media/6.png",
    answer: "令",
    hints: ["今って何年？"],
    explanation: "「命令」「令和」「法令」「令状」が完成します。"
  },
  {
    id: "Q1-N-1",
    room: 1,
    difficulty: "normal",
    question_text: "暗証番号を答えてください。",
    media_url: "media/17.png",
    answer: "5423",
    hints: ["メモが漢字なのには意味がある"],
    explanation: "メモの数字は画数を表している。時計が四時で、四は5画。サイコロは六が出ていて、六は4画。カードは九のハートで、九は2画。さいごは三日月なので三で、3画。よって暗証番号は5423。"
  },
  {
    id: "Q1-N-2",
    room: 1,
    difficulty: "normal",
    question_text: "日本語で訳して答えよ。",
    media_url: "media/16.nerf_suggest.png",
    answer: "尊敬する",
    hints: ["アルファベットの順番を思い出そう。"],
    explanation: "アルファベットの順番を思い出すと最初のO→3はOを基準とした時右に3進むことを意味している。つまりR。このようにして進めていくとrespectという単語が出てくる。"
  },
  {
    id: "Q1-N-3",
    room: 1,
    difficulty: "normal",
    question_text: "？に入る言葉は？",
    media_url: "media/18.png",
    answer: "アシモト",
    hints: ["星がどこにあるか考えてみよう"],
    explanation: "一つ目はイタリア、二つ目はモンゴル、三つ目はロシア、四つ目はトルコなので、①〜④を取ってくるとアシモトになる。"
  },
  {
    id: "Q1-H-1",
    room: 1,
    difficulty: "hard",
    question_text: "□に入る言葉は？",
    media_url: "media/2.png",
    answer: "くりかえし",
    hints: ["スマホがヒント。", "どうやって文字を入力する？"],
    explanation: "フリック入力のキー配列をもとに文字を特定します。"
  },
  {
    id: "Q1-H-2",
    room: 1,
    difficulty: "hard",
    question_text: "？に当てはまる道具は？",
    media_url: "media/483.jpeg",
    answer: "しゃもじ",
    hints: ["「木」と何の大小関係を比べているのだろうか。"],
    explanation: "木 < 林 < 森 の漢字の構成要素の数を表しています。"
  },
  {
    id: "Q1-X-1",
    room: 1,
    difficulty: "ex",
    question_text: "？に入る言葉は？",
    media_url: "media/21.png",
    answer: "機械",
    hints: ["矢印はにく→はるの変換方法を表している"],
    explanation: "絵文字の名前を一番左の列から探し、それに対応する文字(2列目)と同じ文字(3列目)に対応する文字(4列目)が答えの文字になる。"
  },
  {
    id: "Q1-X-2",
    room: 1,
    difficulty: "ex",
    question_text: "？に入る答えは？",
    media_url: "media/24.png",
    answer: "アンサー",
    hints: ["確定している文字から答えを推測しよう", "左下のイラストは“アナウンサー”だ。"],
    explanation: "“アナウンサー”から最後の三文字を取ることは確定しているので“ンサー”は確定する。「？に入る『答え』は？」なので+で文字を拾うと“アンサー”となる。"
  },
  {
    id: "Q2-E-1",
    room: 2,
    difficulty: "easy",
    question_text: "？に入る乗り物は？",
    media_url: "media/11.png",
    answer: "ふね",
    hints: ["五十音表を思い浮かべよう"],
    explanation: "五十音表上で、2つの文字を結び、間にある文字を順に読むと「ふね」となります。"
  },
  {
    id: "Q2-E-2",
    room: 2,
    difficulty: "easy",
    question_text: "？に入る答えは？",
    media_url: "media/23.png",
    answer: "アンサー",
    hints: ["上は「ダイナマイト」が「ナイト」になっている！"],
    explanation: "矢印で暗くなっている文字のみを読む。"
  },
  {
    id: "Q2-N-1",
    room: 2,
    difficulty: "normal",
    question_text: "□に入る言葉は？",
    media_url: "media/3.png",
    answer: "長",
    hints: ["すべて音読み"],
    explanation: "熟語の組み合わせ（長音・会長・成長など）から「長」が導かれます。"
  },
  {
    id: "Q2-N-2",
    room: 2,
    difficulty: "normal",
    question_text: "？に入るアルファベットを答えよ。",
    media_url: "media/Q2-N-3.png",
    answer: "W",
    hints: ["アルファベットは曜日を表すよ"],
    explanation: "アルファベットは曜日（S=Sunday, S=Saturday, M=Monday）。月曜日の2日後は水曜日(Wednesday)なのでW。"
  },
  {
    id: "Q2-N-3",
    room: 2,
    difficulty: "normal",
    question_text: "？に入る数を答えよ。",
    media_url: "media/14.png",
    answer: "1420",
    hints: ["なぜ3問とも「Yes or No?」で聞いていないのだろうか"],
    explanation: "Yesは日本語で「はい」→肺。Noは「ノー」→脳となるため 862 + 279 + 279 = 1420。"
  },
  {
    id: "Q2-N-4",
    room: 2,
    difficulty: "normal",
    question_text: "察しろ（迷路の先にある言葉は？）",
    media_url: "media/5.nerfed.png",
    answer: "スウガク",
    hints: ["イラストは何を表してる？", "名前から何か気づかない？"],
    explanation: "イラストがあらわすことばには「トリ」とか「ムシ」が入ってるので、その文字を「無視」して迷路を進む。"
  },
  {
    id: "Q2-N-5",
    room: 2,
    difficulty: "normal",
    question_text: "ベトナムはどっち？",
    media_url: "media/20.png",
    answer: "なし",
    hints: ["ありのチームには何の文字が共通するか考えよう"],
    explanation: "ありには「連邦」という字が入っているが、ベトナム社会主義共和国には連邦はないので「なし」。"
  },
  {
    id: "Q2-H-1",
    room: 2,
    difficulty: "hard",
    question_text: "？に漢字を1文字入れて熟語を4つ作れ。",
    media_url: "media/10.png",
    answer: "由",
    hints: ["「羅」「装」が逆さになっているのはなぜだろうか？", "「干」「士」のように逆さにすると別の漢字に見えるものが答えになりそう"],
    explanation: "「由」を入れると「理由」「由来」が成立。問題を逆さにして見ると「由」は「甲」に見え、「装甲」「甲羅」が成立。"
  },
  {
    id: "Q2-H-2",
    room: 2,
    difficulty: "hard",
    question_text: "XとYにあてはまるのは？",
    media_url: "media/9.png",
    answer: "X=十, Y=6",
    hints: ["数字にとらわれずに考えてみよう"],
    explanation: "「にじ」は漢字（虹）で9画、ひらがなで6画。赤と白を足すと桃（ピンク）。よってXが十、Yが6。"
  },
  {
    id: "Q2-H-3",
    room: 2,
    difficulty: "hard",
    question_text: "プラス・マイナスと矢印から線の受ける力を求めよ。",
    media_url: "media/19.png",
    answer: "奥",
    hints: ["プラスとマイナスに着目しよう"],
    explanation: "電流と磁界の向きからフレミング左手の法則を適用すると、線にかかる力は奥向きなので答えは「奥」。"
  },
  {
    id: "Q2-X-1",
    room: 2,
    difficulty: "ex",
    question_text: "ABCDEの5人の中に、正直者とうそつきがいます。正直者は本当のことしか言わず、うそつきはうそしか言いません。さらに、「うそつきの人数は偶数人である」ことが分かっています。\n\nA「この5人の中で、うそつきは0人か2人のどちらかだ。」\nB「Aは正直者だ。」\nC「わたしとDは同じタイプだ。」\nD「Eはうそつきだ。」\nE「うそつきはちょうど4人いる。」\n\n正直者とうそつきをそれぞれ特定してください。",
    media_url: "",
    answer: "A,B,Dは正直者、C,Eが嘘つき",
    hints: ["Cはうそつき"],
    explanation: "論理検証より、正直者＝A・B・D、うそつき＝C・E（うそつき2人＝偶数人）となります。"
  },
  {
    id: "Q2-X-2",
    room: 2,
    difficulty: "ex",
    question_text: "嘘つきは誰だ？\n\n高田「嘘つきは廣瀬だけです」\n廣瀬「正直者は少なくとも3人います」\n熊谷「嘘つきは偶数人です。」\n和田「黒須さんは正直者です。」\n黒須「日本で25番目に高い山は木曽駒ヶ岳です。」",
    media_url: "",
    answer: "嘘つきは、高田、廣瀬、熊谷",
    hints: ["自分について言及している人に着目してみよう"],
    explanation: "木曽駒ヶ岳は日本で25番目に高い山(2956m)で黒須は正直。検証により嘘つきは高田・廣瀬・熊谷の3名。"
  },
  {
    id: "Q3-E-1",
    room: 3,
    difficulty: "easy",
    question_text: "？に入るのは？",
    media_url: "media/12.png",
    answer: "レンコン",
    hints: ["枠線のデザインをよく見よう"],
    explanation: "枠線の形と文字がそれぞれ対応しており、文字を抜き出すと「レンコン」となります。"
  },
  {
    id: "Q3-E-2",
    room: 3,
    difficulty: "easy",
    question_text: "？に入るアイテムは？",
    media_url: "media/13.png",
    answer: "メモ",
    hints: ["五十音表を思い浮かべよう"],
    explanation: "五十音表で矢印が通るマスを順に読むと「メモ」となります。"
  },
  {
    id: "Q3-E-3",
    room: 3,
    difficulty: "easy",
    question_text: "？に入る言葉は？",
    media_url: "media/Q3-E-3.JPG",
    answer: "コパイロット",
    hints: ["AIアシスタントのこと"],
    explanation: "ぶた→こぶた、うし→こうし、やし→こやし と「こ」が初めにつくので、パイロット→コパイロット。"
  },
  {
    id: "Q3-N-1",
    room: 3,
    difficulty: "normal",
    question_text: "誰？",
    media_url: "media/Q3-N.JPG",
    answer: "自分（俺・私・あなた）",
    hints: ["この部屋に見覚えが有るはずだ"],
    explanation: "図形は教室を表しており、3つ目の問題の場所を示しているので、そこにいるのは「あなた（自分）」。"
  },
  {
    id: "Q3-N-2",
    room: 3,
    difficulty: "normal",
    question_text: "？に入る言葉は何？",
    media_url: "media/Q3-N-2.png",
    answer: "魚",
    hints: ["携帯のフリック入力の画面を思い出してみよう。"],
    explanation: "携帯のフリック入力画面で矢印が示す通りに読んでいくと「さ・か・な」→「魚」。"
  },
  {
    id: "Q3-N-3",
    room: 3,
    difficulty: "normal",
    question_text: "⬜︎に入る一文字は？",
    media_url: "media/15.png",
    answer: "羊",
    hints: ["言葉の中の動物に着目しよう。"],
    explanation: "言葉の中の動物が干支の順番（寅卯辰巳午未）になっており、次は「羊（未）」。"
  },
  {
    id: "Q3-N-4",
    room: 3,
    difficulty: "normal",
    question_text: "？に入る言葉は？",
    media_url: "media/n3.png",
    answer: "朝",
    hints: ["50音表を思い浮かべよう"],
    explanation: "50音表の規則性から「朝」が導かれます。"
  },
  {
    id: "Q3-H-1",
    room: 3,
    difficulty: "hard",
    question_text: "？に入る言葉は？(左から)",
    media_url: "media/22.png",
    answer: "表現",
    hints: ["発？と？在の組み合わせが考えやすいかも？"],
    explanation: "発表、表録、現状、体現、現在 など熟語が完成する組み合わせは「表現」。"
  },
  {
    id: "Q3-H-2",
    room: 3,
    difficulty: "hard",
    question_text: "？に入る4文字の嬉しいことは？",
    media_url: "media/25.nerfed.png",
    answer: "再会",
    hints: ["青、緑のロボットはそれぞれ、文字に違う処理を施す。", "青は九九、緑は読み方を数字に起こすよ！"],
    explanation: "青ロボットは九九（3×5=15）、緑は読み（35）を出力。表に当てはめると「さいかい（再会）」。"
  },
  {
    id: "Q3-H-3",
    room: 3,
    difficulty: "hard",
    question_text: "？に入る言葉は？",
    media_url: "media/26.nerfed.png",
    answer: "あじみ",
    hints: ["あみだくじを囲む点線は何を意味するのだろう？"],
    explanation: "左に「あみだくじ」を当てはめてあみだを辿ると「あじみ」になる。"
  },
  {
    id: "Q3-X-1",
    room: 3,
    difficulty: "ex",
    question_text: "式をいい感じに変形せよ",
    media_url: "media/Q3-X-1.png",
    answer: "me ^ (rry) = X-mas",
    hints: ["まずは両辺にr^2を掛けてみよう。"],
    explanation: "両辺にr^2を掛け、logを外し式を整理すると「me^(rry) = X - mas（Merry X-mas）」になる。"
  },
  {
    id: "Q3-X-2",
    room: 3,
    difficulty: "ex",
    question_text: "彼女の願いを叶えるための、我らの使命を声に出せ！",
    media_url: "media/28.nerfed.png",
    answer: "元の幸福を復興せよ。",
    hints: ["「AI」とは何を表すのだろうか。", "ローマ字にしてa, iを消してみよう"],
    explanation: "与えられた文章から「a」と「i」の文字を取り除くと、「元の幸福を復興せよ。」が浮かび上がります。"
  }
];