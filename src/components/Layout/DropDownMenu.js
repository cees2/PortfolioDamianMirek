import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./DropDownMenu.module.css";
import AuthContext from "../../store/auth-context";
import { useMediaQuery } from "react-responsive";

const DropDownMenuItems = (props) => {
  const authCtx = useContext(AuthContext);

  const listItemClass = props.shorterThanTablet
    ? ""
    : `${classes.dropDownItem}`;

  const iconsColor = props.shorterThanTablet ? "black" : "white";

  return (
    <>
      <li className={listItemClass}>
        <Link to="/authentication/accountDetails">
          <img
            src={require(`../../pictures/profile_${iconsColor}.png`)}
            alt="User profile"
          />
          <h6 className={classes.listItemText}>Profile</h6>
        </Link>
      </li>
      <li className={listItemClass}>
        <Link to="/authentication/settings">
          <img
            src={require(`../../pictures/settings_${iconsColor}.png`)}
            alt="Profile settings"
          />
          <h6 className={classes.listItemText}>Settings</h6>
        </Link>
      </li>
      <li className={listItemClass}>
        <Link to="/home" onClick={authCtx.logout}>
          <img
            src={require(`../../pictures/logout_${iconsColor}.png`)}
            alt="Logout user"
          />
          <h6 className={classes.listItemText}>Log out</h6>
        </Link>
      </li>
    </>
  );
};

const DropDownMenu = () => {
  const authCtx = useContext(AuthContext);

  const toggleDropDown = (e) => {
    e.stopPropagation();
    authCtx.toggleDropDown();
  };

  const dropDownListClasses = authCtx.dropDownIsVisible
    ? `${classes.dropDownList} ${classes.activeDropDownList}`
    : `${classes.dropDownList}`;
  
  const WiderThanTablet = ({ children }) => {
    const wider = useMediaQuery({ minWidth: 769 });
    return wider ? children : null;
  };

  const ShorterThanTablet = ({ children }) => {
    const shorter = useMediaQuery({ maxWidth: 768 });
    return shorter ? children : null;
  };

  return (
    <>
      <WiderThanTablet>
        <div className={classes.profileDetailsTrigger} onClick={toggleDropDown}>
          <h6 className={classes.listItemText}>{authCtx.userDetails.name}</h6>
          <img
            src={require(`../../pictures/profile_triangle.png`)}
            alt="Profile triangle"
          />
          <ul className={dropDownListClasses}>
            <DropDownMenuItems />
          </ul>
        </div>
      </WiderThanTablet>
      <ShorterThanTablet>
        <DropDownMenuItems shorterThanTablet={true} />
      </ShorterThanTablet>
    </>
  );
};

export default DropDownMenu;
