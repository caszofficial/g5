import * as dotenv from "dotenv";

dotenv.config();

// export const firebaseConfig = {
//   type: "service_account",
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.PRIVATE_KEY_ID,
//   private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
//   client_email: "firebase-adminsdk-i37rt@g5-test-7258e.iam.gserviceaccount.com",
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url:
//     "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-i37rt%40g5-test-7258e.iam.gserviceaccount.com",
//   universe_domain: "googleapis.com",
// };

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "g5-test-7258e.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "g5-test-7258e.firebasestorage.app",
  messagingSenderId: "618156886466",
  appId: "1:618156886466:web:81c1e8aa4a237a73ce6e5b",
  measurementId: "G-G5QQ18ZLCE",
};
