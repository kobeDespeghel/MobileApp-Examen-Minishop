import { createNativeStackNavigator } from "@react-navigation/native-stack";

//local imports
import ProductListScreen from "../screens/Products/ProductListScreen";
import ProductDetailsScreen from "../screens/Products/ProductDetailsScreen";

export type RootStackParams = {
  ProductList: undefined;
  ProductDetails: { productId: number };
};

const Stack = createNativeStackNavigator<RootStackParams>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}
