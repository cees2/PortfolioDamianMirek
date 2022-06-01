import classes from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const LoginForm = (props) => {
  const [differentPasswords, setDifferentPasswords] = useState(false);
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const typeOfComponent = props.type;
  const history = useHistory();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const inputData = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      returnSecureToken: true,
    };

    if (typeOfComponent === "login") {
      authCtx.login(inputData);
      history.replace("/home");
      return;
    }

    if (
      passwordInputRef.current.value !== confirmPasswordInputRef.current.value
    ) {
      setDifferentPasswords(true); // do poprawy!
      return;
    }
    setDifferentPasswords(false);
    authCtx.createAccount(inputData);
  };

  return (
    <div className={classes.loginWrapper}>
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
            {differentPasswords && <p>Provided passwords are not the same.</p>}
          </div>
        )}
        {props.type === "login" && (
          <Link to="/CreateAccount">
            <p className={classes.toNewAccount}>No account? Create one.</p>
          </Link>
        )}
        <div className={classes.submitButton}>
          <button onClick={formSubmitHandler}>
            {props.type === "login" ? "Submit" : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
