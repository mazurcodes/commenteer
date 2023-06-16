import { useJob } from '@/firebase/crudHooks';
import { useParams } from 'next/navigation';
import CommentsDisplay from './CommentsDisplay';

const JobDisplay = () => {
  const params = useParams();
  const [job, loading, error] = useJob(params.jobId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <div>hello {job?.name}</div>
      <CommentsDisplay comments={job?.comments} />
    </div>
  );
};

export default JobDisplay;
