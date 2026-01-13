import { Theme } from "../models/Theme";

export const lightTheme: Theme = {
  mode: "light",
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#333333",
    textSecondary: "#666666",
    border: "#e0e0e0",
    success: "#2ecc71",
    error: "#e74c3c",
    warning: "#f39c12",
  },
};

export const darkTheme: Theme = {
  mode: "dark",
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    background: "#1a1a1a",
    surface: "#2d2d2d",
    text: "#ffffff",
    textSecondary: "#b0b0b0",
    border: "#444444",
    success: "#2ecc71",
    error: "#e74c3c",
    warning: "#f39c12",
  },
};
