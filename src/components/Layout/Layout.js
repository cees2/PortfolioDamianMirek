import React, { useContext } from "react";
import MainHeader from "./MainHeader";
import { Fragment } from "react";
import classes from "./Layout.module.css";
import AuthContext from "../../store/auth-context";

const Layout = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <MainHeader />
      <main className={classes.mainContent} onClick={authCtx.hideDropDown}>
        {props.children}
      </main>
    </Fragment>
  );
};

export default Layout;
