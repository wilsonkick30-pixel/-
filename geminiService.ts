
import { GoogleGenAI, Type } from "@google/genai";
import { GuestType, GeminiResponse } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `你是一位硬核 RPG 遊戲引擎，負責『好家庭錄音室』的劇情生成。
核心設定：玩家是製作人，要面對三個崩潰嘉賓。
嘉賓 A (靈性大師)：頻率、進化、宇宙能量。
嘉賓 B (成功學霸總)：凌晨四點、白手起家、跟宇宙下訂單。
嘉賓 C (低端閒聊家)：體味、B 級笑話、屎尿屁。

規則：
1. 拒絕平庸對話，必須具有喬瑟夫影片中的荒謬感。
2. 嚴禁說教，嚴禁以 AI 助理身份回話。
3. 輸出必須包含：[劇本描述] (帶環境音)、[錄音師反應]、[混亂度描述]、[影像提示詞] (英文)。
4. 始終保持『好家庭聯播網』表面優雅、內核崩潰的諷刺基調。`;

export const generateScene = async (
  guest: GuestType, 
  userAction: string, 
  chaos: number, 
  warmth: number
): Promise<GeminiResponse> => {
  const prompt = `當前嘉賓：${guest}
玩家操作：${userAction}
當前狀態：混亂度 ${chaos}, 暖心值 ${warmth}

請根據以上資訊，生成一段錄音室現場劇情。
如果是剛開始，請描述嘉賓入座時的衝擊感。`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          script: { type: Type.STRING, description: "劇本描述，包含對話與括號內的環境音" },
          reaction: { type: Type.STRING, description: "錄音師的無奈表情或反應" },
          chaosDescription: { type: Type.STRING, description: "目前的音軌混亂程度描述" },
          imagePrompt: { type: Type.STRING, description: "用於生成場景圖片的英文提示詞，要有電影感、諷刺感" }
        },
        required: ["script", "reaction", "chaosDescription", "imagePrompt"]
      }
    }
  });

  return JSON.parse(response.text.trim());
};

export const generateFinalResult = async (
  history: string[], 
  bEnergy: number, 
  warmth: number, 
  chaos: number
): Promise<string> => {
  const prompt = `遊戲結束。
玩家操作歷史：${history.join(' -> ')}
最終數據：B 聲能量 ${bEnergy}, 暖心值 ${warmth}, 混亂度 ${chaos}

請生成一條嘲諷力滿點、充滿社會諷刺的『節目標題』與一小段製作人總結。`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      maxOutputTokens: 200
    }
  });

  return response.text;
};

export const generateStudioImage = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `Cinematic movie shot, low light, retro recording studio atmosphere, ironic and tense: ${prompt}` }
      ]
    },
    config: {
      imageConfig: { aspectRatio: "16:9" }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return 'https://picsum.photos/800/450';
};
