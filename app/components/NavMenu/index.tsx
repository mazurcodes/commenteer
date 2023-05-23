import NavMenuBalance from '../NavMenuBalance';
import NavMenuUser from '../NavMenuUser';
import styles from './index.module.scss';

const NavMenu = () => {
  return (
    <div role="menu" className={styles.menu}>
      <NavMenuBalance />
      <NavMenuUser />
    </div>
  );
};

export default NavMenu;
