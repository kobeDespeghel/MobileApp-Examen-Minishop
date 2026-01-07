import { createNativeStackNavigator } from "@react-navigation/native-stack";

//local imports
import ProductListScreen from "../screens/Products/ProductListScreen";
import ProductDetailsScreen from "../screens/Products/ProductDetailsScreen";

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { productId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}
