'use client';
import { useTransactionHistory } from '@/firebase/crudHooks';
import Transaction from '../Transaction';
import styles from './index.module.scss';
import { auth } from '@/firebase/clientApp';

const TransactionHistory = () => {
  const [history] = useTransactionHistory(auth.currentUser?.uid);

  const transactions = history?.map((transactionData) => (
    <Transaction key={transactionData.created} data={transactionData} />
  ));
  return (
    <div className={styles.historyWrapper}>
      <p className={styles.history}>History</p>
      {transactions}
    </div>
  );
};

export default TransactionHistory;
