import styles from './index.module.scss';
import Image from 'next/image';
import CopyIcon from '@/assets/CopyIcon.svg';

type CompletionDisplayProps = {
  comments: string | undefined;
};

const CommentsDisplay = ({ comments }: CompletionDisplayProps) => {
  const handleCopyAll = () => {
    comments && navigator.clipboard.writeText(comments);
  };
  return (
    <div className={styles.completionWrapper}>
      <label htmlFor="completion" className={styles.label}>
        <p>Comments</p>
        <textarea
          disabled
          name="completion"
          value={comments}
          className={styles.textarea}
          rows={50}
        />
        <button className={styles.copyBtn} onClick={handleCopyAll}>
          <Image
            src={CopyIcon}
            alt="copy icon"
            className={styles.copyBtnIcon}
          />
          Copy All
        </button>
      </label>
    </div>
  );
};

export default CommentsDisplay;
