'use client';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useDeleteCurrentUser } from '@/firebase/authUtils';
import { extractFirebaseErrorMessage } from '@/firebase/errorUtils';
import { useRouter } from 'next/navigation';

const AuthFormDelete = () => {
  const [password, setPassword] = useState('');
  const [deleteUser, isDeleted, working, error] = useDeleteCurrentUser();
  const router = useRouter();

  const handleDelete = async () => {
    deleteUser(password);
  };

  const handleCancel = () => {
    !working && router.push('/');
  };

  useEffect(() => {
    isDeleted && router.replace('/');
  });

  return (
    <form role="form" className={styles.form}>
      <h1>We are sorry to see you go :( </h1>
      <p className={styles.advice}>
        Be advised, account deletion is final. There will be no way to restore
        your account.
      </p>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="login-password">
          <p>Confirm your password:</p>
          <input
            autoComplete="off"
            tabIndex={1}
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
            <span className={styles.error}>
              Error: {extractFirebaseErrorMessage(error.message)}
            </span>
          )}
        </label>
        <div className={styles.buttonWrapper}>
          <input
            className={[styles.submitBtn, styles.cancelBtn].join(' ')}
            tabIndex={2}
            type="button"
            value={'Nevermind'}
            onClick={() => handleCancel()}
          />
          <input
            className={[styles.submitBtn, styles.deleteBtn].join(' ')}
            tabIndex={3}
            type="button"
            value={working ? 'Working' : 'Delete'}
            onClick={() => handleDelete()}
          />
        </div>
      </div>
    </form>
  );
};

export default AuthFormDelete;
