import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import { RootStackParamList } from "../../navigation/HomeStackNavigator";

export default function ProductListScreen() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "ProductList">
    >();

  return (
    <View>
      <Text>Product List Screen</Text>
      <Button
        title="details"
        onPress={() =>
          navigation.navigate("ProductDetails", { productId: "placeholder-id" })
        }
      />
    </View>
  );
}
