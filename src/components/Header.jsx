import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "./context/FeedbackContext";
import classes from "./Header.module.css";
import { getAuth } from "firebase/auth";
function Header(props) {
  const { login, setLogin, setFeedback } = useContext(Context);
  const auth = getAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    setLogin(false);
    auth.signOut();
    setFeedback([]);
    navigate("/");
  };
  return (
    <header className={classes.header}>
      <h2>{props.text}</h2>
      {login && <button onClick={logoutHandler}>logout</button>}
    </header>
  );
}

export default Header;
