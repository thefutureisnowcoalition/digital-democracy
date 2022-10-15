import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
//To be used if propublica url gives no result
import PlaceholderImage from './images/placeholder.jpg'

import './PoliticianComparison.css'

function PoliticianComparison() {
  //Our state for storing fetched api data
  const [politicianInfo, setPoliticianInfo] = useState([])
  const [work, setWork] = useState(null)

    //Retrieve our url search parameters
    let {search} = useParams();


  //Fires when component is first rendered
  useEffect(() => {
    getPoliticianData()
  }, [search])



  function showNames(){
    setWork(politicianInfo.map((politician => console.log(`{ name: \'${politician.first_name} ${politician.last_name}\' },`))))
    console.log(politicianInfo)
  }


async function getPoliticianData(){
  //Our first request is to propublicas senator database
  const requestOne = axios.get('https://api.propublica.org/congress/v1/117/senate/members.json', {
    headers: {
      "X-API-Key": '8N5NFIfZ4vGdW3Imr72RcIjBHhBhL7xKtRAqx8WK'
    }
  })
  //Our second request is to probublicas house database
  const requestTwo = axios.get('https://api.propublica.org/congress/v1/117/house/members.json', {
    headers: {
      "X-API-Key": '8N5NFIfZ4vGdW3Imr72RcIjBHhBhL7xKtRAqx8WK'
    }
  })

  //We need to use axios.all to combine our two requests and then spread the responses into one....
  axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
   const response = [...responses[0].data.results[0].members, ...responses[1].data.results[0].members];

  
  //If a search parameter is present in the URL, we need to sort our response to pull that politician to the very top
   if(search){
    response.sort((a, b) => {
          let wholenameA = a.first_name.toLowerCase() + ' ' + a.last_name.toLowerCase()
          let wholenameB = b.first_name.toLowerCase() + ' ' + b.last_name.toLowerCase()
      // Sort results by matching name with keyword position in name
      if(wholenameA.toLowerCase().indexOf(search.toLowerCase()) > wholenameB.toLowerCase().indexOf(search.toLowerCase())) {
          return -1;
      } else if (wholenameA.toLowerCase().indexOf(search.toLowerCase()) < wholenameB.toLowerCase().indexOf(search.toLowerCase())) {
         return  1;
      } 
      return
    
  } 

    )
}
setPoliticianInfo(response)
  }))
}



  return (
    <div className="container-lg">
      {/* Page Header */}
      <div
        className="alert alert-primary mt-5"
        style={{ textAlign: "center", maxWidth: "700px", margin: "auto" }}
      >
        <h3>Politician Comparison</h3>
        <hr />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-exclamation-triangle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <p>Feature currently under construction.</p>
        <hr />
        <Link className="link-primary" to="/">
          Return Home
        </Link>
        <button onClick={showNames}>Click for data</button>
      </div>
      <div className="row">
        <p>{work}</p>
        {/* If politicianInfo exists, lets map over it and display a card for each politician */}
        {politicianInfo &&
          politicianInfo.map((politician) => {
            // Lets set a variable inside of each mapped politician to display a unique ID including the politician.id value from propublica. This corresponds with the ID unitedstates.io is looking for.
            const imageURL = `https://theunitedstates.io/images/congress/450x550/${politician.id}.jpg`

            //Set some unique background styling for each card component based on their party affiliation
            if (politician.party === 'R') {
              var background = 'card card-republican'
            } else if (politician.party === 'D') {
              background = 'card card-democrat'
            } else {
              background = 'card card-other'
            }
            return <div className="col-12 card mt-3" key={Math.random()}>
              <div className="row">
              <div className="col-3">
              <div className={background} style={{ textAlign: "center" }}>
                <img src={imageURL} onError={
                  ({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = PlaceholderImage
                  }
                }
                  className="card-img-top" alt="..." />
                <h5 className="card-title card-header text-white">
                  View Full Profile
                </h5>
              </div>
              </div>
              <div className="col-3 mt-5">
              <h2>
                  {politician.first_name} {politician.last_name}
                </h2>
                <h6 className="mt-2 text-muted">
                  DOB: {politician.date_of_birth}
                </h6>
                <h6 className="mt-2 text-muted">
                  Party Affiliation: {politician.party}
                </h6>
                <h5 className="mt-2 text-muted">
                  State: {politician.state}
                </h5>
                                {/* Display url if applicable */}
                                {politician.url && (
                  <p className="mb-2">
                    <a href={politician.url} className="text-info">Website</a>
                  </p>
                )}
              
                </div>
                <div className="col-6" style={{textAlign: 'center', paddingTop: '90px'}}>
                <p className="mb-2 text-muted">
                  Votes with party %: {politician.votes_with_party_pct}
                </p>
                <p className="mb-2 text-muted">
                  Votes against party %: {politician.votes_against_party_pct}
                </p>
                  </div>
                </div>
            </div>
          })}
      </div>
    </div>
  );
}

export default PoliticianComparison