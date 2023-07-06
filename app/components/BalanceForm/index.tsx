import Image from 'next/image';
import styles from './index.module.scss';
import StripeIcon from '@/assets/StripeIcon.svg';
import { useBalance } from '@/firebase/crudHooks';
import { auth, db } from '@/firebase/clientApp';
import TransactionHistory from './TransactionHistory';
import { onSnapshot, addDoc, collection } from 'firebase/firestore';

// test price: price_1NPpnqEIhD4GWlLxAauumyR4
// live price: price_1NQqUGEIhD4GWlLxBlySFvCn

const BalanceForm = () => {
  const [balance, loading, error] = useBalance(auth.currentUser?.uid);

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
            <button className={styles.buttonAmount}>
              <p>1 $</p>
            </button>
            <button className={styles.buttonAmount}>
              <p>2 $</p>
            </button>
            <button className={styles.buttonAmount}>
              <p>5 $</p>
            </button>
          </div>
          <button className={styles.addFundsBtn} onClick={() => loadCheckout()}>
            Add funds
          </button>
          <div className={styles.powered}>
            <p>powered by</p>
            <Image src={StripeIcon} height={25} alt="Stripe icon" />
          </div>
        </div>
        <TransactionHistory />
      </div>
    );
  return <div>Not possible</div>;
};

export default BalanceForm;
