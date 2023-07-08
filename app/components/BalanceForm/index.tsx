import Image from 'next/image';
import styles from './index.module.scss';
import StripeIcon from '@/assets/StripeIcon.svg';
import { useBalance } from '@/firebase/crudHooks';
import { auth, db } from '@/firebase/clientApp';
import TransactionHistory from './TransactionHistory';
import { onSnapshot, addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import ButtonSpinner from '@/assets/ButtonSpinner.svg';
import RedirectingScreen from './RedirectingScreen';

// test price: price_1NPpnqEIhD4GWlLxAauumyR4
// live price: price_1NQqUGEIhD4GWlLxBlySFvCn
// live preset 2$ price: price_1NRZxgEIhD4GWlLxlAL2i0hM
// live preset 5$ price: price_1NRZzwEIhD4GWlLxlbsJ8UBG
// live preset 10$ price: price_1NRa0WEIhD4GWlLxok3ZtObp

const BalanceForm = () => {
  const [balance, loadingBalance, errorBalance] = useBalance(
    auth.currentUser?.uid
  );
  const [loadingUI, setLoadingUI] = useState('');

  const loadCheckout = async (priceId: string) => {
    if (auth.currentUser) {
      try {
        setLoadingUI(priceId);
        const docRef = await addDoc(
          collection(
            db,
            'customers',
            auth.currentUser.uid,
            'checkout_sessions'
          ),
          {
            mode: 'payment',
            price: priceId,
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
      } catch (error) {
        console.log('Error connecting to Stripe: ', error);
      }
    }
  };

  if (loadingBalance) {
    return (
      <div className={styles.center}>
        <p>Loading...</p>
      </div>
    );
  }

  if (errorBalance) {
    return (
      <div className={styles.center}>
        <p>Error: {errorBalance.message}</p>
      </div>
    );
  }

  if (loadingUI) return <RedirectingScreen />;

  // Balance buttons as separate component

  if (balance)
    return (
      <div className={styles.wrapper}>
        <div className={styles.wrapperBalance}>
          <h1>Current balance</h1>
          <h2>
            {balance?.amount} <span className={styles.currencySymbol}>$</span>
          </h2>
          <p className={styles.balanceLabel}>Add preset amount:</p>
          <div className={styles.wrapperRow}>
            <button
              className={styles.buttonAmount}
              onClick={() => loadCheckout('price_1NRZxgEIhD4GWlLxlAL2i0hM')}
            >
              {loadingUI === 'price_1NRZxgEIhD4GWlLxlAL2i0hM' ? (
                <Image
                  src={ButtonSpinner}
                  alt="Loading spinner"
                  height={30}
                  width={30}
                />
              ) : (
                <p>2 $</p>
              )}
            </button>
            <button
              className={styles.buttonAmount}
              onClick={() => loadCheckout('price_1NRZzwEIhD4GWlLxlbsJ8UBG')}
            >
              {loadingUI === 'price_1NRZzwEIhD4GWlLxlbsJ8UBG' ? (
                <Image
                  src={ButtonSpinner}
                  alt="Loading spinner"
                  height={23}
                  width={23}
                />
              ) : (
                <p>5 $</p>
              )}
            </button>
            <button
              className={styles.buttonAmount}
              onClick={() => loadCheckout('price_1NRa0WEIhD4GWlLxok3ZtObp')}
            >
              {loadingUI === 'price_1NRa0WEIhD4GWlLxok3ZtObp' ? (
                <Image
                  src={ButtonSpinner}
                  alt="Loading spinner"
                  height={25}
                  width={25}
                />
              ) : (
                <p>10 $</p>
              )}
            </button>
          </div>
          <p className={styles.balanceLabel}>or</p>
          <button
            className={styles.addFundsBtn}
            onClick={() => loadCheckout('price_1NQqUGEIhD4GWlLxBlySFvCn')}
          >
            {loadingUI === 'price_1NQqUGEIhD4GWlLxBlySFvCn' ? (
              <Image
                src={ButtonSpinner}
                alt="Loading spinner"
                height={25}
                width={25}
              />
            ) : (
              <p>Add custom amount</p>
            )}
          </button>
          <div className={styles.powered}>
            <p>powered by</p>
            <Image src={StripeIcon} height={25} alt="Stripe icon" />
          </div>
          <p className={styles.description}>
            For your safety, no payments on this website.
          </p>
          <p className={styles.description}>
            After clicking on the one of the buttons above, you will be
            redirected to the Stripe.com checkout page.
          </p>
          <p className={styles.description}>
            Payment will be automatically processed, amount will be added to
            your balance, and you will be redirected back.
          </p>
        </div>
        <TransactionHistory />
      </div>
    );
  return <div>Not possible</div>;
};

export default BalanceForm;
