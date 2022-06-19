import { HTTPMethod } from "../Enums/HTTPMethod";
import { getUserAuthToken } from "./auth";

export const customFetch = (
  url: string,
  httpMethod: HTTPMethod = HTTPMethod.GET,
  payload?: BodyInit | null,
  sendAuth: boolean = true
) => {
  const requestInit = formRequestInit(httpMethod, sendAuth, payload);

  return fetch(url, requestInit);
};

const formRequestInit = (
  httpMethod: HTTPMethod,
  sendAuth: boolean,
  payload?: BodyInit | null
): RequestInit => {
  let headersInit: HeadersInit = {
    //TODO: Check if needed
    // "Content-Type": "application/json",
  };

  if (sendAuth) {
    headersInit = {
      ...headersInit,
      Authorization: `Bearer ${getUserAuthToken() ?? ""}`,
    };
  }

  return {
    method: httpMethod,
    headers: headersInit,
    body: payload,
  };
};
