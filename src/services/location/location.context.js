import React, { useState, useEffect, useContext } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";

import { getCategoriesAndDocuments } from "../restaurants/restaurants.service";

export const LocationContext = React.createContext();
import { locations,locationRequest, locationTransform } from "./location.service";



export const LocationContextProvider = ({ children }) => {
  // السابق الصالح
  //const [keyword, setKeyword] = useState("");

  //const [city, setKeyword] = useState("");
  const { area, city }= useContext(AuthenticationContext)

  const [locations, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationsData, setLocationsData] = useState([])

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    // السابق الصالح
    //setKeyword(searchKeyword);
    setKeyword(city);

    //console.log('citi city', city)

  };
  console.log('citi city', city)

  //console.log('citi city', city)


  // القديم شغال
/*
  useEffect(() => {
    if (!keyword.length) {
      // don't do anything
      return;
    }
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
        console.log('err location requset:', err)
      });
  }, [keyword]);
*/
/*
// example for cleat use effect from internet
useEffect(() => {
  let isMounted = true;
  new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve("Time is up!");
      }, 2000);
  }).then((value) => {
      if(isMounted) {
          setMessage(value);
      }
});
  // Clean-up:
  return () => {
      isMounted = false;
  }
}, []);
*/

// الجديد فايربيس
useEffect(() => {
  let isMounted = true; // Add Boolean
  //setKeyword(city);
  //setKeyword(city);

  //if (!keyword.length) {
    //if (!keyword) {
    if (!city) {

    // don't do anything
    return;
  }

  // البداية
  //if (city) {

    new Promise((resolve, reject) => {
      //setTimeout(() => {
        //locationRequest(keyword.toLowerCase(), area)
        locationRequest(city.toLowerCase(), area)
        .then(locationTransform)
        .then((result) => {
          setLocation(result);
            console.log('result locationTransform', result)
            console.log('LocationTransform', locations)

            //resolve(result)

    })
    /*
    .then((res) => {
      if(isMounted) { // Condition
        //setMessage(value);
        setIsLoading(false);
       // setLocation(result);
    }

    })
    */
  })
  /*
   // Clean-up:
   return () => {
    isMounted = false;
} 
*/
//} // if (city)
}, [city]);


// النهاية

  //locations().then((res) => setLocationsData(res))
    
   // getCategoriesAndDocuments()
    //console.log('locations', res) 
  //.then(locationRequest(locationsData ,keyword.toLowerCase())
  // صالح الكيورد لوحدها
 //locationRequest(keyword.toLowerCase())
 /*
 locationRequest(keyword.toLowerCase(), area)
 //locations()
   .then(locationTransform)
    .then((result) => {
      console.log('resultlocationTransform', result)

      setIsLoading(false);
      setLocation(result);
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err);
      console.log('err location requset:', err)
    });
    */
//}, [keyword, area]);
//}, [keyword, city]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        search: onSearch,
        //keyword,
        city,
        locations,
        area,
        // جديد من فايربيس
        //locations
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
