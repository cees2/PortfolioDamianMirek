import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./DropDownMenu.module.css";
import AuthContext from "../../store/auth-context";

const DropDownMenu = () => {
  const [dropDownIsVisible, setDropDownIsVisible] = useState(false);
  const authCtx = useContext(AuthContext);

  const toggleDropDown = () => setDropDownIsVisible((prevVal) => !prevVal);

  const dropDownListClasses = dropDownIsVisible
    ? `${classes.dropDownList} ${classes.activeDropDownList}`
    : `${classes.dropDownList}`;

  return (
    <div className={classes.profileDetailsTrigger} onClick={toggleDropDown}>
      <h6 className={classes.listItemText}>{authCtx.userName}</h6>
      <img
        src={require(`../../pictures/profile_triangle.png`)}
        alt="Profile triangle"
      />
      <ul className={dropDownListClasses}>
        <li className={classes.dropDownItem}>
          <Link to="/authentication/accountDetails">Profile</Link>
        </li>
        <li className={classes.dropDownItem}>
          <Link to="/authentication/settings">Settings</Link>
        </li>
        <li className={classes.dropDownItem}>
          <Link to="/home" onClick={authCtx.logout}>
            Log out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;
