import { FC } from "react";
import PageContainer from "../../../components/PageContainer";
import {
  ActivityIndicator,
  IconButton,
  Portal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useQuestion } from "./hooks/useQuestion";
import ChatMessages from "./components/ChatMessages";
import { View } from "react-native";

interface ChatProps {}

const Chat: FC<ChatProps> = ({}) => {
  const {
    isPending,
    askQuestion,
    history,
    question,
    resetHistory,
    setQuestion,
  } = useQuestion();

  const theme = useTheme();

  return (
    <PageContainer>
      <Text variant="headlineLarge">Chat With your brain</Text>
      {/* <View style={{ }}> */}
      <ChatMessages history={history} />
      {/* </View> */}
      <Portal>
        <TextInput
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            margin: 10,
          }}
          keyboardType="web-search"
          onSubmitEditing={askQuestion}
          value={question}
          onChangeText={(t) => setQuestion(t)}
          mode="outlined"
          placeholder="Type something"
          right={
            <TextInput.Icon
              disabled={isPending}
              onPress={askQuestion}
              icon={"send"}
            />
          }
        />
      </Portal>
    </PageContainer>
  );
};

export default Chat;
