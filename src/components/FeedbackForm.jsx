import { useState, useEffect } from "react";
import React from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import { useContext } from "react";
import Context from "./context/FeedbackContext";
const FeedbackForm = (props) => {
  const {
    add,
    feedbackEdit,
    change,
    update,
    comp,
    setComp,
    id: userId,
  } = useContext(Context);
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(0);
  useEffect(() => {
    if (change === true) {
      const [feedback] = feedbackEdit;
      const { id, text, comp } = feedback;
      setText(text);
      setComp(comp);
      setId(id);
    }
  }, [feedbackEdit, change]);
  let feedback;
  const textHandler = (e) => {
    if (text.trim().length === "") {
      setDisabled(true);
      setMessage(null);
    } else if (text.trim().length !== "" && text.trim().length < 10) {
      setDisabled(true);
      setMessage("You must have at least ten chars");
    } else {
      setDisabled(false);
      setMessage(null);
    }
    setText(e.target.value);
  };
  const sumbitHandler = (e) => {
    e.preventDefault();
    if (change === true && text.trim().length !== "") {
      feedback = {
        id,
        text,
        comp,
      };
      update(id, feedback);
    } else if (text.trim().length !== "") {
      feedback = {
        userId,
        id: Math.random() * 1000,
        title: text,
        completed: comp,
      };
      add(feedback);
    } else {
    }
    setText("");
  };
  return (
    <Card>
      <form onSubmit={sumbitHandler}>
        <h3 className="center-text">
          Select Todo is completed or notcompleted{" "}
        </h3>
        <RatingSelect />
        <div className="input-group">
          <input
            onChange={textHandler}
            type="text"
            placeholder="Write a todo"
            value={text}
          />
          <Button type="sumbit" isDisabled={disabled}>
            Send
          </Button>
        </div>
      </form>
      {message && <div className="message">{message}</div>}
    </Card>
  );
};

export default FeedbackForm;
