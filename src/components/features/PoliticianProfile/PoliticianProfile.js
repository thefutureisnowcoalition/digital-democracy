import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//To be used if propublica url gives no result
import PlaceholderImage from "../PoliticianComparison/images/placeholder.jpg";


import "./PoliticianProfile.css";

function PoliticianProfile() {
  //Our state for storing fetched api data
  const [politicianInfo, setPoliticianInfo] = useState([]);


  //Retrieve our url search parameters
  let { search } = useParams();

  //Fires when component is first rendered
  useEffect(() => {
    getPoliticianData();
  }, [search]);

  async function getPoliticianData() {
    //Our first request is to propublicas senator database
    const requestOne = axios.get(
      "https://api.propublica.org/congress/v1/117/senate/members.json",
      {
        headers: {
          "X-API-Key": "8N5NFIfZ4vGdW3Imr72RcIjBHhBhL7xKtRAqx8WK",
        },
      }
    );
    //Our second request is to probublicas house database
    const requestTwo = axios.get(
      "https://api.propublica.org/congress/v1/117/house/members.json",
      {
        headers: {
          "X-API-Key": "8N5NFIfZ4vGdW3Imr72RcIjBHhBhL7xKtRAqx8WK",
        },
      }
    );

    //We need to use axios.all to combine our two requests and then spread the responses into one....
    axios.all([requestOne, requestTwo]).then(
      axios.spread((...responses) => {
        const response = [
          ...responses[0].data.results[0].members,
          ...responses[1].data.results[0].members,
        ];

        //If a search parameter is present in the URL, we need to sort our response to pull that politician to the very top
        if (search) {
          response.sort((a, b) => {
            let wholenameA =
              a.first_name.toLowerCase() + " " + a.last_name.toLowerCase();
            let wholenameB =
              b.first_name.toLowerCase() + " " + b.last_name.toLowerCase();
            // Sort results by matching name with keyword position in name
            if (
              wholenameA.toLowerCase().indexOf(search.toLowerCase()) >
              wholenameB.toLowerCase().indexOf(search.toLowerCase())
            ) {
              return -1;
            } else if (
              wholenameA.toLowerCase().indexOf(search.toLowerCase()) <
              wholenameB.toLowerCase().indexOf(search.toLowerCase())
            ) {
              return 1;
            }
            return;
          });
        }
        setPoliticianInfo(response);
      })
    );
  }



  //remove all politicians from our array except for the very top one that we've filtered
  politicianInfo.length = 1;

  return (
    <div className="container-lg">
      <div className="row">
        {/* If politicianInfo exists, lets map over it and display a card for each politician */}
        {politicianInfo &&
          politicianInfo.map((politician) => {
            // Lets set a variable inside of each mapped politician to display a unique ID including the politician.id value from propublica. This corresponds with the ID unitedstates.io is looking for.
            const imageURL = `https://theunitedstates.io/images/congress/450x550/${politician.id}.jpg`;
            const twitterURL = `https://twitter.com/${politician.twitter_account}`
            const facebookURL = `https://facebook.com/${politician.facebook_account}`
            const youtubeURL = `https://youtube.com/${politician.youtube_account}`

            
            //Set some unique background styling for each card component based on their party affiliation
            if (politician.party === 'R') {
              var profileCardBackground = 'repbackground col-12 col-md-8 mt-5'
              var profileBanner = {backgroundColor: 'rgba(255, 0, 0, 0.85)', borderRadius: '0px', margin: 'auto'}
            } else if (politician.party === 'D') {
              profileCardBackground = 'dembackground col-12 col-md-8 mt-5'
              profileBanner = {backgroundColor: 'rgba(0, 0, 255, 0.85)', borderRadius: '0px', margin: 'auto'}
            } else {
              profileCardBackground = 'col-12 col-md-8 mt-5'
              profileBanner = {backgroundColor: 'rgba(255, 194, 0, 0.85)', borderRadius: '0px', margin: 'auto'}
            }

            return (
              <div className='col-12 card mt-3' key={Math.random()}>
                <div className="row">
                  <div className="col-sm-12 col-md-4">
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={imageURL}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = PlaceholderImage;
                        }}
                        className="card-img-top avatarstyle mt-3"
                        alt="..."
                      />
                    </div>

                    {/* View Twitter */}
                    <div className="col-12" style={{textAlign: 'center'}}>
                        <a target="_blank" rel="noreferrer" href={twitterURL}>
                      <button type="button" className="btn btn-primary mt-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-twitter"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                        </svg>
                        <span> View Twitter</span>
                      </button>
                      </a>
                    </div>

                    {/* View Facebook */}
                    <div className="col-12" style={{textAlign: 'center'}}>
                        <a target="_blank" rel="noreferrer" href={facebookURL}>
                      <button type="button" className="btn btn-info mt-2" style={{color: 'white'}}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-facebook"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>
                        <span> View Facebook</span>
                      </button>
                      </a>
                    </div>

                    {/* View Youtube */}
                    <div className="col-12" style={{textAlign: 'center'}}>
                    <a target="_blank" rel="noreferrer" href={youtubeURL}>
                      <button type="button" className="btn btn-danger mt-2 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-youtube"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                        </svg>
                        <span> Youtube Account</span>
                      </button>
                      </a>
                    </div>
                  </div>


                  <div className={profileCardBackground}>
                    
                    <div className="card col-12 col-md-10" style={{margin: 'auto', borderRadius: '0px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
                  <h1 className="mt-3 namefont" style={{ textAlign: "center" }}>
                      {politician.first_name} {politician.last_name}
                    </h1>
                    <h3 className="mt-2" style={{ textAlign: "center" }}>
                      DOB: {politician.date_of_birth}
                    </h3>
                    <h3 className="mt-2 mb-5" style={{ textAlign: "center" }}>
                      State: {politician.state}
                    </h3>
                    {/* Display url if applicable */}
                    {politician.url && (
                      <p style={{ textAlign: "center" }}>
                        <a href={politician.url} target="_blank" rel="noreferrer" className="btn btn-primary">
                          Website
                        </a>
                      </p>
                    )}
                    </div>
                    <div className="alert col-12 col-md-10" style={profileBanner}>
                    <h3 className="mt-2" style={{ textAlign: "center", color: 'white' }}>
                      Party Affiliation: {politician.party}
                    </h3>
                    </div>

                      
                      
                    <div className="card col-12 col-md-10" style={{borderRadius: '0px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.7)', margin: 'auto'}}>
                    <div className="col-12" style={{ textAlign: "center" }}>
                        <h3 className="mt-5">Voting History</h3>

                        <div className="row">
                        <div className="col-12 col-lg-6 mt-4">
                        <h5 className="mt-3" style={{ textAlign: "center" }}>
                      Total Votes: <span style={{color: 'green'}}>{politician.total_votes}</span>
                    </h5>
                    <h5 className="mt-3" style={{ textAlign: "center" }}>
                      Missed Votes: <span style={{color: 'red'}}>{politician.missed_votes}</span>
                    </h5>
                    <h5 className="mt-3" style={{ textAlign: "center" }}>
                      % of votes missed: <span style={{color: 'red'}}>{politician.missed_votes_pct}</span>
                    </h5>
                    </div>
                    <div className="col-12 col-lg-6 mt-4">
                    <h5 className="mt-3" style={{ textAlign: "center" }}>
                      Votes With Party: <span style={{color: 'green'}}>{politician.votes_with_party_pct}%</span> of the time.
                    </h5>
                    <h5 className="mt-3" style={{ textAlign: "center" }}>
                      Votes Against Party : <span style={{color: 'red'}}>{politician.votes_against_party_pct}%</span> of the time.
                    </h5>
                    </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PoliticianProfile;
