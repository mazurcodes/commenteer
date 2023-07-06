import Image from 'next/image';
import styles from './index.module.scss';
import { TransactionData } from '@/types';
import MinusIcon from '@/assets/HistoryMinusIcon.svg';
import PlusIcon from '@/assets/HistoryPlusIcon.svg';
import { convertDateToCommenteerDate } from '@/utils/dateUtils';
import { TransactionType } from '@/data/constants';
import { shortenText } from '@/utils/textUtils';

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
        {Number((data.amount / 100).toFixed(2))}
        <span>$</span>
      </p>
      <p className={styles.transactionName}>{shortenText(data.name, 20)}</p>
      <p className={styles.transactionDate}>
        {convertDateToCommenteerDate(data.created)}
      </p>
    </div>
  );
};

export default Transaction;
