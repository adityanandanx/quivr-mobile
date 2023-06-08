import { useCallback, useState } from "react";
import { useSupabase } from "../../../../providers/supabase-provider";
import { useAxios } from "../../../../lib/useAxios";
import { Document, Message } from "../types";
import * as DocumentPicker from "expo-document-picker";

export const useFileUploader = () => {
  const [isPending, setIsPending] = useState(false);
  const [files, setFiles] = useState<Document[]>([]);
  const [message, setMessage] = useState<Message | null>(null);

  const { session } = useSupabase();

  const { axiosInstance } = useAxios();

  const upload = useCallback(
    async (file: Document) => {
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimetype,
      });
      // console.log(formData);

      try {
        // const response = await axiosInstance.get("/");
        const response = await axiosInstance.post(`/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // publish({
        //   variant: response.data.type,
        //   text:
        //     (response.data.type === "success"
        //       ? "File uploaded successfully: "
        //       : "") + JSON.stringify(response.data.message),
        // });
        console.log(response);
        setMessage(response.data);
      } catch (error: unknown) {
        setMessage(error as Message);

        // publish({
        //   variant: "danger",
        //   text: "Failed to upload file: " + JSON.stringify(error),
        // });
      }
    },
    [session?.access_token]
  );

  const uploadAllFiles = async () => {
    if (files.length === 0) {
      return;
    }
    setIsPending(true);

    await Promise.all(files.map((file) => upload(file)));

    setFiles([]);
    setIsPending(false);
  };

  const removeFile = (uri: string) => {
    setFiles((files) => files.filter((f) => f.uri !== uri));
  };

  const addFile = async () => {
    const docs = await DocumentPicker.getDocumentAsync({
      multiple: true,
    });
    if (docs.type === "success") {
      setFiles((files) => {
        const newDoc = {
          uri: docs.uri,
          name: docs.name,
          mimetype: docs.mimeType,
        };
        return [...files, newDoc];
      });
    }
    // console.log("ERROR", e);
  };

  const clearMessage = () => {
    setMessage(null);
  };

  return {
    isPending,
    uploadAllFiles,
    files,
    addFile,
    removeFile,
    message,
    clearMessage,
  };
};
