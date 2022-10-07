import React, { useRef } from "react";
import classes from "./AccountInformationModal.module.css";
import { Backdrop } from "../UI/ConfirmationModal";

const AccountInformationModal = (props) => {
  const passwordInputRef = useRef();
  const accountDetailToBeChanged = useRef();

  const rejectModal = () => {
    props.onReject();
  };

  const acceptModal = () => {
    const oldPassword = passwordInputRef.current.value;
    const newPassword = accountDetailToBeChanged.current.value;

    props.onAccept({
      oldPassword,
      newPassword,
      passwordConfirm: newPassword, // do poprawy !!!!!!
      action: props.payload.action,
    });
  };

  const warning = `You are about to ${props.payload.message}`;

  const secondLabelContent = `New ${props.payload.action}`;
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
            <div className={classes.modalInput}>
              <label htmlFor="newPass">{secondLabelContent}</label>
              <input
                type="password"
                id="newPass"
                name="newPass"
                ref={accountDetailToBeChanged}
              />
            </div>
          )}
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
