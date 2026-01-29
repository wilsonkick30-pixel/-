
import { GuestType, ScriptNode, Choice } from './types';

export const IMAGES = {
  DEFAULT_STUDIO: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop",
  START_HERO: "https://images.unsplash.com/photo-1478737270239-2fccd2c7d904?q=80&w=1000&auto=format&fit=crop",
  SPIRITUAL: [
    "https://images.unsplash.com/photo-1528319725582-ddc0b6aabc5e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=800&auto=format&fit=crop"
  ],
  ENTREPRENEUR: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1454165833767-027ffea10c3b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
  ],
  LOWEND: [
    "https://images.unsplash.com/photo-1557425955-df376b5903c8?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=800&auto=format&fit=crop"
  ]
};

const SCRIPTS: Record<GuestType, Record<number, ScriptNode>> = {
  [GuestType.SPIRITUAL]: {
    0: {
      script: "嘉賓：製作人，你這錄音室的磁場有點低迷。你的肝臟正在哀嚎，因為你長期拒絕與月亮對話。你需要這杯我親自調配的『宇宙高頻水』，洗滌你這週的業障。",
      reaction: "錄音師看著那杯混濁的綠色液體，默默拉近了消音閘。磁場真的很亂。",
      chaosDescription: "背景充滿不自然的低頻嗡鳴聲，麥克風開始收到莫名的數位干擾。",
      imageUrl: IMAGES.SPIRITUAL[0],
      choices: [
        { text: "「修行固然重要，但家庭的和諧才是最高的頻率。我們聊聊家人？」", theme: "warm", impact: { w: 15, c: -5, b: 0 } },
        { text: "（長按消音）「本台嚴禁推銷不明成份液體，請自重！」", theme: "chaos", impact: { w: -10, c: 20, b: 15 } },
        { text: "「這杯水...喝下去會看到極光嗎？」", theme: "neutral", impact: { w: 5, c: 5, b: 5 } }
      ]
    },
    1: {
      script: "嘉賓：當我的靈魂在土星環上跳舞時，我領悟到了萬物的本質。你們凡人只關心收視率，卻不關心銀河系的和平。我昨晚才剛跟昂宿星人通話過。",
      reaction: "錄音師在心裡翻白眼。昂宿星人的漫遊費應該很貴。",
      chaosDescription: "嘉賓開始在大氣中比劃奇怪的符號，波形圖出現鋸齒狀異常。",
      imageUrl: IMAGES.SPIRITUAL[1],
      choices: [
        { text: "「銀河系很遠，但今晚陪孩子說個故事，就是最近的修行。」", theme: "warm", impact: { w: 15, c: -5, b: 0 } },
        { text: "「通話內容能提供音檔嗎？沒有的話這段我們直接跳過。」", theme: "chaos", impact: { w: -5, c: 15, b: 10 } },
        { text: "「昂宿星人的信號是 5G 還是 6G？」", theme: "neutral", impact: { w: 5, c: 5, b: 2 } }
      ]
    },
    2: {
      script: "嘉賓：我感覺到這間錄音室的前世是一座充滿喧囂的市集。我必須拿出水晶陣來淨化，不然我們錄出來的聲音會帶有一種塵俗的燥熱味。",
      reaction: "他在桌面上擺弄一堆尖銳的水晶，錄音師趕緊檢查桌面有沒有刮傷。",
      chaosDescription: "麥克風收到清脆的水晶碰撞聲，背景噪訊比瞬間拉高。",
      imageUrl: IMAGES.SPIRITUAL[2],
      choices: [
        { text: "「塵世的燥熱，正好可以用溫暖的嗓音來平復。讓我們回歸對話。」", theme: "warm", impact: { w: 12, c: -8, b: 0 } },
        { text: "「水晶會反光影響監視器！快收起來，這是在錄影！」", theme: "chaos", impact: { w: -10, c: 20, b: 10 } },
        { text: "「這顆紫水晶能幫我增加中獎運嗎？」", theme: "neutral", impact: { w: 5, c: 5, b: 2 } }
      ]
    },
    3: {
      script: "嘉賓：你知道嗎？其實我們都是光。只要你願意跟我一起唸這句『唵嘛呢叭咪吽』的變奏版，你的收視率就會跟宇宙能量共振，突破十萬點閱。",
      reaction: "嘉賓發出奇怪的喉音震動，錄音師在調整等化器時差點按成全靜音。",
      chaosDescription: "低音頻段發生嚴重的動態互調失真，儀表板一片通紅。",
      imageUrl: IMAGES.SPIRITUAL[3],
      choices: [
        { text: "「點閱率是浮雲，聽眾能從中得到平靜才是本台的初衷。」", theme: "warm", impact: { w: 18, c: -10, b: 0 } },
        { text: "「別唸了！這段錄音會被 YouTube 判定為宗教宣傳而黃標！」", theme: "chaos", impact: { w: -15, c: 25, b: 20 } },
        { text: "「這句咒語有沒有 RAP 版本？」", theme: "neutral", impact: { w: 5, c: 10, b: 10 } }
      ]
    },
    4: {
      script: "嘉賓：最後，我想送給聽眾一個祝福。閉上雙眼，感覺你的靈魂正在緩緩進化...我們都是銀河系的孩子，拒絕被世俗的標籤定義。Om...光子萬歲。",
      reaction: "嘉賓緩緩闔眼，錄音室燈光似乎真的微微閃動了一下。這氛圍太玄了。",
      chaosDescription: "錄音接近尾聲，能量似乎達到臨界點，波形呈現平滑的弧線。",
      imageUrl: IMAGES.SPIRITUAL[4],
      choices: [
        { text: "「謝謝大師，家人的笑容就是靈魂最美的進化。結案！」", theme: "warm", impact: { w: 20, c: -15, b: 0 } },
        { text: "「光子萬歲這句我會剪掉，我們只保留對健康的祝福。」", theme: "chaos", impact: { w: -10, c: 15, b: 20 } },
        { text: "「既然是銀河系的孩子，那這集通告費能用光子支付嗎？」", theme: "neutral", impact: { w: 5, c: 10, b: 10 } }
      ]
    }
  },
  [GuestType.ENTREPRENEUR]: {
    0: {
      script: "嘉賓：製作人，你有看過凌晨 4 點的巴黎嗎？男人就是要進化。13 歲我就學會用槓桿原理賺到人生第一桶金，時間就是我的屠刀，掠奪才是本能。",
      reaction: "錄音師看著他那鑲金的手錶，默默嘆了口氣。典型自律過剩案例。",
      chaosDescription: "嘉賓語速極快，波形圖呈現密集且銳利的尖峰，動態範圍極窄。",
      imageUrl: IMAGES.ENTREPRENEUR[0],
      choices: [
        { text: "「拼勁很美，但我們聊聊您如何將這份自律帶回溫暖的家庭？」", theme: "warm", impact: { w: 15, c: -5, b: 0 } },
        { text: "（切斷訊號）「本台嚴禁廣告宣傳，請收起你的槓桿話術！」", theme: "chaos", impact: { w: -10, c: 15, b: 10 } },
        { text: "「13 歲白手起家時，您有吃過便利商店的泡麵嗎？」", theme: "neutral", impact: { w: 5, c: 5, b: 5 } }
      ]
    },
    1: {
      script: "嘉賓：睡眠是留給沒野心的普通人的。我每天早上 3 點起床，對著鏡子打影拳，然後吞掉市場上最優秀的競爭者。這就是強者的氣場，你感覺到了嗎？",
      reaction: "嘉賓身上的香水味濃得讓錄音室都要抽風，錄音師戴上了口罩。",
      chaosDescription: "音軌動態嚴重超標，嘉賓的狂吼正在挑戰設備的極限平衡。",
      imageUrl: IMAGES.ENTREPRENEUR[1],
      choices: [
        { text: "「真正的強者，是懂得在家人面前收起鋒芒的人。對吧？」", theme: "warm", impact: { w: 15, c: -10, b: 0 } },
        { text: "「別再拍桌子了！這張桌子是台長從歐洲運回來的古董！」", theme: "chaos", impact: { w: -5, c: 20, b: 10 } },
        { text: "「對著鏡子打拳時，您會思考早餐要加幾顆蛋嗎？」", theme: "neutral", impact: { w: 5, c: 5, b: 5 } }
      ]
    },
    2: {
      script: "嘉賓：我的每個動作都在優化。甚至現在跟你說話，我腦中都在計算這段錄音產出的複利。人生就是一場無止盡的掠奪遊戲，輸家不配談生存。",
      reaction: "他指著你的鼻子，眼神充滿侵略性。錄音師已經準備好隨時切廣告。",
      chaosDescription: "嘉賓的聲紋出現強烈的壓迫感，中頻段被大量填充，造成聽感疲勞。",
      imageUrl: IMAGES.ENTREPRENEUR[2],
      choices: [
        { text: "「複利很好，但有一種資產是無法量化的，那就是陪伴。」", theme: "warm", impact: { w: 12, c: -5, b: 0 } },
        { text: "「我們這裡是廣播電台，不是地下拳擊場。請放低音量！」", theme: "chaos", impact: { w: -10, c: 25, b: 15 } },
        { text: "「所以錄這集能讓我的薪水也產生複利嗎？」", theme: "neutral", impact: { w: 5, c: 10, b: 5 } }
      ]
    },
    3: {
      script: "嘉賓：我最近在做生技駭客，我試圖繞過人類的恐懼中樞。當我感到痛的時候，我會對自己說：『這就是獲利的聲音』。痛苦就是最好的燃料。",
      reaction: "嘉賓突然捏了一下自己的大腿，表情猙獰。現場氣氛變得有點詭異。",
      chaosDescription: "嘉賓的呼吸變得急促，麥克風錄到大量的高頻噴氣聲（Plosives）。",
      imageUrl: IMAGES.ENTREPRENEUR[3],
      choices: [
        { text: "「獲利固然重要，但學會面對脆弱才是真正的心理強大。」", theme: "warm", impact: { w: 15, c: -5, b: 0 } },
        { text: "「導播，去叫保全。我覺得這位嘉賓的精神狀態需要專業評估。」", theme: "chaos", impact: { w: -20, c: 30, b: 25 } },
        { text: "「獲利的聲音...聽起來像是收銀機關上的聲音嗎？」", theme: "neutral", impact: { w: 5, c: 5, b: 5 } }
      ]
    },
    4: {
      script: "嘉賓：最後，給所有想成功的男人一句話：不要去愛，要去統治。愛是軟弱者的避風港，而統治才是這個世界的唯一真理。結案。",
      reaction: "嘉賓站起身整理領口，滿意地看著錄音機。錄音師在心裡默唸大悲咒。",
      chaosDescription: "充滿霸氣與荒謬感的宣言在錄音間迴盪，殘響時間顯著拉長。",
      imageUrl: IMAGES.ENTREPRENEUR[4],
      choices: [
        { text: "「統治世界太累，不如回家統治餐桌上的溫馨對話。謝謝分享。」", theme: "warm", impact: { w: 20, c: -10, b: 0 } },
        { text: "「這段統治宣言我會剪成背景音，並配上馬戲團的音樂。」", theme: "chaos", impact: { w: -10, c: 30, b: 30 } },
        { text: "「統治世界之後，您會考慮把電費降下來嗎？」", theme: "neutral", impact: { w: 5, c: 10, b: 10 } }
      ]
    }
  },
  [GuestType.LOWEND]: {
    0: {
      script: "嘉賓：製作人，我跟你說，我剛在捷運看到有人用鼻孔吸珍奶！結果卡住了！最後像大砲一樣射中旁邊阿伯的假牙！超級好笑的欸！",
      reaction: "錄音師捂住臉長嘆。這已經是本週第三個關於假牙的內容了。",
      chaosDescription: "嘉賓發出響亮的噴笑模擬聲，造成數位削波失真。",
      imageUrl: IMAGES.LOWEND[0],
      choices: [
        { text: "「這就是生活的趣味。我們聊聊如何與鄰里分享快樂？」", theme: "warm", impact: { w: 15, c: -5, b: 0 } },
        { text: "（長按消音）「嚴禁描述不雅生理現象！這裡是優雅電台！」", theme: "chaos", impact: { w: -10, c: 15, b: 10 } },
        { text: "「那珍珠最後有洗過再喝嗎？」", theme: "neutral", impact: { w: 5, c: 5, b: 5 } }
      ]
    },
    1: {
      script: "嘉賓：我昨天收集了十個不同種類的肚臍垢，我打算把它們做成一種『原生有機香氛』。這是我最新研發的味覺衝擊，你要不要聞看看？",
      reaction: "嘉賓拿出一罐罐裝物。錄音室充滿了一股難以言喻的氣味。錄音師正在尋找空調開關。",
      chaosDescription: "背景充滿衣物摩擦聲，嘉賓似乎正在翻找罐頭，噪訊極大。",
      imageUrl: IMAGES.LOWEND[1],
      choices: [
        { text: "「收集愛好很獨特。但保持家園清新與整潔，也是一種美學。」", theme: "warm", impact: { w: 15, c: -10, b: 0 } },
        { text: "「快把那罐東西蓋上！導播！快打開通風設備！救命！」", theme: "chaos", impact: { w: -20, c: 30, b: 25 } },
        { text: "「哪種肚臍垢聞起來最像藍乳酪？」", theme: "neutral", impact: { w: 5, c: 10, b: 10 } }
      ]
    },
    2: {
      script: "嘉賓：大家不覺得『排氣聲』其實是一種藝術嗎？不同頻率跟長度，代表了你上一餐對生活的態度。我昨晚的態度非常『麻辣大腸』。",
      reaction: "嘉賓開始用手掌模擬各種聲音。現場一片死寂。",
      chaosDescription: "音軌布滿了規律的低頻爆破音，嚴重干擾語音清晰度。",
      imageUrl: IMAGES.LOWEND[2],
      choices: [
        { text: "「生活隨性很好，但餐桌上的和諧與禮儀，才是家人的重心。」", theme: "warm", impact: { w: 15, c: -5, b: 0 } },
        { text: "「導播，把這段音軌全部廢掉！絕不能讓聽眾聽到這個！」", theme: "chaos", impact: { w: -15, c: 25, b: 20 } },
        { text: "「麻辣大腸的聲音...是偏向 D 大調還是 E 小調？」", theme: "neutral", impact: { w: 5, c: 10, b: 5 } }
      ]
    },
    3: {
      script: "嘉賓：我上次在公園看到兩隻貓在打架，結果一隻不小心掉進噴水池，變成了落湯貓，還在那裡『喵嗚～』地求饒，全場阿公阿嬤都在笑！",
      reaction: "嘉賓笑得前仰後合，不斷拍打大腿。錄音師擔心麥克風架會倒掉。",
      chaosDescription: "錄音室環境噪聲顯著提升，拍桌聲與嘉賓的狂笑聲混雜。",
      imageUrl: IMAGES.LOWEND[3],
      choices: [
        { text: "「生命皆有情。我們聊聊如何關懷社區裡的小動物？」", theme: "warm", impact: { w: 15, c: -5, b: 0 } },
        { text: "「別再拍大腿了！我的麥克風架已經在求饒了！」", theme: "chaos", impact: { w: -5, c: 15, b: 10 } },
        { text: "「落湯貓最後有去學游泳嗎？」", theme: "neutral", impact: { w: 5, c: 5, b: 2 } }
      ]
    },
    4: {
      script: "嘉賓：最後我要教大家一招：如何用一根腳趾頭挖鼻孔而不被老婆發現。這是我多年研究的絕活，保證讓你成為朋友圈的焦點！嘿，別掐斷啊！",
      reaction: "嘉賓真的打算在錄音間脫掉鞋襪演示。錄音師已經衝出了導播室。",
      chaosDescription: "混亂度達到巔峰，現場畫面不堪入目。音控系統瀕臨崩潰。",
      imageUrl: IMAGES.LOWEND[4],
      choices: [
        { text: "「謝謝您的幽默分享。回歸溫馨家園，陪伴才是最美的風景。」", theme: "warm", impact: { w: 20, c: -10, b: 0 } },
        { text: "「警衛！快點把他拖出去！他已經要脫襪子了！」", theme: "chaos", impact: { w: -25, c: 50, b: 50 } },
        { text: "「這招對腳趾長度有要求嗎？我的夠長嗎？」", theme: "neutral", impact: { w: 5, c: 15, b: 15 } }
      ]
    }
  }
};

