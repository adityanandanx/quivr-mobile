import { FC } from "react";
import PageContainer from "../../../components/PageContainer";
import { Text } from "react-native-paper";
import { useSupabase } from "../../../providers/supabase-provider";

interface UserProps {}

const User: FC<UserProps> = ({}) => {
  const { session } = useSupabase();

  return (
    <PageContainer>
      <Text variant="headlineLarge">
        Hello {session?.user.email?.split("@")[0]}
      </Text>
      <Text variant="titleMedium">{session?.user.email}</Text>
    </PageContainer>
  );
};

export default User;
