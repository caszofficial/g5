// firebaseConfig.js
import admin from "firebase-admin";
import serviceAccount, { firebaseConfig } from "./serviceAccountKey" assert { type: "json" };

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

export default db;
