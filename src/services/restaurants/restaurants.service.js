import React, { useContext } from "react";
import firebase from 'firebase/compat/app'

import 'firebase/compat/storage'
import { getFirestore, collection, collectionGroup, addDoc, query, where, getDoc, doc, getDocs, setDoc  } from "firebase/firestore";
import { db } from "../authentication/authentication.context";

// الجديد من فايربيس
//import { mocks, mockImages } from "./mock";
  
// القديم الصالح
//import { mocks, mockImages } from "./mock";
import camelize from "camelize";


// تجربة دالة جلب البيانات من يودومي
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'locations');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const locationsMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {geometry, location } = docSnapshot.data();
    acc[geometry] = location;
    return acc;

  }, {});
  //console.log('locationsMap:',geometry)
  //console.log('locationsMap12:',locationsMap)

  return locationsMap;
}


//const mocks = getlocations()
export const mocks = async () => {
  //const docRef = doc(db, "mocks", "antwerp");
  //const docRef = doc(db, "sanaa", "hadastreet","hadastreet");
  const docRef = collection(db,"sanaa","hadastreet", 'hadastreet')

  //const docSnap = await getDoc(docRef);
  const docSnap = await getDocs(docRef);

  //if (docSnap.exists()) {
    /*
    if (docSnap) {
    docSnap.forEach((doc) => {
      //console.log("sanaa data:", doc.data());

    })
    //setLoc(docSnap.data().imageUrl)
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  */
 //}
 //setLocations(locations);
 //console.log('mocks from Firbase:', locations)
 //setLocations(locations)
 const locations = docSnap.docs.map(doc => doc.data())

 //const locations = docSnap.data();

  return locations
/*
if (docSnap.exists()) {
  console.log("mocks data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
*/

//return docSnap.data();

    // get data from locations
  //   const getLoc = async () => {
    // const docRef = doc(db, "mocks", "mocks");
    // const docSnap = await getDoc(docRef);
  
   //  if (docSnap.exists()) {
       //setLoc(docSnap.data().imageUrl)
      //const  mosksData = docSnap.data();
       //console.log("mocks data:", mosksData);

     //} else {
       // doc.data() will be undefined in this case
     //  console.log("No such document!");
    // }
     //return mosksData;

    //}
    //const locations = docSnap.data();
    //setLocations(locations);
    //console.log('mocks from Firbase:', locations)
    //setLocations(locations)

  
    //const {geometry, location } = docSnapshot.data();
    //const {location } = docSnapshot.data();


  //const querySnapshot = await getDocs(q);

  //const mocksMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  
    //const {geometry, location } = docSnapshot.data();
    //const {location } = docSnapshot.data();

   // acc[geometry] = location;
    /*
    geometry.forEach(doc => {
      //console.log('all collections',doc.data());
      //console.log('doc id',doc.id);
      console.log('locations coll3',doc.data('antwerp').location);
      console.log('locations name',doc.data('antwerp').name);
  
  })
*/
//    return acc;

 // }, {});


//return mocksMap
/*
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
  const mocks = docSnap.data();
  //setLocations(locations);
  console.log('mocks :', mocks)
  //setLocations(locations)
   return mocks
   */
}

const mocks2 = mocks();
//export const restaurantsRequest = async (keyword, area) => {
  export const restaurantsRequest = async (city, area) => {

  //export const getCategoriesAndDocuments = async () => {
  //const collectionRef = collection(db, 'categories');
 // const docRef = doc(db, "mocks", "antwerp");

 //console.log('location2', keyword+ 'area:'+ area)
 console.log('location2', city+ 'area:'+ area)

  //const docRef = doc(db, "mocks","antwerp");
  // صالح قبل الدمج
  //const docRef = doc(db, "mocks","antwerp");
  //const docRef = setDoc(doc(db, "mocks","antwerp",'hadaArea', todo),data)

  //const docRef = doc(db, "mocks","antwerp",'hadaArea')
 // const docRef = doc(db, "sanaa","hadastreet",'hadastreet')
 // صالح
  //const docRef = collection(db,"sanaa","hadastreet", 'hadastreet')
  //const docRef = collection(db,keyword,area, area)
  const docRef = collection(db,city,area, area)

  //const docSnap = await getDoc(docRef);
  const docSnap = await getDocs(docRef);
  //if (docSnap) {
    return new Promise((resolve, reject) => {
      const restaurants = docSnap.docs.map(doc => doc.data())
      console.log("restaurants docSnap :", restaurants);

      if (!restaurants) {
        reject("not found");
      }
      resolve(restaurants);
    })

  //}
  // السابق شغال
  //const restaurants = docSnap.docs.map(doc => doc.data())
  //return restaurants



  /* else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    alert('No such document!')
  }
  */
  //console.log('restaurantsRequest5', docSnap.data().results)
  //console.log('restaurantsRequest5', docSnap.docs.map(doc => doc.data()))
  //const locations = docSnap.docs.map(doc => doc.data())

  //if (docSnap.exists()) {
    /*
    if (docSnap) {

    console.log("restaurantsRequest data sanaa:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  */
  //const restaurants = docSnap.data();
  //console.log("return locations", locations);

  // صالح قبل دمج البيانات
   //return restaurants.antwerp




//};
  //const res = []
  //console.log('mocksData in ', mocksData.antwerp.results[0].geometry.location)
  //const { location2 } = useContext(LocationContext);
  //console.log('location22', location2)

 //return new Promise((resolve, reject) => {
    // القديم شغال
    //const mock = mocks[location];
    // الجديد من فايربيس
    //console.log('location2:', location2)
    //const mock = mocksData.antwerp.results[0].geometry.location;
/*
    console.log('mocks2:',mocks2.then((moc) => {
      console.log('moc moc:', moc)

      const mocanatwerp = JSON.stringify(moc);
      console.log('moc moc anatwerp:', mocanatwerp)
      //let finalString = mocanatwerp.replace(/["]+/g, '')
      //console.log('moc moc anatwerp last:', finalString)

      //console.log('moc moc mocparse:', mocparse)

      //let documentRef = firestore.doc('col/doc');

     // documentRef.get().then((documentSnapshot) => {
     
      //}

   }))
   */
   // const querySnapshot = await getDocs(q);

  /*
    const { geometry = {} } = mocks2;
    
    console.log('mocks2 geometry:', geometry)

     const mock = mocks2[location2];

     console.log('mock:', mock)

    if (!mocanatwerp) {
      reject("not found");
    }
    resolve(mocanatwerp);
  })
  */
};

//export const restaurantsTransform = ({ results = [] }) => {
  export const restaurantsTransform = (  results ) => {

  console.log("restaurantsTransform10", results);
  
  /*
  const mappedResults =  Object.values(results).map((restaurant, index) => {
    //const restaurant = results;

      console.log("restaurant", restaurant);
      return {
        ...restaurant,
        //address: restaurant.vicinity,
        address: restaurant.address,
  
        isOpenNow: restaurant.isOpenNow ,
       photos: restaurant.photos[0],
       location: restaurant.location
        //isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
       // isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
   
      };

    })
    */
  //const mappedResults = results.map((restaurant) => {
    //const mappedResults = results.map((restaurant) => {

    
    //restaurant.photos = results.photos[0]
  
    
 // };
  
    //return mappedResults;
  return camelize(results);
};
