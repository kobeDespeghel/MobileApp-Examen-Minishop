import { FlatList, Text, View, StyleSheet } from "react-native";
import { useProducts } from "../../hooks/queries/useProducts";
import ProductListItem from "../../components/Products/ProductListItem";
import { useSelector } from "react-redux";
import { selectThemeColors } from "../../redux/selectors/themeSelectors";

export default function ProductListScreen() {
  const { data: products, isLoading, error, refetch } = useProducts();
  const colors = useSelector(selectThemeColors);

  if (isLoading)
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.error }}>Error loading products</Text>
      </View>
    );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Products</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        contentContainerStyle={{ paddingBottom: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
