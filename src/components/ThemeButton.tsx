import { Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { selectThemeMode } from "../redux/selectors/themeSelectors";

export default function ThemeButton() {
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button
      title={`${mode === "light" ? "🌙" : "☀️"}`}
      onPress={handleToggleTheme}
    />
  );
}
