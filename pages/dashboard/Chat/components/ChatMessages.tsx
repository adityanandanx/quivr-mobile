import { FC, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { Surface, Text } from "react-native-paper";
import { ScrollView } from "react-native";

interface ChatMessagesProps {
  history: Array<[string, string]>;
}

const ChatMessages: FC<ChatMessagesProps> = ({ history }) => {
  const scrollerRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    scrollerRef.current?.scrollToEnd();
  }, [history]);

  return (
    <ScrollView
      ref={scrollerRef}
      style={{
        marginBottom: 128,
      }}
    >
      {history.length === 0 ? (
        <Text>Ask a question, or describe a task.</Text>
      ) : (
        history.map(([speaker, text], idx) => {
          return (
            <ChatMessage
              // ref={idx === history.length - 1 ? lastChatRef : null}
              key={idx}
              speaker={speaker}
              text={text}
              left={idx % 2 !== 0}
            />
          );
        })
      )}
    </ScrollView>
  );
};
export default ChatMessages;
