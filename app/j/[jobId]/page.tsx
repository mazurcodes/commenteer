'use client';
import { useJob } from '@/firebase/crudHooks';

type JobPageProps = {
  params: {
    jobId: string;
  };
};

const JobPage = ({ params }: JobPageProps) => {
  const [job, loading, error] = useJob(params.jobId);
  if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error.message}</p>;
  return <div>hello {job?.name}</div>;
};

export default JobPage;
