import { db } from '@/firebase/clientApp';
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
  setDoc,
} from 'firebase/firestore';
import type { Comment, CommentType, JobData } from '@/types';
import { rngAscDesc } from './rngUtils';

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

// ****************************** BALANCE ****************************

// const balanceCollection = collection(db, 'balance');

export const createBalance = async (
  userId: string,
  initialBalance = 0
): Promise<void> => {
  if (!userId) return;
  try {
    const balanceObj = {
      ownerId: userId,
      currency: 'USD',
      amount: initialBalance,
      transactionHistory: [],
    };
    await setDoc(doc(db, 'balance', userId), balanceObj);
  } catch (error) {
    console.error('Failed to create balance:', error);
    throw new Error('Failed to create balance');
  }
};

// export const createComment = async (comment: Comment): Promise<string> => {
//   try {
//     const docRef = await addDoc(commentsCollection, comment);
//     toast.success('Comment created successfully!');
//     return docRef.id;
//   } catch (error) {
//     toast.error(`Failed to create comment: ${error}`);
//     console.error('Failed to create comment:', error);
//     throw new Error('Failed to create comment');
//   }
// };

// export const getGift = async (commentId: string): Promise<Comment | null> => {
//   try {
//     const docSnap = await getDoc(doc(commentsCollection, commentId));
//     if (docSnap.exists()) {
//       return docSnap.data() as Comment;
//     } else return null;
//   } catch (error) {
//     toast.error(`Error getting comment: ${error}`);
//     console.error('Error getting comment', error);
//     throw new Error('Failed to get comment');
//   }
// };

// export const updateGift = async (
//   giftId: string,
//   giftData: Partial<GiftDataType>
// ): Promise<string> => {
//   try {
//     await updateDoc(doc(commentsCollection, giftId), giftData);
//     toast.success('Gift updated successfully!');
//     return giftId;
//   } catch (error) {
//     console.error('Error updating gift:', error);
//     toast.error(`Error updating gift: ${error}`);
//     throw new Error('Failed to update gift');
//   }
// };

// export const deleteGift = async (giftId: string): Promise<string> => {
//   try {
//     await deleteDoc(doc(commentsCollection, giftId));
//     toast.success('Gift deleted successfully!');
//     return giftId;
//   } catch (error) {
//     console.error('Error deleting gift:', error);
//     toast.error(`Error deleting gift: ${error}`);
//     throw new Error('Failed to delete gift');
//   }
// };

// export const deleteUsersGifts = async (ownerEmail: string) => {
//   const batch = writeBatch(db);
//   const gifts = await getAllGifts(ownerEmail);

//   gifts.forEach((gift) => {
//     const docRef = doc(commentsCollection, gift.uid);
//     batch.delete(docRef);
//   });

//   batch.commit();
// };

// export const changeGiftsOwnerEmail = async (
//   ownerEmail: string,
//   newOwnerEmail: string
// ) => {
//   const batch = writeBatch(db);
//   const gifts = await getAllGifts(ownerEmail);

//   gifts.forEach((gift) => {
//     const docRef = doc(commentsCollection, gift.uid);
//     batch.update(docRef, { ownerEmail: newOwnerEmail });
//   });

//   batch.commit();
// };
