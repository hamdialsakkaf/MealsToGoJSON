import React from "react";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
//import { AddLocationScreen } from "../../features/settings/screens/addLocation.screen";
import { AddInvoiseScreen } from "../../features/settings/screens/addInvoise.screen";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";


const AddInvoiseNavigatorStack = createStackNavigator();
export const AddLocationNavigator = ({ route, navigation }) => {
  return (
    <AddInvoiseNavigatorStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      
        <AddInvoiseNavigatorStack.Screen
            name="AddInvoiseScreen"
            component={AddInvoiseScreen}
      />
      
      </AddInvoiseNavigatorStack.Navigator>
  );
};
