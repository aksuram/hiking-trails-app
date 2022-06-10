import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Role } from "../../Enums/Role";
import { UserContext } from "./UserContext";

interface Props {
  role?: Role;
  children: JSX.Element;
}

const RequireAuth = ({ role, children }: Props) => {
  const { userInfo } = useContext(UserContext);
  const location = useLocation();

  if (userInfo === null || (role !== undefined && userInfo.role !== role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
