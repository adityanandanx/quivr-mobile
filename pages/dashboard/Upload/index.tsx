import { FC, useState } from "react";
import {
  Button,
  Divider,
  FAB,
  IconButton,
  List,
  Portal,
  Snackbar,
  Text,
} from "react-native-paper";
import PageContainer from "../../../components/PageContainer";
import { useFileUploader } from "./hooks/useFileUploader";

interface UploadProps {}

const Upload: FC<UploadProps> = ({}) => {
  const {
    isPending,
    files,
    addFile,
    removeFile,
    uploadAllFiles,
    message,
    clearMessage,
  } = useFileUploader();

  return (
    <PageContainer>
      <Text variant="headlineLarge">Upload Knowledge</Text>
      <Text variant="titleMedium">
        Text, document, spreadsheet, presentation, audio, video, and URLs
        supported
      </Text>
      <Divider style={{ marginVertical: 16 }} />
      <List.Section>
        {files.length > 0 ? (
          <>
            <Button
              loading={isPending}
              onPress={uploadAllFiles}
              mode="contained"
              style={{ alignSelf: "flex-start" }}
            >
              Upload all files
            </Button>
            {files.map((file) => {
              return (
                <List.Item
                  right={(props) => (
                    <IconButton
                      animated
                      onPress={() => removeFile(file.uri)}
                      icon="close"
                      {...props}
                    />
                  )}
                  key={file.uri}
                  title={file.name}
                />
              );
            })}
          </>
        ) : (
          <Text>Click the Add button to add some files</Text>
        )}
      </List.Section>

      <Portal>
        <FAB
          style={{ position: "absolute", right: 0, bottom: 0, margin: 16 }}
          icon={"plus"}
          onPress={addFile}
        />
        {/* Error snack */}
        <Snackbar
          action={{
            label: "Retry",
            onPress: () => {
              uploadAllFiles();
            },
          }}
          visible={message !== null && message.type === "error"}
          onDismiss={clearMessage}
        >
          {message?.message}
        </Snackbar>

        {/* Warning snack */}
        <Snackbar
          action={{
            label: "Dismiss",
            onPress: () => {
              clearMessage();
            },
          }}
          visible={message !== null && message.type === "warning"}
          onDismiss={() => clearMessage()}
        >
          {message?.message}
        </Snackbar>

        {/* Success snack */}
        <Snackbar
          action={{
            label: "Dismiss",
            onPress: () => {
              clearMessage();
            },
          }}
          visible={message !== null && message.type === "success"}
          onDismiss={() => clearMessage()}
        >
          {message?.message}
        </Snackbar>
      </Portal>
    </PageContainer>
  );
};

export default Upload;
