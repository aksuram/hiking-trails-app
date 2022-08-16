import { UserInfo } from "../Components/Auth/UserContext";

export const getUserAuthToken = () => {
  let token = localStorage.getItem("token");
  if (token === "") token = null;
  return token;
};

export const isAdministrator = (userInfo: UserInfo | null) => {
  return userInfo !== null && userInfo.role === "Administrator";
};

export const isUsersId = (userInfo: UserInfo | null, userId: string) => {
  return userInfo !== null && userInfo.id === userId;
};

export const canUserChangeEntity = (
  userInfo: UserInfo | null,
  entityUserId: string
) => {
  return (
    userInfo !== null &&
    (userInfo.role === "Administrator" || userInfo.id === entityUserId)
  );
};
