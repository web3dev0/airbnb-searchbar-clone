import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { FieldType, DefaultBarText, PickerViewType } from "../../constants";
import { NavContext } from "../../contexts/NavContext";

const StyledInput = styled("input")({
  border: 0,
  margin: 0,
  padding: 0,
  background: "none",
  display: "block",
  width: "100%",
  fontSize: 14,
  lineHeight: "18px",
  fontWeight: 600,
  color: "#222222",
  textOverflow: "ellipsis",
  "&:focus": {
    outline: "none",
    backgroundColor: "rgba(0,0,0,0)",
  },
  "&:focus:not(:placeholder-shown)": {
    paddingRight: "12px",
  },
});

function WherePicker(props) {
  const {
    state: { whereText },
    changeActiveView,
    changeActiveInput,
    changeWhereText,
  } = useContext(NavContext);

  const { style, keyword, onChange } = props;

  const onWhereChange = (e) => {
    // changeWhereText(e.target.value);
    onChange(e.target.value.trim());
    changeActiveView(PickerViewType.SEARCH_WHERE);
  };
  return (
    <Box
      sx={style}
      onClick={() => {
        changeActiveInput(FieldType.WHERE);
        changeActiveView(PickerViewType.DEFAULT_WHERE);
      }}
    >
      <Box
        sx={{
          paddingBottom: "2px",
          fontSize: 12,
          fontWeight: 800,
          lineHeight: "16px",
        }}
      >
        Where
      </Box>
      <StyledInput
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        placeholder="Search destinations"
        value={keyword}
        onChange={onWhereChange}
      ></StyledInput>
    </Box>
  );
}

export default WherePicker;
