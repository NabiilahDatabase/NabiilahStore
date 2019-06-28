import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const getPost = functions.https.onCall(async (req, res) => {
    const docs = await admin.firestore().collection('produk').limit(10).get();
    return docs.docs.map(doc => doc.data());
});


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
