import { StatusBar } from "expo-status-bar";
import Paper from "./providers/Paper";
import { StyleSheet } from "react-native";
import DashboardNavigation from "./components/Dashboard";
import SupabaseProvider from "./providers/supabase-provider";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/auth/Login";
import CustomAppBar from "./components/CustomAppBar";
import Signup from "./pages/auth/Signup";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Paper>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <CustomAppBar {...props} />,
        }}
      >
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Signup" component={Signup} />

        <Stack.Screen
          options={{ headerBackVisible: false }}
          name="Dashboard"
          component={DashboardNavigation}
        />
      </Stack.Navigator>
    </Paper>
  );
}
