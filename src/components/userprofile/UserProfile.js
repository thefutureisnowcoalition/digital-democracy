import React from 'react'
import '../userprofile/UserProfile.css'


function UserProfile() {
  return (
    <div>
      <h1 className="profile">Your Profile</h1>
      <div>
        <div className="container">
          <h3>Email</h3>
          <div className="info">info</div>
          <div className="box">
            <h3 className="interest">Interests</h3>
            <div className="info">info</div>
            <button className="update">Update Interests </button>
          </div>
          <div className="box">
            <h3 className="location">Location</h3>
            <div className="info">info</div>
            <button className="update">Update Location</button>
          </div>
          <button className="signout">Sign Out</button>
        </div>
      </div>
    </div>
  )
}


export default UserProfile