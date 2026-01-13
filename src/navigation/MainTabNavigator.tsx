import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//local imports
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeStackNavigator from "./HomeStackNavigator";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCartFromStorage } from "../redux/slices/cartSlice";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartFromStorage() as any);
  }, [dispatch]);

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
