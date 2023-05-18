import styles from './index.module.scss';

type ProjectFormAmountProps = {
  working: boolean;
};

const ProjectFormGenerate = ({ working }: ProjectFormAmountProps) => {
  return (
    <button tabIndex={9} type="submit" className={styles.button}>
      {working ? 'Working...' : 'Generate Comments'}
    </button>
  );
};

export default ProjectFormGenerate;
