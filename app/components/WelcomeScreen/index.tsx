import Link from 'next/link';
import styles from './index.module.scss';

const WelcomeScreen = () => {
  return (
    <div className={styles.welcomeWrapper}>
      <h1>Commenteer</h1>
      <div className={styles.description}>
        <p>Create Social Media Engagement with</p>
        <p>AI Generated Comments</p>
      </div>
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
