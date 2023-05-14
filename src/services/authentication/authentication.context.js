import React, { useState, createContext } from "react";
//import * as firebase from "firebase";
//import firebase from 'firebase/app';
import firebase from 'firebase/compat/app'
import { initializeApp } from "firebase/app"
import { getFirestore, getDoc,getDocs, doc, collection, query, where} from "firebase/firestore";

import { getAuth, onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut  } from "firebase/auth";
//import { getStorage } from "firebase/storage";
import 'firebase/compat/storage'


//import { auth } from "../../../App";
//import { loginRequest } from "./authentication.service";

// by hamdi from app.js

export const firebaseConfig = {
  apiKey: "AIzaSyC5-hAFbUKonUG98ITg3bER7MSrNUFTNrY",
  authDomain: "meals-togo-f7e71.firebaseapp.com",
  projectId: "meals-togo-f7e71",
  storageBucket: "meals-togo-f7e71.appspot.com",
  messagingSenderId: "126464822923",
  appId: "1:126464822923:web:b7a4a85aa093f34ca18e8e",
};

export const AuthenticationContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

   const firebaseApp  = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

 export {firebaseApp, firebase}

// ....
export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");

  const [error, setError] = useState(null);

  //firebase.auth().onAuthStateChanged((usr) => {
    const auth = getAuth(firebaseApp);
      onAuthStateChanged(auth, usr => {
        // Check for user status
        if (usr) {
          setUser(usr);
          // صالح لكن متاخر
          areaRequest(usr.email)
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
});
//areaRequest(email)

/*
    onAuthStateChanged((auth,usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });
*/
  const onLogin = (email, password) => {
    setIsLoading(true);
    //loginRequest(email, password)
    signInWithEmailAndPassword(auth,email, password)
    //loginRequest(auth,email, password)
      .then((u) => {
        setUser(u.user);

        console.log('uuuu:', u.user)
        setIsLoading(false);

      })
      //.then(()=> {
      //  console.log('areaRequest:', user.email)

       // areaRequest(user.email)
      //})

      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });

  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
   // firebase
      //.auth()
      //.createUserWithEmailAndPassword(email, password)
      createUserWithEmailAndPassword(auth,email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
        
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

   const areaRequest = async (email) => {
    //const loginEmail = user.email;
    const loginEmail = email;

    // صالح
    //const docRef = doc(db, "Permissions", "Permid", loginEmail);
    //const docRef = collection(db,"Permissions","Permid", loginEmail)
    const docRef = collection(db, "Permissions");

    // Create a query against the collection.
    const q = query(docRef, where("email", "==",loginEmail));
    //const docSnap = await  getDoc(docRef);
    //const docSnap = await  getDocs(docRef);
    //const docSnap = await getDoc(docRef);
    const querySnapshot = await getDocs(q);
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().email);
        console.log(doc.id, "city => ", doc.data().city);
        console.log(doc.id, "area => ", doc.data().area);

        setCity(doc.data().city)
        setEmail(doc.data().email)
        setArea(doc.data().area)

      //  onLoginKeword(doc.data().city)
      });
    } else {
      alert('الايميل لا يملك صلاحيات')
    }
    
   
    /*
    if (docSnap.exists()) {
      console.log("Permissions data:", docSnap.data().email);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No Permissions document!");
    }
    */
  //return area
  }

  const onLogout = () => {
    console.log('onLogout:', user)
      signOut(auth)
      .then(() => {
        //setArea(null)
        //setCity(null)
        //setError(null);
       // areaRequest(null)
        setUser(null);
        setError(null);


      });
  };
  /*
  // القديم من درس يودومي
  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
      });
  };
*/
  return (
    <AuthenticationContext.Provider
      value={{
        // الاصل
        //isAuthenticated: !!user,
        isAuthenticated: !!user,
        user,
        email,
        city,
        area,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
       
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
