import { Navigate, Route, Routes } from "react-router-dom";

import { Box, Container, CssBaseline } from "@mui/material";

import HomePage from "../../Pages/HomePage";
import Login from "../../Pages/LoginPage";
import Logout from "../../Pages/Logout";
import NotFound from "../../Pages/NotFoundPage";
import PostCreateForm from "../../Pages/PostCreateForm";
import PostListPage from "../../Pages/PostListPage";
import PostView from "../../Pages/PostView";
import Registration from "../../Pages/Registration";
import TrailCreatePage from "../../Pages/TrailCreatePage";
import TrailPage from "../../Pages/TrailPage";
import UserView from "../../Pages/UserView";
import RequireAuth from "../Auth/RequireAuth";
import NavBar from "./NavBar";

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
          <Route path="" element={<PostListPage />} />
          <Route path="/" element={<PostListPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/registration" element={<Registration />} />

          <Route path="/posts" element={<PostListPage />} />
          <Route
            path="/post/create"
            element={
              <RequireAuth>
                <PostCreateForm />
              </RequireAuth>
            }
          />
          <Route path="/post/:postId" element={<PostView />} />

          <Route path="/user/:userId" element={<UserView />} />

          <Route path="/trail" element={<TrailPage />} />
          <Route path="/trail/create" element={<TrailCreatePage />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
