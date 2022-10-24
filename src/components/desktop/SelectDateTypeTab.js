import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const defaultStyle = {
  borderRadius: " 100px",
  fontSize: "14px",
  lineHeight: "18px",
  fontWeight: 600,
  color: "rgb(34, 34, 34)",
  padding: "8px 12px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginTop: "4px",
  marginBottom: "4px",
  marginRight: 0,
  transition:
    "box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s",
  position: "relative",
  outline: "none",
  flex: 1,
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
};

export default function SelectDateTypeTab(props) {
  const { index: indexTab, onChange } = props;

  const onTabClick = (index) => {
    onChange(index);
  };

  const calcStyle = (index) => {
    let newStyle = {
      ...defaultStyle,
    };
    if (index === indexTab) {
      newStyle["background"] = "rgb(255, 255, 255)";
      newStyle["border"] = "1px solid rgba(0, 0, 0, 0.04)";
      newStyle["boxShadow"] =
        "rgb(0 0 0 / 8%) 0px 1px 2px, rgb(0 0 0 / 5%) 0px 4px 12px";
      return newStyle;
    }
    newStyle["&:hover"] = { background: "rgb(255, 255, 255)" };

    return newStyle;
  };
  return (
    <Box sx={{ paddingBottom: "6px" }}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Stack
          flexDirection="row"
          sx={{
            backgroundColor: "rgb(235, 235, 235)",
            borderRadius: "100px",
            paddingLeft: "4px",
            paddingRight: "4px",
            width: "303px",
            cursor: "pointer",
          }}
        >
          <Box
            sx={calcStyle(0)}
            onClick={() => {
              onTabClick(0);
            }}
          >
            Choose dates
          </Box>
          <Box
            sx={calcStyle(1)}
            onClick={() => {
              onTabClick(1);
            }}
          >
            I'm flexible
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
