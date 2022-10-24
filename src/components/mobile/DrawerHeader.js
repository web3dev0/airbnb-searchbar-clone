import React from "react";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import TopTab from "./TopTab";

const CloseButton = (props) => {
  const { iscloseBtn } = props;
  return (
    <Box
      sx={{
        position: "absolute",
        border: "1px solid rgb(176, 176, 176)",
        zIndex: 1,
        display: "flex",
        justifyContent: "flex - end",
        borderRadius: "50%",
        border: "1px solid rgba(118, 118, 118, 0.08)",
        boxShadow: "rgb(0 0 0 / 8%) 0px 1px 2px, rgb(0 0 0 / 5%) 0px 4px 12px ",
        transition:
          "-ms-transform 0.25s ease 0s, -webkit-transform 0.25s ease 0s, transform 0.25s ease 0s ",
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        cursor: "pointer",
      }}
    >
      <SvgIcon
        viewBox="0 0 32 32"
        style={{
          display: "block",
          height: 12,
          fill: "none",
          width: 12,
          overflow: "visible",
          stroke: "currentcolor",
          strokeWidth: 5.33333,
        }}
      >
        {iscloseBtn && (
          <>
            <path d="m6 6 20 20"></path>
            <path d="m26 6-20 20"></path>
          </>
        )}

        {!iscloseBtn && (
          <g fill="none">
            <path d="m4 16h26"></path>
            <path d="m15 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
          </g>
        )}
      </SvgIcon>
    </Box>
  );
};

export default function DrawerHeader(props) {
  const { onClose, iscloseBtn = true } = props;

  return (
    <Box sx={{ height: 60, display: "flex", position: "relative" }}>
      <Box onClick={onClose} sx={{ position: "absolute", top: 22, left: 20 }}>
        <CloseButton iscloseBtn={iscloseBtn} />
      </Box>
      <TopTab />
    </Box>
  );
}
