import { createContext } from "react";

export interface UserInfo {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  fullName: string;
  token: string;
  //TODO: token expiration date?
}

export interface UserInfoWithSet {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

export const UserContext = createContext<UserInfoWithSet>(null!);
