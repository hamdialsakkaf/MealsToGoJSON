import React, { useContext, useState, useEffect } from "react";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { LocationContext } from "../../../services/location/location.context";
import { Search } from "../components/search.component";

import MapView from "react-native-maps";
import styled from "styled-components/native";


import { MapCallout } from "../components/map-callout.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  // السابق
  //const { location } = useContext(LocationContext);
  //const { locations } = useContext(LocationContext);

  // السابق
  //const { restaurants = [] } = useContext(RestaurantsContext);
  const { restaurants = [] } = useContext(RestaurantsContext);


  console.log('locations:', restaurants)

  const [latDelta, setLatDelta] = useState(0);

  // القديم الصالح
  //const { lat, lng, viewport } = location;

  // الجديد من فايربيس
  //console.log('map screen Location:',location)
  //const { latitude, longitude, viewport } = location;
  //console.log('viewport.latitude:',location.latitude)
 // console.log('viewport.latitude:',location.location[0].latitude)


  useEffect(() => {
    console.log('location2:', restaurants)
    // القديم الصالح
    //const northeastLat = viewport.northeast.lat;
    //const southwestLat = viewport.southwest.lat;
  
    // الجديد من فاير بيس
    //const locationString = `${location[0].latitude},${location.longitude}`;
    const northeastLat = parseFloat(restaurants[0].location.latitude)
    const southwestLat = parseFloat(restaurants[0].location.longitude)

    //const northeastLat = location.viewport[0].location[0].latitude
    //const southwestLat = location.viewport[0].location[0].longitude

   //setLatDelta(northeastLat - southwestLat);
    setLatDelta(southwestLat - northeastLat);

  //}, [location, viewport]);
  }, [restaurants]);



const  minX = restaurants[0].location[0].latitude;
 const maxX = restaurants[0].location[0].latitude;
 const minY = restaurants[0].location[0].longitude;
 const maxY = restaurants[0].location[0].longitude;

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX);
  const deltaY = (maxY - minY);

  return (

    <>
      <Search />
      <Map
       
        region={{
          // القديم الصالح
         // latitude: lat,
          //longitude: lng,
          // الجديد من فايربيس
          // السابق
          //latitude: location[0].location.latitude,
          //longitude:location[0].location.longitude,

          // الصالح الاخير
          //latitude: parseFloat(restaurants[0].location[0].latitude),
          //longitude:parseFloat(restaurants[0].location[0].longitude),

          //latitude: midX,
          //longitude: midY,

          latitude: restaurants[0].location[0].latitude,
          longitude: restaurants[0].location[0].longitude,
          //latitudeDelta: 0.0922,
          //longitudeDelta: 0.0421,
          //latitudeDelta: deltaX,
          //longitudeDelta: deltaY

          // التقريب مناسب جدا
          latitudeDelta: 0.02,
          longitudeDelta: 0.03,

          //latitudeDelta: latDelta,
          //longitudeDelta: 0.02,
        }}

        //loadingEnabled={true}
        //zoomControlEnabled={true}
        //toolbarEnabled={true}
      
      >

        {
        restaurants.map((restaurant) => {
          return (
            <MapView.Marker
              key={restaurant.name}
              title={restaurant.name}
              description={restaurant.name}
              //image={{uri: restaurant.photos}}
              coordinate={{
                // القديم الصالح
              //  latitude: restaurant.geometry.location.lat,
              //  longitude: restaurant.geometry.location.lng,

                // الجديد من فايربيس
                //latitude: parseInt(restaurant.location[0].latitude),
                //longitude: parseInt(restaurant.location[0].longitude)
                latitude: restaurant.location[0].latitude,
                longitude: restaurant.location[0].longitude
               // latitude: restaurant.location[0].latitude,
               // longitude: restaurant.location[0].longitude

                //longitude: location.viewport[0].location[0].longitude
              }}
           
              >

              <MapView.Callout
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    restaurant,
                    
                  })
                }
              >
                <MapCallout restaurant={restaurant}  />
              </MapView.Callout>
            </MapView.Marker>
          );
        }) 
        
        }
        
      </Map>
    </>
  );


};
