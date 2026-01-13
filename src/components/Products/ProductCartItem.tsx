import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState } from "react";
import Product, { CartProduct } from "../../models/Product";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/HomeStackNavigator";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setQuantity,
} from "../../redux/slices/cartSlice";

interface Props {
  product: CartProduct;
}

export default function ProductListItem({ product }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams, "ProductList">>();
  //   const [quantity, setQuantity] = useState(product.quantity);

  const dispatch = useDispatch();

  //   const onAddToCart = () => {
  //     const cartProduct = { ...product, quantity };

  //     dispatch(addToCart(cartProduct));
  //   };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("ProductDetails", {
          productId: product.id,
        })
      }
    >
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => dispatch(removeFromCart(product.id))}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => dispatch(decreaseQuantity(product.id))}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              value={product.quantity.toString()}
              onChangeText={(text) => {
                const num = parseInt(text) || 1;
                dispatch(
                  setQuantity({
                    productId: product.id,
                    quantity: Math.max(1, num),
                  })
                );
              }}
              keyboardType="number-pad"
              maxLength={3}
            />
            <TouchableOpacity
              onPress={() => dispatch(increaseQuantity(product.id))}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 12,
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
    color: "#2ecc71",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quantityInput: {
    width: 40,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
  },
});
