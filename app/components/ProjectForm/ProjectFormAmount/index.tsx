import { useState } from 'react';
import styles from './index.module.scss';

const ProjectFormAmount = () => {
  const [amount, setAmount] = useState('');

  return (
    <label htmlFor="amount" className={styles.label}>
      How many comments
      <input
        tabIndex={8}
        required
        type="number"
        placeholder="1000"
        name="amount"
        max={1000}
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        className={styles.input}
      />
    </label>
  );
};

export default ProjectFormAmount;
