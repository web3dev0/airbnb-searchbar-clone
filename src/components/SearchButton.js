import SvgIcon from "@mui/material/SvgIcon";
import Box from "@mui/material/Box";

export default function SearchButton(props) {
  const { isMobile, isDynamic, isActiveDynamic } = props;
  const desktopSvg = (
    <Box
      sx={{
        margin: "7px 7px 7px 0",
        borderRadius: "50%",
        height: 32,
        width: 32,
        padding: "10px",
        color: "#FFFFFF",
        backgroundColor: "#FF385C",
      }}
    >
      <SvgIcon
        style={{
          display: "block",
          height: 10.5,
          fill: "none",
          width: 10.5,
          overflow: "visible",
          stroke: "currentcolor",
          strokeWidth: 5.33333,
        }}
      >
        <g fill="none">
          <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
        </g>
      </SvgIcon>
    </Box>
  );
  const dynamicSvg = (
    <Box
      sx={{
        margin: "10px 10px 7px 0",
        borderRadius: "50%",
        lineHeight: "16px",
        width: "48px",
        height: "48px",
        padding: "10px",
        color: "#FFFFFF",
        backgroundColor: "#FF385C",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SvgIcon
        style={{
          display: "block",
          height: 10.5,
          fill: "none",
          width: 10.5,
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
  );
  const activeDynamicSvg = (
    <Box
      sx={{
        margin: "7px 7px 7px 0",
        borderRadius: "50%",
        height: 32,
        width: 32,
        padding: "10px",
        color: "#FFFFFF",
        backgroundColor: "#FF385C",
      }}
    >
      <SvgIcon
        style={{
          display: "block",
          height: 10.5,
          fill: "none",
          width: 10.5,
          overflow: "visible",
          stroke: "currentcolor",
          strokeWidth: 5.33333,
        }}
      >
        <g fill="none">
          <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
        </g>
      </SvgIcon>
    </Box>
  );
  const mobileSvg = (
    <Box sx={{ padding: "0 20px 2px 20px" }}>
      <SvgIcon
        style={{
          display: "block",
          height: 12,
          width: 12,
          fill: "currentcolor",
          overflow: "visible",
        }}
      >
        <path
          d="M13 0c7.18 0 13 5.82 13 13 0 2.868-.929 5.519-2.502 7.669l7.916 7.917-2.828 2.828-7.917-7.916A12.942 12.942 0 0 1 13 26C5.82 26 0 20.18 0 13S5.82 0 13 0zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
          opacity=".8"
        ></path>
      </SvgIcon>
    </Box>
  );

  if (isMobile) return mobileSvg;
  if (isDynamic && !isActiveDynamic) return dynamicSvg;
  if (isDynamic && isActiveDynamic) return activeDynamicSvg;

  return desktopSvg;
}
