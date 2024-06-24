import * as React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { fetchChannels } from "../api"; // Assuming you have an API utility to fetch channels data

interface Channel {
  id: string;
  name: string;
  description: string;
}

const ChannelTableContainer = styled(TableContainer)`
  margin-top: 20px;
`;

const ChannelTable: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadChannels = async () => {
      const data = await fetchChannels();
      setChannels(data);
    };
    loadChannels();
  }, []);

  const handleFavoriteToggle = (channelId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(channelId)
        ? prevFavorites.filter((id) => id !== channelId)
        : [...prevFavorites, channelId]
    );
  };

  return (
    <ChannelTableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Channel Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Favorite</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {channels.map((channel) => (
            <TableRow key={channel.id}>
              <TableCell>{channel.name}</TableCell>
              <TableCell>{channel.description}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => handleFavoriteToggle(channel.id)}
                  color="primary"
                >
                  {favorites.includes(channel.id) ? (
                    <StarIcon />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ChannelTableContainer>
  );
};

export default ChannelTable;
