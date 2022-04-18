import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

enum Role {
  User = "User",
  Administrator = "Administrator",
}

interface Props {
  role?: Role;
  children?: React.ReactNode;
}

const RequireAuth = ({ role, children }: Props) => {
  const { userInfo } = useContext(UserContext);
  const location = useLocation();

  if (userInfo === null || (role !== undefined && userInfo.role !== role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
