'use client';
import { useState } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import ArrowIcon from '@/assets/ArrowIcon.svg';
import BalanceIcon from '@/assets/BalanceIcon.svg';

const NavMenuBalance = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.balance}>
      <div className={isOpen ? styles.recharge : styles.hidden}>
        this is recharge menu
      </div>
      <button className={styles.balanceBtn} onClick={() => setOpen(!isOpen)}>
        <div className={styles.buttonLeft}>
          <Image src={BalanceIcon} height={20} width={20} alt="user icon" />
          <p>Balance</p>
        </div>
        <div className={styles.buttonRight}>
          <p>10$</p>
        </div>
      </button>
    </div>
  );
};

export default NavMenuBalance;
