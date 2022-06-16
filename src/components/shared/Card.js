import React from "react";

function Card(props) {
  return (
    <div className={`card ${props.revers && "reverse"}`}>{props.children}</div>
  );
}

export default Card;
