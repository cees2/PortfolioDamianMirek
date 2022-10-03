import { createContext, useState } from "react";
import { DOMAIN } from "../hooks/useHttp";
import useHttp from "../hooks/useHttp";

const LOGIN_URL = `${DOMAIN}/login`;
const CREATE_ACCOUND_URL = `${DOMAIN}/signup`;

const AuthContext = createContext({
  token: "",
  login: (data) => {},
  logout: () => {},
  createAccount: () => {},
});

export const AuthContextProvider = (props) => {
  const { sendRequest } = useHttp();

  const tokenInitialValue = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const [token, setToken] = useState(tokenInitialValue);

  const manageLocalStorage = (data) => {
    setToken((prevToken) => (prevToken = data?.token ?? ""));

    if (data) {
      localStorage.setItem("token", data.token);
      return;
    }
    localStorage.removeItem("token");
  };

  const login = async (inputData) => {
    try {
      const data = await sendRequest({
        url: "users/login",
        method: "POST",
        body: inputData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      manageLocalStorage(data);
    } catch (err) {
      throw err;
    }
  };

  const createAccount = async (inputData) => {
    try {
      const data = await sendRequest({
        url: "users/signup",
        method: "POST",
        body: inputData,
        headers: {
          "Content-Type": "application/json",
        },
      });

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
