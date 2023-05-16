import styles from './index.module.scss';

const ProjectFormGenerate = () => {
  return (
    <button tabIndex={9} type="submit" className={styles.button}>
      Generate Comments
    </button>
  );
};

export default ProjectFormGenerate;
