import { Text, TouchableOpacity } from "react-native";
import Product from "../../models/Product";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/HomeStackNavigator";

interface Props {
  product: Product;
}

export default function ProductListItem({ product }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams, "ProductList">>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetails", {
          productId: product.id,
        })
      }
    >
      <Text>{product.title}</Text>
    </TouchableOpacity>
  );
}
