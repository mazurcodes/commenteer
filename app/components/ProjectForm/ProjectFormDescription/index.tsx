import styles from './index.module.scss';
import { useState } from 'react';

const ProjectFormDescription = () => {
  const [projectDescription, setProjectDescription] = useState('');

  return (
    <textarea
      autoFocus
      name="description"
      placeholder='like "Dodge Coin Market"'
      onChange={(event) => setProjectDescription(event.target.value)}
      value={projectDescription}
      className={styles.textarea}
      rows={4}
    />
  );
};

export default ProjectFormDescription;
