import { useState } from 'react';
import styles from '@/components/ProjectFormInput/index.module.scss';

const ProjectFormInput = () => {
  const [projectName, setProjectName] = useState('');

  return (
    <label htmlFor="name" className={styles.label}>
      Project name
      <input
        type="text"
        placeholder='like "Dodge Coin Market"'
        name="name"
        value={projectName}
        onChange={(event) => setProjectName(event.target.value)}
        className={styles.input}
      />
    </label>
  );
};

export default ProjectFormInput;
