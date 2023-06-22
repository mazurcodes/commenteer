import Image from 'next/image';
import styles from './index.module.scss';
import StripeIcon from '@/assets/StripeIcon.svg';
import MinusIcon from '@/assets/HistoryMinusIcon.svg';
import PlusIcon from '@/assets/HistoryPlusIcon.svg';

const BalanceForm = () => {
  //TODO: create CRUD function to retrieve the balance from the database
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperBalance}>
        <h1>Current balance</h1>
        <h2>
          10 <span className={styles.currencySymbol}>$</span>
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
        <form className={styles.form}>
          <label htmlFor="amount" className={styles.description}>
            <p>Add to your balance</p>
            <div className={styles.dupa}>
              <input
                type="number"
                id="amount"
                className={styles.inputAmount}
                required
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
      <div className={styles.historyWrapper}>
        <p className={styles.history}>History</p>
        <div className={styles.historyRow}>
          <Image src={MinusIcon} height={15} alt="Plus icon" />
          <p className={styles.historyAmount}>
            -0.56<span>$</span>
          </p>
          <p className={styles.historyName}>MarcEx Exchange</p>
          <p className={styles.historyDate}>20.06.2023</p>
        </div>
        <div className={styles.historyRow}>
          <Image src={MinusIcon} height={15} alt="Plus icon" />
          <p className={styles.historyAmount}>
            -1<span>$</span>
          </p>
          <p className={styles.historyName}>Dodge Coin</p>
          <p className={styles.historyDate}>20.06.2023</p>
        </div>
        <div className={styles.historyRow}>
          <Image src={PlusIcon} height={15} alt="Plus icon" />
          <p className={styles.historyAmount}>
            10<span>$</span>
          </p>
          <p className={styles.historyName}>Balance Recharge</p>
          <p className={styles.historyDate}>20.06.2023</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceForm;
