import React, { useState } from "react";
import Box from "@mui/material/Box";

const TYPES = ["Stays", "Experiences"];
const TabItem = React.memo((props) => {
  const { index, isActive, text, onClick } = props;
  const getCurrTabStyle = () => {
    let tabItemStyle = {
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: 600,
      borderRadius: "8px",
      border: "none",
      background: "transparent",
      padding: "5px 10px 0px ",
      marginTop: "4px",
      marginBottom: "4px",
      marginRight: "0px",
      transition:
        "box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s",
      position: "relative",
      outline: "none",
      color: "rgb(113,113,113)",
      cursor: "default",
      "::after": {
        transform: "scaleX(0)",
        backgroundColor: "black",
        insetInline: 0,
        transition: "transform 0.2s ease",
        content: '" "',
        height: "2px",
        position: "absolute",
        top: "calc(100% + 25px)",
        width: "100%",
      },
    };
    if (isActive) {
      tabItemStyle["color"] = "rgb(34, 34, 34)";
      tabItemStyle["::after"].transform = "scaleX(0.7)";
      return tabItemStyle;
    }
    return tabItemStyle;
  };
  const onBoxClick = () => {
    onClick(index);
  };
  return (
    <Box sx={getCurrTabStyle()} onClick={onBoxClick}>
      <span>{text}</span>
    </Box>
  );
});

function TopTab(props) {
  const [tabIndex, setTabIndex] = useState(0);

  const onTabClick = React.useCallback((value) => {
    setTabIndex(value);
  }, []);

  return (
    <Box
      px={3}
      sx={{
        bottom: 0,
        color: "#222222",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        paddingTop: "18px",
        paddingBottom: "9px",
        height: "33px",
      }}
    >
      {TYPES.map((type, index) => {
        return (
          <TabItem
            key={index}
            index={index}
            isActive={index === tabIndex}
            text={type}
            onClick={onTabClick}
          />
        );
      })}
    </Box>
  );
}

export default React.memo(TopTab);
