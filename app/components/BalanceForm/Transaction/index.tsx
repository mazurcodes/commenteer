import Image from 'next/image';
import styles from './index.module.scss';
import { TransactionData } from '@/types';
import MinusIcon from '@/assets/HistoryMinusIcon.svg';
import PlusIcon from '@/assets/HistoryPlusIcon.svg';
import { convertTimestampToDate } from '@/utils/dateUtils';
import { TransactionType } from '@/data/constants';

type TransactionProps = {
  data: TransactionData;
};

const Transaction = ({ data }: TransactionProps) => {
  return (
    <div className={styles.transactionRow}>
      {data.type === TransactionType.RECHAGE && (
        <Image src={PlusIcon} height={15} alt="Plus icon" />
      )}
      {data.type === TransactionType.REFUND && (
        <Image src={PlusIcon} height={15} alt="Plus icon" />
      )}
      {data.type === TransactionType.PURCHASE && (
        <Image src={MinusIcon} height={15} alt="Minus icon" />
      )}
      <p className={styles.transactionAmount}>
        {data.amount}
        <span>$</span>
      </p>
      <p className={styles.transactionName}>{data.name}</p>
      <p className={styles.transactionDate}>
        {convertTimestampToDate(data.timestamp)}
      </p>
    </div>
  );
};

export default Transaction;
