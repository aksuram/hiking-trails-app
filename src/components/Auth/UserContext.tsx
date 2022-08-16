import { createContext } from "react";

//TODO: Change interface name to Logged in users info and move to a new interface file
export interface UserInfo {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string | null;
  token: string;
  //TODO: token expiration date?
}

//TODO: Change into a hook
export interface UserInfoWithSet {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

export const UserContext = createContext<UserInfoWithSet>(null!);
