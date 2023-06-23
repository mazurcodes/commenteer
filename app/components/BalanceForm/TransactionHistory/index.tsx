import { TransactionData } from '@/types';
import Transaction from '../Transaction';
import styles from './index.module.scss';

type TransactionHistoryProps = {
  history: TransactionData[];
};

const TransactionHistory = ({ history }: TransactionHistoryProps) => {
  const transactions = history.map((transactionData) => (
    <Transaction
      key={transactionData.timestamp.seconds}
      data={transactionData}
    />
  ));
  return (
    <div className={styles.historyWrapper}>
      <p className={styles.history}>History</p>
      {transactions}
    </div>
  );
};

export default TransactionHistory;
