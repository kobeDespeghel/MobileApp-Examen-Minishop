import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//local imports
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeStackNavigator from "./HomeStackNavigator";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
