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

const getCurrentUserTagsCollection = () => {
  const user = getCurrentUser();
  return user ? firestore.collection("users").doc(user.uid).collection('tags') : null;
};

const getCurrentUserInteractionsCollection = async (person) => {
  const user = getCurrentUser();
  const query = user ? await firestore.collection("users").doc(user.uid).collection('people').where('name', '==', person).get() : null;
  if(query) {
    console.log('docs', query.docs);
    const snapshot = query.docs[0];
    const data = snapshot.data();
    return { ref: snapshot.ref, records: data } ;
  }
  else {
    console.log('null');
  }
  return null;
};

export { firebase, getCurrentUser, getCurrentUserCollection, getCurrentUserPeopleCollection, getCurrentUserTagsCollection, getCurrentUserInteractionsCollection };
