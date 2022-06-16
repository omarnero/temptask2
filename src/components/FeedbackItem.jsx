import React from "react";
import Card from "./shared/Card";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import Context from "./context/FeedbackContext";
function FeedbackItem(props) {
  const { edit } = useContext(Context);
  return (
    <Card>
      <div className="num-display">
        {props.rate === true ? "completed" : "uncompleted"}
      </div>
      <button
        className="edit"
        onClick={() => {
          edit(props.id);
        }}
      >
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{props.text}</div>
    </Card>
  );
}

export default FeedbackItem;
