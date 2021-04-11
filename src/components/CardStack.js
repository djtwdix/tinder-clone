import React, { useState, useEffect } from "react";
import "./Card.css";
import db from "../firebase";
import Card from "./Card";

import { getUserByID, isMatched } from "../firebase/queries";

export default function CardStack({ user }) {
  const [pups, setPups] = useState([]);


  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("dogs")
        .where("owner_id", "!=", `${user.uid}`)
        .onSnapshot((snapshot) => {
          setPups(snapshot.docs.map((doc) => doc.data()));
        });
      return unsubscribe;
    }
  }, [user]);

  const parsedPups = pups.map((pup) => {
    return <Card key={pup.id} pup={pup} user={user} />;
  });
  /* 
  const parsedPupsStats = pups.map((pup) => {
    return (
      <TinderCard
        className="swipe"
        onSwipe={onSwipe}
        preventSwipe={["up", "down"]}
        key={pup.name}
      >
        <Button
          onClick={showStats}
          style={{ boxShadow: "0px 0px 10px (#00000)" }}
        >
          <div className="card">
            <h4>{pup.name}</h4>
            <h4>{pup.breed}</h4>
            <h4>{pup.energy}</h4>
            <h4>{pup.bio}</h4>
          </div>
        </Button>
      </TinderCard>
    );
  }); */

  return (
    <section>
      <div className="card__container">{parsedPups}</div>
    </section>
  );
}
