import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar";
import PostListElement from "./components/PostList";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar />
      <Container
        sx={{
          mt: 10,
          mb: 4,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PostListElement />
      </Container>
    </Box>
  );
}

export default App;
