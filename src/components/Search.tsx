import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectThemeColors } from "../redux/selectors/themeSelectors";
// import { Timeout } from "NodeJS";

interface Props {
  onSearch: (query: string) => void;
  placeholder?: string;
  query: string;
}

export default function Search({
  onSearch,
  placeholder = "Search products...",
  query,
}: Props) {
  const [searchQuery, setSearchQuery] = useState(query || "");
  const colors = useSelector(selectThemeColors);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  // Debounced search - zoek automatisch na 500ms stilte
  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Als query leeg is, clear search
    if (searchQuery.trim() === "") {
      onSearch("");
      return;
    }

    // Set nieuwe timer voor search
    debounceTimer.current = setTimeout(() => {
      onSearch(searchQuery.trim());
    }, 500);
  }, [searchQuery, onSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            activeOpacity={0.6}
          >
            <Text style={[styles.clearText, { color: colors.textSecondary }]}>
              ×
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleSearch}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, { color: colors.surface }]}>
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingRight: 40,
    fontSize: 14,
    borderWidth: 1,
  },
  clearButton: {
    position: "absolute",
    right: 8,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },
  clearText: {
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 24,
  },
  button: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
