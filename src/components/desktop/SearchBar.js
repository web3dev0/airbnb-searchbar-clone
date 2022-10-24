import { useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useTransition, animated } from "@react-spring/web";

import StaticBar from "./StaticBar";
import DynamicBar from "./DynamicBar";
import { FieldType, PickerViewType } from "../../constants";
import Box from "@mui/material/Box";
import useScrollTrigger from "../../hooks/useScroll";
import TopTab from "./TopTab";
import { NavContext } from "../../contexts/NavContext";

export default function DesktopSearchBar(props) {
  const {
    state: { activeView, activeInput, isShowDynamicBar },
    showDynamicBar,
    changeActiveView,
    changeActiveInput,
  } = useContext(NavContext);

  const trigger = useScrollTrigger();

  const handleClickAway = () => {
    if (activeView !== PickerViewType.EMPTY) {
      changeActiveView(PickerViewType.EMPTY);
    }
    if (activeInput !== FieldType.NONE) {
      changeActiveInput(FieldType.NONE);
    }
  };
  const handleClickAwayFormHead = () => {
    changeActiveView(PickerViewType.EMPTY);
    changeActiveInput(FieldType.NONE);
    showDynamicBar(false);
  };

  const bars = !isShowDynamicBar
    ? [
        {
          name: "StaticBar",
          height: 80,
          width: 277.37,
          component: <StaticBar />,
        },
      ]
    : [
        {
          name: "DynamicBar",
          height: 150,
          width: 850,
          component: (
            <>
              <TopTab />
              <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickAway}
              >
                <Box>
                  <DynamicBar />
                </Box>
              </ClickAwayListener>
            </>
          ),
        },
      ];

  const transitions = useTransition(bars, {
    key: (item) => item.name,
    from: { height: 0, scale: 0, opacity: 0 },
    leave: { height: 0, scale: 0, opacity: 0 },
    enter: ({ height }) => ({ height, scale: 1, opacity: 1 }),
    update: ({ height }) => ({ height }),
  });

  useEffect(() => {
    if (isShowDynamicBar) showDynamicBar(false);
  }, [trigger]);

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAwayFormHead}
    >
      <AppBar
        elevation={1}
        sx={{
          // height: 80,
          justifyContent: "center",
          boxShadow: "rgb(0 0 0 / 8%) 0 1px 0",
          display: "flex",
          zIndex: 1400,
        }}
        color="inherit"
        position="fixed"
      >
        <Box
          px={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: "860px",
              margin: "0 auto",
              paddingBottom: isShowDynamicBar ? 2 : 0,
            }}
          >
            {transitions((style, item, t, index) => (
              <animated.div style={{ ...style }}>{item.component}</animated.div>
            ))}
          </Box>
        </Box>
      </AppBar>
    </ClickAwayListener>
  );
}
