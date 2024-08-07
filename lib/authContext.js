// authContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { auth ,db} from './firebaseConfig';
import { onAuthStateChanged, signOut as firebaseSignOut , createUserWithEmailAndPassword} from 'firebase/auth';
import {doc,setDoc} from 'firebase/firestore';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app with
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = () => {
    return firebaseSignOut(auth);
  };

  const registerUser = async (firstName, lastName,email,password) => {
    const userCredential = await createUserWithEmailAndPassword(auth,email,password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users' , user.uid), {
      uid: user.uid,
      firstName,
      lastName,
      email,
    }); 
    return user;
  }

  const value = {
    currentUser,
    signOut,
    registerUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{ children}</AuthContext.Provider>;
};
