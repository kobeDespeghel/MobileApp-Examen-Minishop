import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme } from "../../models/Theme";
import { darkTheme, lightTheme } from "../../constants/themes";

export const fetchThemeFromStorage = createAsyncThunk(
  "theme/fetchThemeFromStorage",
  async (_, { rejectWithValue }) => {
    try {
      const themeData = await AsyncStorage.getItem("@theme");
      if (!themeData) {
        return "light"; // Default to light theme
      }
      return JSON.parse(themeData) as "light" | "dark";
    } catch (error) {
      console.error("Error fetching theme from storage:", error);
      return rejectWithValue("Failed to load theme from storage");
    }
  }
);

export const saveThemeToStorage = async (mode: "light" | "dark") => {
  try {
    await AsyncStorage.setItem("@theme", JSON.stringify(mode));
    console.log("Theme saved to storage:", mode);
  } catch (error) {
    console.error("Error saving theme to AsyncStorage", error);
  }
};

interface ThemeState {
  status: "idle" | "loading" | "succeeded" | "failed";
  mode: "light" | "dark";
  theme: Theme;
}

const initState: ThemeState = {
  status: "idle",
  mode: "light",
  theme: lightTheme,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: initState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      state.theme = state.mode === "light" ? lightTheme : darkTheme;
    },
    setThemeMode: (state, action: PayloadAction<"light" | "dark">) => {
      state.mode = action.payload;
      state.theme = action.payload === "light" ? lightTheme : darkTheme;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThemeFromStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchThemeFromStorage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mode = action.payload;
        state.theme = action.payload === "light" ? lightTheme : darkTheme;
      })
      .addCase(fetchThemeFromStorage.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { toggleTheme, setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
