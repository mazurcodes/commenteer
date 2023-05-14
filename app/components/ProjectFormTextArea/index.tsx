import Image from 'next/image';
import styles from '@/components/ProjectFormTextArea/index.module.scss';
import ArrowIcon from '@/assets/ArrowIcon.svg';
import { useState } from 'react';

const ProjectFormTextArea = () => {
  const [projectDescription, setProjectDescription] = useState('');
  const [isExtended, setExtended] = useState(false);

  return (
    <label htmlFor="description" className={styles.label}>
      <div
        className={styles.extendedLabel}
        onClick={() => setExtended(!isExtended)}
      >
        <p>Description</p>
        <Image
          src={ArrowIcon}
          className={isExtended ? styles.arrowIconDown : ''}
          alt="arrow right icon"
        />
      </div>
      <textarea
        name="description"
        placeholder='like "Dodge Coin Market"'
        onChange={(event) => setProjectDescription(event.target.value)}
        value={projectDescription}
        className={isExtended ? styles.textarea : styles.hidden}
        rows={4}
      />
    </label>
  );
};

export default ProjectFormTextArea;
