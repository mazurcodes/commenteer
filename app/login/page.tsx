'use client';
import AuthFormLogin from '@/components/AuthFormLogin';
import { auth } from '@/firebase/clientApp';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage = () => {
  const [user, loadingAuth, errorAuth] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    user && router.replace('/');
  }, [user, router]);

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

  if (!user)
    return (
      <main className={styles.mainWrapper}>
        <AuthFormLogin />
        <Link href="/signup" className={styles.link}>
          Not a member? <span className={styles.span}>Sign up</span>.
        </Link>
      </main>
    );

  return (
    <main className={styles.mainWrapper}>
      <h3>Hello</h3>
    </main>
  );
};

export default LoginPage;
