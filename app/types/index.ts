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
  cost: number;
  comments: string;
  createdAt: Timestamp;
  id?: string;
};

export type Balance = {
  amount: number;
  currency: string;
};

export type TransactionData = {
  amount: number;
  type: TransactionType;
  created: number;
  name: string;
};
