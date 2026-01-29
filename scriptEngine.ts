
import { GuestType, ScriptNode, Choice } from './types';

export const IMAGES = {
  DEFAULT_STUDIO: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800", // 專業錄音設備
  SPIRITUAL_0: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800", // 禪意冥想石
  SPIRITUAL_1: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=800", // 星空與冥想
  ENTREPRENEUR_0: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", // 現代辦公大樓
  ENTREPRENEUR_1: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800", // 西裝與成功感
  LOWEND_0: "https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80&w=800", // 雜亂工作室
  LOWEND_1: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800" // 公園長椅
};

const SCRIPTS: Record<GuestType, Record<number, ScriptNode>> = {
  [GuestType.SPIRITUAL]: {
    0: {
      script: "[ 錄音室門口掛著一串莫名的水晶，空氣中傳來潮濕的泥土味 ]\n嘉賓 A：製作人，你這間房子的磁場很亂。你的肝臟正在發出哀嚎，那是因為你拒絕與月亮對話。你需要喝下這杯我親自調配的「宇宙高頻水」。",
      reaction: "錄音師看著那杯混濁的綠色液體，默默把嘔吐袋拉到了腳邊。",
      chaosDescription: "背景充滿了不明頻率的低鳴聲，疑似嘉賓偷偷開啟了共振器。",
      imageUrl: IMAGES.SPIRITUAL_0,
      choices: [
        { text: "「修行固然重要，但家庭的和諧才是最高的震動頻率。」", theme: "warm", impact: { w: 25, c: -10, b: 0 } },
        { text: "（狂按 B 聲）「本台嚴禁推銷不明成份的液體，消音！！！」", theme: "chaos", impact: { w: -10, c: 30, b: 25 } },
        { text: "「這杯水...跟您童年被逼喝苦茶的陰影有關係嗎？」", theme: "neutral", impact: { w: 5, c: 5, b: 5 } }
      ]
    },
    1: {
      script: "嘉賓 A：當我的靈魂脫離肉體，在土星環上跳舞時，那種阻力就是宇宙的愛。你們凡人只關心收視率，卻不關心銀河系的和平。我昨晚才跟昂宿星人通話，他們說你這集錄完會拉肚子。",
      reaction: "錄音師已經開始在 Google 搜尋附近的胃腸科診所。",
      chaosDescription: "音軌出現奇怪的數位雜訊，嘉賓的聲音聽起來像是從微波爐裡傳出來的。",
      imageUrl: IMAGES.SPIRITUAL_1,
      choices: [
        { text: "「銀河系很遠，但今晚陪家人吃頓飯，就是最近的修行。」", theme: "warm", impact: { w: 30, c: -15, b: 0 } },
        { text: "「導播，啟動頻率攔截！這段胡言亂語絕對不能播出去！」", theme: "chaos", impact: { w: -20, c: 40, b: 35 } },
        { text: "「昂宿星人的通話費率是算分鐘還是算光年的？」", theme: "neutral", impact: { w: 0, c: 15, b: 10 } }
      ]
    }
  },
  [GuestType.ENTREPRENEUR]: {
    0: {
      script: "[ 嘉賓穿著剪裁過於合身的西裝，皮鞋亮得能當鏡子照 ]\n嘉賓 B：製作人，時間就是槓桿。我剛才在門口等了 15 秒，這 15 秒如果換算成我的複利，大概能買下你們這間小電台。讓我們聊聊男人如何透過極度自律來掠奪市場。",
      reaction: "錄音師翻了一下他的稅務紀錄，發現他連上一季的電費都還在分期。",
      chaosDescription: "嘉賓說話速度極快，波形圖呈現出一種病態的尖銳尖峰。",
      imageUrl: IMAGES.ENTREPRENEUR_0,
      choices: [
        { text: "「凌晨四點的拼勁很感人，但家人的笑容才是真正的成功資產。」", theme: "warm", impact: { w: 25, c: -10, b: 0 } },
        { text: "（切斷訊號）「我們不歡迎任何直銷話術，消音處理！」", theme: "chaos", impact: { w: -15, c: 35, b: 25 } },
        { text: "「這種極度自律，是不是為了掩飾對貧窮生活的過度焦慮？」", theme: "neutral", impact: { w: 10, c: 10, b: 5 } }
      ]
    },
    1: {
      script: "嘉賓 B：很多人問我，為什麼我能在 20 歲就達成財富自由？很簡單，因為我從不睡覺。睡覺是留給那些沒有野心的普通人的。我每天早上 3 點起床對著太陽打影拳，我感覺我正在吞噬太陽！",
      reaction: "錄音師想問他，剛才錄音室消失的兩包砂糖是不是他生吞掉的。",
      chaosDescription: "音軌動態範圍嚴重超標，嘉賓的狂吼正在挑戰設備極限。",
      imageUrl: IMAGES.ENTREPRENEUR_1,
      choices: [
        { text: "「真正的強者，是懂得在家人面前收起鋒芒、回歸平凡的人。」", theme: "warm", impact: { w: 30, c: -15, b: 0 } },
        { text: "「導播快進廣告！這聽起來已經快變成傳銷大會了！！！」", theme: "chaos", impact: { w: -25, c: 45, b: 40 } },
        { text: "「對著太陽打拳時，您會順便思考晚餐要吃什麼嗎？」", theme: "neutral", impact: { w: 5, c: 10, b: 10 } }
      ]
    }
  },
  [GuestType.LOWEND]: {
    0: {
      script: "[ 嘉賓穿著鬆垮的運動褲，手裡還拎著一袋吃剩的臭豆腐 ]\n嘉賓 C：欸製作人，這錄音室隔音好嗎？我剛在捷運上收集了三個人的肚臍垢，這是我最近在研究的「人類原生能量學」。你要不要聞看看？有一種像發酵起司的高級感。",
      reaction: "錄音師把所有的對外窗都暴力拆除了，即便外面正在暴雨。",
      chaosDescription: "麥克風收到極為鮮明的「吸吮手指聲」，令人毛骨悚然。",
      imageUrl: IMAGES.LOWEND_0,
      choices: [
        { text: "「雖然生活隨性，但我們聊聊巷弄間那些純真的人情故事？」", theme: "warm", impact: { w: 25, c: -10, b: 0 } },
        { text: "（長按消音）「本台嚴禁宣傳任何違反公共衛生的收集愛好！」", theme: "chaos", impact: { w: -10, c: 30, b: 20 } },
        { text: "「所以，收集這些垢...是為了填補您內心被社會遺忘的空洞嗎？」", theme: "neutral", impact: { w: 5, c: 15, b: 5 } }
      ]
    },
    1: {
      script: "嘉賓 C：說到那個笑話，我昨天在公園看到一個老阿伯，他居然想用鼻孔吸珍珠奶茶...哈哈哈！結果珍珠卡在鼻孔裡拿不出來，最後像發射大砲一樣射中旁邊的狗！喂，別按 B 聲啦，這段超接地氣的欸！",
      reaction: "錄音師開始在心裡默唸大悲咒，這大概是他職涯最黑暗的一天。",
      chaosDescription: "音軌充滿了不可名狀的噴氣聲與拍桌聲，混亂度達到巔峰。",
      imageUrl: IMAGES.LOWEND_1,
      choices: [
        { text: "「幽默是良藥，但我們談談如何把這份活力帶回溫馨的家園？」", theme: "warm", impact: { w: 30, c: -20, b: 0 } },
        { text: "（全面靜音）「導播！這整集報廢！我們絕對不能讓聽眾聽到這個！」", theme: "chaos", impact: { w: -20, c: 50, b: 45 } },
        { text: "「那個老阿伯，後來有順利把珍珠從鼻孔裡清出來嗎？」", theme: "neutral", impact: { w: 5, c: 15, b: 10 } }
      ]
    }
  }
};

