import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0ZR9E4N9mWp6EhUgNcPVrrEv3VYwztsw",
  authDomain: "words-game-287a9.firebaseapp.com",
  projectId: "words-game-287a9",
  storageBucket: "words-game-287a9.appspot.com",
  messagingSenderId: "661516540835",
  appId: "1:661516540835:web:c56a9526e87127965f5816",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
