import * as React from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import PickerModal from "./PickerModal";
import SelectDateTypeTab from "./SelectDateTypeTab";
import FuzzyDateTab from "./FuzzyDateTab";
import DateRangeSelector from "./DateRangeSelector";
import FlexDateSelector from "./FlexDateSelector";
import { DateViewType, DefaultPickerObject } from "../../constants";
export default function WhenSelectView(props) {
  const { onChange } = props;

  const [currentDay, setCurrentDay] = React.useState(0);
  const [currentRange, setCurrentRange] = React.useState([null, null]);
  const [indexTab, setIndexTab] = React.useState(0);
  const [tabDateSnapshot, setTabDateSnapshot] = React.useState({
    0: DefaultPickerObject.WHEN_RANGE,
    1: DefaultPickerObject.WHEN_FLEX,
  });

  const onTabClick = (index) => {
    if (indexTab !== index) {
      setIndexTab(index);
      onChange(tabDateSnapshot[index]);
    }
  };

  const onDateChange = ({ dateRange, fuzzy }) => {
    const dateObjectList = [
      {
        text: "Check in",
        value: `${dayjs(dateRange[0]).format("MMM")} ${
          fuzzy === 0 ? "" : `±${fuzzy}`
        }`,
      },
      {
        text: "Check out",
        value: `${dayjs(dateRange[1]).format("MMM")} ${
          fuzzy === 0 ? "" : `±${fuzzy}`
        }`,
      },
    ];
    setTabDateSnapshot({ ...tabDateSnapshot, [indexTab]: dateObjectList });
    onChange(dateObjectList);
  };
  const onDateRangChange = React.useCallback((value) => {
    if (value[0] && value[1]) {
      setCurrentRange(value);
      onDateChange({
        dateRange: value,
        fuzzy: currentDay,
      });
    }
  }, []);

  const onFlexDateChange = (value) => {
    const dateObjectList = [
      {
        text: "When",
        value: !value.goAnyTime
          ? `Any ${value.stayFor}`
          : `${value.stayFor} in ${value.goAnyTime}`,
      },
    ];
    setTabDateSnapshot({ ...tabDateSnapshot, [indexTab]: dateObjectList });
    onChange(dateObjectList);
  };

  return (
    <PickerModal style={{ right: 0 }}>
      <Box
        sx={{
          padding: "18px 28px 10px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "848px",
          margin: "0 -32px -8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <SelectDateTypeTab index={indexTab} onChange={onTabClick} />
          <Box
            sx={{
              display:
                indexTab === DateViewType.CHOOSE_DATES ? "block" : "none",
            }}
          >
            <DateRangeSelector
              value={currentRange}
              onChange={onDateRangChange}
            />
            <FuzzyDateTab
              index={currentDay}
              onChange={(day) => {
                setCurrentDay(day.value);
                onDateChange({
                  dateRange: currentRange,
                  fuzzy: day.value,
                });
              }}
            />
          </Box>
          <Box
            sx={{
              display: indexTab === DateViewType.FLEXIBLE ? "block" : "none",
            }}
          >
            <FlexDateSelector onChange={onFlexDateChange} />
          </Box>
        </Box>
      </Box>
    </PickerModal>
  );
}
