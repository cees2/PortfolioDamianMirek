import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import AuthContext from "../store/auth-context";
import LoginForm from "../components/Authentication/LoginForm";
import SignupForm from "../components/Authentication/SignupForm";
import Settings from "../components/UserPanel/Settings";
import Profile from "../components/UserPanel/Profile";

const Authentication = () => {
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;

  return (
    <Switch>
      {!token && (
        <Route path="/authentication/createAccount">
          <SignupForm />
        </Route>
      )}
      {!token && (
        <Route path="/authentication/login">
          <LoginForm />
        </Route>
      )}
      {token && (
        <Route path="/authentication/accountDetails">
          <Profile />
        </Route>
      )}
      {token && (
        <Route path="/authentication/settings">
          <Settings />
        </Route>
      )}
    </Switch>
  );
};

export default Authentication;
