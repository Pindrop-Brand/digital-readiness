export interface Question {
  id: string;
  stem: string;
  max: number;
  reverse?: boolean;
  opts: string[];
  naLabel?: string;
}

export interface Pillar {
  id: string;
  name: string;
  weight: number;
  color: string;
  meaning: string;
  questions: Question[];
}

export interface ContextQuestion {
  id: string;
  short: string;
  stem: string;
  opts: string[];
  multi?: boolean;
  bench: Record<string, number>;
}

export interface OptionView {
  label: string;
  symbol: string;
  onClick: () => void;
  border: string;
  bg: string;
  valBorder: string;
  valBg: string;
  valColor: string;
}

export interface ContextQuestionView {
  id: string;
  stem: string;
  opts: OptionView[];
}

export interface PillarBar {
  name: string;
  meaning: string;
  color: string;
  value: number;
  width: number;
  low: boolean;
}

export interface ContextCard {
  id: string;
  short: string;
  isMulti: boolean;
  isSingle: boolean;
  noAnswer?: boolean;
  rows?: Array<{ value: string; benchTxt: string }>;
  singleValue?: string;
  singleHasBench?: boolean;
  singleBenchTxt?: string;
}

export type Stage = 'cover' | 'quiz' | 'results';

export type AnswerValue = number | 'NA' | null;
export type ContextValue = string | string[];
