import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import Product, { CartProduct } from "../../models/Product";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeColors } from "../../redux/selectors/themeSelectors";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setQuantity,
} from "../../redux/slices/cartSlice";
import { selectIsProductInCart } from "../../redux/selectors/cartSelectors";
import { selectProductQuantity } from "../../redux/selectors/cartSelectors";
import NumberInput from "../NumberInput";

interface Props {
  product: CartProduct | Product;
}

// Type guard to check if product is CartProduct
function isCartProduct(product: CartProduct | Product): product is CartProduct {
  return "quantity" in product;
}

export default function AddToCart({ product }: Props) {
  const colors = useSelector(selectThemeColors);
  const dispatch = useDispatch();
  const [localQuantity, setLocalQuantity] = useState<number>(1);

  const isInCart = useSelector((state: any) =>
    selectIsProductInCart(state, product.id)
  );
  const cartQuantity = useSelector((state: any) =>
    selectProductQuantity(state, product.id)
  );
  const currentQuantity = isInCart ? cartQuantity : localQuantity;

  // Reset local quantity to 1 when product is removed from cart
  useEffect(() => {
    if (!isInCart) {
      setLocalQuantity(1);
    }
  }, [isInCart]);

  const handleAddToCart = () => {
    if (!isInCart) {
      const cartProduct: CartProduct = { ...product, quantity: localQuantity };
      dispatch(addToCart(cartProduct));
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
    setLocalQuantity(1);
  };

  const handleDecrease = () => {
    if (isInCart) {
      dispatch(decreaseQuantity(product.id));
    } else {
      setLocalQuantity(Math.max(1, localQuantity - 1));
    }
  };

  const handleIncrease = () => {
    if (isInCart) {
      dispatch(increaseQuantity(product.id));
    } else {
      setLocalQuantity(localQuantity + 1);
    }
  };

  const handleQuantityChange = (text: string) => {
    const num = parseInt(text) || 1;
    const validQuantity = Math.max(1, num);

    if (isInCart) {
      dispatch(
        setQuantity({
          productId: product.id,
          quantity: validQuantity,
        })
      );
    } else {
      setLocalQuantity(validQuantity);
    }
  };

  return (
    <View style={styles.container}>
      {isInCart ? (
        <TouchableOpacity
          style={[styles.removeButton, { backgroundColor: colors.error }]}
          onPress={handleRemoveFromCart}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, { color: colors.surface }]}>
            Remove
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={handleAddToCart}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, { color: colors.surface }]}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      )}
      <NumberInput
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
        handleQuantityChange={handleQuantityChange}
        initValue={currentQuantity}
      />
      {/* <View
        style={[
          styles.quantityContainer,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleDecrease}
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
          value={currentQuantity.toString()}
          onChangeText={handleQuantityChange}
          keyboardType="number-pad"
          maxLength={3}
        />
        <TouchableOpacity
          onPress={handleIncrease}
          style={styles.quantityButton}
        >
          <Text style={[styles.quantityButtonText, { color: colors.text }]}>
            +
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
