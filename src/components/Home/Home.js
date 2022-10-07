import classes from "./Home.module.css";
import pic from "./../../pictures/clip-programming.png";
import githubIcon from "./../../pictures/github.png";
import linkedInIcon from "./../../pictures/linkedin.png";
import React from "react";

const Home = () => {
  return (
    <div className={classes.homePageWrapper}>
      <div className={classes.homePageContentWrapper}>
        <section className={classes.homeSection}>
          <img src={pic} alt="Programmer" />
        </section>
        <aside className={classes.aboutMe}>
          <div className={classes.info}>
            <h3>Damian Mirek, 4th year student</h3>
            <p className={classes.description}>
              Hi there, I'm looking for an internship as a frontend developer
              and this is my portfolio. I'm interested in JavaScript and
              framework React. In the future I would like to develop my skills
              in frontend and backend as well. Feel free to register to my app,
              log in, and test my to do app. Linkedin and github links below.{" "}
            </p>
          </div>
        </aside>
      </div>
      <footer className={classes.icons}>
        <a href="https://github.com/cees2" target="_blank" rel="noreferrer">
          <img src={githubIcon} alt="github icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/damian-mirek-979b0623b/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedInIcon} alt="linkedin icon" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
