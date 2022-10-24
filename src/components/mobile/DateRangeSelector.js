import React, { useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import FuzzyDateTab from "./FuzzyDateTab";

import dayjs from "dayjs";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const StyledTable = styled("table")({
  width: "100%",
  borderSpacing: "0px 2px",
});
const ToDay = dayjs().subtract(1, "day");

const CalendarTd = React.memo((props) => {
  const { day, isSelected, isInRange, onClick } = props;

  return (
    <td
      style={{
        padding: 0,
        borderTopLeftRadius: isSelected ? "50%" : 0,
        borderBottomLeftRadius: isSelected ? "50%" : 0,
        background:
          isInRange || isSelected ? "rgb(247, 247, 247)" : "rgb(255, 255, 255)",
      }}
      onClick={() => {
        if (day && !day.isBefore(ToDay)) {
          onClick(day);
        }
      }}
    >
      {!day ? (
        ""
      ) : (
        <Box
          sx={{
            width: "43px",
            height: "43px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "100%",
            position: "relative",
            fontSize: "14px",
            lineHeight: "18px",
            fontWeight: 600,
            color: isSelected ? "rgb(255, 255, 255)" : "rgb(34, 34, 34)",
            border: isSelected
              ? "1.5px solid rgb(34, 34, 34)"
              : isInRange
              ? "1.5px solid rgb(247, 247, 247)"
              : "1.5px solid rgb(255, 255, 255)",
            backgroundColor: isSelected
              ? "rgb(34, 34, 34)"
              : isInRange
              ? "rgb(247, 247, 247)"
              : "rgb(255, 255, 255)",
            opacity: day.isBefore(ToDay) ? "0.25" : "1",
          }}
        >
          {day.format("D")}
        </Box>
      )}
    </td>
  );
});

const CalendarTr = React.memo((props) => {
  const { week, onClick, trKey, selected } = props;

  return (
    <tr>
      {week.map((day, index) => {
        const key = `${trKey}i${index}d${day.valueOf()}`;
        return (
          <CalendarTd
            key={key}
            day={day}
            onClick={onClick}
            isSelected={
              (selected[0] && day && selected[0].isSame(day)) ||
              (selected[1] && day && selected[1].isSame(day))
            }
            isInRange={
              selected[0] &&
              day &&
              day.isAfter(selected[0]) &&
              selected[1] &&
              day.isBefore(selected[1])
            }
          />
        );
      })}
    </tr>
  );
});

const CalendarTable = (props) => {
  const { month, onClick, mKey, value } = props;
  let counter = 0;
  const days = month.daysInMonth();
  const start = month.startOf("month");
  const startDay = start.format("d"); // 第一天 周几

  const week = new Array(7).fill(0);
  const pre = week.slice(0, startDay);
  const post = new Array(7 - pre.length).fill(0);

  const weeks = [
    pre.concat(
      post.map(() => {
        return start.add(counter++, "day");
      })
    ),
  ];
  while (counter < days) {
    weeks.push(
      week.map(() => {
        if (counter >= days) {
          return 0;
        }
        return start.add(counter++, "day");
      })
    );
  }

  return (
    <StyledTable>
      <tbody>
        {weeks.map((week, index) => {
          const key = `m${mKey}w${index}`;
          return (
            <CalendarTr
              key={key}
              trKey={key}
              week={week}
              onClick={onClick}
              selected={value}
            />
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default function DateRangeSelector(props) {
  const { onChange, value } = props;

  const [currentTab, setCurrentTab] = React.useState(0);

  const [months, setMonths] = useState(
    new Array(4).fill(0).map((_, index) => {
      return dayjs().add(index, "month");
    })
  );

  const onLoadMoreClick = () => {
    setMonths(
      [...months].concat(
        new Array(4).fill(0).map((_, index) => {
          return dayjs().add(index + months.length, "month");
        })
      )
    );
  };
  // [0] = min ,[1] = max
  const [tempRange, setTempRange] = useState([]);

  const onCalendarClick = useCallback(
    (value) => {
      if (tempRange.length <= 0) {
        setTempRange([value]);
      } else if (tempRange.length === 1) {
        let newRange = [];
        if (!tempRange[0].isAfter(value)) {
          newRange = [tempRange[0], value];
        } else {
          newRange = [value, tempRange[0]];
        }
        setTempRange(newRange);
        onChange(newRange);
      } else {
        setTempRange([value]);
      }
    },
    [tempRange, onChange]
  );

  return (
    <>
      <Box
        sx={{
          color: "rgb(34, 34, 34)",
          position: "absolute",
          zIndex: 1,
          display: "table-row",
          left: 0,
          width: "100%",
          textAlign: "center",
          top: "129px",
          overflowY: "scroll",
          bottom: "127px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: "white",
            borderBottom: " 1px solid rgb(221, 221, 221)",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              margin: "1px 0px",
              paddingLeft: "0px",
              paddingRight: "0px",
              fontSize: "14px",
              lineHeight: "18px",
            }}
          >
            {DAYS.map((day) => {
              return (
                <li
                  key={day}
                  style={{
                    width: "45px",
                    display: "inline-block",
                    textAlign: "center",
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontWeight: 600,
                    color: "rgb(113, 113, 113)",
                    marginBottom: "6px",
                  }}
                >
                  {day}
                </li>
              );
            })}
          </ul>
        </Box>

        <Box
          sx={{
            overflow: "hidden scroll",
            borderRadius: "3px",
            width: "100%",
            paddingTop: "20px",
            height: "100%",
            position: "absolute",
            inset: "0px",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              transform: "translateY(0px)",
              width: "342px",
              background: "transparent",
              textAlign: "left",
              zIndex: 0,
              margin: " 0px auto ",
            }}
          >
            {months.map((month, index) => {
              const key = month.valueOf();
              return (
                <Box
                  key={key}
                  sx={{
                    background: "transparent",
                    textAlign: "center",
                    verticalAlign: "top",
                    userSelect: "none",
                    padding: "0px 13px",
                  }}
                >
                  <Box
                    sx={{
                      paddingTop: "24px",
                    }}
                  >
                    <section
                      style={{
                        margin: "0px",
                        padding: "0px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "16px",
                          lineHeight: "20px",
                          fontWeight: 600,
                          textAlign: "left",
                          paddingBottom: "7px",
                        }}
                      >
                        {`${month.format("MMMM")} ${month.format("YYYY")}`}
                      </h2>
                    </section>
                  </Box>

                  <CalendarTable
                    value={tempRange}
                    mKey={key}
                    onClick={onCalendarClick}
                    month={month}
                  />
                </Box>
              );
            })}
          </Box>
          <Box
            onClick={onLoadMoreClick}
            sx={{ position: "relative", zIndex: "1" }}
          >
            <Box sx={{ margin: "16px" }}>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "inline-block",
                  margin: 0,
                  position: "relative",
                  textAlign: "center",
                  textDecoration: "none",
                  touchAction: "manipulation",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  outline: "none",
                  padding: "13px 23px",
                  transition:
                    "box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s",
                  borderColor: "#222222",
                  background: "#FFFFFF",
                  color: "#222222",
                  width: "100%",
                }}
              >
                Load more dates
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <FuzzyDateTab
        index={currentTab}
        onChange={(day) => {
          setCurrentTab(day.value);
          onChange(tempRange, day.value);
        }}
      />
    </>
  );
}
