import { Balance, JobData, TransactionData } from '@/types';
import {
  FirestoreError,
  collection,
  doc,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import {
  useCollection,
  useDocument,
  useDocumentOnce,
} from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import { db } from './clientApp';

const jobsCollection = collection(db, 'jobs');

export const useUserJobs = (
  userId = ''
): [JobData[] | undefined, boolean, FirestoreError | undefined] => {
  const [jobs, setJobs] = useState<JobData[]>();
  const q = query(
    jobsCollection,
    where('ownerId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const [value, loading, error] = useCollection(q);

  useEffect(() => {
    value &&
      setJobs(
        value.docs.map((doc) => {
          return { ...doc.data(), id: doc.id } as JobData;
        })
      );
  }, [value]);
  return [jobs, loading, error];
};

export const useJob = (
  jobId = ''
): [JobData | undefined, boolean, FirestoreError | undefined] => {
  const [job, setJob] = useState<JobData>();
  const docRef = doc(jobsCollection, jobId);
  const [value, loading, error] = useDocumentOnce(docRef);

  useEffect(() => {
    value && setJob(value.data() as JobData);
  }, [value]);
  return [job, loading, error];
};

//********************************** Balance *********************************
const balanceCollection = collection(db, 'balance');

export const useBalance = (
  userId = ''
): [Balance | undefined, boolean, FirestoreError | undefined] => {
  const initialBalance = { amount: 0, currency: 'USD' };
  const [balance, setBalance] = useState<Balance>(initialBalance);
  const docRef = doc(balanceCollection, userId);
  const [value, loading, error] = useDocument(docRef);

  useEffect(() => {
    if (value) {
      const data = value.data();
      const balanceData = {
        ...data,
        amount: Number((data?.amount / 100).toFixed(2)),
      } as Balance;
      setBalance(balanceData);
    }
  }, [value]);
  return [balance, loading, error];
};

//****************************** Transaction History ************************

export const useTransactionHistory = (
  userId = ''
): [TransactionData[] | undefined, boolean, FirestoreError | undefined] => {
  const [transactions, setTransactions] = useState<TransactionData[]>();
  const userTransactionsCollection = collection(
    db,
    `balance`,
    userId,
    'transaction-history'
  );
  const q = query(userTransactionsCollection, orderBy('created', 'desc'));
  const [value, loading, error] = useCollection(q);

  useEffect(() => {
    value &&
      setTransactions(
        value.docs.map((doc) => {
          return { ...doc.data() } as TransactionData;
        })
      );
  }, [value]);
  return [transactions, loading, error];
};
