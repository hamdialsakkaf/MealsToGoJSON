//import * as firebase from "firebase/app";
import firebase from 'firebase/app';

//import firebase from 'firebase/compat/app';
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

//const auth = getAuth();
//import { auth } from './authentication.context';
/*
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
*/
/*
  export const loginRequest = (email, password) => 
    signInWithEmailAndPassword(email, password);
*/
  /* السابق من يودومي
export const loginRequest = (email, password) => 
  firebase.auth().signInWithEmailAndPassword(email, password);
*/

