import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { AuthenticationContextProvider } from "../../services/authentication/authentication.context";
import { SettingsNavigator } from "./settings.navigator";
import { AddLocationNavigator } from "./addLocation.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { RestaurantsNavigator } from "./restaurants.navigator";

import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { CameraScreen } from "../../features/account/screens/camera.screen";
import { AddInvoiseScreen } from "../../features/settings/screens/addInvoise.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  // add AuthenticationContextProvider by hamdi 
  //<AuthenticationContextProvider>
  <LocationContextProvider>
        <FavouritesContextProvider>
          <RestaurantsContextProvider>

            <Tab.Navigator
              screenOptions={createScreenOptions}
              tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray",
              }}
            >
              <Tab.Screen name="Shops" component={RestaurantsNavigator} />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
              <Tab.Screen name="AddLocationScreen" component={AddLocationNavigator} />
              <Tab.Screen name="CameraScreen" component={CameraScreen} />
              <Tab.Screen name="AddInvoise" component={AddInvoiseScreen} />
            </Tab.Navigator>

          </RestaurantsContextProvider>
        </FavouritesContextProvider>
        </LocationContextProvider>




);
