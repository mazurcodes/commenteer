import NavMenuUserSettings from '../NavMenuUserSettings';
import styles from './index.module.scss';

import { useState } from 'react';

const NavMenuUser = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.userMenu}>
      <div className={!isOpen ? styles.hidden : undefined}>
        <NavMenuUserSettings />
      </div>
      <button className={styles.userMenuBtn} onClick={() => setOpen(!isOpen)}>
        This is user menu
      </button>
    </div>
  );
};

export default NavMenuUser;
