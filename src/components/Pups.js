import { Avatar, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "../firebase";

export default function Pups({ user }) {
  const [pups, setPups] = useState([]);

  const pupsRef = db.collection("dogs");
  const query = pupsRef.where("owner_id", "==", `${user.uid}`);

  useEffect(() => {
    const unsubscribe = query.get().then((querySnapshot) => {
      setPups(querySnapshot.docs.map((doc) => doc.data()));
    });

    return unsubscribe;
  }, [query]);

  const parsedPups = pups.map((pup) => {
    return (
      <Button style={{ width: "100%" }}>
        <Link to={"/"}>
          <section key={pup.id} className="chat">
            <Avatar
              className="chat__image"
              alt={pup.name}
              src={pup.photoURL}
            ></Avatar>
            <div className="chat__details">
              <h1>{pup.name}</h1>
              <p>{pup.breed}</p>
            </div>
          </section>
        </Link>
      </Button>
    );
  });

  return (
    <section>
      {parsedPups}
      <Button style={{ width: "100%" }}>
        <Link to={"/pups/new"}>
          <section className="chat">
            <Add />
          </section>
        </Link>
      </Button>
    </section>
  );
}
