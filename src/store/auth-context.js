import { createContext, useState } from "react";
import useHttp from "../hooks/use-http";

const AuthContext = createContext({
  token: null,
  userDetails: null,
  dropDownIsVisible: false,
  login: (data) => {},
  logout: () => {},
  createAccount: () => {},
});

export const AuthContextProvider = (props) => {
  const tokenInitialValue = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  const userDetailsInitialValue = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;

  const [token, setToken] = useState(tokenInitialValue);
  const [userDetails, setUserDetails] = useState(userDetailsInitialValue);
  const [dropDownIsVisible, setDropDownIsVisible] = useState(false);
  const { sendRequest } = useHttp();

  const hideDropDown = () => {
    if (dropDownIsVisible) setDropDownIsVisible(false);
  };

  const manageLocalStorage = (data = "") => {
    if (data) {
      const { user } = data.data;
      const now = new Date(user.dateCreated);
      const formatedDate = new Intl.DateTimeFormat("pl-PL").format(now);
      const newUserValues = {
        name: user.name,
        email: user.email,
        role: user.role,
        dateCreated: formatedDate,
      };
      setToken((prevToken) => (prevToken = data.token));
      setUserDetails((prevUser) => (prevUser = newUserValues));
      localStorage.setItem("token", data.token);
      localStorage.setItem("userDetails", JSON.stringify(newUserValues));
      return;
    }
    setToken(null);
    setUserDetails(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
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

  const changeUserDetails = (newUserDetails) => {
    setUserDetails(newUserDetails);
  };

  const authObject = {
    token,
    userDetails,
    dropDownIsVisible,
    login,
    logout,
    createAccount,
    changeUserDetails,
    hideDropDown,
  };

  return (
    <AuthContext.Provider value={authObject}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
