import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import SearchIcon from "../SearchButton";
import { FieldType, PickerViewType, DefaultBarText } from "../../constants";

import { NavContext } from "../../contexts/NavContext";

function StaticBar(props) {
  const {
    state,
    showDynamicBar,
    changeActiveViewAndInput,
    changeActiveView,
    changeActiveInput,
  } = useContext(NavContext);

  const onDestinationClick = () => {
    showDynamicBar(true);
    changeActiveViewAndInput(PickerViewType.DEFAULT_WHERE, FieldType.WHERE);
  };
  const onDateRangeClick = () => {
    showDynamicBar(true);
    changeActiveViewAndInput(PickerViewType.WHEN, FieldType.WHEN);
  };

  return (
    <Box
      px={3}
      sx={{
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        sx={{
          height: 48,
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          border: "1px solid #DDDDDD",
          borderRadius: 40,
          cursor: "pointer",
          boxShadow: "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
          transition: "box-shadow 0.2s ease",
          "&:hover": {
            boxShadow: "0 2px 4px rgba(0,0,0,0.18);",
          },
          lineHeight: "18px",
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        <Box px={2} sx={{ lineHeight: "48px" }} onClick={onDestinationClick}>
          {DefaultBarText.WHERE}
        </Box>
        <Divider orientation="vertical" sx={{ height: 20 }} />
        <Box px={2} sx={{ lineHeight: "48px" }} onClick={onDateRangeClick}>
          {DefaultBarText.WHEN}
        </Box>
        <SearchIcon onClick={onDateRangeClick} />
      </Stack>
    </Box>
  );
}

export default React.memo(StaticBar);
