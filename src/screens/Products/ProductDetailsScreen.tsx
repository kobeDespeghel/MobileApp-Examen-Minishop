import { Text, View } from "react-native";
import { RootStackParams } from "../../navigation/HomeStackNavigator";
import { Route, RouteProp, useRoute } from "@react-navigation/native";
import { useProduct } from "../../hooks/queries/useProducts";

type Props = RouteProp<RootStackParams, "ProductDetails">;

export default function ProductDetailsScreen() {
  const route = useRoute<Props>();
  const { productId } = route.params;

  const { data: product, isLoading, error, refetch } = useProduct(productId);

  return (
    <View>
      <Text>Product Details Screen: {productId}</Text>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error loading product details</Text>}
      {product && (
        <>
          <Text>Title: {product.title}</Text>
          <Text>Description: {product.description}</Text>
          <Text>Price: ${product.price}</Text>
        </>
      )}
    </View>
  );
}
