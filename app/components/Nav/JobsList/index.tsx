'use client';
import { useUserJobs } from '@/firebase/crudHooks';
import Job from './Job';
import styles from './index.module.scss';
import { auth } from '@/firebase/clientApp';

const JobsList = () => {
  const [jobs, loading, error] = useUserJobs(auth.currentUser?.uid);
  return (
    <div className={styles.jobsWrapper}>
      <h2>Jobs</h2>
      <div className={styles.jobs}>
        <p className={styles.jobsTimeframe}>Previous 30 days</p>
        {loading && 'Loading...'}
        {error && error.message}
        {jobs?.map((job) => (
          <Job key={job.id} id={job.id} name={job.name} />
        ))}
      </div>
    </div>
  );
};

export default JobsList;
