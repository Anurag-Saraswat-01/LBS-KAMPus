import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  user_id: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const UserContext = createContext({
  username: null,
  userImg: null,
  setData: (name, img) => {},
});
