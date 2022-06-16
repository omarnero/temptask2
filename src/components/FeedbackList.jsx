import FeedbackItem from "./FeedbackItem";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import Context from "./context/FeedbackContext";
import Spinner from "./shared/Spinner";
function FeedbackList() {
  let { feedback: data, del, isLoading } = useContext(Context);
  if (data.length === 0 && isLoading) {
    return <Spinner />;
  } else if (data.length === 0) {
    return <p className="center">no Todos found</p>;
  } else {
    return (
      <div className="feedback-list">
        <AnimatePresence>
          {data.map((data) => {
            return (
              <div key={data.id}>
                <motion.dev
                  key={data.id}
                  intial={{ opacity: 0 }}
                  anmiate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FeedbackItem
                    id={data.id}
                    rate={data.completed}
                    text={data.title}
                    closeHandler={del}
                  />
                </motion.dev>
              </div>
            );
          })}
        </AnimatePresence>
      </div>
    );
  }
}

export default FeedbackList;
