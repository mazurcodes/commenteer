import styles from './index.module.scss';
import DeleteAccountIcon from '@/assets/DeleteAccountIcon.svg';
import ThemeIcon from '@/assets/ThemeIcon.svg';
import SettingsIcon from '@/assets/SettingsIcon.svg';
import ArrowIcon from '@/assets/ArrowIcon.svg';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Settings = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.settings}>
      <div
        className={[
          styles.settingsMenu,
          !isOpen ? styles.hidden : undefined,
        ].join(' ')}
      >
        <div className={styles.settingsSection}>
          <div className={styles.sectionLeft}>
            <Image src={ThemeIcon} alt="delete account icon" />
            <p>Theme</p>
          </div>
          <button className={[styles.sectionBtn, styles.themeBtn].join(' ')}>
            Light
          </button>
        </div>
        <div
          className={[styles.settingsSection, styles.deleteSection].join(' ')}
        >
          <div className={styles.sectionLeft}>
            <Image src={DeleteAccountIcon} alt="delete account icon" />
            <p>Delete Account</p>
          </div>
          <Link
            href={'/deleteacc'}
            className={[styles.sectionBtn, styles.deleteLink].join(' ')}
          >
            Delete
          </Link>
        </div>
      </div>
      <button className={styles.settingsBtn} onClick={() => setOpen(!isOpen)}>
        <div className={styles.text}>
          <Image src={SettingsIcon} height={20} width={20} alt="user icon" />
          Settings
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

export default Settings;
