export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export enum HTTPMethod {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export const capitalizedAlphaRegex =
  /^[A-ZĄČĘĖĮŠŲŪŽ][A-Za-z ĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/;
