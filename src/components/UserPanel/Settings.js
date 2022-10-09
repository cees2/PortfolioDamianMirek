import React, { useContext, useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./Settings.module.css";
import AuthContext from "../../store/auth-context";
import AccountInformationModal from "./AccountInformationModal";
import ReactDOM from "react-dom";
import useHttp from "../../hooks/use-http";

const Settings = () => {
  const [modalIsClosed, setModalIsClosed] = useState(true);
  const [modalDetails, setModalDetails] = useState(""); // email / password / account
  const nameInputRef = useRef();
  const { sendRequest } = useHttp();

  const authCtx = useContext(AuthContext);

  const openModal = (e) => {
    const innerText = e.target.innerText;
    if (innerText === "Change Email") {
      setModalDetails((prevDetails) => {
        return { message: "change email", action: "email" };
      });
    } else if (innerText === "Change Password") {
      setModalDetails((prevDetails) => {
        return { message: "change password", action: "password" };
      });
    } else {
      setModalDetails((prevDetails) => {
        return { message: "delete account", action: "" };
      });
    }
    setModalIsClosed(false);
  };

  const modalRejected = () => {
    setModalIsClosed(true);
  };

  const modalAccepted = async () => {
    setModalIsClosed(true);
  };

  const changeNameHandler = async () => {
    const name = nameInputRef.current.value;

    const updatedUser = await sendRequest({
      url: "users/changeMyName",
      method: "PATCH",
      body: { newName: name },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
    });

    authCtx.changeUserName(updatedUser.data.user.name);

    nameInputRef.current.value = "";
  };

  return (
    <>
      {!modalIsClosed &&
        ReactDOM.createPortal(
          <AccountInformationModal
            payload={modalDetails}
            onReject={modalRejected}
            onAccept={modalAccepted}
          />,
          document.getElementById("confirmation-modal")
        )}
      <Card class={classes.settingsWrapper}>
        <header className={classes.settingsHeader}>
          <h2>Settings</h2>
        </header>
        <section className={classes.safeChangesArea}>
          <div className={classes.settingsInput}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              placeholder={authCtx.userDetails.name}
              ref={nameInputRef}
            />
            <button
              className={classes.changeNameButton}
              onClick={changeNameHandler}
            >
              Change Name
            </button>
          </div>
        </section>
        <section className={classes.dangerZone}>
          <h3 className={classes.dangerZoneHeader}>Danger zone</h3>
          <p className={classes.dangerZoneWarning}>
            <span className={classes.dangerZoneWarningBold}>Warning: </span>
            Performing any following action will permanently change your account
            data.
          </p>
          <button onClick={openModal}>Change Email</button>
          <button onClick={openModal}>Change Password</button>
          <button onClick={openModal}>Delete Account</button>
        </section>
      </Card>
    </>
  );
};

export default Settings;
