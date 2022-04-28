import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const DateTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="bottom-end" />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 600,
  },
});

export enum HTTPMethod {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export interface Response<T> {
  isSuccess: boolean;
  data: T;
}

export const capitalizedAlphaRegex =
  /^[A-ZĄČĘĖĮŠŲŪŽ][A-Za-z ĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/;
