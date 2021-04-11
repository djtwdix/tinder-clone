import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import "./ChatWindow.css";
import db from "../firebase";
import { Container } from "@material-ui/core";
import { useParams } from "react-router";
import Pusher from "pusher-js";
import axios from "axios";
import { io } from "socket.io-client";

export default function ChatWindow({ user }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [mongoMessages, setMongoMessages] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const [connection, setConnection] = useState({});
  const { chatID } = useParams();

  useEffect(() => {
    const socket = io();
    setConnection(socket);
    socket.on("messages", (data) => {
      setMongoMessages((prev) => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    db.collection("chats")
      .doc(chatID)
      .get()
      .then((doc) => {
        setOtherUser(
          doc
            .data()
            .participants.filter((participant) => participant.id !== user.uid)
        );
      })
      .then(() => {
        db.collection("messages")
          .doc(chatID)
          .onSnapshot(
            {
              // Listen for document metadata changes
              includeMetadataChanges: true,
            },
            (doc) => {
              if (doc.data().messages) {
                setMessages(doc.data().messages);
              }
            }
          );
      });

    axios.get("/messages/sync").then((res) => {
      setMongoMessages(res.data);
    });
  }, [chatID, user]);

  

  const parsedMessages = mongoMessages.map((message) => {
    return message.user_id !== user.uid ? (
      <Container>
        <div class="chatWindow__message">
          <Avatar
            className="chatWindow__image"

            /* alt={message.name} */
          ></Avatar>
          <p class="chatWindow__text">{message.message}</p>
        </div>
      </Container>
    ) : (
      <div class="chatWindow__message">
        <p class="chatWindow__textUser">{message.message}</p>
        <Avatar
          className="chatWindow__image"
          src={user.photoURL}
          /* alt={message.name} */
        ></Avatar>
      </div>
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setMessages([...messages, { id: user.uid, text: input }]);
      db.collection("messages")
        .doc(chatID)
        .set({
          messages: [...messages, { id: user.uid, text: input }],
        });
    }
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    connection.emit("messages", {
      name: user.displayName,
      message: input,
      user_id: user.uid,
    });
    console.log("clicked");
    if (input) {
      axios
        .post("/messages/new", {
          name: user.displayName,
          message: input,
          received: "false",
        })
        .then((res) => {})
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <section className="chatWindow">
      <p class="chatWindow__match"></p>
      {parsedMessages}
      <form onSubmit={handleSubmit} className="chatWindow_messageInput">
        <div className="chatWindow__inputMessageText">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message here"
            disableUnderline={true}
            required={true}
            fullWidth={true}
            autoFocus={true}
          ></Input>
        </div>
        <Button type="submit" onClick={handleSubmitNew}>
          <p className="chatWindow__inputButton">SEND</p>
        </Button>
      </form>
    </section>
  );
}
