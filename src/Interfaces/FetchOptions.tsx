import { HTTPMethod } from "../Enums/HTTPMethod";

//TODO: Check if needed
export interface FetchOptions {
  url: string;
  httpMethod: HTTPMethod;
  payload?: BodyInit | null;
  sendAuth?: boolean;
}
