
export enum GuestType {
  SPIRITUAL = '靈性大師',
  ENTREPRENEUR = '成功學霸總',
  LOWEND = '低端閒聊家'
}

export interface GameState {
  warmth: number;
  chaos: number;
  bEnergy: number;
  history: string[];
  currentGuest: GuestType | null;
  phase: 'START' | 'INTERVIEW' | 'EDITING' | 'RESULT';
  lastResponse?: {
    script: string;
    reaction: string;
    imagePrompt: string;
    imageUrl?: string;
  };
  finalTitle?: string;
}

export interface GeminiResponse {
  script: string;
  reaction: string;
  chaosDescription: string;
  imagePrompt: string;
}
