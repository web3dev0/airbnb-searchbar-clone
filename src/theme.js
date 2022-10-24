import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          fontSize: 14,
        },
      }),
    },
    MuiDateRangePickerViewDesktop: {
      styleOverrides: {
        container: {
          "&:not(:last-of-type)": {
            borderRight: 0,
          },
        },
      },
    },

    MuiDateRangePickerDay: {
      styleOverrides: {
        rangeIntervalPreview: {
          // border: 0,
          // boxSizing: "border-box",
          // cursor: "pointer",
          // textAlign: "center",
          // position: "relative",
          // color: "rgb(34, 34, 34)",
          // padding: 0,
          // borderRadius: "50% 4px 4px 50%",
          // background: "rgb(255, 255, 255) ",
        },
        day: {
          // width: 46,
          // height: 46,
          // marginLeft: "1px",
          // marginRight: "1px",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          // flexDirection: "column",
          // borderRadius: "100%",
          // position: "relative",
          // fontSize: "14px",
          // lineHeight: "18px",
          // fontWeight: 600,
          // color: "rgb(34, 34, 34)",
          // border: "1.5px solid rgb(255, 255, 255)",
        },
      },
    },
  },
  typography: {
    fontFamily:
      "Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#FF385C",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
