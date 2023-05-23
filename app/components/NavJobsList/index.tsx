import NavJob from '../NavJob';
import styles from './index.module.scss';

const NavJobsList = () => {
  return (
    <div className={styles.jobsWrapper}>
      <h2>Jobs</h2>
      <div className={styles.jobs}>
        <p className={styles.jobsTimeframe}>Previous 30 days</p>
        <NavJob id="12" name="Dodge Coin" />
        <NavJob id="3" name="Martex Exchange" />
        <NavJob id="43" name="Zen Crypto Wallet" />
        <NavJob id="435" name="Essence 98" />
        <NavJob id="54645" name="Supra Coin" />
      </div>
    </div>
  );
};

export default NavJobsList;
