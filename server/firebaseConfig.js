// firebaseConfig.js
import admin from "firebase-admin";
import { firebaseConfig } from "./serviceAccountKey.js";

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

export default db;
