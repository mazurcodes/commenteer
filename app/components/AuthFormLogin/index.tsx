'use client';
import { auth } from '@/firebase/clientApp';
import { extractFirebaseErrorMessage } from '@/firebase/errorUtils';
import Link from 'next/link';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import styles from './index.module.scss';

const AuthFormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  return (
    <form role="form" className={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="login-email">
          <p>Email:</p>
          <input
            autoCorrect="off"
            autoCapitalize="off"
            tabIndex={1}
            required
            type="email"
            name="login-email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={styles.label} htmlFor="login-password">
          <p>Password:</p>
          <input
            tabIndex={2}
            required
            type="password"
            name="login-password"
            id="login-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {error && (
            <span className="text-red-600">
              Error: {extractFirebaseErrorMessage(error.message)}
            </span>
          )}
        </label>
        <div className={styles.link}>
          <Link href="/login/reset" className="p-1 mb-4 text-slate-500">
            Forgot password?
          </Link>
        </div>
        <input
          className={styles.submitBtn}
          tabIndex={3}
          type="submit"
          value={loading ? 'Loading' : 'Login'}
        />
      </div>
    </form>
  );
};

export default AuthFormLogin;
