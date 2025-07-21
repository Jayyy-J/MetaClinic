// Firebase Admin SDK configuration
const admin = require('firebase-admin');

// IMPORTANT: Replace with your own service account key
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };
