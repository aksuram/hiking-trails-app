import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../Components/Auth/UserContext";

const Logout = () => {
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo(null);
    navigate("/");
  }, []);

  return <></>;
};

export default Logout;
