import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

type ProjectFormAmountProps = {
  working: boolean;
  jobId?: string;
  disabled: boolean;
};

const ProjectFormGenerate = ({
  working,
  jobId,
  disabled,
}: ProjectFormAmountProps) => {
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

  if (disabled)
    return (
      <button tabIndex={9} type="submit" className={styles.button} disabled>
        Not enough balance
      </button>
    );

  return (
    <button tabIndex={9} type="submit" className={styles.button}>
      {working ? 'Working...' : 'Generate Comments'}
    </button>
  );
};

export default ProjectFormGenerate;
