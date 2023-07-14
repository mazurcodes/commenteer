import { db } from '@/firebase/clientApp';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('i');

  if (!uid) return NextResponse.json('Missing parameter', { status: 400 });

  const isAlreadyVerified = await checkIfAlreadyVerified(uid);
  if (!isAlreadyVerified) {
    try {
      await setDoc(doc(db, 'verified_emails', uid), {
        verifiedAt: Date.now(),
      });
    } catch (error) {
      console.log('error with setting verification email doc: ', error);
    }
  }

  return NextResponse.json('email verified', { status: 200 });
}
