import Link from 'next/link';
import styles from './index.module.scss';

const WelcomeScreen = () => {
  return (
    <div className={styles.welcomeWrapper}>
      <h1>Welcome</h1>
      <div className={styles.btnWrapper}>
        <Link href="/login" className={styles.welcomeBtn}>
          Login
        </Link>
        <Link href="/signup" className={styles.welcomeBtn}>
          Signup
        </Link>
      </div>
    </div>
  );
};

export default WelcomeScreen;
