import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBDir070y7_mGioNsBRU38BjtQ2TqMiOvw",
  authDomain: "react-beginner-wes-bos.firebaseapp.com",
  databaseURL: "https://react-beginner-wes-bos.firebaseio.com/"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base