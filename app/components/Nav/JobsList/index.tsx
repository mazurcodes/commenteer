import Job from './Job';
import styles from './index.module.scss';

const JobsList = () => {
  return (
    <div className={styles.jobsWrapper}>
      <h2>Jobs</h2>
      <div className={styles.jobs}>
        <p className={styles.jobsTimeframe}>Previous 30 days</p>
        <Job id="12" name="Dodge Coin" />
        <Job id="3" name="Martex Exchange" />
        <Job id="43" name="Zen Crypto Wallet" />
        <Job id="435" name="Essence 98" />
        <Job id="54645" name="Supra Coin" />
      </div>
    </div>
  );
};

export default JobsList;
