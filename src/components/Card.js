import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./Card.css";
import database from "./firebase";

export default function Card() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const unsubscribe = database.collection("users").onSnapshot((snapshot) => {
      setPeople(snapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const parsedPeople = people.map((person) => {
    return (
      <TinderCard
        className="swipe"
        preventSwipe={["up", "down"]}
        key={person.name}
      >
        <div className="card" style={{ backgroundImage: `url(${person.url})` }}>
          <h3>{person.name}</h3>
        </div>
      </TinderCard>
    );
  });

  return (
    <section>
      <div className="card__container">{parsedPeople}</div>
    </section>
  );
}
