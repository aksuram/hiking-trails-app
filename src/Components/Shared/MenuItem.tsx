import { Link } from "react-router-dom";

import { ListItemButton, ListItemIcon } from "@mui/material";

interface Props {
  linkTo: string;
  text: string;
  menuItemIcon?: React.ReactNode;
  handleCloseMenu: () => void;
}

const MenuItem = ({ linkTo, text, menuItemIcon, handleCloseMenu }: Props) => {
  return (
    <ListItemButton
      disableRipple
      component={Link}
      to={linkTo}
      onClick={handleCloseMenu}
    >
      <ListItemIcon sx={{ minWidth: "40px" }}>{menuItemIcon}</ListItemIcon>
      {text}
    </ListItemButton>
  );
};

export default MenuItem;
