import { auth, db } from '@/firebase/clientApp';
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  writeBatch,
  orderBy,
  limit,
  addDoc,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import type { Balance, Comment, JobData } from '@/types';
import { rngAscDesc } from './rngUtils';
import { CommentType } from '@/data/constants';

// TODO: research how to handle Error messages whithout crashing app

//************************** COMMENTS **************************
const commentsCollection = collection(db, 'comments');

export const getRandomCommentsOfType = async (
  type: CommentType | null,
  amount: number
): Promise<Comment[]> => {
  if (!type) return [];
  if (!amount) return [];

  try {
    const q = query(
      commentsCollection,
      where('type', '==', type),
      orderBy('rngOne', rngAscDesc()),
      orderBy('rngTwo', rngAscDesc()),
      orderBy('rngThree', rngAscDesc()),
      limit(amount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Comment)
    );
  } catch (error) {
    console.error('Error getting comments:', error);
    throw new Error('Failed to get comments');
  }
};

export const getAllCommentsOfType = async (
  type: string | null
): Promise<Comment[]> => {
  if (!type) return [];
  try {
    const q = query(commentsCollection, where('type', '==', type));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Comment)
    );
  } catch (error) {
    console.error('Error getting comments:', error);
    throw new Error('Failed to get comments');
  }
};

export const createMultipleComments = async (data: Comment[]) => {
  const batch = writeBatch(db);

  data.forEach((comment) => {
    const docRef = doc(commentsCollection);
    batch.set(docRef, comment);
  });

  batch.commit();
};

//******************************** JOBS ****************************

const jobsCollection = collection(db, 'jobs');

export const createJob = async (jobData: JobData): Promise<string> => {
  try {
    const docRef = await addDoc(jobsCollection, jobData);
    return docRef.id;
  } catch (error) {
    console.error('Failed to create job:', error);
    throw new Error('Failed to create job');
  }
};

export const getUserJobs = async (
  userId: string | null
): Promise<JobData[]> => {
  if (!userId) return [];
  try {
    const q = query(jobsCollection, where('ownerId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as JobData)
    );
  } catch (error) {
    console.error('Error getting comments:', error);
    throw new Error('Failed to get comments');
  }
};

export const deleteUsersJobs = async (userId: string | undefined) => {
  if (!userId) return;
  const batch = writeBatch(db);
  const jobs = await getUserJobs(userId);

  jobs.forEach((job) => {
    const docRef = doc(jobsCollection, job.id);
    batch.delete(docRef);
  });

  batch.commit();
};

//*************************** Balance *************************** */

export const deductFromBalance = async (job: JobData) => {
  const { cost, name, ownerId } = job;

  try {
    const userBalanceDoc = doc(db, 'balance', ownerId);
    const currentBalance = (await getDoc(userBalanceDoc)).data() as Balance;
    const transactionHistory = collection(
      userBalanceDoc,
      'transaction-history'
    );

    await updateDoc(userBalanceDoc, {
      amount: currentBalance.amount - cost * 100,
    });

    await addDoc(transactionHistory, {
      created: Date.now(),
      type: 'purchase',
      amount: -cost * 100,
      name,
    });
  } catch (error) {
    console.error('Error deducting from balance:', error);
    throw new Error('Failed to deduct from balance');
  }
};

//***************************************** STRIPE ************************************/

export const createCheckoutAndRedirect = async (priceId: string) => {
  if (auth.currentUser) {
    try {
      const docRef = await addDoc(
        collection(db, 'customers', auth.currentUser.uid, 'checkout_sessions'),
        {
          mode: 'payment',
          price: priceId,
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        }
      );
      onSnapshot(docRef, (snap) => {
        const { error, url } = snap.data() as { error: Error; url: string };
        if (error) {
          alert(`An error occured: ${error.message}`);
        }
        if (url) {
          window.location.assign(url);
        }
      });
    } catch (error) {
      console.log('Error connecting to Stripe: ', error);
    }
  }
};
