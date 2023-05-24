import Image from 'next/image';
import styles from './index.module.scss';
import LogOutIcon from '@/assets/LogOutIcon.svg';
import ClearJobsIcon from '@/assets/ClearJobsIcon.svg';
import HelpIcon from '@/assets/HelpIcon.svg';
import { auth } from '@/firebase/clientApp';
import Settings from './Settings';

const UserMenu = () => {
  return (
    <div className={styles.menu}>
      <button className={styles.button} onClick={() => alert('clearing jobs')}>
        <Image
          src={HelpIcon}
          height={20}
          width={20}
          alt="user icon"
          className={styles.image}
        />
        Help & FAQ
      </button>
      <SectionDivider />
      <button className={styles.button} onClick={() => alert('clearing jobs')}>
        <Image
          src={ClearJobsIcon}
          height={20}
          width={20}
          alt="user icon"
          className={styles.image}
        />
        Clear jobs
      </button>
      <Settings />
      <SectionDivider />
      <button className={styles.button} onClick={() => auth.signOut()}>
        <Image
          src={LogOutIcon}
          height={20}
          width={20}
          alt="user icon"
          className={styles.image}
        />
        Log out
      </button>
    </div>
  );
};

export default UserMenu;

function SectionDivider() {
  return <div className={styles.sectionDivider}></div>;
}
