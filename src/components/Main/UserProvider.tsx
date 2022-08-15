import React, { useEffect, useState } from "react";

import { UserContext, UserInfo } from "../Auth/UserContext";

//TODO: Logout user after token expiration
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString === null) return null;
    return JSON.parse(userInfoString) as UserInfo;
  });

  // useEffect(() => {
  //   const userInfoString = localStorage.getItem("userInfo");
  //   if (userInfoString === null) return;
  //   setUserInfo(JSON.parse(userInfoString) as UserInfo);
  // }, []);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("token", userInfo?.token ?? "");
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
