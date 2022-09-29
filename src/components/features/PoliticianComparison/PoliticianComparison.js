import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

function PoliticianComparison() {
  //Our state for storing fetched api data
  const [politicianInfo, setPoliticianInfo] = useState([])
  //Fires when component is first rendered
  useEffect(() => {
    getPoliticianData()
  }, [])



  
  //axios used to fetch politician data from api
  async function getPoliticianData () {
    //Api key is exposed - will need to correct before deployment
    const response = await axios.get('https://api.propublica.org/congress/v1/102/house/members.json', {
      headers: {
        "X-API-Key": '8N5NFIfZ4vGdW3Imr72RcIjBHhBhL7xKtRAqx8WK'
      }
    })
    //Navigate through JSON response to get politician information
    const politicianData = response.data.results[0].members;
    setPoliticianInfo(politicianData)

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
      </div>
      <div className="row">
        {/* If politicianInfo exists, lets map over it and display a card for each politician */}
        {politicianInfo &&
          politicianInfo.map((politician) => (
            <div className="col-12 col-sm-6 col-md-4 mt-5" key={Math.random()}>
              <div className="card" style={{ textAlign: "center" }}>
                <h5 className="card-title card-header">
                  {politician.first_name} {politician.last_name}
                </h5>
                <h5 className="card-subtitle mb-2 mt-1 text-muted">
                  Party Affiliation: {politician.party}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  DOB: {politician.date_of_birth}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  State: {politician.state}
                </h6>
                <p className="mb-2">
                  Votes with party %: {politician.votes_with_party_pct}
                </p>
                <p className="mb-2">
                  Votes against party %: {politician.votes_against_party_pct}
                </p>
                {/* Display url if applicable */}
                {politician.url && (
                  <p className="mb-2">
                    Url: <a href={politician.url}>{politician.url}</a>
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PoliticianComparison