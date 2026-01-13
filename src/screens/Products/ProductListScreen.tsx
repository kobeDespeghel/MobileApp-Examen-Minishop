import { FlatList, Text, View, StyleSheet } from "react-native";
import { useProducts } from "../../hooks/queries/useProducts";
import ProductListItem from "../../components/Products/ProductListItem";
import { useSelector } from "react-redux";
import { selectThemeColors } from "../../redux/selectors/themeSelectors";
import Search from "../../components/Search";
import { useState } from "react";

export default function ProductListScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useProducts(searchQuery);
  const colors = useSelector(selectThemeColors);

  const searchProducts = (query: string) => {
    setSearchQuery(query);
    refetch();
  };

  const RenderIsLoading = () => {
    if (isLoading)
      return (
        <View style={[styles.center, { backgroundColor: colors.background }]}>
          <Text style={{ color: colors.text }}>Loading...</Text>
        </View>
      );
  };

  const RenderError = () => {
    if (error)
      return (
        <View style={[styles.center, { backgroundColor: colors.background }]}>
          <Text style={{ color: colors.error }}>Error loading products</Text>
        </View>
      );
  };

  const RenderProducts = () => {
    if (!products || products.length === 0) {
      return (
        <View style={[styles.center, { backgroundColor: colors.background }]}>
          <Text style={{ color: colors.text }}>No products found</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductListItem product={item} />}
          contentContainerStyle={{ paddingBottom: 12 }}
        />
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* <Text style={[styles.title, { color: colors.text }]}>Products</Text> */}
      <Search onSearch={searchProducts} query={searchQuery} />

      {RenderIsLoading()}

      {RenderError()}

      {RenderProducts()}
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
  },
});
