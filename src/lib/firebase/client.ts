// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2dDbOTd4VP1gUkjTYtGIh__-YCYoPyh8",
  authDomain: "bookmarks-da22f.firebaseapp.com",
  projectId: "bookmarks-da22f",
  storageBucket: "bookmarks-da22f.appspot.com",
  messagingSenderId: "39973869795",
  appId: "1:39973869795:web:5bc42fd864a19e762a4dd6",
  // measurementId: "G-TPQ52GLPWD",
};

export const app = initializeApp(firebaseConfig);

// export const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app);
