import React, { useContext } from "react";
import Card from "../UI/Card";
import classes from "./Profile.module.css";
import AuthContext from "../../store/auth-context";

const Profile = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Card class={classes.profileWrapper}>
      <header className={classes.profileHeader}>
        <h3>Your account details </h3>
      </header>
      <section>
        <div className={classes.profileDetail}>
          <h4>Name</h4>
          <p>{authCtx.userDetails.name}</p>
        </div>
        <div className={classes.profileDetail}>
          <h4>Email</h4>
          <p>{authCtx.userDetails.email}</p>
        </div>
        <div className={classes.profileDetail}>
          <h4>Date created</h4>
          <p>{authCtx.userDetails.dateCreated}</p>
        </div>
        <div className={classes.profileDetail}>
          <h4>User role</h4>
          <p>{authCtx.userDetails.role}</p>
        </div>
      </section>
    </Card>
  );
};

export default Profile;
