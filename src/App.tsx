import { Box, Container, CssBaseline } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import PostListElement from "./components/PostList";

const App = () => {
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
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostListElement />} />
          <Route path="/login" element={<Login />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        {/* <PostListElement /> */}
      </Container>
    </Box>
  );
};

export default App;
