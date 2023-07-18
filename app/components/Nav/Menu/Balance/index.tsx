'use client';
import styles from './index.module.scss';
import Image from 'next/image';
import BalanceIcon from '@/assets/BalanceIcon.svg';
import Link from 'next/link';
import { useBalance } from '@/firebase/crudHooks';
import { auth } from '@/firebase/clientApp';

const MenuBalance = () => {
  const [balance, loading] = useBalance(auth.currentUser?.uid);
  return (
    <div className={styles.balance}>
      <Link className={styles.balanceBtn} href="/balance">
        <div className={styles.buttonSideLeft}>
          <Image src={BalanceIcon} height={20} width={20} alt="user icon" />
          <p>Balance</p>
        </div>
        <div className={styles.buttonSideRight}>
          {loading && <p>loading</p>}
          {!loading && balance && <p>{balance?.amount}$</p>}
        </div>
      </Link>
    </div>
  );
};

export default MenuBalance;
