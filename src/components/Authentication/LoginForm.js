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

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

    if (
      !emailInput.includes("@") ||
      emailInput.indexOf("@") === 0 ||
      !emailInput.includes(".") ||
      emailInput.indexOf(".") === emailInput.length - 1 ||
      emailInput.length < 3 ||
      passwordInput.length < 5
    ) {
      setError("Incorrect email, or password");
      return;
    }

    const inputData = {
      email: emailInput,
      password: passwordInput,
      returnSecureToken: true,
    };

    if (props.type === "createAccount") {
      const confirmPassword = confirmPasswordInputRef.current.value;

      if (passwordInput !== confirmPassword) {
        setError("Provided passwords are not the same"); // do poprawy!
        return;
      }
    }

    let url = "";
    props.type === "login"
      ? (url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDt96ic9vIPskghHCG03yyOX9j-FBdB3VY")
      : (url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDt96ic9vIPskghHCG03yyOX9j-FBdB3VY");

    fetch(url, {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          setError("Something went wrong. Check your email and password, then click submit.");
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        authCtx.login(responseData.idToken, responseData.localId);
        history.replace("/home");
      })
      .catch((message) => {
        console.log(message)
      });
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
