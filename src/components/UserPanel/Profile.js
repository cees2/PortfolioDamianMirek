import React from "react";
import Card from "../UI/Card";
import classes from "./Profile.module.css";

const Profile = () => {
  return (
    <Card class={classes.profileWrapper}>
      <header className={classes.profileHeader}>
        <h3>Your account details </h3>
      </header>
      <section>
        <div className={classes.profileDetail}>
          <h4>Name</h4>
          <p>Damian</p>
        </div>
        <div className={classes.profileDetail}>
          <h4>Email</h4>
          <p>kdosad@okdsaosa.das</p>
        </div>
        <div className={classes.profileDetail}>
          <h4>Date created</h4>
          <p>01.02.1999</p>
        </div>
        <div className={classes.profileDetail}>
          <h4>User role</h4>
          <p>User</p>
        </div>
        <div className={classes.profileDetail}>
          <h4>Number of tasks to do</h4>
          <p></p>
        </div>
      </section>
    </Card>
  );
};

export default Profile;
