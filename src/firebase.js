import firebase from "firebase"

export const firebaseConfig = {
  apiKey: "AIzaSyCnz46uRnQbvbewKwDHkxWYVj_90yrEycE",
  authDomain: "tinder-clone-d86de.firebaseapp.com",
  projectId: "tinder-clone-d86de",
  storageBucket: "tinder-clone-d86de.appspot.com",
  messagingSenderId: "221562198485",
  appId: "1:221562198485:web:75bae515c00fe615f6455c",
  measurementId: "G-WJJHJEBP03"
};

export const timestamp = firebase.firestore.Timestamp

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth()

export const db = firebaseApp.firestore();

export default db