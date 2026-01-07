import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../../navigation/HomeStackNavigator";
import { useProducts } from "../../hooks/queries/useProducts";
import Product from "../../models/Product";

export default function ProductListScreen() {
  const { data: products, isLoading, error, refetch } = useProducts();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "ProductList">
    >();

  if (isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View>
        <Text>Error loading products</Text>
      </View>
    );

  return (
    <View>
      <Text>Product List Screen</Text>
      {products?.map((product: Product) => {
        return <Text key={product.id}>{product.title}</Text>;
      })}
      <Button
        title="details"
        onPress={() =>
          navigation.navigate("ProductDetails", { productId: "1" })
        }
      />
    </View>
  );
}
