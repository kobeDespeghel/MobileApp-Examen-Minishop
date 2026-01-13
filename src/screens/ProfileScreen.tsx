import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectThemeColors } from "../redux/selectors/themeSelectors";

export default function ProfileScreen() {
  const colors = useSelector(selectThemeColors);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
