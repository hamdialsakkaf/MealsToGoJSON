import React, { useState } from "react";
import { ScrollView } from "react-native";
import { List } from "react-native-paper";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

import { SafeArea } from "../../../components/utility/safe-area.component";

export const RestaurantDetailScreen = ({ route }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);

  const { restaurant } = route.params;
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.Accordion
          title={restaurant.mahalTaghsos}
          left={(props) => <List.Icon {...props} icon="bread-slice" />}
          expanded={breakfastExpanded}
          onPress={() => setBreakfastExpanded(!breakfastExpanded)}
        >
          <List.Item title={restaurant.TaghsosProducts} />
        </List.Accordion>

        <List.Accordion
          title="زيوت المحركات"
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={lunchExpanded}
          onPress={() => setLunchExpanded(!lunchExpanded)}
        >
          <List.Item title="زيوت محركات الصقر" />
          <List.Item title="زيوت محركات اس ار اس" />
          <List.Item title="فلاتر" />
        </List.Accordion>

        <List.Accordion
          title="شحوم"
          left={(props) => <List.Icon {...props} icon="food-variant" />}
          expanded={dinnerExpanded}
          onPress={() => setDinnerExpanded(!dinnerExpanded)}
        >
          <List.Item title="شحم الصقر" />
          <List.Item title="شحم فاج" />
          <List.Item title="" />
        </List.Accordion>

        <List.Accordion
          title="فلاتر ساكورا"
          left={(props) => <List.Icon {...props} icon="cup" />}
          expanded={drinksExpanded}
          onPress={() => setDrinksExpanded(!drinksExpanded)}
        >
          <List.Item title="فلاتر زيت سيارات" />
          <List.Item title="فلاتر زيت قواطر " />
          <List.Item title="فلاتر هواء" />
          
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
};
