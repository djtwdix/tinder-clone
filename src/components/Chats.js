import React from "react";
import Chat from "./Chat"

export default function Chats() {
  return (
    <section>
      <Chat
        name="Mark"
        message="Yo What's up!"
        timestamp="40 seconds ago"
        profile_pix="url..."
      />
    </section>
  );
}
