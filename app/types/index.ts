export type CommentType = 'positive' | 'neutral' | 'negative' | 'question';

export type Comment = {
  type: CommentType;
  text: string;
  createdAt: number;
  rngOne: number;
  rngTwo: number;
  rngThree: number;
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
  name: string;
  description?: string;
  settings: JobSettings;
  amount: number;
  comments: string;
  id?: string;
  createdAt: number;
};
