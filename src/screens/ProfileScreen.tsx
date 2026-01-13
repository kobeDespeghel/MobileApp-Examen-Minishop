import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { selectThemeColors } from "../redux/selectors/themeSelectors";
import {
  selectTotalItems,
  selectTotalPrice,
} from "../redux/selectors/cartSelectors";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type TabParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

export default function ProfileScreen() {
  const colors = useSelector(selectThemeColors);
  // const cartProducts = useSelector(selectCartProducts);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.cartCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.heading, { color: colors.text }]}>
          My Cart Summary
        </Text>

        <>
          <View style={[styles.totalRow, { borderTopColor: colors.border }]}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>
              Total ({totalItems} {totalItems === 1 ? "item" : "items"})
            </Text>
            <Text style={[styles.totalValue, { color: colors.secondary }]}>
              ${totalPrice.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.goToCartButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate("Cart")}
          >
            <Text style={[styles.goToCartText, { color: colors.surface }]}>
              Go to Cart
            </Text>
          </TouchableOpacity>
        </>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 20,
  },
  itemsList: {
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 12,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "600",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 2,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  goToCartButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  goToCartText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
