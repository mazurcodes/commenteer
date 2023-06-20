import styles from './index.module.scss';

const BalanceForm = () => {
  //TODO: create CRUD function to retrieve the balance from the database
  return (
    <div className={styles.wrapper}>
      <h1>Current balance</h1>
      <h2>10$</h2>
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
      <label htmlFor="amount">
        <p>Add to your balance</p>
        <input type="number" id="amount" className={styles.inputAmount} />
        <span>$</span>
      </label>
    </div>
  );
};

export default BalanceForm;
