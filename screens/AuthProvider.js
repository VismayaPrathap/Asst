import React, { createContext, useContext, useEffect, useState } from 'react';
import { fb_auth } from '../src/config/firebase';
import { db } from "../src/config/firebase";

const AuthContext = createContext();
const auth = fb_auth;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    try {
      const userCredential = await fb_auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      setUser(user);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await fb_auth.signOut();
      setUser(null);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  const createUser = async (email, password) => {
    try {
      const { user: userCredential } = await fb_auth.createUserWithEmailAndPassword(email, password);
      if (userCredential) {
        await db.ref(`users/${userCredential.uid}`).set({}); // Create an empty node for the user
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const value = {
    user,
    signIn,
    createUser,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);