import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AiconLink from "./components/AiconLink";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import About from "./pages/About";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import { FeedbackProvider } from "./components/context/FeedbackContext";
const App = () => {
  return (
    <>
      <FeedbackProvider>
        <Router>
          <Header text="Todo List" />
          <div className="container">
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <>
                    <FeedbackForm />
                    <FeedbackStats />
                    <FeedbackList />
                    <AiconLink />
                  </>
                }
              ></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/about" element={<About />} />
              <Route path="/post/:id" element={<Post />} />
            </Routes>
          </div>
        </Router>
      </FeedbackProvider>
      <ToastContainer />
    </>
  );
};
export default App;
