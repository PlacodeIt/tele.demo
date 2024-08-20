import * as React from "react";
import { useEffect, useState } from "react";
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
import { useGreeting } from "./CurrentTime.tsx";
import axios from "../../setupAxios";

const pages = [
  {
    text: "Search",
    icon: <SearchIcon className="sidebar-icon" />,
    path: "/search",
  },
  {
    text: "Channels",
    icon: <ChannelIcon className="sidebar-icon" />,
    path: "/channels",
  },
  {
    text: "Users",
    icon: <PeopleIcon className="sidebar-icon" />,
    path: "/users",
  },
  {
    text: "Messages",
    icon: <MessageIcon className="sidebar-icon" />,
    path: "/messages",
  },
  {
    text: "Last Seen",
    icon: <HistoryIcon className="sidebar-icon" />,
    path: "/last-seen",
  },
  {
    text: "Favorites",
    icon: <FavoriteIcon className="sidebar-icon" />,
    path: "/favorites",
  },
  {
    text: "Downloads",
    icon: <DownloadIcon className="sidebar-icon" />,
    path: "/downloads",
  },
];

export const SideBar: React.FC = () => {
  const [username, setUsername] = useState("loading...");
  const greeting = useGreeting();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get("/api/users/me");
        console.log("Fetched user data:", response.data);
        setUsername(response.data.username || "Guest");
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername("guest");
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="sidebar-container">
      <Box className="sidebar-box">
        <div className="sidebar-greeting">
          Welcome {username}!<br /> {greeting}.<br />
          How can we help you today?
        </div>
        <List>
          {pages.map((page) => (
            <ListItem key={page.text} disablePadding>
              <ListItemButton component={Link} to={page.path} className="link">
                <ListItemIcon className="icon-container">
                  {page.icon}
                </ListItemIcon>
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
