import Image from 'next/image';
import styles from './index.module.scss';
import ButtonSpinner from '@/assets/ButtonSpinner.svg';

const RedirectingScreen = () => {
  return (
    <div className={styles.redirectingWrapper}>
      <h1>Redirecting to Stripe</h1>
      <p>Please wait...</p>
      <Image
        src={ButtonSpinner}
        height={50}
        width={50}
        alt="Redirecting Spinner"
      />
    </div>
  );
};

export default RedirectingScreen;
