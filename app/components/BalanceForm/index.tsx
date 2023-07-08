import Image from 'next/image';
import styles from './index.module.scss';
import StripeIcon from '@/assets/StripeIcon.svg';
import { useBalance } from '@/firebase/crudHooks';
import { auth } from '@/firebase/clientApp';
import TransactionHistory from './TransactionHistory';
import { useState } from 'react';
import RedirectingScreen from './RedirectingScreen';
import { StripePrices } from '@/data/constants';
import FlowDescription from './FlowDescription';
import { createCheckoutAndRedirect } from '@/firebase/crudUtils';

// test custom price: price_1NPpnqEIhD4GWlLxAauumyR4

const BalanceForm = () => {
  const [balance, loadingBalance, errorBalance] = useBalance(
    auth.currentUser?.uid
  );
  const [loadingUI, setLoadingUI] = useState('');

  const loadCheckout = async (priceId: string) => {
    setLoadingUI(priceId);
    createCheckoutAndRedirect(priceId);
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
              onClick={() => loadCheckout(StripePrices.TWO_DOLARS)}
            >
              <p>2 $</p>
            </button>
            <button
              className={styles.buttonAmount}
              onClick={() => loadCheckout(StripePrices.FIVE_DOLARS)}
            >
              <p>5 $</p>
            </button>
            <button
              className={styles.buttonAmount}
              onClick={() => loadCheckout(StripePrices.TEN_DOLARS)}
            >
              <p>10 $</p>
            </button>
          </div>
          <p className={styles.balanceLabel}>or</p>
          <button
            className={styles.addFundsBtn}
            onClick={() => loadCheckout(StripePrices.CUSTOM)}
          >
            <p>Add custom amount</p>
          </button>
          <div className={styles.powered}>
            <p>powered by</p>
            <Image src={StripeIcon} height={25} alt="Stripe icon" />
          </div>
          <FlowDescription />
        </div>
        <TransactionHistory />
      </div>
    );
  return <div>Not possible</div>;
};

export default BalanceForm;
