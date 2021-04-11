import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { db, timestamp } from "../firebase";
import firebase from "firebase";

export default function Card({ pup, user }) {
  const [view, setView] = useState(false);

  const onSwipe = (direction) => {
    if (direction === "right") {
      const chatsRef = db.collection("chats");
      const messagesRef = db.collection("messages");
      const myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
      const chatID = user.uid.slice(0, 10) + pup.owner.id.slice(0, 10);
      //query the databse for the dog owner's matches and if it includes your id it's a match
      chatsRef
        .doc(chatID)
        .set({
          participants: [
            { id: user.uid, photoURL: user.photoURL, name: user.displayName },
            {
              id: pup.owner.id,
              photoURL: pup.owner.photoURL,
              name: pup.owner.name,
            },
          ],
          participant_ids: [user.uid, pup.owner.id],
          initialMessage: "Say hello!",
          created_at: myTimestamp,
        })
        .then(() => {
          messagesRef.doc(chatID).set({}, { merge: true });
        });
      //store the owner id in your match
    }
  };

  const showStats = () => {
    if (!view) {
      setView(true);
    } else {
      setView(false);
    }
  };

  return (
    <TinderCard
      className="swipe"
      onSwipe={onSwipe}
      preventSwipe={["up", "down"]}
      key={pup.name}
    >
      <div className="card" style={{ backgroundImage: `url(${pup.photoURL})` }}>
        <div id="pupBadge">
          <Button onClick={showStats}>
            <h3>{pup.name}</h3>
          </Button>
        </div>
      </div>
    </TinderCard>
  );
}
