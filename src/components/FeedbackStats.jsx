import React from "react";
import { useContext } from "react";
import Context from "./context/FeedbackContext";
function FeedbackStats(props) {
  const { feedback: data } = useContext(Context);
  return (
    <div className="feedback-stats">
      <h4>Todos: {data.length}</h4>
      {/* <h4> Average Rating: {`${isNaN(avrage) ? 0 : avrage.toFixed(1)}`}</h4> */}
    </div>
  );
}

export default FeedbackStats;
