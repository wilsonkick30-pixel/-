
import { GuestType, ScriptNode, Impact } from './types';

export const IMAGES = {
  DEFAULT_STUDIO: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
  SPIRITUAL_VIBE: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&w=800&q=80",
  ENTREPRENEUR_VIBE: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
  LOWEND_VIBE: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?auto=format&fit=crop&w=800&q=80",
  RESULT_AWARD: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?auto=format&fit=crop&w=1200&q=80",
  RESULT_CHAOS: "https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&w=1200&q=80"
};

const COMMON_IMPACT: { [key: string]: Impact } = {
  WARM: { w: 15, c: -5, b: -5 },
  CHAOS: { w: -10, c: 20, b: 0 },
  SILENCE: { w: -5, c: 5, b: 15 },
  BALANCED: { w: 5, c: 5, b: 0 },
  FATAL: { w: -100, c: 999, b: 0 } // Triggers Safety Risk Game Over
};

const SCRIPTS: Record<GuestType, ScriptNode[]> = {
  [GuestType.SPIRITUAL]: [
    {
      script: "（推開耳機）我不需要戴這個，我聽得到宇宙的聲音。這邊的「磁場」有點濁，是不是剛剛有人在這裡吵架？",
      reaction: "錄音師默默收回耳機，心想：「反正只是 Podcast，沒差。」",
      imageUrl: IMAGES.SPIRITUAL_VIBE,
      choices: [
        { text: "「既然老師感應得到，那您幫我聽聽看他們在吵什麼？」", impact: COMMON_IMPACT.WARM },
        { text: "「那您能幫我感應一下，下一期樂透號碼嗎？」", impact: COMMON_IMPACT.CHAOS },
        { text: "（不發一語，直接播放片頭音樂蓋過她）", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "其實我不建議聽眾去醫院。身體的不舒服，都是「靈魂在排毒」。像我上次發燒到 40 度，我只喝了一杯在此刻被祝福過的水。",
      reaction: "導播室的通訊軟體瘋狂閃爍（法務部警告）。(警語：生病請務必就醫，本台立場不代表嘉賓言論)",
      imageUrl: IMAGES.SPIRITUAL_VIBE,
      choices: [
        { text: "「當然，心靈的力量重要，但現代醫學也是宇宙的恩賜嘛。」", impact: COMMON_IMPACT.WARM },
        { text: "「水？是自來水還是礦泉水？有過濾嗎？」", impact: COMMON_IMPACT.BALANCED },
        { text: "立刻切斷麥克風：「本台立場不代表嘉賓言論！生病請務必就醫！」", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "我看你的「氣場」是紫色的，這代表你最近很焦慮，是不是感情出了問題？還是你的原生家庭...",
      reaction: "錄音師看著你，眼神中充滿同情。",
      imageUrl: IMAGES.SPIRITUAL_VIBE,
      choices: [
        { text: "「老師我們還是聊聊您的新書吧，聽眾很期待。」", impact: COMMON_IMPACT.WARM },
        { text: "「紫色？那是我今天內褲的顏色，您真準。」", impact: COMMON_IMPACT.CHAOS },
        { text: "微笑點頭，但心裡在想晚上的便當要吃什麼。", impact: COMMON_IMPACT.BALANCED }
      ]
    },
    {
      script: "這個錄音室的「方位」不對，難怪你們收聽率上不去。要在東南方擺一個九千元的水晶洞。",
      reaction: "台長剛好經過窗外，停下腳步往裡面看。",
      imageUrl: IMAGES.SPIRITUAL_VIBE,
      choices: [
        { text: "「謝謝建議，我們會參考風水大師的意見。」", impact: COMMON_IMPACT.WARM },
        { text: "「九千？淘寶不是賣九百嗎？」", impact: COMMON_IMPACT.CHAOS },
        { text: "「我們先進一段廣告，讓聽眾沈澱一下。」", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "最後我想帶大家做一個「集體冥想」，請正在開車的聽眾閉上眼睛...",
      reaction: "導播嚇到把咖啡噴出來。",
      imageUrl: IMAGES.SPIRITUAL_VIBE,
      choices: [
        { text: "大喊：「開車的朋友請張開眼睛！！注意路況！！」", impact: COMMON_IMPACT.WARM },
        { text: "跟著閉上眼睛，享受這片刻的寧靜（和車禍風險）。", impact: COMMON_IMPACT.FATAL },
        { text: "切掉麥克風，直接播放《交通安全宣導短片》。", impact: COMMON_IMPACT.SILENCE }
      ]
    }
  ],
  [GuestType.ENTREPRENEUR]: [
    {
      script: "（打量環境）製作人，這個錄音室的格局是不是該翻新了？這種 90 年代的裝修風格會抑制我的「創造力輸出」。這段能剪掉嗎？我剛才的語氣不夠像在「俯瞰眾生」。",
      reaction: "錄音師看著剛刷好的防火漆，在混音盤下悄悄攥緊了拳頭。",
      imageUrl: IMAGES.ENTREPRENEUR_VIBE,
      choices: [
        { text: "「我們走的是復古人文風格，您的氣場剛好能平衡這份厚重。」", impact: COMMON_IMPACT.WARM },
        { text: "「沒關係，我們會用後製幫您加上『賽博龐克』的霓虹邊框。」", impact: COMMON_IMPACT.CHAOS },
        { text: "「好的，那我們重來。（並沒有在錄）」", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "年輕人就是太計較薪水。我當年創業，一天只睡兩小時，其他時間都在思考如何改變世界。這就是「狼性」。",
      reaction: "剛領完最低時薪的工讀生在角落瑟瑟發抖。",
      imageUrl: IMAGES.ENTREPRENEUR_VIBE,
      choices: [
        { text: "「這份熱情確實令人敬佩，但身心健康也是一種資產吧？」", impact: COMMON_IMPACT.WARM },
        { text: "「一天睡兩小時？難怪您看起來有點... 滄桑。」", impact: COMMON_IMPACT.CHAOS },
        { text: "尷尬地笑：「哈哈，真的，現在年輕人太草莓了。（虛偽）」", impact: COMMON_IMPACT.BALANCED }
      ]
    },
    {
      script: "這本書裡提到的「量子區塊鏈 AI 賦能」，其實就是我想傳達的核心。看不懂的人，基本上已經被時代淘汰了。",
      reaction: "你確定連他自己都不知道自己在說什麼。",
      imageUrl: IMAGES.ENTREPRENEUR_VIBE,
      choices: [
        { text: "「聽起來很深奧，能用白話文舉個生活中的例子嗎？」", impact: COMMON_IMPACT.WARM },
        { text: "「所以這跟詐騙集團的話術有什麼不同？」", impact: COMMON_IMPACT.CHAOS },
        { text: "點頭如搗蒜：「太精闢了！這段我們一定要剪進精華！」", impact: COMMON_IMPACT.BALANCED }
      ]
    },
    {
      script: "其實我今天來，主要是想宣佈我要選立委。這個國家缺乏像我這樣的「執行長思維」。",
      reaction: "導播透過耳機大叫：「不可以！這會有選罷法問題！擋住他！」",
      imageUrl: IMAGES.ENTREPRENEUR_VIBE,
      choices: [
        { text: "「這真是個驚喜，不過今天我們先專注在您的創業故事。」", impact: COMMON_IMPACT.WARM },
        { text: "「哇，那您的政見是強制大家每天只睡兩小時嗎？」", impact: COMMON_IMPACT.CHAOS },
        { text: "強行進廣告：「好的，關於夢想，我們休息一下馬上回來。」", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "最後，送給聽眾一句話：如果你現在還買不起房，那是因為你想要的不夠多。跟「宇宙」下訂單吧！",
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
      script: "（整理了一下西裝領帶）製作人，我今天特地推掉一個「地方協調會」過來，就是看在你們台長的份上。你們「好家庭」在地方上風評不錯，但我剛才進門看了一下，你們的門禁管理似乎有點鬆散啊？",
      reaction: "錄音師看著被挪動的高價麥克風，聞到了一股權威壓迫的氣息。",
      imageUrl: IMAGES.LOWEND_VIBE,
      choices: [
        { text: "「委員您觀察入微，我們一定會請總務部立刻加強，請上座。」", impact: COMMON_IMPACT.WARM },
        { text: "「委員對細節的掌控力，正是地方進步的關鍵，我們直接開始錄音吧。」", impact: COMMON_IMPACT.BALANCED },
        { text: "「哈哈，這就是我們『好家庭』的親和力，門常開、人常來嘛。」", impact: COMMON_IMPACT.CHAOS }
      ]
    },
    {
      script: "我跟你講，我家隔壁那個王太太，這兩天沒出來倒垃圾。我懷疑她老公... 嘿嘿嘿，你知道的。",
      reaction: "典型的未經查證八卦，而且由有力人士講出來威力更驚人。",
      imageUrl: IMAGES.LOWEND_VIBE,
      choices: [
        { text: "「社區的互動真是充滿了『人情味』。我們聊聊社區發展協會吧？」", impact: COMMON_IMPACT.WARM },
        { text: "「委員，這話傳出去可能會影響王家的選票喔？」", impact: COMMON_IMPACT.CHAOS },
        { text: "消音按鈕準備：「哈哈，謠言止於智者嘛。」", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "最近那個新聞說什麼缺蛋，騙人的啦！我都去後面那個私人的市場，一斤才二十塊！",
      reaction: "這要是播出去，相關單位大概都會打電話過來。",
      imageUrl: IMAGES.LOWEND_VIBE,
      choices: [
        { text: "「這是您的個人經驗啦，大家還是要循正常管道購買食材喔。」", impact: COMMON_IMPACT.WARM },
        { text: "「委員，那間店的負責人是不是上次幫您站台那個？」", impact: COMMON_IMPACT.CHAOS },
        { text: "直接進音樂蓋掉他的聲音。", impact: COMMON_IMPACT.SILENCE }
      ]
    },
    {
      script: "（打了一個巨大的嗝）喔抱歉，剛剛喝了可樂。你們這麥克風不錯耶，連這聲音都收得這麼清楚。",
      reaction: "錄音師看著昂貴的電容式麥克風，眼神已死。",
      imageUrl: IMAGES.LOWEND_VIBE,
      choices: [
        { text: "「真性情！這就是我們節目想要傳達的...『在地生活力』。」", impact: COMMON_IMPACT.WARM },
        { text: "「請委員盡量不要對著麥克風... 展現權威。」", impact: COMMON_IMPACT.SILENCE },
        { text: "跟著打一個嗝回去：「沒事，大家都是自己人。」", impact: COMMON_IMPACT.CHAOS }
      ]
    },
    {
      script: "最後我想藉這個機會，跟那個... 前女友阿美喊話。阿美！那兩千塊不用還了！把我的摩托車鑰匙寄回來就好！",
      reaction: "這變成了私人喊話兼地方調解頻道。",
      imageUrl: IMAGES.LOWEND_VIBE,
      choices: [
        { text: "「希望能傳達給阿美小姐。真是感人（？）的喊話。」", impact: COMMON_IMPACT.WARM },
        { text: "「阿美！如果有在聽，鑰匙請寄到服務處，委員不計前嫌！」", impact: COMMON_IMPACT.CHAOS },
        { text: "無情切斷：「謝謝今天的來賓，我們下次見。」", impact: COMMON_IMPACT.SILENCE }
      ]
    }
  ]
};

const PODCAST_URLS: Record<string, string> = {
  "閱讀推手": "https://podcasts.apple.com/tw/podcast/%E9%96%B1%E8%AE%80%E6%8E%A8%E6%89%8B/id1525854237",
  "那些老外教我的事": "https://open.firstory.me/user/lessonsfromlaowai/platforms",
  "影響力時間_HerStory": "https://open.firstory.me/user/977herstory/platforms",
  "教育不一樣": "https://open.firstory.me/user/fm977edu/platforms",
  "呼吸狂想實驗室": "https://open.firstory.me/user/cmgolq7q2008701w85amo5gfr/platforms",
  "建築新樂園": "https://podcasts.apple.com/tw/podcast/%E5%BB%BA%E7%AF%89%E6%96%B0%E6%A8%82%E5%9C%92/id1549878612",
  "我的綠色方程式": "https://open.firstory.me/user/green-equation/platforms",
  "台灣幸福進行曲": "https://open.firstory.me/user/ckdzbn30ja5870880tixg6ezx/platforms",
  "餐桌上的哲學家": "https://open.firstory.me/user/cm32e7le402xq01vc3rtidr6f/platforms",
  "映心學堂": "https://open.firstory.me/user/cl1wuz8n9097v01w8c7p2hpfg/platforms"
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
  return {
    ...node,
    imageUrl: node.imageUrl || IMAGES.DEFAULT_STUDIO,
    chaosDescription: node.choices.some(c => c.impact.c > 10) ? "混亂指數上升" : "錄音室運作正常",
    choices: node.choices.map(c => ({
      ...c,
      theme: c.theme || (c.impact.w > 10 ? 'warm' : (c.impact.c > 10 || c.impact.b > 10 ? 'chaos' : 'neutral'))
    }))
  };
};

export const getFinalTitle = (w: number, c: number, b: number, guest: GuestType): string => {
  // Safety Guardrail Triggered (High Chaos from specific choice)
  if (c >= 900) {
    return `【公關火葬場】\n\n開車請勿閉眼！電台已被交通局停權。`;
  }

  // Universal Failure (High Censorship)
  if (b > 60) {
    return `收錄節目：【閱讀推手】\n\n製作人講評：\n雖然嘉賓內容具爭議，但您發揮了極致的監控專業。這集節目透過『適度的留白』保護了聽眾的耳朵，更意外引導聽眾轉向深度閱讀。`;
  }

  // High Chaos
  if (c > 60) {
    switch (guest) {
      case GuestType.SPIRITUAL:
        return `收錄節目：【呼吸狂想實驗室】\n\n製作人講評：\n來賓的言論已超越物理法則,全場工作人員聽得如癡如醉(或缺氧)。這是一場關於「狂想」的極致社會實驗。`;
      case GuestType.ENTREPRENEUR:
        return `收錄節目：【建築新樂園】\n\n製作人講評：\n您將嘉賓宏大的願景轉化為數位時代的建築美學探討，看見遠見者如何定義未來的輪廓。`;
      case GuestType.LOWEND:
        return `收錄節目：【餐桌上的哲學家】\n\n製作人講評：\n雖然嘉賓大打飽嗝還聊八卦，但您從這些庶民飲食與在地瑣事中，提煉出了最真實的人間哲學。`;
    }
  }

  // High Elegant
  if (w > 60) {
    switch (guest) {
      case GuestType.SPIRITUAL:
        return `收錄節目：【映心學堂】\n\n製作人講評：\n您成功引導嘉賓分享生命洞見，為心靈能量與現代生活找到了完美的平衡頻率。`;
      case GuestType.ENTREPRENEUR:
        return `收錄節目：【教育不一樣】\n\n製作人講評：\n面對強大領導者氣場，您展現了教科書等級的提問，將個人成功昇華為對教育的啟發。`;
      case GuestType.LOWEND:
        return `收錄節目：【台灣幸福進行曲】\n\n製作人講評：\n在剛硬的外表下，您挖掘出了最珍貴的地方人情味，將地方實力轉化為傳遞幸福的正能量。`;
    }
  }

  // Balanced
  switch (guest) {
    case GuestType.SPIRITUAL:
      return `收錄節目：【那些老外教我的事】\n\n製作人講評：\n嘉賓獨特的思維模式為我們打開了跨文化溝通的新視窗，發現不一樣的世界觀。`;
    case GuestType.ENTREPRENEUR:
      return `收錄節目：【影響力時間_HerStory】\n\n製作人講評：\n邀請到極具魅力的嘉賓分享如何擁抱自我、發揮影響力，是一場關於勇氣的深刻洗禮。`;
    case GuestType.LOWEND:
      return `收錄節目：【我的綠色方程式】\n\n製作人講評：\n您將日常鄰里瑣事昇華為綠色靈感，透過輕鬆言談，實踐了一種心靈上的永續與循環。`;
    default:
      return `收錄節目：【拾光製作人】\n\n製作人講評：\n一場平衡且流暢的訪談，展現了製作人在變動環境中維持專業穩定的核心實力。`;
  }
};

export const getPodcastUrl = (finalText: string): string => {
  const match = finalText.match(/【(.*?)】/);
  if (match && match[1]) {
    const title = match[1];
    if (PODCAST_URLS[title]) return PODCAST_URLS[title];
  }
  return "https://podcasts.apple.com/tw/channel/%E5%A5%BD%E5%AE%B6%E5%BA%AD%E8%81%AF%E6%92%AD%E7%B6%B2/id6751031612";
};
