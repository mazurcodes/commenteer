'use client';
import AuthFormSignup from '@/components/AuthFormSignup';
import { auth } from '@/firebase/clientApp';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './page.module.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
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
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <h2>Commenteer</h2>
          <div className={styles.description}>
            <p>Create Social Media Engagement with</p>
            <p>AI Generated Comments</p>
          </div>
          <div>
            <AuthFormSignup />
            <p className={styles.link}>
              Already a member?{' '}
              <Link href="/login" className={styles.span}>
                Log In
              </Link>
              .
            </p>
          </div>
          <p className={styles.bonusBalanceInfo}>
            Verify your email and get $5 bonus balance.
          </p>
        </main>
        <aside className={styles.aside} />
      </div>
    );

  return (
    <main className={styles.main}>
      <h3>Hello</h3>
    </main>
  );
};

export default SignupPage;
