import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import axios from "axios";
import "./SignIn.css";
import db from "../firebase";

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (userObj) => {
      return userObj.user.getIdToken().then((idToken) => {
        axios
          .post("/signup", {
            name: userObj.user.displayName,
            email: userObj.user.email,
            _id: userObj.user.uid,
            photoURL: userObj.user.photoURL,
            idToken: idToken,
          })
          .then(() => {
            window.location.assign('/')
          });
      });
    },
  },
};

export default function SignIn() {
  return (
    <div class="signIn">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}
