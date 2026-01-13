import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartProducts,
  selectTotalItems,
  selectTotalPrice,
} from "../redux/selectors/cartSelectors";
import ProductCartItem from "../components/Products/ProductCartItem";
import { clearCart } from "../redux/slices/cartSlice";
import { selectThemeColors } from "../redux/selectors/themeSelectors";

export default function CartScreen() {
  const dispatch = useDispatch();
  const products = useSelector(selectCartProducts);
  const totalPrice = useSelector(selectTotalPrice);
  const totalItems = useSelector(selectTotalItems);
  const colors = useSelector(selectThemeColors);

  const renderEmptyCart = () => (
    <View
      style={[styles.emptyContainer, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        Your cart is empty
      </Text>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        Add some products to get started!
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (products.length === 0) return null;

    return (
      <View
        style={[
          styles.summaryContainer,
          { backgroundColor: colors.surface, borderTopColor: colors.border },
        ]}
      >
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Subtotal
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            ${totalPrice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Shipping
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            Free
          </Text>
        </View>
        <View
          style={[
            styles.summaryRow,
            styles.totalRow,
            { borderTopColor: colors.border },
          ]}
        >
          <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
          <Text style={[styles.totalValue, { color: colors.secondary }]}>
            ${totalPrice.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: colors.secondary }]}
        >
          <Text style={[styles.checkoutButtonText, { color: colors.surface }]}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.clearButton,
            { borderColor: colors.error, backgroundColor: colors.surface },
          ]}
          onPress={() => dispatch(clearCart())}
        >
          <Text style={[styles.clearButtonText, { color: colors.error }]}>
            Clear Cart
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCartItem product={item} />}
        ListEmptyComponent={renderEmptyCart}
        contentContainerStyle={
          products.length === 0 ? styles.emptyList : styles.listContent
        }
      />
      {renderFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  totalRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  checkoutButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  clearButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
