import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYylYe0s-x4jEQC3r08l2m16Y7fPXVEuk",
  authDomain: "resturantaapp.firebaseapp.com",
  databaseURL: "https://resturantaapp-default-rtdb.firebaseio.com",
  projectId: "resturantaapp",
  storageBucket: "resturantaapp.appspot.com",
  messagingSenderId: "65133093196",
  appId: "1:65133093196:web:1579d488ee4d1e5a036fe9",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage, app };
