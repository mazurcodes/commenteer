import JobsList from './JobsList';
import Menu from './Menu';
import styles from './NavMobile.module.scss';

const NavMobile = () => {
  return (
    <nav className={styles.nav}>
      <JobsList />
      <Menu />
    </nav>
  );
};

export default NavMobile;
