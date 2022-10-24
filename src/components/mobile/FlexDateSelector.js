import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import SvgIcon from "@mui/material/SvgIcon";
import { config } from "@react-spring/web";

import BaseTab from "../desktop/BaseTab";
import useScrollTo from "../../hooks/useScrollTo";

const defaultCircleBtnStyle = {
  position: "absolute",
  zIndex: 1,
  display: "flex",
  justifyContent: "flex - end",
  borderRadius: "50%",
  border: "1px solid rgba(118, 118, 118, 0.08)",
  boxShadow: "rgb(0 0 0 / 8%) 0px 1px 2px, rgb(0 0 0 / 5%) 0px 4px 12px ",
  transition:
    "-ms-transform 0.25s ease 0s, -webkit-transform 0.25s ease 0s, transform 0.25s ease 0s ",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  cursor: "pointer",
};

const StyledStack = styled(Box)({
  direction: "column",
  marginTop: "12px",
  borderTop: " 1px solid rgb(235, 235, 235)",
});
const StyledImg = styled("img")({
  width: "32px",
  height: "32px",
});

const TitleBox = styled(Box)({
  fontSize: "16px",
  lineHeight: "20px",
  fontWeight: "600",
  color: "rgb(34, 34, 34)",
  paddingRight: "8px",
  paddingTop: "12px",
  paddingBottom: "8px",
  margin: 0,
});
const TypeTab = styled(BaseTab)({
  borderRadius: " 50px",
  marginLeft: "0",
  marginRight: "8px",
  marginBottom: "4px",
});

const TYPES = ["Weekend", "Week", "Month"];
const ARRAY12 = new Array(12).fill(0);
const dayJsMonth = [];

export default function FlexDateSelector(props) {
  const { textAlign = "center", onChange } = props;

  const [currentType, setCurrentType] = React.useState(1);
  const [selectedMonth, setSelectedMonth] = React.useState([]);

  const calcTitle = (months, needStarText, format = "MMMM") => {
    if (months.length <= 0) return needStarText ? "Go anytime" : "";
    if (months.length <= 4)
      return (
        (needStarText ? "Go in " : "") +
        months
          .map((index) => {
            return dayJsMonth[index].format(format);
          })
          .join(",")
      );
    return (
      (needStarText ? "Go in " : "") +
      months
        .map((index) => {
          return dayJsMonth[index].format(format);
        })
        .slice(months.length - 4, months.length)
        .join(",") +
      "..."
    );
  };

  const onStayForClick = (index) => {
    setCurrentType(index);
    onChange({
      stayFor: TYPES[index],
      goAnyTime: calcTitle(selectedMonth, false, "MMM"),
    });
  };
  return (
    <Stack direction={"column"} sx={{}}>
      <StyledStack>
        <TitleBox style={{ textAlign }}>
          Stay for a {TYPES[currentType]}{" "}
        </TitleBox>
        <Box display={"flex"}>
          {TYPES.map((type, index) => {
            return (
              <TypeTab
                style={
                  index === currentType
                    ? { border: "2px solid rgb(34, 34, 34)" }
                    : {}
                }
                onClick={() => {
                  onStayForClick(index);
                }}
                key={index}
              >
                <span>{type}</span>
              </TypeTab>
            );
          })}
        </Box>
      </StyledStack>
      <StyledStack>
        <TitleBox style={{ textAlign }}>
          {calcTitle(selectedMonth, true)}
        </TitleBox>
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <Stack
            direction={"row"}
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "scroll",
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {ARRAY12.map((_, index) => {
              if (!dayJsMonth[index]) {
                dayJsMonth[index] = dayjs().add(index, "month");
              }
              const m = dayJsMonth[index];
              return (
                <Box
                  key={index}
                  sx={{
                    paddingRight: "8px",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    let currentMonths = [...selectedMonth];
                    if (currentMonths.indexOf(index) >= 0) {
                      currentMonths = selectedMonth.filter((o) => o !== index);
                    } else {
                      currentMonths.push(index);
                    }
                    setSelectedMonth([...currentMonths]);
                    onChange({
                      stayFor: TYPES[currentType],
                      goAnyTime: calcTitle(currentMonths, false, "MMM"),
                    });
                  }}
                >
                  <Stack
                    direction={"column"}
                    sx={{
                      paddingTop: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "rgb(34, 34, 34)",
                      width: "112px",
                      height: "104px",
                      backgroundColor: "rgb(255,255,255)",
                      border: "1px solid rgba(176, 176, 176, 0.5)",
                      borderRadius: "16px",
                      "&:hover": {
                        color: "rgb(0, 0, 0)",
                        borderColor: "rgb(0, 0, 0)",
                      },
                      "&:active": {
                        color: "rgb(0, 0, 0)",
                        borderColor: "rgb(0, 0, 0)",
                        transform: "scale(0.925)",
                      },
                    }}
                    style={
                      selectedMonth.indexOf(index) >= 0
                        ? {
                            backgroundColor: "rgb(247, 247, 247)",
                            border: "2px solid rgb(34, 34, 34)",
                          }
                        : {}
                    }
                  >
                    <StyledImg
                      src={
                        selectedMonth.indexOf(index) >= 0
                          ? "https://a0.muscache.com/pictures/33e22c88-92bf-47be-847a-98a7e374d78b.jpg"
                          : "https://a0.muscache.com/pictures/cf82c9bc-520a-4486-9be4-1f0927972381.jpg"
                      }
                      alt=""
                    />
                    <Box
                      sx={{
                        paddingTop: "8px",
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "18px",
                      }}
                    >
                      {m.format("MMMM")}
                    </Box>
                    <Box
                      sx={{
                        fontSize: "12px",
                        lineHeight: "16px",
                        fontWeight: 400,
                        paddingTop: "2px",
                      }}
                    >
                      {m.format("YYYY")}
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </StyledStack>
    </Stack>
  );
}
