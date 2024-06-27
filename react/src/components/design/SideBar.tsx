import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ChannelIcon from "@mui/icons-material/Tv";
import PeopleIcon from "@mui/icons-material/People";
import MessageIcon from "@mui/icons-material/Message";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/Download";
import "./SideBar.css";

const pages = [
  { text: "Search", icon: <SearchIcon />, path: "/search" },
  { text: "Channels", icon: <ChannelIcon />, path: "/channels" },
  { text: "Users", icon: <PeopleIcon />, path: "/users" },
  { text: "Messages", icon: <MessageIcon />, path: "/messages" },
  { text: "Last Seen", icon: <HistoryIcon />, path: "/last-seen" },
  { text: "Favorites", icon: <FavoriteIcon />, path: "/favorites" },
  { text: "Downloads", icon: <DownloadIcon />, path: "/downloads" },
];

export const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  return (
    <div className="sidebar-container">
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        className="menu-button"
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {pages.map((page) => (
              <ListItem key={page.text} disablePadding>
                <ListItemButton component={Link} to={page.path}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default SideBar;
