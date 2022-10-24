import React from "react";
import Box from "@mui/material/Box";
import PickerItem from "./PickerItem";

export default function PickerPanel(props) {
  const { filter, onChange, index, onIndexChange } = props;
  const onClick = React.useCallback((value) => {
    onIndexChange(value);
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 2,
        margin: "15px 12px 0 12px",
      }}
    >
      {filter.map((item) => {
        return (
          <PickerItem
            key={item.key}
            onClick={onClick}
            item={item}
            isActive={index === item.key}
            onChange={onChange}
          />
        );
      })}
    </Box>
  );
}
