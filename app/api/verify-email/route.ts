import { auth, db } from '@/firebase/clientApp';
import { FirebaseError } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { NextResponse } from 'next/server';

async function checkIfAlreadyVerified(uid: string) {
  try {
    const verifiedUserRef = doc(db, 'verified_emails', uid);
    const verifiedDoc = await getDoc(verifiedUserRef);
    if (verifiedDoc.exists()) return true;
    return false;
  } catch (error) {
    console.error(error);
    return true;
  }
}

async function addBonusBalance(uid: string) {
  try {
    const balanceRef = doc(db, 'balance', uid);
    const balanceDoc = await getDoc(balanceRef);
    if (balanceDoc.exists()) {
      updateDoc(balanceRef, { amount: balanceDoc.data().amount + 200 });
      addDoc(collection(balanceRef, 'transaction-history'), {
        created: Date.now(),
        type: 'recharge',
        amount: 200,
        name: 'Email verification bonus',
      });
    }
  } catch (error) {
    console.log((error as FirebaseError).message);
    return new Error(`There was an error: ${(error as FirebaseError).message}`);
  }
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('i');

  if (!uid) return NextResponse.json('Missing parameter', { status: 400 });
  if (auth.currentUser?.uid !== uid) {
    console.log('auth uid: ', auth.currentUser?.uid);
    console.log('provided uid: ', uid);
    return NextResponse.json('You have no permission to verify this email', {
      status: 403,
    });
  }
  if (!auth.currentUser?.emailVerified)
    return NextResponse.json('User email not verified', { status: 400 });

  const isAlreadyVerified = await checkIfAlreadyVerified(uid);
  if (!isAlreadyVerified) {
    try {
      await setDoc(doc(db, 'verified_emails', uid), {
        verifiedAt: Date.now(),
      });
      await addBonusBalance(uid);
    } catch (error) {
      console.log('error with setting verification email doc: ', error);
    }
  }

  return NextResponse.json('email verified', { status: 200 });
}
