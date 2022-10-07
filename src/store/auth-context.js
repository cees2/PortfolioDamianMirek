import { createContext, useState } from "react";
import useHttp from "../hooks/use-http";

const AuthContext = createContext({
  token: "",
  userName: "",
  login: (data) => {},
  logout: () => {},
  createAccount: () => {},
});

export const AuthContextProvider = (props) => {
  const { sendRequest } = useHttp();

  const tokenInitialValue = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  const userNameInitialValue = localStorage.getItem("userName")
    ? localStorage.getItem("userName")
    : null;

  const [token, setToken] = useState(tokenInitialValue);
  const [userName, setUserName] = useState(userNameInitialValue);

  const manageLocalStorage = (data) => {
    console.log(data);
    setToken((prevToken) => (prevToken = data?.token ?? ""));
    setUserName((prevUser) => (prevUser = data?.data.user.name ?? ""));

    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.data.user.name);
      return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
  };

  const login = async (inputData) => {
    try {
      const data = await sendRequest({
        url: "users/login",
        method: "POST",
        body: inputData,
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });

      manageLocalStorage(data);
      return data;
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
          withCredentials: true,
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
    userName,
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
