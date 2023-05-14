import styles from '@/components/MenuBar/MenuBar.module.scss';
import Image from 'next/image';
import MenuIcon from '@/assets/MenuIcon.svg';
import { useState } from 'react';

const TopBar = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={styles.menuWrapper}>
      <button className={styles.menuBarBtn} onClick={() => setOpen(!isOpen)}>
        <Image
          src={MenuIcon}
          className={styles.menu}
          alt="menu icon three lines"
          width={18}
          height={15}
        />
      </button>
      <h1 className={styles.menuBarLogo}>Commenteer</h1>
    </div>
  );
};

export default TopBar;
