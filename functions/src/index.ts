import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const createBalance = onDocumentCreated(
  'customers/{customerId}',
  (event) => {
    const customerId = event.params.customerId;
    const userDoc = db.collection('balance').doc(customerId);
    userDoc.set({
      amount: 1,
      currency: 'USD',
    });
    userDoc.collection('transaction-history').doc().set({
      created: Date.now(),
      type: 'recharge',
      amount: 1,
      name: 'Initial balance',
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
        amount: admin.firestore.FieldValue.increment(amount / 100),
      });

      userBalanceDoc
        .collection('transaction-history')
        .doc()
        .set({
          created: Date.now(),
          type: 'recharge',
          amount: amount / 100,
          name: 'Recharge balance',
        });
    }
  }
);
