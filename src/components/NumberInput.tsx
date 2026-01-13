import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import { selectThemeColors } from "../redux/selectors/themeSelectors";
import { useEffect, useState } from "react";

interface Props {
  handleDecrease?: () => void;
  handleIncrease?: () => void;
  handleQuantityChange?: (text: string) => void;
  initValue: number;
}

export default function NumberInput({
  handleDecrease,
  handleIncrease,
  handleQuantityChange,
  initValue,
}: Props) {
  const colors = useSelector(selectThemeColors);
  const [value, setValue] = useState<number>(initValue);

  // Sync local state when initValue changes from parent (Redux updates from other screens)
  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const onDecrease = () => {
    const newValue = Math.max(1, value - 1);
    setValue(newValue);
    if (handleDecrease) handleDecrease();
  };

  const onIncrease = () => {
    const newValue = value + 1;
    setValue(newValue);
    if (handleIncrease) handleIncrease();
  };

  const onQuantityChange = (text: string) => {
    const numericValue = parseInt(text);
    if (!isNaN(numericValue) && numericValue > 0) {
      setValue(numericValue);
      if (handleQuantityChange) handleQuantityChange(text);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
      ]}
    >
      <TouchableOpacity onPress={onDecrease} style={styles.quantityButton}>
        <Text style={[styles.quantityButtonText, { color: colors.text }]}>
          −
        </Text>
      </TouchableOpacity>
      <TextInput
        style={[styles.quantityInput, { color: colors.text }]}
        placeholderTextColor={colors.textSecondary}
        selectionColor={colors.primary}
        cursorColor={colors.primary}
        value={value.toString()}
        onChangeText={onQuantityChange}
        keyboardType="number-pad"
        maxLength={3}
      />
      <TouchableOpacity onPress={onIncrease} style={styles.quantityButton}>
        <Text style={[styles.quantityButtonText, { color: colors.text }]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
