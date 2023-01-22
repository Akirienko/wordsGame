import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAx2kYVRmWEIftYBOI9ZieVd92c8tlrvl0",
  authDomain: "words-game-522bb.firebaseapp.com",
  projectId: "words-game-522bb",
  storageBucket: "words-game-522bb.appspot.com",
  messagingSenderId: "703242571559",
  appId: "1:703242571559:web:47544e75148b77232d6302"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
