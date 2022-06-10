import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

export const DateTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="bottom-end" />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 600,
  },
});
