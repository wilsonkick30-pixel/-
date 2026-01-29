
import { GoogleGenAI, Type } from "@google/genai";
import { GuestType, ScriptNode, GameState } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
你是《好家庭錄音室》的硬核 RPG 遊戲引擎。
玩家是「好家庭聯播網」的製作人，任務是把一群「自我過剩」的 Podcaster 訪談剪輯成優雅的內容。

角色資料庫：
- [靈性大師]：口頭禪「靈魂進化」、「頻率」。極度玄學且荒謬。
- [成功學霸總]：口頭禪「凌晨四點的巴黎」、「統治」、「複利」。自律到近乎病態。
- [低端閒聊家]：話題圍繞「體味」、「B級笑話」、「生理現象」。極度混亂。

規則：
1. 拒絕平庸對話！發言必須具有「喬瑟夫影片」中的荒謬感與冷嘲熱諷。
2. 輸出格式必須為 JSON。
3. 每次對話包含：嘉賓發言(script)、錄音師的無奈表情/反應(reaction)、三個選項及其對數據的影響(w=暖心/優雅, c=混亂, b=B聲能量/消音)。
4. 嚴禁說教。

數據影響參考：
- 優雅選項：w+10~20, c-5~10
- 混亂選項：c+15~30, w-10~20
- B聲/消音選項：b+15~30, c+5~10
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    script: { type: Type.STRING, description: "嘉賓的荒謬發言" },
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
              w: { type: Type.NUMBER, description: "對優雅度的影響" },
              c: { type: Type.NUMBER, description: "對混亂度的影響" },
              b: { type: Type.NUMBER, description: "對B聲能量的影響" }
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
    ? `開始錄製。嘉賓是【${state.currentGuest}】。請生成開場白。`
    : `玩家選擇了之前的選項。目前步數：${state.step}/5。請根據歷史記錄生成下一段荒謬對話。`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [{ 
      parts: [
        { text: `歷史紀錄：${JSON.stringify(state.history || [])}` },
        { text: prompt }
      ] 
    }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });

  const text = response.text || "{}";
  return JSON.parse(text);
}

export async function generateFinalResult(state: GameState): Promise<string> {
  const prompt = `錄音結束。最終數據：優雅度 ${state.warmth}, 混亂度 ${state.chaos}, B聲能量 ${state.bEnergy}。
  請根據這些數據，為【${state.currentGuest}】這集節目生成一個嘲諷力滿點、帶有喬瑟夫風格的「節目標題與總結」。
  格式：【標題】+ 內容描述。不要超過100字。`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 2000 }
    }
  });

  return response.text || "";
}