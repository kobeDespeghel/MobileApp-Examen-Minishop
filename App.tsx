import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import { Provider, useDispatch } from "react-redux";
import { store } from "./src/redux/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/configs/queryClient";
import { useEffect } from "react";
import { fetchThemeFromStorage } from "./src/redux/slices/themeSlice";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchThemeFromStorage() as any);
  }, [dispatch]);

  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </QueryClientProvider>
  );
}
