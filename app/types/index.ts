import { Timestamp } from 'firebase/firestore';

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
};

export type JobData = {
  ownerId: string;
  name: string;
  description?: string;
  settings: JobSettings;
  amount: number;
  comments: string;
  createdAt: Timestamp;
  id?: string;
};

export type Balance = {
  ownerId: string;
  amount: number;
  currency: string;
  transactionHistory: TransactionData[] | [];
};

export type TransactionData = {
  amount: number;
  type: 'recharge' | 'purchase' | 'refund';
  timestamp: Timestamp;
  name: string;
};
