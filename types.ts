
export enum GuestType {
  SPIRITUAL = '靈性大師',
  ENTREPRENEUR = '新創圈金童',
  LOWEND = '地方有力人士'
}

export interface Impact {
  w: number; // Warmth (優雅)
  c: number; // Chaos (混亂)
  b: number; // B-Energy (消音/尷尬)
}

export interface Choice {
  text: string;
  impact: Impact;
  theme?: 'warm' | 'chaos' | 'neutral';
}

export interface ScriptNode {
  script: string;
  reaction: string;
  choices: Choice[];
  imageUrl?: string;
  chaosDescription?: string;
}

export interface GameState {
  warmth: number;
  chaos: number;
  bEnergy: number;
  currentGuest: GuestType | null;
  phase: 'START' | 'INTERVIEW' | 'RESULT';
  step: number;
  lastResponse?: ScriptNode;
  finalTitle?: string;
  history?: any[];
}
