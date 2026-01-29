
import { GuestType, ScriptNode, Choice } from './types';

const IMAGES = {
  NORMAL: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
  TENSE: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
  CHAOS: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=800"
};

const SCRIPTS: Record<GuestType, Record<number, ScriptNode>> = {
  [GuestType.SPIRITUAL]: {
    0: {
      script: "[ 錄音室門口掛著一串莫名的水晶，空氣中傳來潮濕的泥土味 ]\n嘉賓 A：製作人，你這間房子的磁場很亂。你的肝臟正在發出哀嚎，那是因為你拒絕與月亮對話。你需要喝下這杯我親自調配的「宇宙高頻水」，它能洗滌你的前世業障。",
      reaction: "錄音師看著那杯混濁的綠色液體，默默把嘔吐袋拉到了腳邊。",
      chaosDescription: "背景充滿了不明頻率的低鳴聲，疑似嘉賓偷偷開啟了共振器。",
      imageUrl: IMAGES.NORMAL,
      choices: [
        { text: "「修行固然重要，但家庭的和諧才是最高的震動頻率。」", theme: "warm", impact: { w: 20, c: -10, b: 0 } },
        { text: "（狂按 B 聲）「本台嚴禁推銷不明成份的液體，消音！！！」", theme: "chaos", impact: { w: -10, c: 30, b: 25 } },
        { text: "「這杯水...跟您童年被逼喝苦茶的陰影有關係嗎？」", theme: "neutral", impact: { w: 5, c: 5, b: 5 } }
      ]
    },
    1: {
      script: "嘉賓 A：當我的靈魂脫離肉體，在土星環上跳舞時，那種阻力就是宇宙的愛。你們凡人只關心收視率，卻不關心銀河系的和平。我昨晚才跟昂宿星人通話，他們說你這集錄完會拉肚子。",
      reaction: "錄音師已經開始在 Google 搜尋附近的胃腸科診所。",
      chaosDescription: "音軌出現奇怪的數位雜訊，嘉賓的聲音聽起來像是從微波爐裡傳出來的。",
      imageUrl: IMAGES.TENSE,
      choices: [
        { text: "「銀河系很遠，但今晚陪家人吃頓飯，就是最近的修行。」", theme: "warm", impact: { w: 25, c: -15, b: 0 } },
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
      imageUrl: IMAGES.NORMAL,
      choices: [
        { text: "「凌晨四點的拼勁很感人，但家人的笑容才是真正的成功資產。」", theme: "warm", impact: { w: 20, c: -10, b: 0 } },
        { text: "（切斷訊號）「我們不歡迎任何直銷話術，消音處理！」", theme: "chaos", impact: { w: -15, c: 35, b: 25 } },
        { text: "「這種極度自律，是不是為了掩飾對貧窮生活的過度焦慮？」", theme: "neutral", impact: { w: 10, c: 10, b: 5 } }
      ]
    },
    1: {
      script: "嘉賓 B：很多人問我，為什麼我能在 20 歲就達成財富自由？很簡單，因為我從不睡覺。睡覺是留給那些沒有野心的普通人的。我每天早上 3 點起床對著太陽打影拳，我感覺我正在吞噬太陽！",
      reaction: "錄音師想問他，剛才錄音室消失的兩包砂糖是不是他生吞掉的。",
      chaosDescription: "音軌動態範圍嚴重超標，嘉賓的狂吼正在挑戰設備極限。",
      imageUrl: IMAGES.TENSE,
      choices: [
        { text: "「真正的強者，是懂得在家人面前收起鋒芒、回歸平凡的人。」", theme: "warm", impact: { w: 25, c: -15, b: 0 } },
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
      imageUrl: IMAGES.CHAOS,
      choices: [
        { text: "「雖然生活隨性，但我們聊聊巷弄間那些純真的人情故事？」", theme: "warm", impact: { w: 20, c: -10, b: 0 } },
        { text: "（長按消音）「本台嚴禁宣傳任何違反公共衛生的收集愛好！」", theme: "chaos", impact: { w: -10, c: 30, b: 20 } },
        { text: "「所以，收集這些垢...是為了填補您內心被社會遺忘的空洞嗎？」", theme: "neutral", impact: { w: 5, c: 15, b: 5 } }
      ]
    },
    1: {
      script: "嘉賓 C：說到那個笑話，我昨天在公園看到一個老阿伯，他居然想用鼻孔吸珍珠奶茶...哈哈哈！結果珍珠卡在鼻孔裡拿不出來，最後像發射大砲一樣射中旁邊的狗！喂，別按 B 聲啦，這段超接地氣的欸！",
      reaction: "錄音師開始在心裡默唸大悲咒，這大概是他職涯最黑暗的一天。",
      chaosDescription: "音軌充滿了不可名狀的噴氣聲與拍桌聲，混亂度達到巔峰。",
      imageUrl: IMAGES.CHAOS,
      choices: [
        { text: "「幽默是良藥，但我們談談如何把這份活力帶回溫馨的家園？」", theme: "warm", impact: { w: 25, c: -20, b: 0 } },
        { text: "（全面靜音）「導播！這整集報廢！我們絕對不能讓聽眾聽到這個！」", theme: "chaos", impact: { w: -20, c: 50, b: 45 } },
        { text: "「那個老阿伯，後來有順利把珍珠從鼻孔裡清出來嗎？」", theme: "neutral", impact: { w: 5, c: 15, b: 10 } }
      ]
    }
  }
};

export const getNextScene = (guest: GuestType, step: number): ScriptNode => {
  return SCRIPTS[guest][step] || SCRIPTS[guest][0];
};

export const getFinalTitle = (w: number, c: number, b: number): string => {
  if (w > 75) return "【金鐘年度鉅獻】\n《優雅共生：在荒謬時代守護家庭價值》\n\n製作人筆記：這簡直是奇蹟。我們把一群怪胎剪成了心靈導師。台長感動到哭了，說這才是我們好家庭聯播網的靈魂。";
  if (c > 75) return "【炎上大師封號】\n《錄音室崩壞：那些被消音的真實禁忌》\n\n製作人筆記：完蛋了。這集錄音帶已經被列為社會新聞標本。雖然流量暴增，但我現在得去寫悔過書，台長說他已經不認識我了。";
  if (b > 60) return "【B 聲藝術家】\n《社會邊緣對話：當 B 聲成為唯一的樂器》\n\n製作人筆記：整集 60 分鐘，有 58 分鐘是 B 聲。聽眾反應很兩極，有人說這是前衛藝術，有人說他們家收音機燒掉了。";
  return "【平凡的錄音日】\n《午后閒聊：一些無關痛癢的人生經驗》\n\n製作人筆記：中規中矩。雖然沒亮點，但至少沒人報警。今晚可以準時回家吃滷肉飯了。";
};
