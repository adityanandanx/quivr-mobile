import {
  Dispatch,
  RefObject,
  SetStateAction,
  forwardRef,
  useState,
} from "react";

import DocumentData from "./DocumentData";
import { useSupabase } from "../../../../providers/supabase-provider";
import { useAxios } from "../../../../lib/useAxios";
import {
  Button,
  Card,
  IconButton,
  List,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import { Document } from "../types";
import { View } from "react-native";

interface DocumentProps {
  document: Document;
  setDocuments: Dispatch<SetStateAction<Document[]>>;
  fetchDocuments: () => void;
}

const DocumentItem = ({
  document,
  setDocuments,
  fetchDocuments,
}: DocumentProps) => {
  const { session } = useSupabase();
  const [modalOpen, setModalOpen] = useState(false);

  if (!session) {
    throw new Error("User session not found");
  }
  return (
    <>
      <List.Item
        right={(props) => (
          <Button onPress={() => setModalOpen(true)} mode="contained-tonal">
            View
          </Button>
        )}
        title={document.name}
        titleEllipsizeMode="clip"
        titleNumberOfLines={2}
      />
      <DocumentData
        open={modalOpen}
        setOpen={setModalOpen}
        documentName={document.name}
        fetchDocuments={fetchDocuments}
      />
    </>
  );
};
DocumentItem.displayName = "DocumentItem";
export default DocumentItem;
