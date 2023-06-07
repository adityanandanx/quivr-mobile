import { Card, Surface, Text, useTheme } from "react-native-paper";

const ChatMessage = ({
  speaker,
  text,
  left = false,
}: {
  speaker: string;
  text: string;
  left?: boolean;
}) => {
  const theme = useTheme();
  return (
    <Surface
      mode="flat"
      // style={speaker === "user" ? { white: "pre-line" } : {}} // Add this line to preserve line breaks
      style={{
        padding: 16,
        marginVertical: 8,
        alignSelf: speaker === "user" ? "flex-end" : "flex-start",
        maxWidth: 256,
        borderRadius: theme.roundness,
      }}
    >
      <Text variant="bodySmall" style={{ textTransform: "capitalize" }}>
        {speaker}
      </Text>
      <>
        <Text>{text}</Text>
      </>
    </Surface>
  );
};
ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
