import Image from 'next/image';
import styles from './index.module.scss';
import StripeIcon from '@/assets/StripeIcon.svg';
import { useBalance } from '@/firebase/crudHooks';
import { auth } from '@/firebase/clientApp';
import { FormEvent, useState } from 'react';
import { addFundsToBalance } from '@/firebase/crudUtils';
import TransactionHistory from './TransactionHistory';

const BalanceForm = () => {
  const [balance, loading, error] = useBalance(auth.currentUser?.uid);
  const [amount, setAmount] = useState<number>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    auth.currentUser &&
      addFundsToBalance(auth.currentUser?.uid, amount, 'Balance recharge');
  };

  if (loading) {
    return (
      <div className={styles.center}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.center}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (balance)
    return (
      <div className={styles.wrapper}>
        <div className={styles.wrapperBalance}>
          <h1>Current balance</h1>
          <h2>
            {balance?.amount} <span className={styles.currencySymbol}>$</span>
          </h2>
          <div className={styles.wrapperRow}>
            <button
              className={styles.buttonAmount}
              onClick={() => setAmount(1)}
            >
              <p>1 $</p>
            </button>
            <button
              className={styles.buttonAmount}
              onClick={() => setAmount(2)}
            >
              <p>2 $</p>
            </button>
            <button
              className={styles.buttonAmount}
              onClick={() => setAmount(5)}
            >
              <p>5 $</p>
            </button>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="amount" className={styles.description}>
              <p>Add to your balance</p>
              <div className={styles.dupa}>
                <input
                  type="number"
                  id="amount"
                  className={styles.inputAmount}
                  required
                  value={amount}
                  onChange={(e) => setAmount(+e.target.value)}
                />
              </div>
            </label>
            <button className={styles.addFundsBtn}>Add funds</button>
            <div className={styles.powered}>
              <p>powered by</p>
              <Image src={StripeIcon} height={25} alt="Stripe icon" />
            </div>
          </form>
        </div>
        <TransactionHistory history={balance.transactionHistory} />
      </div>
    );
  return <div>Not possible</div>;
};

export default BalanceForm;