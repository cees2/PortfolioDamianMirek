import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  userLocalId: '',
  login: (data) => {},
  logout: () => {},
  createAccount: (data) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(''); // do poprawy
  const [userLocalId, setUserLocalId] = useState("");

  const login = (data) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDt96ic9vIPskghHCG03yyOX9j-FBdB3VY",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setToken(prevToken => prevToken = responseData.idToken);
        setUserLocalId(prevId => prevId = responseData.localId);
      })
      .catch((message) => console.log(message));
  };

  const logout = () => {
    setToken("");
  };

  const createAccount = (data) => {
    let fetchWasOk = true
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDt96ic9vIPskghHCG03yyOX9j-FBdB3VY",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if(response.ok){
          return response.json()
        }
        fetchWasOk = false
      })
      .then((responseData) => console.log(responseData))
      .catch((message) => console.log(message));
      return fetchWasOk
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
