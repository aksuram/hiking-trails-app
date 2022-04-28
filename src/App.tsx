import { Box, Container, CssBaseline } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import PostCreateForm from "./components/PostCreateForm";
import PostListElement from "./components/PostList";
import PostView from "./components/PostView";
import Registration from "./components/Registration";

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

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/registration" element={<Registration />} />

          <Route path="/posts" element={<PostListElement />} />
          <Route path="/post/create" element={<PostCreateForm />} />
          <Route path="/post/:postId" element={<PostView />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
