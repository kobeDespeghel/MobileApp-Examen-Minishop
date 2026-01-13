import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Product from "../../models/Product";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/HomeStackNavigator";
import { useDispatch, useSelector } from "react-redux";
import { setQuantity as setQuantityCartSlice } from "../../redux/slices/cartSlice";
import {
  selectIsProductInCart,
  selectProductQuantity,
} from "../../redux/selectors/cartSelectors";
import { selectThemeColors } from "../../redux/selectors/themeSelectors";
import AddToCart from "./AddToCart";

interface Props {
  product: Product;
}

export default function ProductListItem({ product }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams, "ProductList">>();

  const quantityInCart = useSelector((state: any) =>
    selectProductQuantity(state, product.id)
  );

  const colors = useSelector(selectThemeColors);

  const [quantity, setQuantity] = useState(quantityInCart);

  //redux
  const dispatch = useDispatch();
  const isInCart = useSelector((state: any) =>
    selectIsProductInCart(state, product.id)
  );

  useEffect(() => {
    if (!isInCart) {
      setQuantity(1);
    } else {
      setQuantity(quantityInCart);
    }
  }, [isInCart, quantityInCart]);

  useEffect(() => {
    if (isInCart) {
      dispatch(setQuantityCartSlice({ productId: product.id, quantity }));
    }
  }, [quantity]);

  // const onAddToCart = () => {
  //   const cartProduct = { ...product, quantity };
  //   dispatch(addToCart(cartProduct));
  // };

  // const onRemoveFromCart = () => {
  //   setQuantity(1);
  //   dispatch(removeFromCart(product.id));
  // };

  // const handleButtonPress = () => {
  //   if (isInCart) {
  //     onRemoveFromCart();
  //   } else {
  //     onAddToCart();
  //   }
  // };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("ProductDetails", {
          productId: product.id,
        })
      }
      style={{ backgroundColor: colors.background }}
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
        {/* <View style={styles.footer}>
          <TouchableOpacity
            style={
              isInCart
                ? [styles.removeButton, { backgroundColor: colors.error }]
                : [styles.addButton, { backgroundColor: colors.primary }]
            }
            onPress={handleButtonPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, { color: colors.surface }]}>
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </Text>
          </TouchableOpacity>

          <View
            style={[
              styles.quantityContainer,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={styles.quantityButton}
            >
              <Text style={[styles.quantityButtonText, { color: colors.text }]}>
                −
              </Text>
            </TouchableOpacity>
            <TextInput
              style={[styles.quantityInput, { color: colors.text }]}
              placeholderTextColor={colors.textSecondary}
              selectionColor={colors.primary}
              cursorColor={colors.primary}
              value={quantity.toString()}
              onChangeText={(text) => {
                const num = parseInt(text) || 1;
                setQuantity(Math.max(1, num));
              }}
              keyboardType="number-pad"
              maxLength={3}
            />
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={styles.quantityButton}
            >
              <Text style={[styles.quantityButtonText, { color: colors.text }]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  removeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 13,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1,
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityInput: {
    width: 40,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
  },
});
