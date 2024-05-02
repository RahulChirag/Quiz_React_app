import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEIW84Szm04oYiKzyUIth02ONbaylbaIc",
  authDomain: "quiz-maker-55596.firebaseapp.com",
  projectId: "quiz-maker-55596",
  storageBucket: "quiz-maker-55596.appspot.com",
  messagingSenderId: "1059976708311",
  appId: "1:1059976708311:web:a3181e5a5dbc21af66b092",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
