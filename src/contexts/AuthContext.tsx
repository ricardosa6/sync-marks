import { createContext, useContext, useEffect, useState } from "react";

import {
  User,
  UserCredential,
  // UserCredential,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "@/lib/firebase/client";
import { doc, setDoc } from "firebase/firestore";

type AuthContextType = {
  currentUser?: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  // updateEmail: (email: string) => Promise<void>;
  // updatePassword: (password: string) => Promise<void>;
};
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  const signup = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      uid: userCredential.user.uid,
    });

    return userCredential;
  };

  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  // function updateEmail(email: string) {
  //   return currentUser.updateEmail(email);
  // }

  // function updatePassword(password: string) {
  //   return currentUser.updatePassword(password);
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    // updateEmail,
    // updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
