import JobsList from './JobsList';
import Menu from './Menu';
import styles from './index.module.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <JobsList />
      <Menu />
    </nav>
  );
};

export default Nav;
