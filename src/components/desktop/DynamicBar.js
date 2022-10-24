import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import {
  FieldType,
  DefaultBarText,
  DefaultPickerObject,
  PickerViewType,
} from "../../constants";

import WherePicker from "./WherePicker";
import { useTransition, animated } from "@react-spring/web";

import WhenPicker from "./WhenPicker";
import WhereDefaultView from "./WhereDefaultView";
import WhereResultView from "./WhereResultView";
import WhenSelectView from "./WhenSelectView";
import { NavContext } from "../../contexts/NavContext";
import useDebounce from "../../hooks/useDebounce";

import { textSearch } from "../../mapApi";

const StyledButton = styled(Button)({
  lineHeight: "16px",
  fontSize: 16,
  fontWeight: 600,
  color: "#FFFFFF",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#FF385C",
  },
});

const BigSearchButton = React.memo((props) => {
  return <StyledButton startIcon={<SearchIcon />}>Search</StyledButton>;
});
const activeStyle = {
  display: "block",
  borderColor: "rgb(255,255,255)",
  boxShadow: "rgba(0,0,0,0.2) 0px 6px 20px 0px",
  borderRadius: "32px",
  backgroundColor: "#FFFFFF",
};
const defFieldStyle = {
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  backgroundClip: "padding-box",
  // border: "1px solid transparent",
  borderRadius: 8,
  padding: "14px 32px",
  flex: 1,
};
const barStyle = {
  height: 66,
  position: "relative",
  outline: "none",
  borderRadius: "32px",
  alignItems: "center",
  width: "850px",
  "& >div:focus-within:not(:last-child)": activeStyle,
  "&:hover": {
    hr: {
      display: "none",
    },
  },
};

function DynamicBar(props) {
  const {
    state: { activeInput, whereText, dateInputObjects, activeView },
    changeActiveView,
    changeActiveInput,
    changeWhereText,
    changeWhenValue,
    changeActiveViewAndInput,
  } = useContext(NavContext);

  const [keyword, setKeyword] = useState(whereText);
  const [sugList, setSugList] = useState([]);

  const debouncedKeyword = useDebounce(keyword, 500);

  const btnGroup = activeInput
    ? [
        {
          name: "StyledButton",
          height: 48,
          width: 111.75,
          component: <BigSearchButton />,
        },
      ]
    : [
        {
          name: "SearchBtn",
          height: 48,
          width: 48,
          component: <SearchIcon sx={{ color: "white" }} />,
        },
      ];

  const transitions = useTransition(btnGroup, {
    key: (item) => item.name,
    from: { width: 111.75 },
    leave: { width: 48 },
    enter: ({ width, height }) => ({ width, height }),
    update: ({ width, height }) => ({ width, height }),
  });

  const onWhereChange = (value) => {
    setKeyword(value);
  };

  useEffect(() => {
    if (!debouncedKeyword || debouncedKeyword === DefaultBarText.WHERE) {
      return;
    }
    const fetchSug = async () => {
      try {
        const data = await textSearch(debouncedKeyword);
        setSugList(data || []);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchSug();
  }, [debouncedKeyword]);

  const onSugItemClick = (item) => {
    setKeyword(item);
    changeWhereText(item.description);
    changeActiveViewAndInput(PickerViewType.WHEN, FieldType.WHEN);
    changeWhenValue(DefaultPickerObject.WHEN_FLEX);
  };
  const onWhereDefaultViewClick = (region) => {
    changeWhereText(region.name);
    setKeyword(region.name);
    changeActiveViewAndInput(PickerViewType.WHEN, FieldType.WHEN);
    changeWhenValue(DefaultPickerObject.WHEN_FLEX);
  };
  const onWhenInputClick = () => {
    if (activeInput !== FieldType.WHEN) {
      changeActiveInput(FieldType.WHEN);
      changeActiveView(PickerViewType.WHEN);
    }
  };
  const onWhenChange = (value) => {
    changeWhenValue(value);
  };
  const calcFieldStyle = (type) => {
    if (!activeInput) {
      return defFieldStyle;
    }
    if (activeInput === type) {
      return { ...activeStyle, ...defFieldStyle };
    }
    return {
      ...{
        "&:hover": {
          backgroundColor: "rgb(211,211,211)",
          borderRadius: "32px",
        },
        ...defFieldStyle,
      },
    };
  };

  let newBarStyle = {};
  if (!activeInput) {
    newBarStyle.backgroundColor = "#FFFFFF";
    newBarStyle.border = "1px solid #DDDDDD";
    newBarStyle["&>div:hover:not(:last-child)"] = {
      backgroundColor: "rgb(211,211,211)",
      borderRadius: "32px",
    };
  } else {
    newBarStyle.backgroundColor = "#EBEBEB";
    newBarStyle.hr = {
      display: "none",
    };
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Stack direction="row" spacing={0} sx={{ ...barStyle, ...newBarStyle }}>
        <WherePicker
          keyword={keyword}
          onChange={onWhereChange}
          style={calcFieldStyle(FieldType.WHERE)}
        />
        <Divider orientation="vertical" sx={{ height: 32 }} />
        <WhenPicker
          onClick={onWhenInputClick}
          date={dateInputObjects}
          style={calcFieldStyle(FieldType.WHEN)}
        />

        {transitions((style, item, t, index) => (
          <animated.div
            style={{
              overflow: "hidden",
              position: "absolute",
              right: 0,
              borderRadius: item.name === "StyledButton" ? "24px" : "50%",
              backgroundColor: "#FF385C",
              marginLeft: -6,
              margin: "7px 7px 7px 0",
              top: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ...style,
            }}
          >
            {item.component}
          </animated.div>
        ))}
      </Stack>
      {activeView === PickerViewType.DEFAULT_WHERE && (
        <WhereDefaultView onClick={onWhereDefaultViewClick} />
      )}
      {activeView === PickerViewType.SEARCH_WHERE && (
        <WhereResultView sugList={sugList} onClick={onSugItemClick} />
      )}
      {activeView === PickerViewType.WHEN && (
        <WhenSelectView onChange={onWhenChange} />
      )}
    </Box>
  );
}

export default React.memo(DynamicBar);
