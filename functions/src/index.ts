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
