import { Location } from "react-router-dom";

export const getPageIndexFromLocation = (location: Location) => {
  const urlSearchParams = new URLSearchParams(location.search);
  return parseInt(urlSearchParams.get("page") ?? "1", 10);
};
