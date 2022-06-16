import React from "react";

function Button(props) {
  return (
    <button
      className={`btn btn-${props.version}`}
      type={props.type}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
}
Button.defaultProps = {
  version: "primary",
  type: "submit",
  isDisabled: false,
};
export default Button;
