import React from "react";
import classes from "./Error.module.css";

const Error = (props) => {
  const errorClasses = `${classes.errorWrapper} ${props.class}`;

  return (
    <div className={errorClasses}>
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
