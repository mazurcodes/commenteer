'use client';
import { auth } from '@/firebase/clientApp';
import { extractFirebaseErrorMessage } from '@/firebase/errorUtils';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import styles from './index.module.scss';
import { sendEmailVerification } from 'firebase/auth';

const AuthFormSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorUI, setErrorUI] = useState('');

  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (password === passwordConfirm) {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );
      const actionCodeSettings = {
        url: `localhost:3000/api/verify-email?e=${userCredential?.user.uid}`,
      };
      userCredential &&
        sendEmailVerification(userCredential.user, actionCodeSettings);
    } else {
      setErrorUI("Passwords doesn't match");
    }
  };

  return (
    <form role="form" className={styles.form} onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor="register-email">
          <p>Email:</p>
          <input
            className={styles.input}
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            tabIndex={1}
            required
            type="email"
            name="register-email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={styles.label} htmlFor="register-password">
          <p>Password:</p>
          <input
            autoComplete="new-password"
            className={styles.input}
            tabIndex={2}
            required
            type="password"
            name="register-password"
            id="register-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <label className={styles.label} htmlFor="register-confirm-password">
          <p>Confirm password:</p>
          <input
            autoComplete="new-password"
            className={styles.input}
            tabIndex={3}
            required
            type="password"
            name="register-confirm-password"
            id="register-confirm-password"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <p className={styles.inputDescription}>Minimum 6 characters.</p>
          {errorUI && <span className={styles.error}>{errorUI}</span>}
          {error && (
            <span className={styles.error}>
              Error: {extractFirebaseErrorMessage(error.message)}
            </span>
          )}
        </label>
        <input
          className={styles.submitBtn}
          tabIndex={4}
          type="submit"
          value={loading ? 'Signing...' : 'Sign up'}
        />
      </div>
    </form>
  );
};

export default AuthFormSignup;
