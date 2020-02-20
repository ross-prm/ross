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

const getCurrentUserPeopleDoc = () => {
  const user = getCurrentUser();
  return user ? firestore.doc(`${user.uid}/people`) : null;
};

export { firebase, getCurrentUser, getCurrentUserCollection, getCurrentUserPeopleDoc };
