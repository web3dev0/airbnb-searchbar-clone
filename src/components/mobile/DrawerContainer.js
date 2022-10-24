import React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Global } from "@emotion/react";

export default function DrawerContainer(props) {
  const { children, open } = props;

  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `100%`,
            overflow: "visible",
            backgroundColor: "rgb(247,247,247)",
          },
        }}
      />
      <SwipeableDrawer
        anchor={"bottom"}
        onOpen={() => {}}
        onClose={() => {}}
        open={open}
        disableSwipeToOpen={true}
      >
        {children}
      </SwipeableDrawer>
    </>
  );
}
