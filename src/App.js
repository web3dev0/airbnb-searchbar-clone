import * as React from "react";
import SearchBar from "./components/SearchBar";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

export default function App() {
  return (
    <Container>
      <SearchBar />
      <Box
        sx={{
          height: "180vh",
          overflow: "scroll",
        }}
      ></Box>
    </Container>
  );
}
