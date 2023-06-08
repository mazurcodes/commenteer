'use client';
import { auth } from '@/firebase/clientApp';
import { extractFirebaseErrorMessage } from '@/firebase/errorUtils';
import { useEffect, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import styles from './index.module.scss';
import { useRouter } from 'next/navigation';

const actionCodeSettings = {
  url: 'http://localhost:3000/login',
};

const AuthFormReset = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    sendPasswordResetEmail(email, actionCodeSettings);
    setEmailSent(true);
  };

  useEffect(() => {
    emailSent && !sending && !error && router.replace('/login');
  }, [emailSent, sending, error, router]);

  return (
    <form role="form" className={styles.form} onSubmit={handleSubmit}>
      <h1>Reset password</h1>
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
        {error && (
          <span className="text-red-600">
            Error: {extractFirebaseErrorMessage(error.message)}
          </span>
        )}
        <input
          className={styles.submitBtn}
          tabIndex={3}
          type="submit"
          value={sending ? 'Sending email' : 'Reset'}
        />
      </div>
    </form>
  );
};

export default AuthFormReset;
