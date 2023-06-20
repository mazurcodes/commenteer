import styles from './index.module.scss';
import Image from 'next/image';
import BalanceIcon from '@/assets/BalanceIcon.svg';
import Link from 'next/link';

const MenuBalance = () => {
  return (
    <div className={styles.balance}>
      <Link className={styles.balanceBtn} href="/balance">
        <div className={styles.buttonSideLeft}>
          <Image src={BalanceIcon} height={20} width={20} alt="user icon" />
          <p>Balance</p>
        </div>
        <div className={styles.buttonSideRight}>
          <p>10$</p>
        </div>
      </Link>
    </div>
  );
};

export default MenuBalance;
