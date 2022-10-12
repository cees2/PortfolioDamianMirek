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

  const changeAccountDetail = async (detail = "email") => {
    const password = passwordInputRef.current.value;
    const newDetail = accountDetailToBeChanged.current.value;
    const confirmNewDetail = confirmDetailToBeChanged.current.value;
    let url;

    const payload = {
      password,
    };

    if (detail === "email") {
      payload.newEmail = newDetail;
      payload.emailConfirm = confirmNewDetail;
      url = "changeMyEmail";
    } else {
      payload.newPassword = newDetail;
      payload.passwordConfirm = confirmNewDetail;
      url = "changeMyPassword";
    }

    try {
      await sendRequest({
        url: `users/${url}`,
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

  const resetPassword = async () => {
    changeAccountDetail("password");
  };

  const resetEmail = async () => {
    changeAccountDetail();
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
      <div className={classes.accountModalWrapper}>
        <header className={classes.accountModalHeader}>
          <img src={require("../../pictures/warning.png")} alt="Warning" />
          <h2>{warning} </h2>
        </header>
        <main className={classes.accountModalMain}>
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
        <footer className={classes.accountModalFooter}>
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
