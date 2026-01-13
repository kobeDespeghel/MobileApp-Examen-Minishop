import { RootState } from "../store";

export const selectThemeMode = (state: RootState) => state.theme.mode;

export const selectTheme = (state: RootState) => state.theme.theme;

export const selectThemeColors = (state: RootState) => state.theme.theme.colors;
