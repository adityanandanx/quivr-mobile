import { FC, useEffect, useState } from "react";
import PageContainer from "../../../components/PageContainer";
import {
  ActivityIndicator,
  Button,
  List,
  Portal,
  Snackbar,
  Text,
} from "react-native-paper";
import { useAxios } from "../../../lib/useAxios";
import { useSupabase } from "../../../providers/supabase-provider";
import * as NavigationService from "react-navigation-helpers";
import DocumentItem from "./DocumentItem";
import { Document } from "./types";
import getApiDomain from "../../../lib/context/BrainConfigProvider/helpers/getApiUrl";

interface ExploreProps {}

const Explore: FC<ExploreProps> = ({}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<{ message: string } | null>(null);
  const { session } = useSupabase();
  const { axiosInstance } = useAxios();

  if (!session) {
    NavigationService.navigate("Login");
  }
  const fetchDocuments = async () => {
    setIsPending(true);
    try {
      console.log(`WAIT: Fetching documents from ${getApiDomain()}/explore`);
      const response = await axiosInstance.get<{ documents: Document[] }>(
        "/explore"
      );
      setDocuments(response.data.documents);
      console.log(`DONE: Fetched documents from ${getApiDomain()}/explore`);
    } catch (error) {
      // console.error("Error fetching documents", error);
      setError(error as { message: string });
      setDocuments([]);
      setIsPending(false);
    }
    setIsPending(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, [session?.access_token]);

  return (
    <PageContainer onRefresh={() => fetchDocuments()}>
      <Text variant="headlineLarge">Explore</Text>
      <Text variant="titleMedium">
        View or delete stored data used by your brain
      </Text>
      <List.Section>
        {!isPending ? (
          documents.length > 0 ? (
            documents.map((doc) => (
              <DocumentItem
                document={doc}
                key={doc.name + doc.size}
                setDocuments={setDocuments}
                fetchDocuments={fetchDocuments}
              />
            ))
          ) : (
            <>
              <Text style={{ textAlign: "center", marginTop: 32 }}>
                Oh No! Your brain is empty
              </Text>
              <Text style={{ textAlign: "center" }}>
                Upload some files first
              </Text>
            </>
          )
        ) : (
          <ActivityIndicator />
        )}
      </List.Section>
      <Portal>
        <Snackbar
          action={{
            label: "Retry",
            onPress: () => {
              fetchDocuments();
            },
          }}
          visible={error !== null}
          onDismiss={() => setError(null)}
        >
          {error?.message}
        </Snackbar>
      </Portal>
    </PageContainer>
  );
};

export default Explore;
