import classes from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../UI/Card";
import Error from "../UI/Error";

const LoginForm = (props) => {
  const [error, setError] = useState(false);
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const typeOfComponent = props.type;
  const history = useHistory();

  const checkValidity = function (inputRef, isEmail = true) {
    const {
      current: { value: input },
    } = inputRef;
    console.log("inputref", inputRef);
    if (isEmail) {
      if (!input.includes("@")) {
        setError('Email has to include "@" symbol');
        return false;
      } else if (input.indexOf("@") === 0) {
        setError("Email can not start with '@' symbol");
        return false;
      } else if (!input.includes(".")) {
        setError('Email has to include "."(dot)');
        return false;
      } else if (input.indexOf(".") === input.length - 1) {
        setError("Email can not end with '.'");
        return false;
      } else if (input.length < 3) {
        setError("Email is too short.");
        return false;
      }
    }
    if (input.trim().length < 6) {
      setError(
        `${
          isEmail ? "Email" : "Password"
        } has to be at least 6 characters long.`
      );
      return false;
    }

    setError(false);

    return true;
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

    if (!checkValidity(emailInputRef)) return;
    if (!checkValidity(passwordInputRef, false)) return;

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

  const inputBlurHandler = (e) => {
    if (e.target.id === "email") checkValidity(emailInputRef);
    else if (e.target.id === "pass") checkValidity(passwordInputRef, false);
    else checkValidity(confirmPasswordInputRef, false);
  };

  return (
    <Card class={classes.loginWrapper}>
      <form className={classes.loginInput}>
        <div className={classes.formInput}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            ref={emailInputRef}
            onBlur={inputBlurHandler}
          />
        </div>
        <div className={classes.formInput}>
          <label htmlFor="pass">
            {typeOfComponent === "createAccount" && "Set"} Password
          </label>
          <input
            type="password"
            id="pass"
            ref={passwordInputRef}
            onBlur={inputBlurHandler}
          />
        </div>
        {props.type === "createAccount" && (
          <div className={classes.formInput}>
            <label htmlFor="conf">Confirm Password</label>
            <input
              type="password"
              id="conf"
              ref={confirmPasswordInputRef}
              onBlur={inputBlurHandler}
            />
          </div>
        )}
        {props.type === "login" && (
          <Link to="/authentication/createAccount">
            <p className={classes.toNewAccount}>No account? Create one.</p>
          </Link>
        )}
        <div className={classes.submitButton}>
          {error && <Error errorMessage={error} />}

          <button onClick={formSubmitHandler}>
            {props.type === "login" ? "Submit" : "Create Account"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
