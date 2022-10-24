import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";

const DAYS = [
  {
    text: "Exact dates",
    value: 0,
  },
  {
    text: "1 day",
    value: 1,
  },
  {
    text: "2 day",
    value: 2,
  },
  {
    text: "3 day",
    value: 3,
  },
  {
    text: "7 day",
    value: 7,
  },
];

export default function FuzzyDateTab(props) {
  const { index: currentDay, onChange } = props;

  const SymbolSVG = () => {
    return (
      <SvgIcon
        viewBox={"0 0 32 32"}
        sx={{
          overflow: "visible",
          fill: "none",
          display: "block",
          height: 12,
          width: 12,
          strokeWidth: "2.66667",
          stroke: "currentcolor",
        }}
      >
        <g fill="none">
          <path d="M16 4v16m-8-8h16M8 26h16"></path>
        </g>
      </SvgIcon>
    );
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        background: "#FFFFFF",
        borderTop: "1px solid #EBEBEB",
        insetInline: "0px",
        position: "absolute",
        bottom: "30px",
        zIndex: "1000",
        overflow: "scroll",
        paddingTop: "8px",
        paddingBottom: "8px",
      }}
    >
      <Box
        sx={{
          overflowX: "auto",
          whiteSpace: "nowrap",
          display: "flex",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {DAYS.map((day) => {
          return (
            <Box
              key={day.value}
              sx={
                day.value === currentDay
                  ? {
                      border: "2px solid rgb(34, 34, 34)",
                      borderRadius: "16px",
                      marginLeft: "10px",
                    }
                  : { marginLeft: "10px" }
              }
              onClick={() => {
                onChange(day);
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                  cursor: "pointer",
                  border: "1px solid rgb(221, 221, 221)",
                  backgroundColor: "rgb(255, 255, 255)",
                  outline: "none",
                  margin: "0px",
                  color: "rgb(34, 34, 34)",
                  position: "relative",
                  padding: "4px 12px",
                  minHeight: "32px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  lineHeight: "18px",
                }}
              >
                {day.value !== 0 && (
                  <span style={{ paddingRight: "4px", display: "block" }}>
                    <SymbolSVG />
                  </span>
                )}
                <span>{day.text}</span>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
}
