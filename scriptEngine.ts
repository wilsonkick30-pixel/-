
import { GuestType, ScriptNode, Impact } from './types';

// 使用 Unsplash 的高品質圖片
export const IMAGES = {
  // 錄音室/通用
  DEFAULT_STUDIO: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
  // 靈性大師 (水晶、薰香、神秘感)
  SPIRITUAL_VIBE: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&w=800&q=80",
  // 成功霸總 (西裝、手錶、高樓)
  ENTREPRENEUR_VIBE: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  // 低端閒聊 (街頭、雜亂、真實)
  LOWEND_VIBE: "https://images.unsplash.com/photo-1518558997970-4ddc236affcd?auto=format&fit=crop&w=800&q=80",
  // 結局 (獎盃、廣播)
  RESULT_AWARD: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?auto=format&fit=crop&w=1200&q=80",
  // 混亂結局
  RESULT_CHAOS: "https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&w=1200&q=80"
};

const COMMON_IMPACT: { [key: string]: Impact } = {
  WARM: { w: 15, c: -5, b: -5 },
  CHAOS: { w: -10, c: 20, b: 0 },
  SILENCE: { w: -5, c: 5, b: 15 },
  BALANCED: { w: 5, c: 5, b: 0 }
};

const SCRIPTS: Record<GuestType, ScriptNode[]> = {
  [GuestType.SPIRITUAL]: [
    {
      script: "（推開耳機）我不需要戴這個，我聽得到宇宙的聲音。這邊的磁場有點濁，是不是剛剛有人在這裡吵架？",
      reaction: "錄音師默默把耳機音量調大，翻了個白眼。",
      imageUrl: IMAGES.SPIRITUAL_VIBE,
      choices: [
        { text: "「老師，為了收音品質，還是請您委屈一下戴上。」", impact: COMMON_IMPACT.WARM },
        { text: "「那您能幫我感應一下，下一期樂透號碼嗎？」", impact: COMMON_IMPACT.CHAOS },
        { text: "（不發一語，直接播放片頭音樂蓋過她）", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "其實我不建議聽眾去醫院。身體的不舒服，都是靈魂在排毒。像我上次發燒到40度，我只喝了一杯在此刻被祝福過的水。",
      reaction: "導播室的電話燈號突然瘋狂閃爍（投訴電話）。",
      imageUrl: IMAGES.SPIRITUAL_VIBE,
      choices: [
        { text: "「當然，心靈的力量很重要，但現代醫學也是宇宙的恩賜嘛。」", impact: COMMON_IMPACT.WARM },
        { text: "「水？是自來水還是礦泉水？有過濾嗎？」", impact: COMMON_IMPACT.BALANCED },
        { text: "立刻切斷麥克風：「本台立場不代表嘉賓言論！生病請務必就醫！」", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "我看你的氣場是紫色的，這代表你最近很焦慮，是不是感情出了問題？還是你的原生家庭...",
      reaction: "錄音師看著你，眼神中充滿同情。",
      imageUrl: IMAGES.SPIRITUAL_VIBE,
      choices: [
        { text: "「老師我們還是聊聊您的新書吧，聽眾很期待。」", impact: COMMON_IMPACT.WARM },
        { text: "「紫色？那是我今天內褲的顏色，您真準。」", impact: COMMON_IMPACT.CHAOS },
        { text: "微笑點頭，但心裡在想晚上的便當要吃什麼。", impact: COMMON_IMPACT.BALANCED }
      ]
    },
    {
      script: "這個錄音室的方位不對，難怪你們收聽率上不去。要在東南方擺一個九千元的水晶洞。",
      reaction: "台長剛好經過窗外，停下腳步往裡面看。",
      imageUrl: IMAGES.SPIRITUAL_VIBE,
      choices: [
        { text: "「謝謝建議，我們會參考風水大師的意見。」", impact: COMMON_IMPACT.WARM },
        { text: "「九千？淘寶不是賣九百嗎？」", impact: COMMON_IMPACT.CHAOS },
        { text: "「我們先進一段廣告，讓聽眾沈澱一下。」", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "最後我想帶大家做一個集體冥想，請正在開車的聽眾閉上眼睛...",
      reaction: "導播嚇到把咖啡噴出來。",
      imageUrl: IMAGES.SPIRITUAL_VIBE,
      choices: [
        { text: "大喊：「開車的朋友請張開眼睛！！注意路況！！」", impact: COMMON_IMPACT.WARM },
        { text: "跟著閉上眼睛，享受這片刻的寧靜（和車禍風險）。", impact: COMMON_IMPACT.CHAOS },
        { text: "切掉麥克風，直接播放《交通安全宣導短片》。", impact: COMMON_IMPACT.SILENCE }
      ]
    }
  ],
  [GuestType.ENTREPRENEUR]: [
    {
      script: "等一下，這個麥克風的品牌是？算了，我不期待這種傳統媒體用頂規。這段能剪掉嗎？我剛才語氣不夠像賈伯斯。",
      reaction: "錄音師在混音盤上比了一個中指。",
      imageUrl: IMAGES.ENTREPRENEUR_VIBE,
      choices: [
        { text: "「我們重視的是內容的真實性，您的聲音很有磁性。」", impact: COMMON_IMPACT.WARM },
        { text: "「沒關係，我們會用後製幫您加上『成功人士』的濾鏡音效。」", impact: COMMON_IMPACT.CHAOS },
        { text: "「好的，那我們重來。（並沒有在錄）」", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "年輕人就是太計較薪水。我當年創業，一天只睡兩小時，其他時間都在思考如何改變世界。這就是狼性。",
      reaction: "剛領完最低時薪的工讀生在角落瑟瑟發抖。",
      imageUrl: IMAGES.ENTREPRENEUR_VIBE,
      choices: [
        { text: "「這份熱情確實令人敬佩，但身心健康也是一種資產吧？」", impact: COMMON_IMPACT.WARM },
        { text: "「一天睡兩小時？難怪您看起來有點... 滄桑。」", impact: COMMON_IMPACT.CHAOS },
        { text: "尷尬地笑：「哈哈，真的，現在年輕人太草莓了。（虛偽）」", impact: COMMON_IMPACT.BALANCED }
      ]
    },
    {
      script: "這本書裡提到的『量子區塊鏈AI賦能』，其實就是我想傳達的核心。看不懂的人，基本上已經被時代淘汰了。",
      reaction: "你確定連他自己都不知道自己在說什麼。",
      imageUrl: IMAGES.ENTREPRENEUR_VIBE,
      choices: [
        { text: "「聽起來很深奧，能用白話文舉個生活中的例子嗎？」", impact: COMMON_IMPACT.WARM },
        { text: "「所以這跟詐騙集團的話術有什麼不同？」", impact: COMMON_IMPACT.CHAOS },
        { text: "點頭如搗蒜：「太精闢了！這段我們一定要剪進精華！」", impact: COMMON_IMPACT.BALANCED }
      ]
    },
    {
      script: "其實我今天來，主要是想宣佈我要選立委。這個國家缺乏像我這樣的執行長思維。",
      reaction: "導播透過耳機大叫：「不可以！這會有選罷法問題！擋住他！」",
      imageUrl: IMAGES.ENTREPRENEUR_VIBE,
      choices: [
        { text: "「這真是個驚喜，不過今天我們先專注在您的創業故事。」", impact: COMMON_IMPACT.WARM },
        { text: "「哇，那您的政見是強制大家每天只睡兩小時嗎？」", impact: COMMON_IMPACT.CHAOS },
        { text: "強行進廣告：「好的，關於夢想，我們休息一下馬上回來。」", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "最後，送給聽眾一句話：如果你現在還買不起房，那是因為你想要的不夠多。跟宇宙下訂單吧！",
      reaction: "錄音室空氣凝結，所有租屋族工作人員拳頭都硬了。",
      imageUrl: IMAGES.ENTREPRENEUR_VIBE,
      choices: [
        { text: "「謝謝您的分享，努力確實重要，機運也是呢。」", impact: COMMON_IMPACT.WARM },
        { text: "「我剛下了訂單，宇宙說它缺貨。」", impact: COMMON_IMPACT.CHAOS },
        { text: "直接拉下音推，結束這回合。", impact: COMMON_IMPACT.SILENCE }
      ]
    }
  ],
  [GuestType.LOWEND]: [
    {
      script: "（嚼口香糖）欸那個，製作人，你們這邊有便當嗎？我聽隔壁台說有雞腿便當才來的。啊對了，我剛剛在樓下好像踩到狗屎。",
      reaction: "錄音室瀰漫著一股微妙的氣味。",
      imageUrl: IMAGES.LOWEND_VIBE,
      choices: [
        { text: "「便當錄完會提供。請您先坐好，我們要注意雜音。」", impact: COMMON_IMPACT.WARM },
        { text: "「請把鞋子脫在外面... 拜託。」", impact: COMMON_IMPACT.SILENCE },
        { text: "「狗屎？這是一個好兆頭，代表這集會紅！」", impact: COMMON_IMPACT.CHAOS }
      ]
    },
    {
      script: "我跟你講，我家隔壁那個王太太，這兩天都沒出來倒垃圾。我懷疑她老公... 嘿嘿嘿，你知道的。",
      reaction: "典型的未經查證八卦，最容易被告的那種。",
      imageUrl: IMAGES.LOWEND_VIBE,
      choices: [
        { text: "「社區的互動真是充滿人情味。我們聊聊社區發展協會吧？」", impact: COMMON_IMPACT.WARM },
        { text: "「我們現在是Live播出喔，王太太可能在聽。」", impact: COMMON_IMPACT.CHAOS },
        { text: "消音按鈕準備：「哈哈，謠言止於智者嘛。」", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "最近那個新聞說什麼缺蛋，騙人的啦！我都去後面那個...（講出違法私宰場名字），一斤才二十塊！",
      reaction: "這要是播出去，衛生局明天就來了。",
      imageUrl: IMAGES.LOWEND_VIBE,
      choices: [
        { text: "「這是您的個人經驗啦，大家還是要循正常管道購買食材喔。」", impact: COMMON_IMPACT.WARM },
        { text: "「噓！那種店不能在廣播講，會被抄掉啦！」", impact: COMMON_IMPACT.CHAOS },
        { text: "直接進音樂蓋掉他的聲音。", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "（打了一個巨大的嗝）喔抱歉，剛剛喝了可樂。你們這麥克風不錯耶，連這聲音都收得這麼清楚。",
      reaction: "錄音師看著昂貴的電容式麥克風，眼神已死。",
      imageUrl: IMAGES.LOWEND_VIBE,
      choices: [
        { text: "「真性情！這就是我們節目的... 真實感。」", impact: COMMON_IMPACT.WARM },
        { text: "「請盡量不要對著麥克風... 噴氣。」", impact: COMMON_IMPACT.SILENCE },
        { text: "跟著打一個嗝回去：「沒事，大家都是自己人。」", impact: COMMON_IMPACT.CHAOS }
      ]
    },
    {
      script: "最後我想藉這個機會，跟那個... 前女友阿美喊話。阿美！那兩千塊不用還了！把我的摩托車鑰匙寄回來就好！",
      reaction: "這變成了私人討債頻道。",
      imageUrl: IMAGES.LOWEND_VIBE,
      choices: [
        { text: "「希望能傳達給阿美小姐。真是感人（？）的喊話。」", impact: COMMON_IMPACT.WARM },
        { text: "「阿美！如果有在聽，鑰匙請寄到電台，我們轉交！」", impact: COMMON_IMPACT.CHAOS },
        { text: "無情切斷：「謝謝今天的來賓，我們下次見。」", impact: COMMON_IMPACT.SILENCE }
      ]
    }
  ]
};

export const getNextScene = (guest: GuestType, step: number): ScriptNode => {
  if (step >= 5) {
    return {
      script: "錄製結束。",
      reaction: "工作人員鬆了一口氣。",
      choices: [],
      chaosDescription: "平靜如水",
      imageUrl: IMAGES.RESULT_AWARD
    };
  }
  const node = SCRIPTS[guest][step];
  
  // Inject missing properties dynamically
  return {
    ...node,
    imageUrl: node.imageUrl || IMAGES.DEFAULT_STUDIO, // Ensure specific image is used or default
    chaosDescription: node.choices.some(c => c.impact.c > 10) ? "混亂指數上升" : "錄音室運作正常",
    choices: node.choices.map(c => ({
      ...c,
      theme: c.theme || (c.impact.w > 10 ? 'warm' : (c.impact.c > 10 || c.impact.b > 10 ? 'chaos' : 'neutral'))
    }))
  };
};

export const getFinalTitle = (w: number, c: number, b: number, guest: GuestType): string => {
  // Logic remains the same, images handled in App render logic or we could return an image url here too if needed
  if (b > 60) {
    return `收錄節目：【閱讀推手】\n\n製作人講評：\n因為嘉賓內容充滿爭議，整集幾乎被「嗶」聲覆蓋。為了填補空白，我們只好緊急朗讀說明書，意外推廣了閱讀風氣。`;
  }

  if (c > 70) {
    switch (guest) {
      case GuestType.SPIRITUAL:
        return `收錄節目：【呼吸狂想實驗室】\n\n製作人講評：\n來賓的言論已超越物理法則，全場工作人員聽得如癡如醉（或缺氧）。這是一場關於「狂想」的極致社會實驗。`;
      case GuestType.ENTREPRENEUR:
        return `收錄節目：【建築新樂園】\n\n製作人講評：\n嘉賓用華麗的辭藻蓋了一座空中樓閣。雖然地基不穩，但看他崩塌的過程，也算是一種另類的建築美學。`;
      case GuestType.LOWEND:
        return `收錄節目：【餐桌上的哲學家】\n\n製作人講評：\n充滿「味道」的一集。從便當菜色聊到社區八卦，重新定義了餐桌禮儀，聽完讓人對食物產生了深刻的哲學思考（敢不敢吃）。`;
      default:
        return `收錄節目：【呼吸狂想實驗室】\n\n製作人講評：\n這集內容過於前衛，徹底挑戰了人類邏輯的極限。`;
    }
  }

  if (w > 60) {
    switch (guest) {
      case GuestType.SPIRITUAL:
        return `收錄節目：【映心學堂】\n\n製作人講評：\n不可思議！您成功引導嘉賓說出了人話。這段對話不僅療癒了聽眾，也修復了錄音師受創的心靈。`;
      case GuestType.ENTREPRENEUR:
        return `收錄節目：【教育不一樣】\n\n製作人講評：\n面對狂妄的言論，您展現了教科書等級的引導。這不僅是訪談，更是對嘉賓進行了一場成功的社會化教育。`;
      case GuestType.LOWEND:
        return `收錄節目：【台灣幸福進行曲】\n\n製作人講評：\n在粗俗的表象下，您挖掘出了在地的人情味。雖然過程有點驚險，但結果充滿了台灣特有的生命力與幸福感。`;
      default:
        return `收錄節目：【台灣幸福進行曲】\n\n製作人講評：\n一段溫暖而真誠的對話，完美符合好家庭頻道的優雅形象。`;
    }
  }

  switch (guest) {
    case GuestType.SPIRITUAL:
      return `收錄節目：【那些老外教我的事】\n\n製作人講評：\n嘉賓的思維邏輯宛如外星人，這場訪談讓我們學會了如何進行跨物種溝通，充滿了異文化的衝擊與啟發。`;
    case GuestType.ENTREPRENEUR:
      return `收錄節目：【影響力時間 HerStory】\n\n製作人講評：\n雖然嘉賓自我感覺過於良好，但您努力維持了場面。這集節目見證了一個人的自信如何膨脹成一種「影響力」。`;
    case GuestType.LOWEND:
      return `收錄節目：【我的綠色方程式】\n\n製作人講評：\n內容雖然沒什麼營養，但我們秉持著不浪費的精神完成了錄製。這是一種將廢話回收再利用的環保體現。`;
    default:
      return `收錄節目：【呼吸狂想實驗室】\n\n製作人講評：\n一場普通的訪談，就像呼吸一樣自然，但也像空氣一樣讓人過耳即忘。`;
  }
};
