import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { CartProduct } from "../../models/Product";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/HomeStackNavigator";
import { useSelector } from "react-redux";
import { selectThemeColors } from "../../redux/selectors/themeSelectors";
import AddToCart from "./AddToCart";

interface Props {
  product: CartProduct;
}

export default function ProductListItem({ product }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams, "ProductList">>();

  const colors = useSelector(selectThemeColors);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("ProductDetails", {
          productId: product.id,
        })
      }
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>
            {product.title}
          </Text>
          <Text style={[styles.price, { color: colors.secondary }]}>
            ${product.price.toFixed(2)}
          </Text>
          <Text
            style={[styles.description, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {product.description}
          </Text>
        </View>

        <AddToCart product={product} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
  },
});
