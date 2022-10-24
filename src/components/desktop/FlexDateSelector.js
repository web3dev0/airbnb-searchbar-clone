import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import SvgIcon from "@mui/material/SvgIcon";
import { config } from "@react-spring/web";

import BaseTab from "./BaseTab";
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
const CircleButton = (props) => {
  const { style, children, ...other } = props;

  return (
    <Box {...other} sx={{ ...defaultCircleBtnStyle, ...style }}>
      <SvgIcon
        viewBox="0 0 32 32"
        style={{
          display: "block",
          height: 12,
          fill: "none",
          width: 12,
          overflow: "visible",
          stroke: "currentcolor",
          strokeWidth: 5.33333,
        }}
      >
        <g fill="none">{children}</g>
      </SvgIcon>
    </Box>
  );
};
const StyledStack = styled(Box)({
  direction: "column",
  marginBottom: "30px",
});
const StyledImg = styled("img")({
  width: "32px",
  height: "32px",
});

const TitleBox = styled(Box)({
  fontSize: "18px",
  lineHeight: "24px",
  fontWeight: "600",
  color: "rgb(34, 34, 34)",
  paddingTop: "8px",
  paddingBottom: "14px",
  margin: 0,
});
const TypeTab = styled(BaseTab)({
  padding: " 11px 16px ",
  borderRadius: " 50px",
});

const TYPES = ["Weekend", "Week", "Month"];
const ARRAY12 = new Array(12).fill(0);
const dayJsMonth = [];

export default function FlexDateSelector(props) {
  const { textAlign = "center", onChange } = props;
  const [currentType, setCurrentType] = React.useState(1);
  const [selectedMonth, setSelectedMonth] = React.useState([]);
  const [showLeft, setShowLeft] = React.useState(false);
  const [showRight, setShowRight] = React.useState(true);
  const scrollRef = React.useRef();
  const { scrollTo } = useScrollTo(config.molasses);

  const handleScroll = React.useCallback(
    (event) => {
      const scrollLeft = event.target.scrollLeft;
      const scrollWidth = 775;

      if (scrollLeft < 120 && showLeft) {
        setShowLeft(false);
      }
      if (scrollLeft >= 120 && !showLeft) {
        setShowLeft(true);
      }

      if (scrollWidth - scrollLeft < 120 && showRight) {
        setShowRight(false);
      }
      if (scrollWidth - scrollLeft >= 120 && !showRight) {
        setShowRight(true);
      }
    },
    [showLeft, showRight]
  );
  React.useEffect(() => {
    const div = scrollRef.current;
    div.addEventListener("scroll", handleScroll);
    // return div.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
  const onLeftBtnClick = () => {
    const div = scrollRef.current;
    scrollTo({
      element: div,
      from: { x: div.scrollLeft, y: 0 },
      to: { x: div.scrollLeft - 260, y: 0 },
    });
  };
  const onRightBtnClick = () => {
    const div = scrollRef.current;
    scrollTo({
      element: div,
      from: { x: div.scrollLeft, y: 0 },
      to: { x: div.scrollLeft + 260, y: 0 },
    });
  };

  const onStayForClick = (index) => {
    setCurrentType(index);
    onChange({
      stayFor: TYPES[index],
      goAnyTime: calcTitle(selectedMonth, false, "MMM"),
    });
  };

  return (
    <Stack direction={"column"} sx={{ marginTop: "22px" }}>
      <StyledStack>
        <TitleBox style={{ textAlign }}>
          Stay for a {TYPES[currentType]}
        </TitleBox>
        <Box display={"flex"} justifyContent={"center"}>
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
        <Box sx={{ position: "relative" }}>
          {showLeft && (
            <CircleButton
              style={{ left: "-18px", top: "55px" }}
              onClick={onLeftBtnClick}
            >
              <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
            </CircleButton>
          )}

          <Stack
            direction={"row"}
            ref={scrollRef}
            sx={{
              display: "flex",
              alignItems: "center",

              overflow: "scroll",
              scrollSnapType: "x mandatory",
              width: "760px",
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
                      width: "120px",
                      height: "134px",
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
          {showRight && (
            <CircleButton
              style={{ right: "-18px", top: "55px" }}
              onClick={onRightBtnClick}
            >
              <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
            </CircleButton>
          )}
        </Box>
      </StyledStack>
    </Stack>
  );
}
