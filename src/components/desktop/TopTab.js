import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const TYPES = ["Stays", "Experiences", "Online Experiences"];
const TabItem = React.memo((props) => {
  const { index, isActive, text, onClick } = props;
  const getCurrTabStyle = () => {
    let tabItemStyle = {
      margin: "10px 16px",
      position: "relative",
      "::after": {
        backgroundColor: "black",
        insetInline: 0,
        transform: "scaleX(0)",
        left: "0",
        transition: "transform 0.2s ease",
        content: '" "',
        height: "2px",
        position: "absolute",
        top: "calc(100% + 8px)",
        width: "100%",
      },
    };
    if (isActive) {
      tabItemStyle["::after"].transform = "scaleX(1)";
      return tabItemStyle;
    }
    tabItemStyle["&:hover"] = {
      opacity: "0.65",
      "::after": {
        opacity: "0.65",
        transform: "scaleX(1)",
      },
    };
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
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(34,34,34)",
        cursor: "pointer",
        fontSize: 16,
        fontWeight: 400,
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
