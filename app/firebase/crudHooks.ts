import { JobData } from '@/types';
import {
  FirestoreError,
  collection,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { useCollection, useDocumentOnce } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import { db } from './clientApp';

const jobsCollection = collection(db, 'jobs');

export const useUserJobs = (
  userId = ''
): [JobData[] | undefined, boolean, FirestoreError | undefined] => {
  const [jobs, setJobs] = useState<JobData[]>();
  const q = query(jobsCollection, where('ownerId', '==', userId));
  const [value, loading, error] = useCollection(q);

  useEffect(() => {
    value &&
      setJobs(
        value.docs.map((doc) => {
          return { ...doc.data(), id: doc.id } as JobData;
        })
      );
  }, [value]);
  return [jobs, loading, error];
};

export const useJob = (
  jobId = ''
): [JobData | undefined, boolean, FirestoreError | undefined] => {
  const [job, setJob] = useState<JobData>();
  const docRef = doc(jobsCollection, jobId);
  const [value, loading, error] = useDocumentOnce(docRef);

  useEffect(() => {
    value && setJob(value.data() as JobData);
  }, [value]);
  return [job, loading, error];
};
