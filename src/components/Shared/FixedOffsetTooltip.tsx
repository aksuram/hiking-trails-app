import { styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

export const FixedOffsetTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 600,
  },
  [`& .${tooltipClasses.tooltipPlacementBottom}`]: {
    marginTop: "5px !important",
  },
  [`& .${tooltipClasses.tooltipPlacementTop}`]: {
    marginBottom: "5px !important",
  },
});
