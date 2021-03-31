import React from "react"
import Avatar from "@material-ui/core/Avatar"
import "./Chat.css"

export default function Chat({name, message, profile_pic, timestamp}) {
  return (
    <section className="chat">
      <Avatar classname="chat__image" alt={name} src={profile_pic}></Avatar>
      <div className="chat__details">
        <h1>{name}</h1>
        <p>{message}</p>
      </div>
        <p className="chat__timestamp">{timestamp}</p>
    </section>
  )
}