import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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
  return (
    <div className="sidebar-container">
      <Box className="sidebar-box">
        <List>
          {pages.map((page) => (
            <ListItem key={page.text} disablePadding>
              <ListItemButton component={Link} to={page.path} className="link">
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default SideBar;
