import React from "react";
import MainHeader from "./MainHeader";
import { Fragment } from "react";
import classes from "./Layout.module.css"

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <main className={classes.mainContent}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
