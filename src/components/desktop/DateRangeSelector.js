import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";

function DateRangeSelector(props) {
  const { value, onChange } = props;
  return (
    <Box
      sx={{
        "& >div > div > div > div:nth-of-type(1)": {
          display: "none",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateRangePicker
          disablePast
          displayStaticWrapperAs="desktop"
          value={value}
          onChange={(newValue) => {
            onChange(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default React.memo(DateRangeSelector);
