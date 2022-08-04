import { createContext, useState } from "react";
import { accountAJAXManager } from "./auth-helpers";

const AuthContext = createContext({
  token: "",
  userLocalId: "",
  login: (data) => {},
  logout: () => {},
  createAccount: () => {},
});

export const AuthContextProvider = (props) => {
  const tokenInitialValue = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const userIdInitialValue = localStorage.getItem("localId")
    ? localStorage.getItem("localId")
    : null;
  const [token, setToken] = useState(tokenInitialValue);
  const [userLocalId, setUserLocalId] = useState(userIdInitialValue);

  const manageLocalStorage = (data) => {
    setToken((prevToken) => (prevToken = data?.token ?? ""));
    setUserLocalId((prevId) => (prevId = data?.userId ?? ""));

    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("localId", data.userId);
      return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("localId");
  };

  const login = async (inputData) => {
    try {
      const data = await accountAJAXManager(inputData);
      manageLocalStorage(data);
    } catch (err) {
      throw err;
    }
  };

  const createAccount = async (inputData) => {
    try {
      const data = await accountAJAXManager(inputData, false);

      manageLocalStorage(data);
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    manageLocalStorage();
  };

  const authObject = {
    token,
    userLocalId,
    login,
    logout,
    createAccount,
  };

  return (
    <AuthContext.Provider value={authObject}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
