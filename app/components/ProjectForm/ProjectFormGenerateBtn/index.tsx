import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

type ProjectFormAmountProps = {
  working: boolean;
  jobId?: string;
};

const ProjectFormGenerate = ({ working, jobId }: ProjectFormAmountProps) => {
  const router = useRouter();

  if (jobId)
    return (
      <button
        tabIndex={9}
        type="button"
        className={styles.button}
        onClick={() => router.push(`/j/${jobId}`)}
      >
        See Results
      </button>
    );

  return (
    <button tabIndex={9} type="submit" className={styles.button}>
      {working ? 'Working...' : 'Generate Comments'}
    </button>
  );
};

export default ProjectFormGenerate;
