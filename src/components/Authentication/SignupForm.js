import React, { useRef } from "react";
import Card from "../UI/Card";
import Error from "../UI/Error";
import classes from "./LoginForm.module.css";
import signUpClasses from "./SignupForm.module.css";
import useAuth from "../../hooks/use-auth";

const SignupForm = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const { validateEmail, validatePassword, error, formSubmitHandler } =
    useAuth();

  const emailInputBlurHandler = () => {
    validateEmail(emailInputRef.current.value);
  };
  const passwordInputBlurHandler = () => {
    validatePassword(passwordInputRef.current.value);
  };

  const SignupSubmitHandler = (e) => {
    const payload = {
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      passwordConfirm: confirmPasswordInputRef.current.value,
    };

    formSubmitHandler(e, payload, false);
  };

  return (
    <Card class={classes.loginWrapper}>
      <form className={classes.loginInput}>
        <div className={classes.formInput}>
          <input id="name" ref={nameInputRef} placeholder="Name" />
        </div>
        <div className={classes.formInput}>
          <input
            type="text"
            id="email"
            ref={emailInputRef}
            onBlur={emailInputBlurHandler}
            placeholder="Email"
          />
        </div>
        <div className={classes.formInput}>
          <input
            type="password"
            id="pass"
            ref={passwordInputRef}
            onBlur={passwordInputBlurHandler}
            placeholder="Password"
          />
        </div>
        <div className={classes.formInput}>
          <input
            type="password"
            id="conf"
            ref={confirmPasswordInputRef}
            placeholder="Confirm password"
          />
        </div>
        <div className={classes.submitButton}>
          {error && (
            <Error errorMessage={error} class={signUpClasses.signupError} />
          )}
          <button onClick={SignupSubmitHandler}>Submit</button>
        </div>
      </form>
    </Card>
  );
};

export default SignupForm;
