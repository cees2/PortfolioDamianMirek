import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import validator from "email-validator";
import AuthContext from "../store/auth-context";

const useAuth = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const validateEmail = (email) => {
    if (validator.validate(email)) setError("");
    else setError("Please provide correct email.");
  };

  const validatePassword = (password) => {
    if (password.length >= 8) setError("");
    else setError("Password has to be at least 8 characters long.");
  };

  const formSubmitHandler = async (event, payload, loginHandler = true) => {
    event.preventDefault();
    if (error) return;
    const emailInput = payload.email;
    const passwordInput = payload.password;

    const inputData = {
      email: emailInput,
      password: passwordInput,
    };

    let user;
    if (loginHandler) {
      try {
        user = await authCtx.login(inputData);
      } catch (err) {
        setError(err.message);
        return;
      }
    } else {
      inputData.passwordConfirm = payload.passwordConfirm;
      inputData.name = payload.name;

      try {
        user = await authCtx.createAccount(inputData);
      } catch (err) {
        setError(err.message);
        return;
      }
    }
    history.replace("/home");
    return user;
  };

  return {
    validateEmail,
    validatePassword,
    error,
    formSubmitHandler,
  };
};

export default useAuth;
