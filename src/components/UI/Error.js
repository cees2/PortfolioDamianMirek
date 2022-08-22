import React from "react";
import classes from "./Error.module.css";

const Error = (props) => {
  return (
    <div className={classes.errorWrapper}>
      <img
        src={require("../../pictures/error.png")}
        alt="Error icon"
        className={classes.errorIcon}
      />
      <p className={classes.errorInformation}>{props.errorMessage}</p>
    </div>
  );
};

export default Error;
