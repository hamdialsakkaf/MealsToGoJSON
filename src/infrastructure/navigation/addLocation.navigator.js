import React from "react";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { AddLocationScreen } from "../../features/settings/screens/addLocation.screen";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";


const AddLocationNavigatorStack = createStackNavigator();
export const AddLocationNavigator = ({ route, navigation }) => {
  return (
    <AddLocationNavigatorStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      
        <AddLocationNavigatorStack.Screen
            name="AddLocationScreen"
            component={AddLocationScreen}
      />

    </AddLocationNavigatorStack.Navigator>
  );
};
