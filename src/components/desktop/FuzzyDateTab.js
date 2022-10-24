import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import BaseTab from "./BaseTab";

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
        paddingTop: "20px",
        paddingBottom: "8px",
        paddingRight: "115px",
      }}
    >
      {DAYS.map((day) => {
        return (
          <BaseTab
            key={day.value}
            style={
              day.value === currentDay
                ? { border: "2px solid rgb(34, 34, 34)" }
                : {}
            }
            onClick={() => {
              onChange(day);
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {day.value !== 0 && (
                <span style={{ paddingRight: "4px", display: "block" }}>
                  <SymbolSVG />
                </span>
              )}
              <span>{day.text}</span>
            </Box>
          </BaseTab>
        );
      })}
    </Stack>
  );
}
