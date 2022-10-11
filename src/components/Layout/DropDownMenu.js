import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./DropDownMenu.module.css";
import AuthContext from "../../store/auth-context";

const DropDownMenu = () => {
  const authCtx = useContext(AuthContext);

  const toggleDropDown = (e) => {
    e.stopPropagation();
    authCtx.toggleDropDown();
  };

  const dropDownListClasses = authCtx.dropDownIsVisible
    ? `${classes.dropDownList} ${classes.activeDropDownList}`
    : `${classes.dropDownList}`;

  return (
    <div className={classes.profileDetailsTrigger} onClick={toggleDropDown}>
      <h6 className={classes.listItemText}>{authCtx.userDetails.name}</h6>
      <img
        src={require(`../../pictures/profile_triangle.png`)}
        alt="Profile triangle"
      />
      <ul className={dropDownListClasses}>
        <li className={classes.dropDownItem}>
          <Link to="/authentication/accountDetails">
            <img
              src={require("../../pictures/profile.png")}
              alt="User profile"
            />
            <h4>Profile</h4>
          </Link>
        </li>
        <li className={classes.dropDownItem}>
          <Link to="/authentication/settings">
            <img
              src={require("../../pictures/settings.png")}
              alt="Profile settings"
            />
            <h4>Settings</h4>
          </Link>
        </li>
        <li className={classes.dropDownItem}>
          <Link to="/home" onClick={authCtx.logout}>
            <img
              src={require("../../pictures/logout_white.png")}
              alt="Logout user"
            />
            <h4>Log out</h4>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;
