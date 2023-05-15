import { useState } from 'react';
import styles from './index.module.scss';

const ProjectFormName = () => {
  const [projectName, setProjectName] = useState('');

  return (
    <label htmlFor="name" className={styles.label}>
      Project name
      <input
        tabIndex={1}
        required
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

export default ProjectFormName;
