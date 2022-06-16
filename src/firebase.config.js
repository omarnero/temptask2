// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyD38kXDsDAFprv_gPInuJpHRVthSIg6IxU",
//   authDomain: "todo-task-568.firebaseapp.com",
//   projectId: "todo-task-568",
//   storageBucket: "todo-task-568.appspot.com",
//   messagingSenderId: "173753355116",
//   appId: "1:173753355116:web:83f5e681e9e16f7a574149",
//   measurementId: "G-ZS10NJYRCG",
// };
const firebaseConfig = {
  apiKey: "AIzaSyABSTJBYho7kQSdRH0sgm5aZl-mUEUm6ZU",
  authDomain: "task-todos.firebaseapp.com",
  projectId: "task-todos",
  storageBucket: "task-todos.appspot.com",
  messagingSenderId: "424322269722",
  appId: "1:424322269722:web:589335e5cee3beaf7687a3",
};
initializeApp(firebaseConfig);
export const db = getFirestore();
