import { Text, View, StyleSheet } from "react-native";
import { RootStackParams } from "../../navigation/HomeStackNavigator";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useProduct } from "../../hooks/queries/useProducts";
import { useSelector } from "react-redux";
import { selectThemeColors } from "../../redux/selectors/themeSelectors";
import AddToCart from "../../components/Products/AddToCart";

type Props = RouteProp<RootStackParams, "ProductDetails">;

export default function ProductDetailsScreen() {
  const route = useRoute<Props>();
  const { productId } = route.params;

  const { data: product, isLoading, error, refetch } = useProduct(productId);
  const colors = useSelector(selectThemeColors);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>
        Product Details: {productId}
      </Text>
      {isLoading && <Text style={{ color: colors.text }}>Loading...</Text>}
      {error && (
        <Text style={{ color: colors.error }}>
          Error loading product details
        </Text>
      )}
      {product && (
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            {product.title}
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {product.description}
          </Text>
          <Text style={[styles.price, { color: colors.secondary }]}>
            ${product.price}
          </Text>
          <AddToCart product={product} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
});
