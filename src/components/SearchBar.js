import * as React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import NavContextProvider from "../contexts/NavContext";
import MobileSearchBar from "./mobile/SearchBar";
import DesktopSearchBar from "./desktop/SearchBar";

export default function SearchBar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <NavContextProvider>
      {!matches && <MobileSearchBar />}
      {matches && <DesktopSearchBar />}
    </NavContextProvider>
  );
}
