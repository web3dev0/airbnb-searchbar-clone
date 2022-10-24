import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PickerModal from "./PickerModal";
import { RegionList } from "../../constants";

export default function WhereDefaultView(props) {
  const { onClick } = props;
  return (
    <PickerModal style={{ width: 494 }}>
      <Box sx={{ padding: "16px 8px 24px", margin: "0 -32px -8px" }}>
        <Box sx={{ margin: "8px 0 16px 0", padding: "0 28px 0 44px" }}>
          <Box
            sx={{
              margin: "0 0 28px 5px",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: " 18px",
            }}
          >
            Search by region
          </Box>
          <Box>
            <Grid container columns={6}>
              {RegionList.map((region, index) => {
                return (
                  <Grid
                    onClick={() => {
                      onClick(region);
                    }}
                    key={region.name}
                    item
                    xs={2}
                  >
                    <Box sx={{ height: 158, width: 132 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          width: "100%",
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
                          <Box sx={{ margin: "8px 2px 0 2px" }}>
                            {region.name}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
    </PickerModal>
  );
}
