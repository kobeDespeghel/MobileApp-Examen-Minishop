import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

//local imports
import ProductListScreen from "../screens/Products/ProductListScreen";
import ProductDetailsScreen from "../screens/Products/ProductDetailsScreen";
import ThemeButton from "../components/ThemeButton";
import { selectThemeColors } from "../redux/selectors/themeSelectors";

export type RootStackParams = {
  ProductList: undefined;
  ProductDetails: { productId: number };
};

const Stack = createNativeStackNavigator<RootStackParams>();

export default function HomeStackNavigator() {
  const colors = useSelector(selectThemeColors);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.primary,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          headerRight: () => <ThemeButton />,
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          headerRight: () => <ThemeButton />,
        }}
      />
    </Stack.Navigator>
  );
}
