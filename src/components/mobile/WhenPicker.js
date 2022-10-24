import React from "react";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import { styled } from "@mui/system";
import SelectDateTypeTab from "../desktop/SelectDateTypeTab";
import FlexDateSelector from "./FlexDateSelector";
import DateRangeSelector from "./DateRangeSelector";

export default function WhenPicker(props) {
  const { value, onClick, onChange } = props;
  const [indexTab, setIndexTab] = React.useState(0);

  const onTabClick = (index) => {
    setIndexTab(index);
  };
  const onFlexDateChange = (value) => {
    onChange(
      !value.goAnyTime
        ? `Any ${value.stayFor}`
        : `${value.stayFor} in ${value.goAnyTime}`
    );
  };
  const onDateRangeChange = (value, day) => {
    onChange(
      `${value[0].format("MMM")} ${value[0].format("D")} - ${value[1].format(
        "MMM"
      )} ${value[1].format("D")} ${!day ? "" : `(±${day} days) `}`
    );
  };
  return (
    <Box sx={{ height: "72vh" }}>
      <Box
        sx={{
          color: "rgb(34,34,34)",
          fontSize: "22px",
          fontWeight: "800",
          lineHeight: "26px",
          margin: 0,
          padding: 0,
        }}
      >
        When's your trip?
      </Box>
      <Box
        sx={{ paddingTop: "16px", display: "flex", flexDirection: "column" }}
      >
        <SelectDateTypeTab index={indexTab} onChange={onTabClick} />

        <Box
          sx={{
            display: indexTab === 0 ? "block" : "none",
          }}
        >
          <DateRangeSelector onChange={onDateRangeChange} />
        </Box>

        <Box
          sx={{
            display: indexTab !== 0 ? "block" : "none",
          }}
        >
          <FlexDateSelector onChange={onFlexDateChange} textAlign={"left"} />
        </Box>
      </Box>
    </Box>
  );
}
