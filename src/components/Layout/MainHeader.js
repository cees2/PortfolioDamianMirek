import React, { useState, useContext } from "react";
import classes from "./MainHeader.module.css";
import { Link, NavLink } from "react-router-dom";
import TaskContext from "../../store/tasks-context";
import AuthContext from "../../store/auth-context";
import { useMediaQuery } from "react-responsive";
import DropDownMenu from "./DropDownMenu";

const MainHeader = () => {
  const [isHamburgerActive, setIsHamburgerActive] = useState(0); // 0--> hidden, 1--> active
  const [moveMobileMenu, setMoveMobileMenu] = useState(false);
  const taskCtx = useContext(TaskContext);
  const authCtx = useContext(AuthContext);
  const numberOfTasks = taskCtx.tasks.length;

  const TabletOrLess = ({ children }) => {
    const tablet = useMediaQuery({ maxWidth: 768 });
    return tablet ? children : null;
  };

  const WiderThanTablet = ({ children }) => {
    const wider = useMediaQuery({ minWidth: 769 });
    return wider ? children : null;
  };

  const hamburgerMenuClickHandler = ({ target }) => {
    setMoveMobileMenu(true);
    if (target.alt === "close menu") setIsHamburgerActive(0);
    else if (target.alt === "hamburger menu") setIsHamburgerActive(1);
    else {
      setMoveMobileMenu(false);
      setIsHamburgerActive(0);
    }
  };

  const getClasses = function () {
    if (!isHamburgerActive && moveMobileMenu)
      return classes.hamburgerDeactivated;
    else if (isHamburgerActive && moveMobileMenu)
      return classes.hamburgerActive;

    return "";
  };

  const hamburgerMenuClasses = `${classes.mobileMainMenu} ${getClasses()}`;

  const menuList = (
    <ul className={classes.headerList} onClick={hamburgerMenuClickHandler}>
      {authCtx.token && (
        <li>
          <NavLink activeClassName={classes.active} to="/quiz/quizStartPage">
            <img
              src={require(`../../pictures/quiz_icon.png`)}
              alt="take a quiz"
            />
            <h6 className={classes.listItemText}>Take a Quiz</h6>
          </NavLink>
        </li>
      )}
      {authCtx.token && (
        <li>
          <NavLink activeClassName={classes.active} to="/tasks/newToDo">
            <img src={require(`../../pictures/add_task.png`)} alt="add task" />
            <h6 className={classes.listItemText}>Add new task</h6>
          </NavLink>
        </li>
      )}
      {authCtx.token && (
        <li>
          <NavLink activeClassName={classes.active} to="/tasks/toDoApp">
            <img
              src={require(`../../pictures/see_tasks.png`)}
              alt="see tasks"
            />
            <h6 className={classes.listItemText}>Tasks To Do</h6>
            <span className={classes.numOfTasks}>{numberOfTasks}</span>
          </NavLink>
        </li>
      )}
      {!authCtx.token && (
        <li>
          <NavLink activeClassName={classes.active} to="/authentication/login">
            <img src={require(`../../pictures/login.png`)} alt="log in" />
            <h6 className={classes.listItemText}>Log in</h6>
          </NavLink>
        </li>
      )}
      {authCtx.token && (
        <li>
          <DropDownMenu />
        </li>
      )}
    </ul>
  );

  return (
    <header className={classes.header}>
      <div className={classes.portfolio}>
        <Link to="/home">Portfolio</Link>
      </div>
      <nav>
        <TabletOrLess>
          <img
            src={require("./../../pictures/menu_hamburger.png")}
            alt="hamburger menu"
            className={classes.hamburgerMenu}
            onClick={hamburgerMenuClickHandler}
          />

          <div className={hamburgerMenuClasses}>
            <button
              className={classes.closeMenuButton}
              onClick={hamburgerMenuClickHandler}
            >
              <img
                src={require("./../../pictures/close_menu.png")}
                alt="close menu"
              />
            </button>
            {menuList}
          </div>
        </TabletOrLess>
        <WiderThanTablet>{menuList}</WiderThanTablet>
      </nav>
    </header>
  );
};

export default MainHeader;
