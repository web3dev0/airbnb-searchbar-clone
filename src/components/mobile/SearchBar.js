import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import MiniSearchBtn from "../SearchButton";
import PickerPanel from "./PickerPanel";
import DrawerHeader from "./DrawerHeader";
import DrawerContainer from "./DrawerContainer";
import DrawerFooter from "./DrawerFooter";
import { MobilePickerType as PICKERTYPE } from "../../constants";

const INIT = [
  {
    key: PICKERTYPE.WHERE,
    value: "I’m flexible",
  },
  {
    key: PICKERTYPE.WHEN,
    value: "Add dates",
  },
];
export default function MobileSearchBar() {
  const [open, setOpen] = React.useState(false);

  const [filter, setFilter] = React.useState([
    {
      key: PICKERTYPE.WHERE,
      value: "I’m flexible",
    },
    {
      key: PICKERTYPE.WHEN,
      value: "Add dates",
    },
  ]);

  const [index, setIndex] = React.useState(PICKERTYPE.WHERE);

  const onChange = (type, value) => {
    if (PICKERTYPE.WHERE === type) {
      setFilter([{ ...filter[0], value }, { ...filter[1] }]);
      setIndex(PICKERTYPE.WHEN);
    }
    if (PICKERTYPE.WHEN === type) {
      setFilter([{ ...filter[0] }, { ...filter[1], value }]);
    }
  };
  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          height: 70,
          display: "flex",
          alignItems: "stretch",
        }}
        color="inherit"
      >
        <Box
          sx={{
            padding: "14px 24px 0 24px",
          }}
        >
          <Stack
            direction="row"
            sx={{
              height: 55,
              alignItems: "center",
              background: "#FFFFFF",
              border: "0.5px solid rgba(0,0,0,0.08)",
              boxShadow: "0 3px 10px rgb(0 0 0 / 10%)",
              transform: "translate3d(0,0,0)",
              borderRadius: 1000,
            }}
          >
            <MiniSearchBtn isMobile={true} />
            <Stack
              onClick={() => {
                setOpen(true);
              }}
            >
              <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
                Where to?
              </Typography>
              <Box
                sx={{
                  color: "#717171",
                  display: "flex",
                  fontSize: 12,
                  lineHeight: "16px",
                }}
              >
                Anywhere • Any week
              </Box>
            </Stack>
          </Stack>
        </Box>
      </AppBar>
      <DrawerContainer open={open}>
        <DrawerHeader
          onClose={() => {
            setOpen(false);
          }}
        />
        <PickerPanel
          index={index}
          onIndexChange={(value) => {
            setIndex(value);
          }}
          filter={filter}
          onChange={onChange}
        />
        <DrawerFooter
          onClear={() => {
            setFilter(INIT);
          }}
          onSearch={() => {
            setIndex(-1);
          }}
        />
      </DrawerContainer>
    </>
  );
}
