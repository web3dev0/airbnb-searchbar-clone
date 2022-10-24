import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import { styled } from "@mui/system";
import DrawerHeader from "./DrawerHeader";
import DrawerContainer from "./DrawerContainer";
import SugPanel from "./SugPanel";
import useDebounce from "../../hooks/useDebounce";
import { textSearch } from "../../mapApi";
import { DefaultBarText, RegionList } from "../../constants";
const mockSug = [
  {
    description:
      "库兹衮库克 15 Temmuz Şehitler Köprüsü, 15 Temmuz Şehitler Köprüsü, 于斯屈达尔/伊斯坦堡省土耳其",
    matched_substrings: [
      {
        length: 1,
        offset: 6,
      },
    ],
    place_id: "ChIJ8euj0c-3yhQRyR5lHMZ_4VY",
    reference: "ChIJ8euj0c-3yhQRyR5lHMZ_4VY",
    structured_formatting: {
      main_text: "15 Temmuz Şehitler Köprüsü",
      main_text_matched_substrings: [
        {
          length: 1,
          offset: 0,
        },
      ],
      secondary_text:
        "库兹衮库克, 15 Temmuz Şehitler Köprüsü, 于斯屈达尔/伊斯坦堡省土耳其",
    },
    terms: [
      {
        offset: 0,
        value: "库兹衮库克",
      },
      {
        offset: 6,
        value: "15 Temmuz Şehitler Köprüsü",
      },
      {
        offset: 34,
        value: "15 Temmuz Şehitler Köprüsü",
      },
      {
        offset: 62,
        value: "于斯屈达尔",
      },
      {
        offset: 68,
        value: "伊斯坦堡省",
      },
      {
        offset: 73,
        value: "土耳其",
      },
    ],
    types: ["point_of_interest", "establishment"],
  },
  {
    description:
      "1 Utama Shopping Centre, Lebuh Bandar Utama, 万达镇八打灵再也雪兰莪马来西亚",
    matched_substrings: [
      {
        length: 1,
        offset: 0,
      },
    ],
    place_id: "ChIJL-Qvn9JOzDERBLmeTTrrgf0",
    reference: "ChIJL-Qvn9JOzDERBLmeTTrrgf0",
    structured_formatting: {
      main_text: "1 Utama Shopping Centre",
      main_text_matched_substrings: [
        {
          length: 1,
          offset: 0,
        },
      ],
      secondary_text: "Lebuh Bandar Utama, 万达镇八打灵再也雪兰莪马来西亚",
    },
    terms: [
      {
        offset: 0,
        value: "1 Utama Shopping Centre",
      },
      {
        offset: 25,
        value: "Lebuh Bandar Utama",
      },
      {
        offset: 45,
        value: "万达镇",
      },
      {
        offset: 48,
        value: "八打灵再也",
      },
      {
        offset: 53,
        value: "雪兰莪",
      },
      {
        offset: 56,
        value: "马来西亚",
      },
    ],
    types: ["shopping_mall", "point_of_interest", "establishment"],
  },
  {
    description: "123 Farm, Highland Springs Avenue, 博蒙特加利福尼亚美国",
    matched_substrings: [
      {
        length: 1,
        offset: 0,
      },
    ],
    place_id: "ChIJWQk10f1E24AR64VZox2aHEM",
    reference: "ChIJWQk10f1E24AR64VZox2aHEM",
    structured_formatting: {
      main_text: "123 Farm",
      main_text_matched_substrings: [
        {
          length: 1,
          offset: 0,
        },
      ],
      secondary_text: "Highland Springs Avenue, 博蒙特加利福尼亚美国",
    },
    terms: [
      {
        offset: 0,
        value: "123 Farm",
      },
      {
        offset: 10,
        value: "Highland Springs Avenue",
      },
      {
        offset: 35,
        value: "博蒙特",
      },
      {
        offset: 38,
        value: "加利福尼亚",
      },
      {
        offset: 43,
        value: "美国",
      },
    ],
    types: ["point_of_interest", "establishment"],
  },
  {
    description: "10 Downing Street, 唐寧街伦敦英国",
    matched_substrings: [
      {
        length: 1,
        offset: 0,
      },
    ],
    place_id: "ChIJRxzRQcUEdkgRGVaKyzmkgvg",
    reference: "ChIJRxzRQcUEdkgRGVaKyzmkgvg",
    structured_formatting: {
      main_text: "10 Downing Street",
      main_text_matched_substrings: [
        {
          length: 1,
          offset: 0,
        },
      ],
      secondary_text: "唐寧街伦敦英国",
    },
    terms: [
      {
        offset: 0,
        value: "10 Downing Street",
      },
      {
        offset: 19,
        value: "唐寧街",
      },
      {
        offset: 22,
        value: "伦敦",
      },
      {
        offset: 24,
        value: "英国",
      },
    ],
    types: ["tourist_attraction", "point_of_interest", "establishment"],
  },
  {
    description:
      "108 Military Central Hospital, Trần Hưng Đạo, Bạch Đằng, 二征夫人郡河内越南",
    matched_substrings: [
      {
        length: 1,
        offset: 0,
      },
    ],
    place_id: "ChIJb76rLO6rNTERNsWdbdIYfag",
    reference: "ChIJb76rLO6rNTERNsWdbdIYfag",
    structured_formatting: {
      main_text: "108 Military Central Hospital",
      main_text_matched_substrings: [
        {
          length: 1,
          offset: 0,
        },
      ],
      secondary_text: "Trần Hưng Đạo, Bạch Đằng, 二征夫人郡河内越南",
    },
    terms: [
      {
        offset: 0,
        value: "108 Military Central Hospital",
      },
      {
        offset: 31,
        value: "Trần Hưng Đạo",
      },
      {
        offset: 46,
        value: "Bạch Đằng",
      },
      {
        offset: 57,
        value: "二征夫人郡",
      },
      {
        offset: 62,
        value: "河内",
      },
      {
        offset: 64,
        value: "越南",
      },
    ],
    types: ["hospital", "point_of_interest", "health", "establishment"],
  },
];
const StyledInput = styled("input")({
  border: 0,
  margin: 0,
  padding: 0,
  background: "none",
  display: "block",
  width: "100%",
  fontSize: 14,
  lineHeight: "18px",
  fontWeight: 600,
  color: "#222222",
  textOverflow: "ellipsis",
  "&:focus": {
    outline: "none",
    backgroundColor: "rgba(0,0,0,0)",
  },
  "&:focus:not(:placeholder-shown)": {
    paddingRight: "12px",
  },
});

