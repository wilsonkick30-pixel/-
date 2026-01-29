
import { GuestType, ScriptNode, Choice } from './types';

export const IMAGES = {
  DEFAULT_STUDIO: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
  SPIRITUAL_0: "https://images.unsplash.com/photo-1528319725582-ddc0b6aabc5e?auto=format&fit=crop&q=80&w=800",
  SPIRITUAL_1: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=800",
  ENTREPRENEUR_0: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
  ENTREPRENEUR_1: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
  LOWEND_0: "https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80&w=800",
  LOWEND_1: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800"
};

const SCRIPTS: Record<GuestType, Record<number, ScriptNode>> = {
  [GuestType.SPIRITUAL]: {
    0: {
      script: "嘉賓 A：製作人，你這錄音室磁場很亂。你的肝臟正在哀嚎，因為你拒絕與月亮對話。你需要喝下這杯我親自調配的「宇宙高頻水」，洗滌你的前世業障。",
      reaction: "錄音師看著那杯混濁的綠色液體，默默拉近了消音閘。這磁場真的很亂。",
      chaosDescription: "背景充滿低頻低鳴聲，嘉賓正試圖用身體共振影響設備。",
      imageUrl: IMAGES.SPIRITUAL_0,
      choices: [
        { text: "「修行固然重要，但家庭的和諧才是最高的震動頻率。」", theme: "warm", impact: { w: 25, c: -10, b: 0 } },
        { text: "（長按消音）「本台嚴禁推銷不明成份液體，請自重！」", theme: "chaos", impact: { w: -10, c: 30, b: 25 } },
        { text: "「這杯水...跟您童年被迫喝苦茶的陰影有關係嗎？」", theme: "neutral", impact: { w: 5, c: 5, b: 5 } }
      ]
    },
    1: {
      script: "嘉賓 A：當我的靈魂在土星環上跳舞時，那種阻力就是宇宙的愛。你們凡人只關心收視率，卻不關心銀河系的和平。我昨晚才跟昂宿星人通話過。",
      reaction: "錄音師想問通話費率，但為了專業形象，他選擇默默過濾雜訊。",
      chaosDescription: "音軌出現奇怪的數位雜訊，嘉賓的聲紋已偏離人類範疇。",
      imageUrl: IMAGES.SPIRITUAL_1,
      choices: [
        { text: "「銀河系很遠，但今晚陪家人吃頓飯，就是最近的修行。」", theme: "warm", impact: { w: 30, c: -15, b: 0 } },
        { text: "「啟動頻率攔截！這段胡言亂語絕對不能播出去！」", theme: "chaos", impact: { w: -20, c: 40, b: 35 } },
        { text: "「昂宿星人的通話費率是算分鐘還是算光年的？」", theme: "neutral", impact: { w: 0, c: 15, b: 10 } }
      ]
    }
  },
  [GuestType.ENTREPRENEUR]: {
    0: {
      script: "嘉賓 B：製作人，時間就是槓桿。剛才等錄音的 15 秒，換算成我的複利大概能買下這間電台。讓我們聊聊男人如何透過自律來掠奪市場。",
      reaction: "錄音師發現他連上一季的電費都還在分期。典型的霸總戲碼。",
      chaosDescription: "語速極快，波形圖呈現病態的尖銳尖峰。",
      imageUrl: IMAGES.ENTREPRENEUR_0,
      choices: [
        { text: "「凌晨四點的拼勁很感人，但家人的笑容才是真正的資產。」", theme: "warm", impact: { w: 25, c: -10, b: 0 } },
        { text: "（切斷訊號）「本台不歡迎任何直銷話術，消音處理！」", theme: "chaos", impact: { w: -15, c: 35, b: 25 } },
        { text: "「這種極度自律，是為了掩飾對貧窮生活的焦慮嗎？」", theme: "neutral", impact: { w: 10, c: 10, b: 5 } }
      ]
    },
    1: {
      script: "嘉賓 B：我從不睡覺，睡覺是留給沒野心的普通人的。我每天早上 3 點起床對著太陽打影拳，我感覺我正在吞噬太陽！這就是強者的氣場！",
      reaction: "錄音師看著嘉賓眼下的黑眼圈，默默調低了麥克風的增益。",
      chaosDescription: "音軌動態嚴重超標，嘉賓的狂吼正在挑戰設備極限。",
      imageUrl: IMAGES.ENTREPRENEUR_1,
      choices: [
        { text: "「真正的強者，是懂得在家人面前收起鋒芒的人。」", theme: "warm", impact: { w: 30, c: -15, b: 0 } },
        { text: "「導播進廣告！這聽起來已經快變成傳銷大會了！」", theme: "chaos", impact: { w: -25, c: 45, b: 40 } },
        { text: "「對著太陽打拳時，您會思考晚餐要吃什麼嗎？」", theme: "neutral", impact: { w: 5, c: 10, b: 10 } }
      ]
    }
  },
  [GuestType.LOWEND]: {
    0: {
      script: "嘉賓 C：製作人，我剛在捷運收集了三個人的肚臍垢，這是我最近研究的「人類原生能量學」。你要不要聞看看？有一種像發酵起司的高級感。",
      reaction: "錄音師屏住呼吸。臭味正在入侵系統，這已經不是剪輯能解決的了。",
      chaosDescription: "麥克風收到清晰的「吸吮手指聲」，令人毛骨悚然。",
      imageUrl: IMAGES.LOWEND_0,
      choices: [
        { text: "「生活隨性，但我們聊聊那些單純的人情故事？」", theme: "warm", impact: { w: 25, c: -10, b: 0 } },
        { text: "（長按消音）「嚴禁宣傳違反公共衛生的收集愛好！」", theme: "chaos", impact: { w: -10, c: 30, b: 20 } },
        { text: "「收集垢...是為了填補內心被社會遺忘的空洞嗎？」", theme: "neutral", impact: { w: 5, c: 15, b: 5 } }
      ]
    },
    1: {
      script: "嘉賓 C：我昨天在公園看到阿伯想用鼻孔吸珍奶，結果卡住了！哈哈哈！最後像大砲一樣射中旁邊的狗！喂，別按消音啦，這段超接地氣的欸！",
      reaction: "錄音師在心裡默唸大悲咒。他必須守住好家庭的優雅底線。",
      chaosDescription: "音軌充滿噴氣聲與拍桌聲，混亂度達到巔峰。",
      imageUrl: IMAGES.LOWEND_1,
      choices: [
        { text: "「幽默是良藥，但我們談談如何把這活力帶回溫馨家園？」", theme: "warm", impact: { w: 30, c: -20, b: 0 } },
        { text: "（全面靜音）「導播報廢這段！絕不能讓聽眾聽到這個！」", theme: "chaos", impact: { w: -20, c: 50, b: 45 } },
        { text: "「那個老阿伯，後來有順利把珍珠清出來嗎？」", theme: "neutral", impact: { w: 5, c: 15, b: 10 } }
      ]
    }
  }
};

