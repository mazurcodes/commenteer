'use client';
import CommentInput from '@/components/CommentInput';
import styles from '@/page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <CommentInput />
    </main>
  );
}
