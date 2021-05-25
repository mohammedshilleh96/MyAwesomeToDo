import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

firebase.initializeApp({
  apiKey: "AIzaSyBAclYHslsCsqQAxlXq1G7Ll0TpsdiCtCk",
  authDomain: "myawesometodo-a2122.firebaseapp.com",
  projectId: "myawesometodo-a2122",
  storageBucket: "myawesometodo-a2122.appspot.com",
  messagingSenderId: "131600129529",
  appId: "1:131600129529:web:1dfec6642ad8b1a71b7128",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

export default firebase;
