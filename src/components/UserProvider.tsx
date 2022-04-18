import React, { useEffect, useState } from "react";
import { UserContext, UserInfo } from "./UserContext";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString === null) return;
    setUserInfo(JSON.parse(userInfoString) as UserInfo);
  }, []);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserContext.Provider
      value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
