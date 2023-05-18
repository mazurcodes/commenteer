import { useState } from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import CopyIcon from '@/assets/CopyIcon.svg';
import {
  commentsArrayToObjects,
  extractCommentsToArray,
} from '@/utils/textUtils';

const CommentInput = () => {
  const [completion, setCompletion] = useState<string>();

  const handleSend = () => {
    const commentsArray = completion ? extractCommentsToArray(completion) : [];
    const commentObjects = commentsArrayToObjects(commentsArray, 'positive');
    console.log(commentObjects);
  };

  return (
    <div className={styles.completionWrapper}>
      {' '}
      <button className={styles.copyBtn} onClick={handleSend}>
        <Image src={CopyIcon} alt="copy icon" className={styles.copyBtnIcon} />
        Send to database
      </button>
      <label htmlFor="completion" className={styles.label}>
        <p>Comments</p>

        <textarea
          name="completion"
          value={completion}
          onChange={(event) => setCompletion(event.target.value)}
          className={styles.textarea}
          rows={30}
        />
      </label>
    </div>
  );
};

export default CommentInput;
