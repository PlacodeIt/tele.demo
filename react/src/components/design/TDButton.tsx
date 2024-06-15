import { Button, CircularProgress } from '@mui/material';
import React from "react";


interface TDButtonProps {
  onPress: () => void;
  text: string;
  color?: "primary" | "secondary";
  isLoading?: boolean;
}

export function TDButton(props: TDButtonProps) {
  const { onPress, text, color = "primary", isLoading } = props;

  function renderContents() {
    if (isLoading) {
      return <CircularProgress color="inherit" size={20} />;
    }
    return text;
  }

  return (
    <Button fullWidth variant="contained" color={color} onClick={onPress}>
      {renderContents()}
    </Button>
  );
}