export const getNextScene = (guest: GuestType, step: number): ScriptNode => {
  return SCRIPTS[guest][step] || SCRIPTS[guest][0];
};

export const getFinalTitle = (w: number, c: number, b: number, guest: GuestType | null): string => {
  // 優質結局
  if (w >= 70) {
    if (guest === GuestType.SPIRITUAL) return "【金獎級：靈性進化】\n《映心學堂》x《呼吸狂想實驗室》聯名特輯\n\n製作人筆記：你成功將瘋言亂語轉化為「自我覺察」。這集錄音已被兩大身心靈節目買斷，聽說聽眾聽完都重新認識了生命的呼吸。";
    if (guest === GuestType.ENTREPRENEUR) return "【金獎級：女力/影響力】\n《影響力時間 HerStory》特別收錄\n\n製作人筆記：你把霸總的傲慢剪成了「溫柔而堅定的力量」。HerStory 主持人讚不絕口，說這證明極致自律也能與愛共存。";
    return "【金獎級：台灣溫情】\n《台灣幸福進行曲》年度推薦\n\n製作人筆記：透過剪輯，你挖掘了低端生活背後的在地人情味。這集被譽為「尋找現代人與自然和諧共存的方案」，幸福感爆棚。";
  }
  
  // 知性結局
  if (w >= 50 && c < 50) {
    if (guest === GuestType.ENTREPRENEUR) return "【知性級：空間美學】\n《建築新樂園》跨界導讀\n\n製作人筆記：你引導嘉賓探討空間背後的故事與美學。聽眾反饋說，這讓冰冷的商業思維多了一份建築藝術的溫度。";
    if (guest === GuestType.SPIRITUAL) return "【知性級：跨文化視角】\n《那些老外教我的事》文化交流篇\n\n製作人筆記：你將嘉賓的理論轉化為跨文化碰撞帶來的生命啟發。雖然過程驚險，但這是一次非常有意義的異國思維導讀。";
    if (guest === GuestType.LOWEND) return "【知性級：綠色永續】\n《我的綠色方程式》特別報導\n\n製作人筆記：嘉賓的隨性生活被你賦予了環保與減塑的深度。這是一次現代人與自然和諧共存的奇特實踐。";
    return "【知性級：文化領航】\n《閱讀推手》深度導讀\n\n製作人筆記：你成功把閒聊引向了文化傳承。作家訪問組表示你的剪輯風格非常優雅，成功讓聽眾培養了終身學習的習慣。";
  }

  // 實驗/教育結局
  if (c >= 60 || b >= 40) {
    return "【實驗級：教育反思】\n《教育不一樣》反面教材專場\n\n製作人筆記：內容太混亂了，被教育組拿去研究「如何打破傳統框架，陪伴孩子面對失控世界」。建議你下班去聽《映心學堂》調節情緒。";
  }

  // 感性結局
  return "【生活級：餐桌哲學】\n《餐桌上的哲學家》遺珠片段\n\n製作人筆記：從飲食文化切入的嘗試還算成功，探討食物背後蘊含的人生哲理。雖然嘉賓還是一直聊臭豆腐跟肚臍垢。";
};
