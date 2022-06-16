import { createContext, useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase.config";
import FeedbackData from "../../data/FeedbackData";

const Context = createContext();
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comp, setComp] = useState();
  const [login, setLogin] = useState(false);
  const [users, setUsers] = useState([]);
  const [Email, setEmail] = useState();
  const [loginId, setLoginId] = useState(false);
  const [signin, setSignin] = useState(false);
  const [id, setId] = useState();
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  // useEffect(() => {
  //   logoinfun();
  //   fetchFeedback();
  // });

  useEffect(() => {
    const fetchListings = async () => {
      console.log("get users");
      try {
        // Get reference
        const listingsRef = collection(db, "users");

        // Create a query
        const q = query(listingsRef, orderBy("timestamp", "desc"));

        // Execute query
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setUsers(listings);
      } catch (error) {
        console.log("error to get data");
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    console.log("filter user ");
    let user = users.filter((user) => {
      return user.data.email === Email;
    });
    if (user.length === 0) {
      return;
    }
    let idd = user[0].data.id;
    localStorage.setItem("loginid", idd);
    let LoginId = localStorage.getItem("loginid");
    setId(Number(LoginId));
    console.log(id);
    fetchFeedback();
  }, [Email]);
  useEffect(() => {
    console.log("sign in effect ");
    fetchFeedback();
    let idd = localStorage.getItem("id");
    let log = localStorage.getItem("login");
    // if (log === "1") {
    //   return;
    // }
    setId(Number(idd));
    setUsers(users);
  }, []);
  useEffect(() => {
    setComp(comp);
  }, [comp]);
  const [feedbackEdit, setFeedbackEdit] = useState();
  const [change, setChange] = useState(false);
  const del = (id) => {
    // await fetch(`http://localhost:5000/feedback/${id}`, { method: "DELETE" });
    let index = feedback.findIndex((item) => {
      return item.id === id;
    });
    let dataC = feedback.slice();
    dataC.splice(index, 1);
    setFeedback(dataC);
  };
  const fetchFeedback = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    const todos = data.filter((n) => {
      return n.userId === id;
    });
    setFeedback(todos);
    setIsLoading(false);
  };

  const add = async (item) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    console.log(data);
    setFeedback([data, ...feedback]);
  };

  const edit = (id) => {
    const elem = feedback.filter((ele) => {
      return ele.id === id;
    });
    setFeedbackEdit(elem);
    setChange(true);
  };
  const update = async (id, item) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      }
    );
    const data = response.json();
    const index = feedback.findIndex((ele) => {
      return ele.id === data.id;
    });
    let nfeed = feedback.slice();
    nfeed.splice(index, 1);
    nfeed.splice(index, 0, data);
    setFeedback(nfeed);
  };

  return (
    <Context.Provider
      value={{
        feedback,
        del,
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