export const getNextScene = (guest: GuestType, step: number): ScriptNode => {
  return SCRIPTS[guest][step] || SCRIPTS[guest][0];
};

export const getFinalTitle = (w: number, c: number, b: number, guest: GuestType | null): string => {
  // 核心系列分類邏輯

  // 1. 療癒勵志系
  if (w >= 85 && guest === GuestType.SPIRITUAL) {
    return "【療癒勵志系：映心學堂】\n透過心理學與自我覺察視角，您成功轉化了嘉賓的情緒，陪伴聽眾在繁忙生活中找回內心的平靜。";
  }

  // 2. 陪伴系 - 女性影響力
  if (w >= 85 && guest === GuestType.ENTREPRENEUR) {
    return "【故事陪伴系：影響力時間 HerStory】\n聚焦女性影響力，分享嘉賓在奮鬥心路歷程中的溫柔而堅定，傳遞改變世界的力量。";
  }

  // 3. 生活感性系 - 在地情懷
  if (w >= 85 && guest === GuestType.LOWEND) {
    return "【生活感性系：台灣幸福進行曲】\n挖掘在地人情味與不凡故事，您將原本零碎的發言剪輯成了傳遞社會正能量的幸福樂章。";
  }

  // 4. 陪伴系 - 閱讀與跨文化
  if (w >= 70 && w < 85) {
    if (b < 30) return "【故事陪伴系：閱讀推手】\n推廣閱讀文化，帶領聽眾進入書本世界，成功引領大眾培養終身學習的習慣。";
    return "【故事陪伴系：那些老外教我的事】\n以跨文化視角探討碰撞出的生命啟發，分享與異國文化的經驗，為聽眾帶來全新視野。";
  }

  // 5. 知識成長系 (BEnergy 驅動)
  if (b >= 40) {
    if (guest === GuestType.SPIRITUAL) return "【知識成長系：呼吸狂想實驗室】\n探討身心科學與冥想，讓聽眾重新認識這項最自然也最核心的生命能量。";
    if (guest === GuestType.ENTREPRENEUR) return "【知識成長系：建築新樂園】\n帶領聽眾走進建築藝術與城市設計，解說空間背後的美學，讓冷冰冰的建築有了溫度。";
    return "【知識成長系：我的綠色方程式】\n分享綠能知識與減塑經驗，尋找現代人與自然和諧共存的永續生活方案。";
  }

  // 6. 生活感性系 - 飲食哲學
  if (w >= 60) {
    return "【生活感性系：餐桌上的哲學家】\n從飲食文化切入探討人生的哲理與脈絡，讓人邊聽邊品味生活的真實味道。";
  }

  // 7. 陪伴系 - 創新教育 (高混亂度但成功產出)
  if (c >= 60) {
    return "【故事陪伴系：教育不一樣】\n探討創新教育理念，打破傳統框架，帶領家長與老師思考如何陪伴孩子發展多元的可能性。";
  }

  return "【製作存檔：未分類特輯】\n錄音內容未能進入主打系列。建議下次錄音時更積極引導嘉賓話題，提升頻道的整體質感。";
};
