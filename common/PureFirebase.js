import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCqojvLFP9nPumCj9dQhKVoZztKq6Id3cE",
  authDomain: "cartelerareact.firebaseapp.com",
  projectId: "cartelerareact",
  storageBucket: "cartelerareact.appspot.com",
  messagingSenderId: "729496897825",
  appId: "1:729496897825:web:a9b6de07e2ab6539189660"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
