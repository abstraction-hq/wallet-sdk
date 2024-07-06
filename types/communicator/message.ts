export interface Message {
  id?: string;
  type: "request" | "response";
  payload: any;
}
