import React from 'react'
import ProfileWidget from './ProfileWidget'
import "./Profile.css"

export default function Profile({ user }) {
  return (
    <div className="userDashboard">
      <ProfileWidget title="YOUR PROFILE" user={user} />
      <ProfileWidget title="YOUR PUPS" user={user} />
      <ProfileWidget title="SIGN OUT" user={user} />
    </div>
  )
}
