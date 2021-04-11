import React from "react";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";

export default function ProfileWidget({ title, user }) {
  const history = useHistory();
  let path = "";
  let signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  if (title === "YOUR PROFILE") {
    path = "profile";
    signOut = null;
  } else if (title === "YOUR PUPS") {
    path = "pups";
    signOut = null;
  }
  return (
    <Button onClick={signOut} style={{ width: "100%" }}>
        <Link to={`/user/${user.uid}/${path}`}>
        
          <section className="chat">
            <div className="chat__details">
              <h4>{title}</h4>
            </div>
          </section>
        
    </Link>
      </Button>
  );
}
