// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRz44Oemg3HZDMOU1UKmuYv3Fk24b4y0Q",
  authDomain: "g5-test-7258e.firebaseapp.com",
  projectId: "g5-test-7258e",
  storageBucket: "g5-test-7258e.appspot.com",
  messagingSenderId: "618156886466",
  appId: "1:618156886466:web:81c1e8aa4a237a73ce6e5b",
  measurementId: "G-G5QQ18ZLCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore(app)