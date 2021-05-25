import { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "../firebase";
import React from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function logInWithGoogleAccount() {
    return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  function logInWithEmailAndPassword(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signUpWithEmailAndPassword(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  });

  const value = {
    currentUser,
    signOut,
    logInWithEmailAndPassword,
    logInWithGoogleAccount,
    signUpWithEmailAndPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
