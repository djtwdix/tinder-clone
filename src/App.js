//css

import "./App.css";

//components

import Header from "./components/Header";
import CardStack from "./components/CardStack";
import SwipeButtons from "./components/SwipeButtons";
import Chats from "./components/Chats";
import ChatWindow from "./components/ChatWindow";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";


//router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//firebase
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebaseConfig } from "./firebase";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import Pups from "./components/Pups";
import AddPupForm from "./components/AddPupForm";
import { useEffect } from "react";

function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="App">
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <Router>
          <Switch>
            <Route exact path="/user/:uid">
              <Header backButton="/" user={user} />
              <Profile user={user} />
            </Route>

            <Route path="/chat/:chatID">
              <Header backButton="/chat" user={user} />
              <ChatWindow user={user} />
            </Route>

            <Route exact path="/user/:uid/pups">
              <Header backButton={true} user={user} />
              <Pups user={user} />
            </Route>

            <Route path="/chat">
              <Header backButton="/" user={user} />
              <Chats user={user} />
            </Route>

            <Route path="/pups/new">
              <Header backButton="/user/:uid/pups" user={user} />
              <AddPupForm user={user} />
            </Route>

            <Route exact path="/">
              <Header user={user} />
              {!user && !loading ? (
                <SignIn />
              ) : (
                <>
                  <CardStack user={user} />
                  <SwipeButtons />
                </>
              )}
            </Route>
          </Switch>
        </Router>
      </FirebaseAuthProvider>
    </div>
  );
}

export default App;
