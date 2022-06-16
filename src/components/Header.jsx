import React from "react";
import classes from "./Header.module.css";
function Header(props) {
  return (
    <header className={classes.header}>
      <div className="container">
        <h2>{props.text}</h2>
      </div>
    </header>
  );
}

export default Header;
