import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import PostsIcon from "@mui/icons-material/TextSnippetOutlined";
import NavBarUser from "./NavBarUser";
import { Link } from "react-router-dom";

const drawerWidth = 200;

const listItems: { name: string; path: string; icon: React.ReactElement }[] = [
  { name: "Namai", path: "/", icon: <HomeIcon /> },
  { name: "Įrašai", path: "/posts", icon: <PostsIcon /> },
];

const NavBar = () => {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar variant="dense">
          <Typography variant="h6" noWrap component="div">
            Hiking Trails
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex" }} />
          <Box sx={{ flexGrow: 0 }}>
            <NavBarUser />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar variant="dense" />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {listItems.map((item) => (
              <ListItemButton component={Link} key={item.name} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default NavBar;
