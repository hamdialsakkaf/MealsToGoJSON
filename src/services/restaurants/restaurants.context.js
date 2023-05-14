import React, { useState, useContext, createContext, useEffect } from "react";
import { LocationContext } from "../location/location.context";
import {
  restaurantsRequest,
  restaurantsTransform,
} from "./restaurants.service";


export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const { area, city, locations } = useContext(LocationContext);
  const [location2, setLocation2] = useState(null);

  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ mocksData, setMocksData ] = useState([])

  // القديم شغال
  /*
  const retrieveRestaurants = (loc) => {
    setIsLoading(true);
    setRestaurants([]);

    setTimeout(() => {
      restaurantsRequest(loc)
        .then(restaurantsTransform)
        .then((results) => {
          setIsLoading(false);
          setRestaurants(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };
  */

  // الجديد من فايربيس
  const retrieveRestaurants = (loc) => {
    console.log("retrieveRestaurants", loc)
    setIsLoading(true);
    setRestaurants([]);

    //setTimeout(() => {
      //mocks().then((res) => setMocksData(res))
      //restaurantsRequest(loc)
      //restaurantsRequest(keyword, area)
      restaurantsRequest(city, area)
        .then(restaurantsTransform)
        .then((result) => {
          console.log("result.location", result)
          //setLocation(result[0].location)
          setIsLoading(false);
          
         // console.log("setRestaurants", result)
          setRestaurants(result);

        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    //}, 3000);
  };
  //location && {
  useEffect(() => {
    //let isMounted = true; // Add Boolean

    //if (locations != null) {
   // if (location2) {

   // return new Promise((resolve, reject) => {
      //setTimeout(() => {
        console.log('restrant locationnn:',restaurants)
       //const locationString = `${restaurants[0].latitude},${restaurants[0].longitude}`;
           //    console.log('restrant locationnn:',locationString)
           retrieveRestaurants(restaurants);
        // الدالة الصح مع الباراميتر
       //retrieveRestaurants(locationString);

       //const locationString = `${location[0].latitude},${location.longitude}`;
       // retrieveRestaurants(locationString);
        //resolve(result);

      //}, 2000);
    //})
  //} // if
    /*
    .then((value) => {
      //if(isMounted) { // Condition
          //setMessage(value);
          console.log('restrant locationString:',locationString)

          retrieveRestaurants(locationString);
      //}
  });
  */
 /*
   // Clean-up:
   return () => {
    isMounted = false;
}
*/
  },[locations])
  
//}// if (location)
/*     السابق الصالح وتعطل
      if (location != null) {
        console.log('restrant locationnn:',location)
        // القديم الصالح
        //const locationString = `${location.lat},${location.lng}`;
  
        // الجديد من فايربيس
        //const locationString = `${location.latitude},${location.longitude}`;
        // سابق صالح وتعطل
        //const locationString = `${location.viewport[0].location[0].latitude},${location.viewport[0].location[0].longitude}`;
       const locationString = `${location[0].latitude},${location[0].longitude}`;

       //const locationString = `${location[0].latitude},${location.longitude}`;

        console.log('restrant locationString:',locationString)
  
        retrieveRestaurants(locationString);
      }
 */
  
   
   // }, [location]);
  //}, [location2]);

  //}
    
 
  
//}, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
