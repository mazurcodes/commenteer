'use client';
import { useState } from 'react';
import styles from './index.module.scss';

const NavMenuBalance = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.balance}>
      <div className={isOpen ? styles.recharge : styles.hidden}>
        this is recharge menu
      </div>
      <button className={styles.rechargeBtn} onClick={() => setOpen(!isOpen)}>
        This is balance
      </button>
    </div>
  );
};

export default NavMenuBalance;
