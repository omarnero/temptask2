import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

function Post() {
  const nav = useNavigate();
  const parms = useParams();
  let status = 10;
  if (status === 10) {
    return <Navigate to="/" />;
  }
  const changeHandler = () => {
    nav("/about");
  };
  return (
    <div>
      <h2>posts {parms.id}</h2>
      <button onClick={changeHandler}> About </button>
    </div>
  );
}

export default Post;
