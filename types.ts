
export enum GuestType {
  SPIRITUAL = '靈性大師',
  ENTREPRENEUR = '成功學霸總',
  LOWEND = '低端閒聊家'
}

export interface Choice {
  text: string;
  theme: 'warm' | 'chaos' | 'neutral';
  impact: { w: number, c: number, b: number };
}

export interface ScriptNode {
  script: string;
  reaction: string;
  chaosDescription: string;
  imageUrl: string;
  choices: Choice[];
}

export interface GameState {
  warmth: number;
  chaos: number;
  bEnergy: number;
  history: string[];
  currentGuest: GuestType | null;
  phase: 'START' | 'INTERVIEW' | 'RESULT';
  step: number;
  lastResponse?: ScriptNode;
  finalTitle?: string;
}
