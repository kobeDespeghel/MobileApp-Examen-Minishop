import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

//local imports
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import HomeStackNavigator from "./HomeStackNavigator";
import ThemeButton from "../components/ThemeButton";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCartFromStorage } from "../redux/slices/cartSlice";
import { selectThemeColors } from "../redux/selectors/themeSelectors";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const dispatch = useDispatch();
  const colors = useSelector(selectThemeColors);

  useEffect(() => {
    dispatch(fetchCartFromStorage() as any);
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.primary,
        headerShadowVisible: false,
        headerRightContainerStyle: { paddingRight: 16 },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitle: "Shopping Cart",
          headerRight: () => <ThemeButton />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: () => <ThemeButton />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
