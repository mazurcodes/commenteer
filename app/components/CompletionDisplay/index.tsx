import { useEffect, useState } from 'react';
import styles from './index.module.scss';

type CompletionDisplayProps = {
  completionData: string | undefined;
};

const CompletionDisplay = ({ completionData }: CompletionDisplayProps) => {
  const [completion, setCompletion] = useState<string>();

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
        />
      </label>
    </div>
  );
};

export default CompletionDisplay;
