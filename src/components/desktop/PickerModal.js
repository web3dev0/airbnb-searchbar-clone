import * as React from "react";
import Box from "@mui/material/Box";

const _style = {
  background: "#FFFFFF",
  borderRadius: "32px",
  boxShadow: "0 0 0 1px rgb(0 0 0 / 4%), 0 8px 16px rgb(0 0 0 / 15%)",
  marginTop: "12px",
  padding: "16px 32px",
  left: 0,
  position: "absolute",
  top: "100%",
  zIndex: 1500,
  maxHeight: "calc(100vh - 150px)",
  overflowX: "hidden",
  overflowY: "auto",
  overscrollBehavior: "contain",
};
export default function PickerModal(props) {
  const { children, style } = props;

  return <Box sx={{ ..._style, ...style }}>{children}</Box>;
}
