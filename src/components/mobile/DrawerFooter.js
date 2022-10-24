import React from "react";

import AppBar from "@mui/material/AppBar";

import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";

const StyledButton = styled(Button)({
  lineHeight: "20px",
  height: "46px",
  fontSize: 16,
  fontWeight: 600,
  background:
    "linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%)",

  color: "#FFFFFF",
  textTransform: "none",
  padding: "14px 24px",
  margin: 0,
});

const ClearButton = styled(Button)({
  lineHeight: "20px",
  fontSize: 16,
  fontWeight: 600,
  border: "none",
  background: "transparent",
  color: "rgb(0,0,0)",
  padding: "10px",
  textTransform: "none",
  touchAction: "manipulation",
  textDecoration: "underline",
});

export default function DrawerFooter(props) {
  const { onClear, onSearch } = props;

  return (
    <AppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
        height: "71px",
        backgroundColor: "rgba(255,255,255)",
      }}
    >
      <Toolbar
        sx={{
          padding: "12px 24px 12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ClearButton href="#text-buttons" onClick={onClear}>
          Clear all
        </ClearButton>
        <StyledButton onClick={onSearch} startIcon={<SearchIcon />}>
          Search
        </StyledButton>
      </Toolbar>
    </AppBar>
  );
}
