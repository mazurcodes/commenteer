import { auth } from '@/firebase/clientApp';
import styles from './index.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import UserIcon from '@/assets/UserIcon.svg';
import ArrowIcon from '@/assets/ArrowIcon.svg';
import UserMenu from './Menu';
import { shortEmailAddress } from '@/utils/emailUtils';

const MenuUser = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.userMenu}>
      <div className={!isOpen ? styles.hidden : undefined}>
        <UserMenu />
      </div>
      <button className={styles.userMenuBtn} onClick={() => setOpen(!isOpen)}>
        <div className={styles.email}>
          <Image src={UserIcon} height={20} width={20} alt="user icon" />
          {shortEmailAddress(auth.currentUser?.email || '', 28)}
        </div>
        <Image
          src={ArrowIcon}
          height={15}
          width={15}
          alt="menu arrow icon"
          className={isOpen ? styles.arrowOpen : undefined}
        />
      </button>
    </div>
  );
};

export default MenuUser;
