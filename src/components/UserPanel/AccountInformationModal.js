import React, { useRef, useContext, useState } from "react";
import classes from "./AccountInformationModal.module.css";
import { Backdrop } from "../UI/ConfirmationModal";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import Error from "../UI/Error";

const AccountInformationModal = (props) => {
  const { sendRequest } = useHttp();
  const passwordInputRef = useRef();
  const accountDetailToBeChanged = useRef();
  const confirmDetailToBeChanged = useRef();
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState("");

  const rejectModal = () => {
    props.onReject();
  };

  const resetPassword = async () => {
    const oldPassword = passwordInputRef.current.value;
    const newPassword = accountDetailToBeChanged.current.value;
    const passwordConfirm = confirmDetailToBeChanged.current.value;
    const payload = {
      oldPassword,
      newPassword,
      passwordConfirm,
      action: props.payload.action,
    };
    try {
      await sendRequest({
        url: `users/changeMyPassword`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: payload,
        method: "PATCH",
      });

      authCtx.logout();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetEmail = async () => {
    const oldPassword = passwordInputRef.current.value;
    const newEmail = accountDetailToBeChanged.current.value;
    const emailConfirm = confirmDetailToBeChanged.current.value;
    const payload = {
      password: oldPassword,
      newEmail,
      emailConfirm,
      action: props.payload.action, // do poprawy?
    };
    try {
      await sendRequest({
        url: `users/changeMyEmail`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: payload,
        method: "PATCH",
      });

      authCtx.logout();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteAccount = async () => {
    const password = passwordInputRef.current.value;

    try {
      await sendRequest({
        url: `users/deleteMe`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: { password },
        method: "DELETE",
      });

      authCtx.logout();
    } catch (err) {
      setError(err.message);
    }
  };

  const acceptModal = async () => {
    if (props.payload.action === "email") await resetEmail();
    else if (props.payload.action === "password") await resetPassword();
    else await deleteAccount();
  };

  const warning = `You are about to ${props.payload.message}`;

  const secondLabelContent = `New ${props.payload.action}`;
  const confirmLabelContent = `Confirm ${props.payload.action}`;

  const inputType = props.payload.action;
  return (
    <>
      <Backdrop onReject={rejectModal} />
      <div className={classes.passwordModalWrapper}>
        <header className={classes.passwordModalHeader}>
          <img src={require("../../pictures/warning.png")} alt="Warning" />
          <h2>{warning} </h2>
        </header>
        <main className={classes.passwordModalMain}>
          <div className={classes.modalInput}>
            <label htmlFor="curPass">Current password</label>
            <input
              type="password"
              id="curPass"
              name="curPass"
              ref={passwordInputRef}
            />
          </div>
          {props.payload.action && (
            <>
              <div className={classes.modalInput}>
                <label htmlFor="newInfo">{secondLabelContent}</label>
                <input
                  type={inputType}
                  id="newInfo"
                  name="newInfo"
                  ref={accountDetailToBeChanged}
                />
              </div>
              <div className={classes.modalInput}>
                <label htmlFor="confirmNewInfo">{confirmLabelContent}</label>
                <input
                  type={inputType}
                  id="confirmNewInfo"
                  name="confirmNewInfo"
                  ref={confirmDetailToBeChanged}
                />
              </div>
            </>
          )}
          {error && <Error errorMessage={error} />}
        </main>
        <footer className={classes.passwordModalFooter}>
          <button className={classes.cancelButton} onClick={rejectModal}>
            Cancel
          </button>
          <button className={classes.confirmButton} onClick={acceptModal}>
            Confirm
          </button>
        </footer>
      </div>
    </>
  );
};

export default AccountInformationModal;
