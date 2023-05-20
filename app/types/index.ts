export type CommentType = 'positive' | 'neutral' | 'negative' | 'question';

export type Comment = {
  type: CommentType;
  text: string;
  createdAt: number;
  rng: number;
  id?: string;
};

export type JobSettings = {
  positive: number;
  neutral: number;
  negative: number;
  questions: number;
  emojis: number;
};

export type Job = {
  createdAt: number;
  name: string;
  description?: string;
  settings: JobSettings;
  amount: number;
  id?: string;
};
