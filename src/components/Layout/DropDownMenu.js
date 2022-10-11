import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./DropDownMenu.module.css";
import AuthContext from "../../store/auth-context";

const DropDownMenu = () => {
  const authCtx = useContext(AuthContext);
  const [dropDownIsVisible, setDropDownIsVisible] = useState(false);

  const toggleDropDown = (e) => {
    console.log("exec");
    e.stopPropagation();
    setDropDownIsVisible((prevVal) => !prevVal);
  };

  const dropDownListClasses = dropDownIsVisible
    ? `${classes.dropDownList} ${classes.activeDropDownList}`
    : `${classes.dropDownList}`;

  const imgDropDownClass = dropDownIsVisible
    ? ``
    : `${classes.imgDropDownActive}`;

  return (
    <div className={classes.profileDetailsTrigger} onClick={toggleDropDown}>
      <h6 className={classes.listItemText}>{authCtx.userDetails.name}</h6>
      <img
        src={require(`../../pictures/profile_triangle.png`)}
        alt="Profile triangle"
        className={imgDropDownClass}
      />
      <ul className={dropDownListClasses}>
        <li className={classes.dropDownItem}>
          <img src={require("../../pictures/profile.png")} alt="User profile" />
          <Link to="/authentication/accountDetails">Profile</Link>
        </li>
        <li className={classes.dropDownItem}>
          <img
            src={require("../../pictures/settings.png")}
            alt="Profile settings"
          />
          <Link to="/authentication/settings">Settings</Link>
        </li>
        <li className={classes.dropDownItem}>
          <img src={require("../../pictures/logout.png")} alt="Logout user" />
          <Link to="/home" onClick={authCtx.logout}>
            Log out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;
