import { useCallback, useState } from "react";
import { useSupabase } from "../../../../providers/supabase-provider";
import { useAxios } from "../../../../lib/useAxios";
import { Document } from "../types";
import * as DocumentPicker from "expo-document-picker";

import * as NavigationService from "react-navigation-helpers";
import { AxiosError } from "axios";

export const useFileUploader = () => {
  const [isPending, setIsPending] = useState(false);
  const [files, setFiles] = useState<Document[]>([]);
  const { session } = useSupabase();

  const { axiosInstance } = useAxios();

  if (!session) {
    NavigationService.navigate("Login");
  }

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
      } catch (error: unknown) {
        console.log({ error });

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

  return {
    isPending,
    uploadAllFiles,
    files,
    addFile,
    removeFile,
  };
};
