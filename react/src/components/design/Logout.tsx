import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface LogoutProps {
  open: boolean;
  handleClose: () => void;
}

const Logout: React.FC<LogoutProps> = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to exit?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLogout} color="primary">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Logout;
