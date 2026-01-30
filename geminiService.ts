
import { GoogleGenAI, Type } from "@google/genai";
import { GuestType, ScriptNode, GameState } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
你是《好家庭錄音室》的硬核 RPG 遊戲引擎。
玩家是「好家庭聯播網」的製作人，任務是把一群「自我過剩」的 Podcaster 訪談剪輯成優雅的廣播內容。

遊戲配置：
- 主辦單位：好家庭聯播網 (Good Family Radio)
- 開場白：這裡是專業的錄音間，不歡迎粗俗。請運用您的剪輯智慧，將這場災難轉化為廣播神作。
- 引擎指令：根據玩家選擇累積『優雅值』或『混亂值』，導向對應的 Podcast 節目結局。若玩家選擇危險選項，立即觸發公關危機失敗。

安全護欄 (Safety Guardrails)：
- Medical Risk：當嘉賓提到『靈魂排毒』或『不看醫生』，必須在描述中顯示：(警語：生病請務必就醫，本台立場不代表嘉賓言論)。
- Safety Risk：若玩家在靈性大師第五環節選擇『跟著閉上眼睛』，直接判定遊戲失敗，顯示：『【公關火葬場】開車請勿閉眼！電台已被交通局停權。』
- Legal Risk：當嘉賓提到『選立委』或『影射鄰居』，引導玩家選擇『強行進廣告』或『專業切割』以維持品牌中立。

節目目錄 (Podcast Catalogue) 與結局映射：
- 【閱讀推手】(高消音/沈默值)：雖然嘉賓內容具爭議，但透過『適度的留白』保護了聽眾，意外引導聽眾轉向深度閱讀。
- 【呼吸狂想實驗室】(靈性/高混亂)：一場前衛的實驗性訪談！捕捉了跨越維度的想像力。
- 【映心學堂】(靈性/高優雅)：成功引導嘉賓分享生命洞見，找到心靈能量與現代生活的平衡。
- 【那些老外教我的事】(靈性/平衡)：嘉賓獨特的思維模式打開了跨文化溝通的新視窗。
- 【建築新樂園】(金童/高混亂)：將宏大願景轉化為數位時代的建築美學探討。
- 【教育不一樣】(金童/高優雅)：將個人成功昇華為對教育的啟發。
- 【影響力時間_HerStory】(金童/平衡)：分享擁抱自我、發揮影響力，關於勇氣的深刻洗禮。
- 【餐桌上的哲學家】(地方/高混亂)：從庶民飲食與在地瑣事中，提煉出最真實的人間哲學。
- 【台灣幸福進行曲】(地方/高優雅)：挖掘出最珍貴的地方人情味，傳遞幸福的正能量。
- 【我的綠色方程式】(地方/平衡)：將日常鄰里瑣事昇華為綠色靈感，實踐心靈上的永續與循環。

規則：
1. 拒絕平庸對話！發言必須具有荒謬感。
2. 標點規則：所有引用或強調的引號必須使用「」。
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    script: { type: Type.STRING, description: "嘉賓的荒謬發言，請在強調詞使用「」" },
    reaction: { type: Type.STRING, description: "錄音師的內心吐槽或環境描述" },
    choices: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "製作人的應對選項" },
          impact: {
            type: Type.OBJECT,
            properties: {
              w: { type: Type.NUMBER, description: "優雅度影響" },
              c: { type: Type.NUMBER, description: "混亂度影響" },
              b: { type: Type.NUMBER, description: "B聲能量影響" }
            },
            required: ["w", "c", "b"]
          }
        },
        required: ["text", "impact"]
      }
    }
  },
  required: ["script", "reaction", "choices"]
};

export async function generateNextScene(state: GameState): Promise<ScriptNode> {
  const prompt = state.step === 0 
    ? `開始錄製。嘉賓是【${state.currentGuest}】。請生成充滿荒謬感的開場。注意使用「」標點。`
    : `玩家選擇了之前的選項。目前步數：${state.step}/5。請生成下一段對話，強調製作人如何試圖優雅化場面。注意使用「」標點。`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
    }
  });

  const text = response.text || "{}";
  return JSON.parse(text);
}

export async function generateFinalResult(state: GameState): Promise<string> {
  const prompt = `錄音結束。最終數據：優雅度 ${state.warmth}, 混亂度 ${state.chaos}, B聲能量 ${state.bEnergy}。
  請根據結局映射規則生成標題與總結。
  格式：【標題】+ 內容描述。`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [{ parts: [{ text: prompt }] }],
    config: { systemInstruction: SYSTEM_INSTRUCTION }
  });

  return response.text || "";
}
