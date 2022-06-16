import React from "react";
import { useState, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Context from "../components/context/FeedbackContext";
function Signin() {
  const { setEmail } = useContext(Context);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { email, password, name } = form;
  let id = Number(localStorage.getItem("id")) + 1;
  const onChange = (e) => {
    setForm((prevstate) => ({
      ...prevstate,
      [e.target.id]: e.target.value,
      id: id,
    }));
  };
  const sumbitHandler = async (e) => {
    e.preventDefault();

    if (name.length === 0) {
      toast.error("error in enter data");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...form };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      localStorage.setItem("id", id);
      setEmail(email);
      navigate("/todos");
    } catch (error) {
      toast.error("error in enter data");
    }
  };
  return (
    <form onSubmit={sumbitHandler}>
      <h2 className="text-center text-light"> Register </h2>
      <div className="form-group py-1">
        <label htmlFor="name" className="h4">
          Name
        </label>
        <input
          className="form-control"
          type="text"
          id="name"
          placeholder="Enter name"
          onChange={onChange}
          value={form.name}
        />
      </div>
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
        Signin
      </button>
      <Link to="/login" className="link">
        <p>to Login</p>
      </Link>
    </form>
  );
}

export default Signin;
