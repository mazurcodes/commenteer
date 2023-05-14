import styles from '@/page.module.scss';
import ProjectForm from './components/ProjectForm';

export default function Home() {
  return (
    <main className={styles.main}>
      <ProjectForm />
    </main>
  );
}
