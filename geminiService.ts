
import { GoogleGenAI, Type } from "@google/genai";
import { GuestType, ScriptNode, GameState } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
你是《好家庭錄音室》的硬核 RPG 遊戲引擎。
玩家是「好家庭聯播網」的製作人，任務是把一群「自我過剩」的 Podcaster 訪談剪輯成優雅的廣播內容。

角色資料庫：
- [靈性大師]：充滿玄學感，語氣荒謬但製作人需將其轉化為對生命維度的探討。
- [新創圈金童]：自信強大，製作人需將其語氣轉化為對未來願景的啟發。
- [地方有力人士]：地方實力派，製作人需將其接地氣的發言轉化為社區連結或永續料理哲學。

規則：
1. 拒絕平庸對話！發言必須具有荒謬感。
2. 標點規則：所有引用或強調的引號必須使用「」。例如：「創造力輸出」、「狼性」。
3. 最終講評風格：要像是在推廣電台節目的專業公關稿，風趣、正面且具備教育或社會意義。

特定標題與感性定義：
- 【餐桌上的哲學家】：談料理、談永續。TU-PANG 地坊餐廳主廚─張皓福。依循在地食材與時令入菜，做到人、料理與土地的和諧永續。
- 【影響力時間 HerStory】：強調女性力量與自信。「自信，是女性最動人的名片。這不僅是一次精彩的對談，更是一場關於勇氣與自我認同的深刻洗禮。」
- 【我的綠色方程式】：強調日常瑣事的昇華與心靈永續。「本集節目將日常瑣事昇華為綠色靈感，實踐一種心靈上的永續與循環，找回生活的純粹。」
- 【閱讀推手】：將消音留白轉化為引導聽眾深度閱讀的契機。
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
  請生成一個專業、風趣且正面的「節目標題與總結」。
  如果是金童且平衡，請使用 HerStory 的感性描述。
  如果是地方人士且平衡，請使用我的綠色方程式的感性描述。
  格式：【標題】+ 內容描述。`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [{ parts: [{ text: prompt }] }],
    config: { systemInstruction: SYSTEM_INSTRUCTION }
  });

  return response.text || "";
}
