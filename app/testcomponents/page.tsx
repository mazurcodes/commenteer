'use client';
import CompletionDisplay from '@/components/CompletionDisplay';
import styles from '@/page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <CompletionDisplay completionData="" />
    </main>
  );
}
