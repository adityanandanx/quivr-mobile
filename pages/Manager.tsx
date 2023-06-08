import { FC } from "react";
import { useSupabase } from "../providers/supabase-provider";
import DashboardNavigation from "../components/Dashboard";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomAppBar from "../components/CustomAppBar";
import PageContainer from "../components/PageContainer";
import { Text } from "react-native-paper";

interface ManagerProps {}

const Stack = createNativeStackNavigator();

const Manager: FC<ManagerProps> = () => {
  const { session, isPending } = useSupabase();

  if (isPending) {
    return (
      <PageContainer>
        <Text>Loading...</Text>
      </PageContainer>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomAppBar {...props} />,
      }}
    >
      {!session ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{ headerBackVisible: false }}
            name="Dashboard"
            component={DashboardNavigation}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
export default Manager;
