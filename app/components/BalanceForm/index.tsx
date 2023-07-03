import Image from 'next/image';
import styles from './index.module.scss';
import StripeIcon from '@/assets/StripeIcon.svg';
import { useBalance } from '@/firebase/crudHooks';
import { auth, db } from '@/firebase/clientApp';
import { FormEvent, useState } from 'react';
import TransactionHistory from './TransactionHistory';
import { TransactionType } from '@/data/constants';
import { modifyBalance } from '@/firebase/crudUtils';
import { TransactionData } from '@/types';
import { onSnapshot, addDoc, collection } from 'firebase/firestore';

const BalanceForm = () => {
  const [balance, loading, error] = useBalance(auth.currentUser?.uid);
  const [amount, setAmount] = useState<number>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    auth.currentUser &&
      modifyBalance(
        auth.currentUser?.uid,
        amount,
        'Balance recharge',
        TransactionType.RECHAGE
      );
  };

  const loadCheckout = async () => {
    if (auth.currentUser) {
      const docRef = await addDoc(
        collection(db, 'customers', auth.currentUser.uid, 'checkout_sessions'),
        {
          mode: 'payment',
          price: 'price_1NPpnqEIhD4GWlLxAauumyR4',
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        }
      );
      onSnapshot(docRef, (snap) => {
        const { error, url } = snap.data() as { error: Error; url: string };
        if (error) {
          alert(`An error occured: ${error.message}`);
        }
        if (url) {
          window.location.assign(url);
        }
      });
    }
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
            <button
              className={styles.addFundsBtn}
              onClick={() => loadCheckout()}
            >
              Add funds
            </button>
            {/* <Link
              href="https://buy.stripe.com/test_7sI9E6fhgc2AgiA144"
              className={styles.addFundsBtn}
            >
              Go to Stripe
            </Link> */}
            <div className={styles.powered}>
              <p>powered by</p>
              <Image src={StripeIcon} height={25} alt="Stripe icon" />
            </div>
          </form>
        </div>
        <TransactionHistory
          history={balance.transactionHistory as TransactionData[]}
        />
      </div>
    );
  return <div>Not possible</div>;
};

export default BalanceForm;
