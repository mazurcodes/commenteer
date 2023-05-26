'use client';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AuthFormDelete from '@/components/AuthFormDelete';

const DeleteAccountPage = () => {
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    !user && !loadingAuth && !errorAuth && router.replace('/');
  }, [user, router, loadingAuth, errorAuth]);

  if (loadingAuth) {
    return (
      <main className={styles.mainWrapper}>
        <p>Checking user...</p>
      </main>
    );
  }

  if (errorAuth) {
    return (
      <main className={styles.mainWrapper}>
        <p>
          There was some error:{' '}
          <span className="text-red-600">{errorAuth.message}</span>
        </p>
      </main>
    );
  }

  if (user)
    return (
      <main className={styles.mainWrapper}>
        <AuthFormDelete />
      </main>
    );

  return (
    <main className={styles.mainWrapper}>
      <h3>Hello</h3>
    </main>
  );
};

export default DeleteAccountPage;
