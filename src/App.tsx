import React from "react";
import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import NavBar from "./components/NavBar";
import Post from "./components/Post";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar />
      <Container
        sx={{ mt: 12, mb: 4, justifyContent: "center", display: "flex" }}
      >
        <Post />
      </Container>
    </Box>
  );
}

export default App;
