import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import AuthContext from "../store/auth-context";
import LoginForm from "../components/Authentication/LoginForm";

const Authentication = () => {
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;

  return (
    <Switch>
      {!token && (
        <Route path="/authentication/createAccount">
          <LoginForm type="createAccount" />
        </Route>
      )}
      {!token && (
        <Route path="/authentication/login">
          <LoginForm type="login" />
        </Route>
      )}
    </Switch>
  );
};

export default Authentication;
