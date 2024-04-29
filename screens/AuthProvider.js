// import React, { createContext, useState, useEffect } from 'react';
// import auth from '@react-native-firebase/auth';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = auth().onAuthStateChanged(user => {
//       setUser(user);
//       setLoading(false);
//     });

//     // Unsubscribe to the listener when unmounting
//     return unsubscribe;
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import { auth} from '@react-native-firebase/auth';

// import { db } from '../src/config/firebase'; // Assuming you have configured Firebase elsewhere
// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Listen for authentication state changes
//         const unsubscribe = auth.onAuthStateChanged(user => {
//             setUser(user);
//             setLoading(false);
//         });
    
//         // Unsubscribe to the listener when unmounting
//         return unsubscribe;
//     }, []);

//     // Function to create user-specific collection upon sign-up
//     const createUserCollection = async (uid) => {
//         try {
//             await db.collection('users').doc(uid).set({}); // Create an empty document for the user
//             console.log('User collection created');
//         } catch (error) {
//             console.error('Error creating user collection:', error);
//         }
//     };

//     // Function to sign up
//     const signUp = async (email, password) => {
//         try {
//             const { user } = await auth.createUserWithEmailAndPassword(email, password);
//             if (user) {
//                 await createUserCollection(user.uid); // Create user-specific collection
//             }
//         } catch (error) {
//             console.error('Error signing up:', error);
//         }
//     };

//     // Function to sign in
//     const signIn = async (email, password) => {
//         try {
//             await auth.signInWithEmailAndPassword(email, password);
//         } catch (error) {
//             console.error('Error signing in:', error);
//         }
//     };

//     // Function to sign out
//     const signOut = async () => {
//         try {
//             await auth.signOut();
//         } catch (error) {
//             console.error('Error signing out:', error);
//         }
//     };

    

//     // Return the AuthContext.Provider with value
//     return (
//         <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

import React, { createContext, useContext, useState } from 'react';
import { fb_auth } from '../src/config/firebase';
import { db } from "../src/config/firebase";

const AuthContext = createContext();
const auth=fb_auth;
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

  const createUserCollection = async (uid) => {
    try {
      await db.collection('users').doc(uid).set({}); // Create an empty document for the user
      console.log('User collection created');
    } catch (error) {
      console.error('Error creating user collection:', error);
    }
  };

  const signUp = async (email, password) => {
    try {
      const { user: userCredential } = await fb_auth.createUserWithEmailAndPassword(email, password);
      if (userCredential) {
        await createUserCollection(userCredential.uid); // Create user-specific collection
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,

  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);