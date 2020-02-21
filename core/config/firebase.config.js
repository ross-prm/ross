import * as firebase from "firebase";
import "firebase/firestore";
import * as firebaseConfig from "./firebase.config.json";

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const getCurrentUser = () => firebase.auth().currentUser;

const getCurrentUserCollection = () => {
  const user = getCurrentUser();
  return user ? firestore.collection("users").doc(user.uid) : null;
};

const getCurrentUserPeopleCollection = () => {
  const user = getCurrentUser();
  return user ? firestore.collection("users").doc(user.uid).collection('people') : null;
};

export { firebase, getCurrentUser, getCurrentUserCollection, getCurrentUserPeopleCollection };
