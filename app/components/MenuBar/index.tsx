import styles from '@/components/MenuBar/MenuBar.module.scss';
const MenuBar = () => {
  return (
    <div className={styles.menuWrapper}>
      <ul className={styles['menu-list']}>
        <li className="menu-item">Jobs</li>
        <li className="menu-item">Account</li>
      </ul>
    </div>
  );
};

export default MenuBar;
