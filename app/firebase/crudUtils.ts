import { db } from '@/firebase/clientApp';
import {
  collection,
  // addDoc,
  getDocs,
  // getDoc,
  // updateDoc,
  doc,
  // deleteDoc,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
// import { useDocumentOnce } from 'react-firebase-hooks/firestore';
// import type { FirestoreError } from 'firebase/firestore';
import type { Comment } from '@/types';
import { toast } from 'react-toastify';

// TODO: research how to handle Error messages whithout crashing app

// Firestore collection reference for comments
const commentsCollection = collection(db, 'comments');

export const getAllComments = async (
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
    toast.error(`Error getting comments: ${error}`);
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

// export const useGift = (
//   giftId = ''
// ): [GiftDataType | undefined, boolean, FirestoreError | undefined] => {
//   const [value, loading, error] = useDocumentOnce(
//     doc(commentsCollection, giftId)
//   );
//   const gift = value?.data();
//   return [gift as GiftDataType, loading, error];
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
