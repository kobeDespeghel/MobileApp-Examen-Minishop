import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/configs/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}
