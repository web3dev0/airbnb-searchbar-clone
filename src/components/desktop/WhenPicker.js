import React from "react";
import Box from "@mui/material/Box";

function WhenPicker(props) {
  const { style, date: dateList, onClick } = props;

  return (
    <Box sx={{ ...style, position: "relative" }} onClick={onClick}>
      <Box display={"flex"}>
        {dateList.map((item, index) => {
          return (
            <Box key={index} sx={{ paddingRight: "75px" }}>
              <Box
                sx={{
                  paddingBottom: "2px",
                  fontSize: 12,
                  fontWeight: 800,
                  lineHeight: "16px",
                }}
              >
                {item.text}
              </Box>
              <Box
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: "18px",
                }}
              >
                {item.value}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default WhenPicker;
