import { useJob } from '@/firebase/crudHooks';
import { useParams } from 'next/navigation';
import CommentsDisplay from './CommentsDisplay';
import FieldDisplay from './FieldDisplay';
import JobSettings from './JobSettings';
import styles from './index.module.scss';

const JobDisplay = () => {
  const params = useParams();
  const [job, loading, error] = useJob(params.jobId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={styles.wrapper}>
      <div>
        <FieldDisplay description="Project name:" content={job?.name} />
        {job?.description && (
          <FieldDisplay description="Description:" content={job?.description} />
        )}
        <FieldDisplay description="Settings:">
          <JobSettings settings={job?.settings} />
        </FieldDisplay>
      </div>
      <CommentsDisplay comments={job?.comments} />
    </div>
  );
};

export default JobDisplay;
