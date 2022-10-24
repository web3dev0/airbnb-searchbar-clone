import { styled } from "@mui/material/styles";

const StyledDiv = styled("div")({
  cursor: "pointer",
  textAlign: "center",
  border: "1px solid rgb(221, 221, 221)",
  backgroundColor: "rgb(255, 255, 255)",
  outline: "none",
  margin: 0,
  color: "rgb(34, 34, 34) ",
  position: "relative",
  transitionProperty:
    "-ms-transform, -webkit-transform, transform, background-color, border-color",
  transitionDuration: "0.15s",
  transitionTimingFunction: "ease-in-out !important",
  padding: "4px 12px",
  minHeight: "32px",
  borderRadius: "16px",
  fontSize: "14px",
  lineHeight: "18px",
  marginLeft: "10px",
  "&:hover": {
    color: "rgb(0, 0, 0) ",
    borderColor: "rgb(0, 0, 0)",
  },
  "&:active": {
    borderColor: "rgb(0, 0, 0)",
    transform: "scale(0.925)",
  },
});

export default StyledDiv;
