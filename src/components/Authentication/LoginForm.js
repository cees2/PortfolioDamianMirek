import classes from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import useAuth from "../../hooks/use-auth";
import Card from "../UI/Card";
import Error from "../UI/Error";
import TaskContext from "../../store/tasks-context";

const LoginForm = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const taskCtx = useContext(TaskContext);
  const { validateEmail, validatePassword, error, formSubmitHandler } =
    useAuth();

  const emailInputBlurHandler = () =>
    validateEmail(emailInputRef.current.value);

  const passwordInputBlurHandler = () =>
    validatePassword(passwordInputRef.current.value);

  const loginSubmitHandler = async (e) => {
    const payload = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    const user = await formSubmitHandler(e, payload);

    taskCtx.setTasks(user.data.user.tasks); // do poprawy
  };

  return (
    <Card class={classes.loginWrapper}>
      <form className={classes.loginInput}>
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
        <Link to="/authentication/createAccount">
          <p className={classes.toNewAccount}>No account? Create one.</p>
        </Link>
        <div className={classes.submitButton}>
          {error && <Error errorMessage={error} />}
          <button onClick={loginSubmitHandler}>Submit</button>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
