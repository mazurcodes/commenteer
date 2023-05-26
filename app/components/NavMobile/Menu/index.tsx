import NavMenuBalance from './Balance';
import MenuUser from './User';
import styles from './index.module.scss';

const Menu = () => {
  return (
    <div role="menu" className={styles.menu}>
      <NavMenuBalance />
      <MenuUser />
    </div>
  );
};

export default Menu;
