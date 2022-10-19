import React from 'react'
import {Link} from 'react-router-dom'

function Demographics({background, politician, PlaceholderImage, imageURL}) {
    //Make dynamic link to take us to the politicians full profile
    const fullProfileLink = `/profile/${politician.first_name} ${politician.last_name}`

  return (
    <div className="row">
    <div className="col-6">
    <div className={background} style={{ textAlign: "center" }}>
      <img
        src={imageURL}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = PlaceholderImage;
        }}
        className="card-img-top"
        alt="..."
      />
      <Link to={fullProfileLink} style={{textDecoration: 'none'}}>
      <h5 className="card-title card-header text-white">
        View Full Profile
      </h5>
      </Link>
    </div>
  </div>
  <div className="col-6 mt-5">
    <h2>
      {politician.first_name} {politician.last_name}
    </h2>
    <h6 className="mt-2 text-muted">DOB: {politician.date_of_birth}</h6>
    <h6 className="mt-2 text-muted">
      Party Affiliation: {politician.party}
    </h6>
    <h5 className="mt-2 text-muted">State: {politician.state}</h5>
    {/* Display url if applicable */}
    {politician.url && (
      <p className="mb-2">
        <a href={politician.url} className="text-info">
          Website
        </a>
      </p>
    )}
  </div>
  </div>
  )
}

export default Demographics