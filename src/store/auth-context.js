import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  userLocalId: "",
  login: (data) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(""); // do poprawy
  const [userLocalId, setUserLocalId] = useState("");

  // tutaj ma byc informacja czy zalogowano:

  const login = (token, userId) => {
    setToken((prevToken) => (prevToken = token));
    setUserLocalId((prevId) => (prevId = userId));
  };

  const logout = () => {
    setToken("");
  };

  const authObject = {
    token,
    userLocalId,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authObject}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
