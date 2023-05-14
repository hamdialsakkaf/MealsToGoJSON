import React, { useContext} from "react";
import camelize from "camelize";
import firebase from 'firebase/compat/app'

import 'firebase/compat/storage'
import { getFirestore, collection, addDoc, query, where, getDoc, doc, getDocs, setDoc  } from "firebase/firestore";
import { db } from "../authentication/authentication.context";
import { async } from "@firebase/util";

// القديم الصالح
//import { locations } from "./location.mock";

// الجديد من فاير بيس
//import { locations }  from "./location.context";

//const locations = getlocations()
/*
 const locations = async () => {
  
  // get data from locations
//   const getLoc = async () => {
   const docRef = doc(db, "locations", "locations");
   const docSnap = await getDoc(docRef);

   if (docSnap.exists()) {
     //setLoc(docSnap.data().imageUrl)
     console.log("Document data:", docSnap.data());
   } else {
     // doc.data() will be undefined in this case
     console.log("No such document!");
   }
  //}
  const locations = docSnap.data();
  //setLocations(locations);
  console.log('locations from Firbase:', locations)
  //setLocations(locations)
   return locations
}
*/
// القديم صالح
//export const locationRequest = (searchTerm) => {  

  export const locationRequest = async (searchTerm, area) => { 

    console.log("searchTerm:", searchTerm + "area"+ area);

    //const docRef = doc(db, "mocks", "antwerp");
    // صالح قبل الدمج
    //const docRef = doc(db, "mocks", searchTerm);
    //const docRef = doc(db, "mocks","antwerp")
    //const docRef = doc(db, "mocks",searchTerm,'hadaArea')
/*
    db.collection("sanaa")
    .doc("hadastreet")
    .collection("hadastreet")
    .get()
    .then(snap => {
        snap.forEach(doc => {
            console.log(doc.data());
        });
    });
*/

    //const docRef = collection(db,"mocks","antwerp", 'taizstr')
    // الاستعلام الصالح
   // const docRef = collection(db,"sanaa","hadastreet", 'hadastreet')

    // الاستعلام حسب طلب المستخدم صالح
    //const docRef = collection(db,searchTerm,"hadastreet", 'hadastreet')
    
    
    //const docRef = collection(db,searchTerm,area, area)
    //const docSnap = await  getDoc(docRef);
    //const docSnap = await  getDocs(docRef);
    /*
    docSnap.forEach((doc) => {
      console.log("locations docSnap docSnap:", doc.data());

    })
    */


       const docRef = collection(db,searchTerm,area, area);
       const docSnap = await   getDocs(docRef);

    //if (docSnap) {

      return new Promise((resolve, reject) => {
         const locations =docSnap.docs.map(doc => doc.data() )
        console.log("locations docSnap docSnap:", locations[0]);
        if (!locations) {
          reject("not found");
        }
        //resolve(locations);
        resolve(locations)
      })
      
    //}
    /*
    else {
      console.log("  docSnap error:");
    }
    */

/*  صالح
   
    const locations = docSnap.docs.map(doc => doc.data() )
    locations.forEach((doc) => {
      console.log("locations docSnap docSnap:", doc);

    })
    
    return locations;
    */
   /*
    const docRef = collection(db,searchTerm,area, area)
    const docSnap = await  getDocs(docRef);

    if (docSnap) {
    
      return new Promise((resolve, reject) => {
        const locations = docSnap.docs.map(doc => doc.data() )
        console.log("locations docSnap docSnap:", locations);

        if (!locations) {
          reject("not found");
        }
        resolve(locations);
      })
      
    }
    else {

    }
    */
     // const locations = docSnap.docs.map(doc => doc.data())

      
    /*
    console.log("dat:", dat)
    if (docSnap) {
      docSnap.forEach((doc) => {
        console.log("locations locations data:", doc.data());

      })
      */
      //setTakes(doc)
      //setLoc(docSnap.data().imageUrl)
      //console.log("locations locations data:", docSnap.taizstr);
/*
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      alert("No such document!")
    }
    */
   //}
   //setLocations(locations);
   //console.log('mocks from Firbase:', locations)
   //setLocations(locations)
   //const locations = docSnap.data();
   //const locations = docSnap.data();

   //console.log("return locations", locations);
   //const locations = docSnap.docs.map(doc => doc.data() )
    //console.log('locations50:', locations)
    //return locations
 
    
   // }
  //return new Promise((resolve, reject) => {

  

    // القديم الصالح
  //const locationMock = data[searchTerm];



    //const locationMock = locations[searchTerm];
   // const locationMock = locations[searchTerm];

    //const { geometry = {} } = locationMock.results[0];

    //console.log('geometry', geometry)

    //console.log('locationMock', geometry)
/*
    if (!locationMock) {
      reject("not found");
    }
    resolve(geometry);
  });
  */
};

export const locationTransform = (result) => {
  //const formattedResponse = camelize(result);
  //console.log('result2', result)
  // القديم الصالح
  //const { geometry = {} } = formattedResponse.results[0];

  // الجديد من فايربيس
  //const { geometry = {} } = result.results[0];
  //const { geometry = {} } = result.results[0];
  //console.log('location locationTransform', result.location)
  //const { lat, lng } = geometry.location;

  //console.log('location locationTransform', result.antwerp)
  console.log('location locationTransform', result)

  // القديم الصالح
 // const { lat, lng } = geometry.location;
  // الجديد من فايربيس
  //const { latitude, longitude } = geometry.location;
  //onst { latitude, longitude } = result.antwerp;
  //const { latitude, longitude } = result.results[0].geometry.location;
  //const { latitude, longitude } = result[0].location[0];
  //const { latitude, longitude } = result.map(loc => loc)
  const viewport  = result.map(loc => loc)
  console.log('viewport', viewport)
  //const restaurants = result.map(loc => loc.data())

  //const  latitude = result.results[0].geometry.location.latitude;
  //const  longitude  = result.results.longitude;
  //console.log('viewport', viewport)

  //console.log('Latitude', viewport[0].location[0].latitude)
  //console.log('longitude', viewport[0].location[0].longitude)
  /*
  if (viewport) {
    //return { viewport: viewport };

  } else {
    alert('location not Found!')
  }
  */
  // القديم الصالح
  //return { Latitude, Longitude, viewport: geometry.viewport };
  // الجديد من فايربيس
  //return { latitude, longitude, viewport: result.results[0].geometry.location };
  //return { latitude, longitude, viewport: result[0].location[0] };
  //return { viewport: viewport };
 return viewport;

};
