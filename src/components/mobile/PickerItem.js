import React from "react";
import Box from "@mui/material/Box";

import WherePicker from "./WherePicker";
import WhenPicker from "./WhenPicker";

import { MobilePickerType as PICKERTYPE } from "../../constants";

const subComponents = {
  [PICKERTYPE.WHERE]: WherePicker,
  [PICKERTYPE.WHEN]: WhenPicker,
};

export default function PickerItem(props) {
  const { isActive, item, onClick, onChange } = props;
  const SubComponent = subComponents[item.key];
  return (
    <Box
      sx={{
        paddingBottom: "12px",
      }}
      onClick={() => {
        !isActive && onClick(item.key);
      }}
    >
      <Box
        sx={{
          borderRadius: isActive ? "24px" : "16px",
          backgroundColor: "white",
          boxShadow: isActive
            ? "0 0 0 1px rgb(0 0 0 / 4%), 0 6px 20px rgb(0 0 0 / 20%)"
            : "0 1px 2px rgb(0 0 0 / 5%), 0 4px 6px rgb(0 0 0 / 3%)",
          border: "none",
          padding: isActive ? "24px" : "0",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: isActive ? "block" : "none",
          }}
        >
          <SubComponent
            onChange={(value) => {
              onChange(item.key, value);
            }}
          />
        </Box>

        <Box
          sx={{
            padding: "24px 20px",
            borderRadius: "16px",
            margin: 0,
            display: !isActive ? "flex" : "none",
            flexDirection: "row",
            height: "56px",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            outline: "none",
          }}
        >
          <Box
            sx={{
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: 600,
              color: "#717171",
            }}
          >
            {item.key}
          </Box>
          <Box
            sx={{
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: 600,
              color: "#222222",
              whitespace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              paddingLeft: "16px",
              overflow: "hidden",
              height: "18px",
              textAlign: "right",
            }}
          >
            {item.value}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
