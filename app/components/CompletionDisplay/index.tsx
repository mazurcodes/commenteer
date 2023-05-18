import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import CopyIcon from '@/assets/CopyIcon.svg';

type CompletionDisplayProps = {
  completionData: string | undefined;
};

const CompletionDisplay = ({ completionData }: CompletionDisplayProps) => {
  const [completion, setCompletion] = useState<string>();

  const handleCopyAll = () => {
    completion && navigator.clipboard.writeText(completion);
  };

  useEffect(() => {
    completionData && setCompletion(completionData);
  }, [completionData]);

  return (
    <div className={styles.completionWrapper}>
      <label htmlFor="completion" className={styles.label}>
        <p>Comments</p>
        <textarea
          name="completion"
          value={completion}
          onChange={(event) => setCompletion(event.target.value)}
          className={styles.textarea}
          rows={30}
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

export default CompletionDisplay;
