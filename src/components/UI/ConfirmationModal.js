import classes from "./ConfirmationModal.module.css";
import React from "react";

export const Backdrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onReject}>
      {props.children}
    </div>
  );
};

const ConfirmationModal = (props) => {
  return (
    <React.Fragment>
      <Backdrop onReject={props.onReject} />
      <div
        className={classes.modalWrapper}
        style={{ top: `calc(50% + ${window.scrollY}px)` }}
      >
        <h3 className={classes.modalQuestion}>{props.message}</h3>
        <div className={classes.modalButtons}>
          <button
            className={classes.acceptDeleteButton}
            onClick={props.onConfirm}
          >
            Yes
          </button>
          <button
            className={classes.rejectDeleteButton}
            onClick={props.onReject}
          >
            No
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConfirmationModal;
