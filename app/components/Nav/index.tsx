import NavJobsList from '../NavJobsList';
import styles from './index.module.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <NavJobsList />
      {/* <NavMenu /> */}
    </nav>
  );
};

export default Nav;
