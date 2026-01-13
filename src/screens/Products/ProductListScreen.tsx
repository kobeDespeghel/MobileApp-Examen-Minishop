import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, FlatList, Text, View } from "react-native";
import { RootStackParams } from "../../navigation/HomeStackNavigator";
import { useProducts } from "../../hooks/queries/useProducts";
import Product from "../../models/Product";
import ProductListItem from "../../components/Products/ProductListItem";

export default function ProductListScreen() {
  const { data: products, isLoading, error, refetch } = useProducts();

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
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </View>
  );
}
