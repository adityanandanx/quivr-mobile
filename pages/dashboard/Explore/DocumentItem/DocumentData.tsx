import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAxios } from "../../../../lib/useAxios";
import { useSupabase } from "../../../../providers/supabase-provider";
import {
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  Portal,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { ScrollView, View } from "react-native";

interface DocumentDataProps {
  documentName: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  fetchDocuments: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DocumentDetails = any;
//TODO: review this component logic, types and purposes

const DocumentData = ({
  documentName,
  open,
  setOpen,
  fetchDocuments,
}: DocumentDataProps): JSX.Element => {
  const { session } = useSupabase();
  const { axiosInstance } = useAxios();

  const [documents, setDocuments] = useState<DocumentDetails[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const theme = useTheme();

  if (!session) {
    throw new Error("User session not found");
  }

  useEffect(() => {
    const fetchDocuments = async () => {
      const res = await axiosInstance.get<{ documents: DocumentDetails[] }>(
        `/explore/${documentName}`
      );
      setDocuments(res.data.documents);
    };
    fetchDocuments();
  }, [axiosInstance, documentName]);

  const deleteDocument = async (name: string) => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/explore/${name}`);
      setDocuments((docs) => docs.filter((doc) => doc.name !== name)); // Optimistic update
    } catch (error) {
      console.error(`Error deleting ${name}`, error);
    }
    setIsDeleting(false);
    fetchDocuments();
    setOpen(false);
  };

  return (
    <Portal>
      <Modal visible={open} onDismiss={() => setOpen(false)}>
        <Surface style={{ maxWidth: 500 }} elevation={1}>
          <IconButton
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              margin: 16,
              zIndex: 100,
            }}
            onPress={() => setOpen(false)}
            icon="close"
          />
          <ScrollView style={{ padding: 32, paddingVertical: 64 }}>
            <Text variant="headlineSmall" style={{}}>
              {documentName}
            </Text>
            <Text>No. of chunks: {documents.length}</Text>
            <Button
              mode="contained-tonal"
              style={{ alignSelf: "flex-start", marginVertical: 8 }}
              textColor={theme.colors.error}
              buttonColor={theme.colors.errorContainer}
              loading={isDeleting}
              onPress={() => deleteDocument(documentName)}
            >
              Delete
            </Button>

            <Divider style={{ marginVertical: 32 }} />

            <ScrollView>
              {documents[0] &&
                Object.keys(documents[0]).map((doc) => {
                  return (
                    <View style={{ marginBottom: 16 }} key={doc}>
                      <Text
                        variant="titleMedium"
                        style={{ textTransform: "capitalize" }}
                      >
                        {doc.replaceAll("_", " ")}:
                      </Text>
                      <Text>{documents[0][doc] || "Not Available"}</Text>
                    </View>
                  );
                })}
            </ScrollView>
          </ScrollView>
        </Surface>
      </Modal>
    </Portal>
  );
};

export default DocumentData;
