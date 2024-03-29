'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useBalance } from '@/firebase/crudHooks';
import { auth } from '@/firebase/clientApp';

type ProjectFormAmountProps = {
  setBalanceOk: Dispatch<SetStateAction<boolean>>;
};

const ProjectFormAmount = ({ setBalanceOk }: ProjectFormAmountProps) => {
  const [amount, setAmount] = useState<number | string>('');
  const [balance] = useBalance(auth.currentUser?.uid);

  useEffect(() => {
    if (
      balance &&
      balance?.amount >= +((amount as number) * 0.002).toFixed(2)
    ) {
      setBalanceOk(true);
    } else {
      setBalanceOk(false);
    }
  }, [amount, balance, setBalanceOk]);

  return (
    <div className={styles.wrapper}>
      <label htmlFor="amount" className={styles.label}>
        How many comments
        <input
          tabIndex={8}
          required
          type="number"
          pattern="[0-9]*"
          placeholder="min. 100"
          name="amount"
          min={100}
          max={1000}
          value={amount}
          onChange={(event) => setAmount(+event.target.value)}
          className={styles.input}
        />
      </label>
      <p className={styles.cost}>
        Cost:{' '}
        <span className={styles.costValue}>
          {amount ? ((amount as number) * 0.002).toFixed(2) : 0} $
        </span>
      </p>
      <p className={styles.cost}>
        Current balance:{' '}
        <span className={styles.costValue}>{balance?.amount} $</span>
      </p>
      <input
        type="hidden"
        name="cost"
        value={((amount as number) * 0.002).toFixed(2)}
      />
    </div>
  );
};

export default ProjectFormAmount;
