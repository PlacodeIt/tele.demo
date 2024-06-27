import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchChannels from "../services/ChannelService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface Channelprops {
  _id: { $oid: string };
  chat_id: number;
  about: string;
  admins_count: number | null;
  banned_count: number | null;
  kicked_count: number | null;
  online_count: number;
  participants_count: number;
  read_inbox_max_id: number;
  read_outbox_max_id: number;
  title: string;
  type: string;
  unread_count: number;
}

export const TableChannels: React.FC = () => {
  const { data, error, isLoading } = useQuery<Channelprops[]>({
    queryKey: ["Channels"],
    queryFn: fetchChannels,
  });

  const [favorites, setFavorites] = useState<string[]>([]);

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  const handleFavoriteToggle = (channelId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(channelId)
        ? prevFavorites.filter((id) => id !== channelId)
        : [...prevFavorites, channelId]
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Participants</TableCell>
            <TableCell align="right">Online</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Favorite</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((channel) => (
            <TableRow key={channel._id.$oid}>
              <TableCell>{channel.title}</TableCell>
              <TableCell align="right">{channel.participants_count}</TableCell>
              <TableCell align="right">{channel.online_count}</TableCell>
              <TableCell align="right">{channel.type}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => handleFavoriteToggle(channel._id.$oid)}
                  color="primary"
                >
                  {favorites.includes(channel._id.$oid) ? (
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
    </TableContainer>
  );
};
