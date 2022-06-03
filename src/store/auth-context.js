import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  userLocalId: "",
  login: (data) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const tokenInitialValue = localStorage.getItem('token') ? localStorage.getItem('token') : null;
  const userIdInitialValue = localStorage.getItem('localId') ? localStorage.getItem('localId') : null;
  const [token, setToken] = useState(tokenInitialValue);
  const [userLocalId, setUserLocalId] = useState(userIdInitialValue);

  // tutaj ma byc informacja czy zalogowano:

  const login = (token, userId) => {
    setToken((prevToken) => (prevToken = token));
    setUserLocalId((prevId) => (prevId = userId));

    localStorage.setItem("token", token);
    localStorage.setItem("localId", userId);
  };

  const logout = () => {
    setToken("");
    setUserLocalId('');

    localStorage.removeItem("token");
    localStorage.removeItem("localId");
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