import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FirestoreDataConverter, getFirestore } from "firebase/firestore";
import {
  doc,
  getDoc as getDocFirebase,
  setDoc as setDocFirebase,
} from "firebase/firestore";

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

export const setDoc = async <T>({
  collection,
  docId,
  data,
  converter,
}: {
  collection: string;
  docId: string;
  data: Partial<T>;
  converter: FirestoreDataConverter<T>;
}) => {
  const documentRef = doc(db, collection, docId).withConverter(converter);
  return setDocFirebase(documentRef, data, { merge: true });
};

export const getDoc = async <T>({
  collection,
  docId,
  converter,
}: {
  collection: string;
  docId: string;
  converter: FirestoreDataConverter<T>;
}) => {
  const documentRef = doc(db, collection, docId).withConverter(converter);
  return getDocFirebase(documentRef).then((doc) => {
    if (doc.exists()) {
      const data = doc.data();
      return data;
    }
    return undefined;
  });
};