const SearchInput = (props) => {
  const { onClick, value, children, onChange } = props;
  return (
    <Box sx={{ paddingTop: "16px", display: "flex" }}>
      <Box
        onClick={onClick}
        sx={{
          flex: " 1 1 0%",
          overflow: "hidden",
          position: "relative",
          alignItems: "center",
          display: "flex",
          margin: 0,
          padding: "0px 20px",
          whiteSpace: "nowrap",
          height: "60px",
          borderRadius: "12px",
          border: "1px solid rgb(176, 176, 176)",
          background: "rgb(255, 255, 255)",
          color: "rgb(34, 34, 34)",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            marginRight: "10px",
            height: "100%",
            color: "rgb(34, 34, 34)",
          }}
        >
          <SvgIcon
            viewBox="0 0 32 32"
            style={{
              display: "block",
              height: 16,
              fill: "none",
              width: 16,
              overflow: "visible",
              stroke: "currentcolor",
              strokeWidth: 4,
            }}
          >
            <g fill="none">
              <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
            </g>
          </SvgIcon>
        </Box>
        <Box>
          <StyledInput
            autoComplete={"off"}
            autoCorrect={"off"}
            spellCheck={"false"}
            placeHolder="Search destinations"
            type="text"
            onChange={(e) => {
              onChange(e.target.value);
            }}
            value={value || ""}
          />
        </Box>
        {children}
      </Box>
    </Box>
  );
};
export default function WherePicker(props) {
  const { value, onChange } = props;
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const debouncedKeyword = useDebounce(inputValue, 1000);
  const [sugList, setSugList] = useState([]);

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

  return (
    <>
      <Box>
        <Box
          sx={{
            color: "rgb(34,34,34)",
            fontSize: "22px",
            fontWeight: "800",
            lineHeight: "26px",
            margin: 0,
            padding: 0,
          }}
        >
          Where to?
        </Box>

        <SearchInput
          onChange={() => {}}
          onClick={() => {
            setOpen(true);
          }}
          value={inputValue}
        />

        <Box
          sx={{
            margin: "12px -24px 0 -24px",
          }}
        >
          <Box
            display={"flex"}
            sx={{
              marginLeft: "22px",
              scrollSnapType: "x proximity",
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {RegionList.map((region, index) => {
              return (
                <Box
                  key={region.name}
                  sx={{
                    marginTop: "4px",
                    marginRight: "12px",
                  }}
                  onClick={() => {
                    onChange(region.name);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: 158,
                      width: 132,
                      padding: "4px",
                    }}
                  >
                    <Box
                      sx={{
                        cursor: "pointer",
                        textAlign: "center",
                        border: "1px solid rgb(221, 221, 221)",
                        backgroundColor: "rgb(255, 255, 255)",
                        outline: "none",
                        padding: 0,
                        margin: 0,
                        color: "rgb(34, 34, 34)",
                        position: "relative",
                        transitionProperty:
                          "-ms-transform, -webkit-transform, transform, background-color, border-color",
                        transitionDuration: "0.15s",
                        transitionTimingFunction: "ease-in-out",
                        borderRadius: "12px",
                        height: "100% ",
                        overflow: "hidden",
                        width: "100%",
                      }}
                    >
                      <img
                        src={region.src}
                        style={{
                          display: "flex",
                          height: "100%",
                          width: "100%",
                        }}
                        alt={""}
                      />
                    </Box>
                    <Box>
                      <Box sx={{ margin: "8px 2px 0 2px" }}>{region.name}</Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            borderTop: "#EBEBEB 1px solid",
            margin: "21px -24px -24px -24px",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              position: "relative",
              touchAction: "manipulation",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 400,
              outline: "none",
              background: "transparent",
              color: "inherit",
              display: "block",
              margin: 0,
              padding: 0,
              textDecoration: "none",
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "#222222",
                padding: "16px 24px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <SvgIcon
                  viewBox="0 0 32 32"
                  style={{
                    display: "block",
                    height: 23,
                    width: 23,
                    fill: "currentcolor",
                  }}
                >
                  <path d="M27 3a2 2 0 0 1 1.995 1.85L29 5l-.001 14.816 2.43 6.482a2 2 0 0 1-.881 2.44l-.145.074-.144.06a2 2 0 0 1-.523.12l-.179.008H2.443a2 2 0 0 1-1.928-2.532l.055-.17L3 19.819 3 5a2 2 0 0 1 1.697-1.977l.154-.018L5 3zm.306 18H4.692l-2.249 6h27.114zM19 23v2h-6v-2zm8-18H5l-.001 14h22zM16 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                </SvgIcon>
                <Box
                  sx={{
                    paddingLeft: "14px",
                    fontWeight: 600,
                    lineHeight: "18px",
                    fontSize: 14,
                  }}
                >
                  Try an Online Experience
                </Box>
              </Box>
              <Box>
                <SvgIcon
                  viewBox="0 0 32 32"
                  style={{
                    display: "block",
                    fill: "none",
                    height: 12,
                    width: 12,
                    stroke: "currentcolor",
                    strokeWidth: 5.33333,
                    overflow: "visible",
                  }}
                >
                  <g fill="none">
                    <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
                  </g>
                </SvgIcon>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <DrawerContainer open={open}>
        <DrawerHeader
          onClose={() => {
            setOpen(false);
          }}
          iscloseBtn={false}
        />
        <SugPanel
          sugList={sugList.length > 0 ? sugList : mockSug}
          onClick={(sug) => {
            setInputValue(sug.description);
            onChange(sug.description);
            setOpen(false);
          }}
        >
          <SearchInput
            value={inputValue}
            onClick={() => {}}
            onChange={(v) => {
              setInputValue(v);
            }}
          >
            {inputValue && (
              <Box
                sx={{
                  display: "flex",
                  width: "20px ",
                  height: "20px",
                  borderRadius: "50%",
                  background: "rgb(221, 221, 221)",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  right: "18px",
                }}
                onClick={() => {
                  setInputValue("");
                }}
              >
                <SvgIcon
                  viewBox="0 0 32 32"
                  style={{
                    display: "block",
                    fill: "none",
                    height: 12,
                    width: 12,
                    stroke: "currentcolor",
                    strokeWidth: 5.33333,
                    overflow: "visible",
                  }}
                >
                  <path d="m6 6 20 20"></path>
                  <path d="m26 6-20 20"></path>
                </SvgIcon>
              </Box>
            )}
          </SearchInput>
        </SugPanel>
      </DrawerContainer>
    </>
  );
}
