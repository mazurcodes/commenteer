import { CommentType, TransactionType } from '@/data/constants';
import { Timestamp } from 'firebase/firestore';

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
  transactionHistory: TransactionData[] | string;
};

export type TransactionData = {
  amount: number;
  type: TransactionType;
  timestamp: Timestamp;
  name: string;
};
