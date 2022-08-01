import classes from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../UI/Card";

const LoginForm = (props) => {
  const [error, setError] = useState(false);
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const typeOfComponent = props.type;
  const history = useHistory();

  const checkValidity = function (emailInput, passwordInput) {
    if (!emailInput.includes("@")) {
      setError('Email has to include "@" symbol');
      return false;
    } else if (emailInput.indexOf("@") === 0) {
      setError("Email can not start with '@' symbol");
      return false;
    } else if (!emailInput.includes(".")) {
      setError('Email has to include "."(dot)');
      return false;
    } else if (emailInput.indexOf(".") === emailInput.length - 1) {
      setError("Email can not end with '.'");
      return false;
    } else if (emailInput.length < 3) {
      setError("Email is too short.");
      return false;
    } else if (passwordInput.length < 5) {
      setError("Password has to be at least 5 characters long.");
      return false;
    } else if (emailInput.length < 6) {
      setError("email has to be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

    if (!checkValidity(emailInput, passwordInput)) return;

    const inputData = {
      email: emailInput,
      password: passwordInput,
      returnSecureToken: true,
    };

    if (typeOfComponent === "createAccount") {
      const confirmPassword = confirmPasswordInputRef.current.value;

      if (passwordInput !== confirmPassword) {
        setError("Entered passwords are different.");
        return;
      }
    }
    try {
      if (typeOfComponent === "login") await authCtx.login(inputData);
      if (typeOfComponent === "createAccount")
        await authCtx.createAccount(inputData);
    } catch (err) {
      setError(err.message);
      return;
    }

    history.replace("/home");
  };

  return (
    <Card class={classes.loginWrapper}>
      <form className={classes.loginInput}>
        <div className={classes.formInput}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.formInput}>
          <label htmlFor="pass">
            {typeOfComponent === "createAccount" && "Set"} Password
          </label>
          <input type="password" id="pass" ref={passwordInputRef} />
        </div>
        {props.type === "createAccount" && (
          <div className={classes.formInput}>
            <label htmlFor="conf">Confirm Password</label>
            <input type="password" id="conf" ref={confirmPasswordInputRef} />
          </div>
        )}
        {props.type === "login" && (
          <Link to="/CreateAccount">
            <p className={classes.toNewAccount}>No account? Create one.</p>
          </Link>
        )}
        <div className={classes.submitButton}>
          {error && <p className={classes.errorParagraph}>{error}</p>}
          <button onClick={formSubmitHandler}>
            {props.type === "login" ? "Submit" : "Create Account"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
