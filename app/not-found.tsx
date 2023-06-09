import styles from '@/not-found.module.scss';

const Page404 = () => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <h1 className={styles.logo}>Gifter</h1>
        <h2 className={styles.title}>404</h2>
        <a href={'/'} className={styles.link}>
          Main Page
        </a>
      </main>
    </div>
  );
};

export default Page404;
