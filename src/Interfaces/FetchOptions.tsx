import { HTTPMethod } from "../Enums/HTTPMethod";

export interface FetchOptions {
  httpMethod: HTTPMethod;
  payload?: BodyInit | null;
}
