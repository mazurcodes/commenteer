import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const createBalance = onDocumentCreated(
  'customers/{customerId}',
  (event) => {
    const customerId = event.params.customerId;
    const userDoc = db.collection('balance').doc(customerId);
    userDoc.set({
      amount: 0,
      currency: 'USD',
    });
    userDoc.collection('transaction-history').doc().set({
      created: Date.now(),
      type: 'recharge',
      amount: 0,
      name: 'Initial balance',
    });
  }
);

export const addBonusBalance = onDocumentCreated(
  'verified_emails/{customerId}',
  (event) => {
    const customerId = event.params.customerId;
    const userDoc = db.collection('balance').doc(customerId);
    userDoc.update({
      amount: admin.firestore.FieldValue.increment(200),
    });

    userDoc.collection('transaction-history').doc().set({
      created: Date.now(),
      type: 'recharge',
      amount: 200,
      name: 'Email verification bonus',
    });
  }
);

export const addToBalance = onDocumentCreated(
  'customers/{customerId}/payments/{paymentId}',
  (event) => {
    const customerId = event.params.customerId;
    const { amount, status } = event.data?.data() as {
      amount: number;
      status: string;
    };

    if (status === 'succeeded') {
      const userBalanceDoc = db.collection('balance').doc(customerId);

      userBalanceDoc.update({
        amount: admin.firestore.FieldValue.increment(amount),
      });

      userBalanceDoc.collection('transaction-history').doc().set({
        created: Date.now(),
        type: 'recharge',
        amount: amount,
        name: 'Recharge balance',
      });
    }
  }
);
