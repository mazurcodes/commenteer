import styles from './index.module.scss';
import { useState } from 'react';

const ProjectFormDescription = () => {
  const [projectDescription, setProjectDescription] = useState('');

  return (
    <textarea
      autoFocus
      id="description"
      name="description"
      placeholder='like "This project is about the crypto exchange for the tybetan people"'
      onChange={(event) => setProjectDescription(event.target.value)}
      value={projectDescription}
      className={styles.textarea}
      rows={4}
    />
  );
};

export default ProjectFormDescription;
