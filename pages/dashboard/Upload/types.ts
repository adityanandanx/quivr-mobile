export interface Document {
  uri: string;
  name: string;
  mimetype?: string;
}

export interface Message {
  type: "error" | "warning" | "success";
  message: string;
}
