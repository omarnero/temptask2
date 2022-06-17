import React from "react";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import Context from "../components/context/FeedbackContext";
function Login() {
  const { setEmail, setLogin } = useContext(Context);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password, name } = form;
  const onChange = (e) => {
    setForm((prevstate) => ({
      ...prevstate,
      [e.target.id]: e.target.value,
    }));
  };
  const sumbitHandler = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        localStorage.setItem("email", email);
        setEmail(email);
        setLogin(true);
        navigate("/todos");
      }
    } catch (error) {
      toast.error(`mail is incorrect or password`);
    }
  };
  return (
    <form onSubmit={sumbitHandler} className="login-form">
      <h2 className="text-center text-light"> Login </h2>
      <div className="form-group py-1">
        <label htmlFor="email" className="h4">
          Email address
        </label>
        <input
          className="form-control form-control-lg"
          type="email"
          id="email"
          placeholder="Enter email"
          onChange={onChange}
          value={form.email}
        />
      </div>
      <div className="form-group py-1">
        <label htmlFor="password" className="h4">
          Password
        </label>
        <input
          className="form-control"
          type="password"
          id="password"
          onChange={onChange}
          value={form.password}
        />
      </div>
      <button
        className="btn-info btn-lg my-2 float-right text-center"
        type="submit"
      >
        Login
      </button>
      <Link to="/sign-in" className="link">
        <p>to Register</p>
      </Link>
    </form>
  );
}

export default Login;
