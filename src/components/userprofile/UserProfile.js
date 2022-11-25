import React from 'react'
import '../userprofile/UserProfile.css'


function UserProfile() {
  return (
    <div>
      <h1>Your Profile</h1>
      <div>
        <h3>Email</h3>
        <div>info</div>
        <div className="box">
          <h3>Interests</h3>
          <div>info</div>
          <button className="update">Update Interests </button>
        </div>
        <div className="box">
          <h3>Location</h3>
          <div>info</div>
          <button className="update">Update Location</button>
        </div>
        <button>Sign Out</button>
      </div>

    </div>
  )
}


export default UserProfile