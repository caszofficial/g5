// firebaseConfig.js
import admin from "firebase-admin";

const firebaseConfig = {
  type: import.meta.env.VITE_FIREBASE_TYPE,
  project_id: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.VITE_FIREBASE_PRIVATE_KEY_ID,
  private_key: import.meta.env.VITE_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: import.meta.env.VITE_FIREBASE_CLIENT_EMAIL,
  client_id: import.meta.env.VITE_FIREBASE_CLIENT_ID,
  auth_uri: import.meta.env.VITE_FIREBASE_AUTH_URI,
  token_uri: import.meta.env.VITE_FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env
    .VITE_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: import.meta.env.VITE_CLIENT_X509_CERT_URL,
  universe_domain: import.meta.env.VITE_UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const db = admin.firestore();

export default db;
