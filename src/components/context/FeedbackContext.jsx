import { createContext, useState, useEffect } from "react";

const Context = createContext();
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comp, setComp] = useState(true);
  const [login, setLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [Email, setEmail] = useState("");
  const [feedbackEdit, setFeedbackEdit] = useState();
  const [change, setChange] = useState(false);
  const [id, setId] = useState(11);
  useEffect(() => {
    // console.log("login fetch");
    const getusers = async () => {
      let lemail = localStorage.getItem("email");
      setEmail(lemail);
      try {
        const res = await fetch(`https://reqres.in/api/users`);
        const resdata = await res.json();

        // const { data } = resdata;
        setUsers(resdata.data);
        let userid = users.filter((user) => {
          return user.email === Email;
        });
        if (userid.length !== 0) {
          localStorage.setItem("id", userid[0].id);
        }
        let lid = localStorage.getItem("id");
        setId(Number(lid));
        fetchFeedback();
      } catch (e) {
        console.log(e);
      }
    };
    getusers();
  }, [Email, id]);
  const edit = (id) => {
    const elem = feedback.filter((ele) => {
      return ele.id === id;
    });
    setFeedbackEdit(elem);
    setChange(true);
  };
  const update = async (id, item) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data) {
        const index = feedback.findIndex((ele) => {
          return ele.id === data.id;
        });
        let nfeed = feedback.slice();
        nfeed.splice(index, 1);
        nfeed.splice(index, 0, data);
        setChange(false);
        setFeedback(nfeed);
      }
    } catch {
      let data = item;
      const index = feedback.findIndex((ele) => {
        return ele.id === data.id;
      });
      let nfeed = feedback.slice();
      nfeed.splice(index, 1);
      nfeed.splice(index, 0, data);
      setChange(false);
      setFeedback(nfeed);
    }
  };
  // useEffect(() => {
  //   edit();
  //   update();
  // }, [change, feedbackEdit]);

  const fetchFeedback = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    const todos = data.filter((n) => {
      return n.userId === id;
    });
    setFeedback(todos);
    setIsLoading(false);
  };
  //  commint the post method because cause error in id get fixed id for every new element
  const add = async (item) => {
    // const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(item),
    // });
    // const data = await response.json();
    console.log(item);
    setUser(item);
    setFeedback([item, ...feedback]);
  };

  return (
    <Context.Provider
      value={{
        feedback,
        add,
        edit,
        isLoading,
        feedbackEdit,
        change,
        update,
        comp,
        setComp,
        setUsers,
        setId,
        setEmail,
        id,
        setLogin,
        login,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