export const getNextScene = (guest: GuestType, step: number): ScriptNode => {
  return SCRIPTS[guest][step] || SCRIPTS[guest][0];
};

export const getFinalTitle = (w: number, c: number, b: number, guest: GuestType | null): string => {
  if (w >= 70) {
    if (guest === GuestType.SPIRITUAL) return "【金獎級：靈性進化】\n《映心學堂》聯名特輯\n\n製作人筆記：你成功將瘋言亂語馴化為「自我覺察」。這集聽完都重新認識了生命。";
    if (guest === GuestType.ENTREPRENEUR) return "【金獎級：女力/影響力】\n《影響力時間 HerStory》收錄\n\n製作人筆記：你把霸總的傲慢剪成了「溫柔而堅定的力量」。證明自律也能與愛共存。";
    return "【金獎級：台灣溫情】\n《台灣幸福進行曲》年度推薦\n\n製作人筆記：你挖掘了低端生活背後的人情味。被譽為「現代人與自然共存的方案」。";
  }
  
  if (w >= 50 && c < 50) {
    if (guest === GuestType.ENTREPRENEUR) return "【知性級：空間美學】\n《建築新樂園》跨界導讀\n\n製作人筆記：你引導嘉賓探討空間美學。讓冰冷的商業思維多了一份建築藝術的溫度。";
    return "【知性級：文化領航】\n《閱讀推手》深度導讀\n\n製作人筆記：你成功把閒聊引向了文化傳承。讓聽眾培養了終身學習的習慣。";
  }

  if (c >= 60 || b >= 40) return "【實驗級：教育反思】\n《教育不一樣》反面教材\n\n製作人筆記：太混亂了，被教育組拿去研究「如何面對失控世界」。下班快去收驚。";

  return "【生活級：餐桌哲學】\n《餐桌上的哲學家》遺珠\n\n製作人筆記：嘗試還算成功。雖然嘉賓還是一直聊臭豆腐跟肚臍垢，但這也是生活。";
};
