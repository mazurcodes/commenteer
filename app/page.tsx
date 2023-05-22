'use client';
import styles from '@/page.module.scss';
import ProjectForm from './components/ProjectForm';
import { auth } from './firebase/clientApp';
import WelcomeScreen from './components/WelcomeScreen';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
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
      <main className={styles.main}>
        <ProjectForm />
      </main>
    );

  return (
    <main className={styles.center}>
      <WelcomeScreen />
    </main>
  );
}
