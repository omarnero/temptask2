import React, { useState, useContext } from "react";
import Context from "./context/FeedbackContext";
function RatingSelect() {
  const { setComp, comp } = useContext(Context);
  const clickHandler = (e) => {
    if (e.target.value === "true") {
      setComp(true);
    } else {
      setComp(false);
    }
  };
  return (
    <>
      <ul className="rating">
        <div className="true-false">
          <input type="button" value="true" onClick={clickHandler} />
        </div>
        <div className="true-false">
          <input type="button" value="false" onClick={clickHandler} />
        </div>
      </ul>
      {/* {comp && (
        <p
          className={`h4 py-2 text-center text-capitalize ${
            comp === true ? "text-info" : "text-warning"
          }`}
        >
          {comp}
        </p>
      )} */}
      {comp && <p className="h4 py-1 text-center text-info"> Completed</p>}
      {!comp && (
        <p className="h4 py-1 text-center text-warning"> UnCompleted</p>
      )}
    </>
  );
}

export default RatingSelect;
