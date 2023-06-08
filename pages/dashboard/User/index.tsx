import { FC } from "react";
import PageContainer from "../../../components/PageContainer";
import { Button, Text, useTheme } from "react-native-paper";
import { useSupabase } from "../../../providers/supabase-provider";

interface UserProps {}

const User: FC<UserProps> = ({}) => {
  const { session, supabase } = useSupabase();
  const theme = useTheme();

  return (
    <PageContainer>
      <Text variant="headlineLarge">
        Hello {session?.user.email?.split("@")[0]}
      </Text>
      <Text variant="titleMedium">{session?.user.email}</Text>
      <Button
        onPress={() => supabase.auth.signOut()}
        style={{ alignSelf: "flex-start" }}
        mode="contained-tonal"
        buttonColor={theme.colors.errorContainer}
      >
        Logout
      </Button>
    </PageContainer>
  );
};

export default User;
