import {
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  FIREBASE_CLIENT_ID,
  FIREBASE_PROJECT_ID,
} from "./envVar";

export const firebaseConfig = {
  type: "service_account",
  project_id: FIREBASE_PROJECT_ID,
  private_key_id: PRIVATE_KEY_ID,
  private_key: PRIVATE_KEY,
  client_email: "firebase-adminsdk-i37rt@g5-test-7258e.iam.gserviceaccount.com",
  client_id: FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-i37rt%40g5-test-7258e.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
