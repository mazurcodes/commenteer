'use client';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './page.module.scss';
import Nav from '@/components/Nav';
import TopBar from '@/components/TopBar';
import JobDisplay from '@/components/JobDisplay';
import WelcomeScreen from '@/components/WelcomeScreen';

const JobPage = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <main className={styles.center}>
        <p>Checking user...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.center}>
        <p>
          There was some error:{' '}
          <span className="text-red-600">{error.message}</span>
        </p>
      </main>
    );
  }

  if (user)
    return (
      <div className={styles.wrapper}>
        <Nav />
        <div className={styles.mainWrapper}>
          <TopBar />
          <main className={styles.main}>
            <JobDisplay />
          </main>
        </div>
      </div>
    );

  return (
    <main className={styles.center}>
      <WelcomeScreen />
    </main>
  );
};

export default JobPage;
