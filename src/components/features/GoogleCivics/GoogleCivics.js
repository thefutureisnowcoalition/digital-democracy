import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";


//Pass state information into this DataCard component for display
import DataCard from "./DataCard/DataCard";

import DataCardMap from "./DataCard/DataCardMap";

//The below line prevents some errors associated with the google client authentication
/* global gapi */

function GoogleCivics() {
  const [userLocationInfo, setUserLocationInfo] = useState(null);

  //This is our bank of state variables where we will hold the google civics responses for each call
  const [representativeInfo, setRepresentativeInfo] = useState(null);
  const [senatorInfo, setSenatorInfo] = useState(null);
  const [presidentInfo, setPresidentInfo] = useState(null);
  const [governorInfo, setGovernorInfo] = useState(null);

  //Retrieve our url search parameters
  let { address } = useParams();

  useEffect(() => {
    authenticateGoogleClient();
  }, [address]);

  //1st step in Google API authentication process. Must be completed before we can do any requests.
  gapi.load("client");

  //Authenticate our client through google using our API Key
  function authenticateGoogleClient() {
    if (gapi.client) {
      //API Key is exposed! (And is a personal key) Will need to fix this before launch
      gapi.client.setApiKey("AIzaSyDb9iyzlZ4i8xfzw5BM2KiAy1mKt4WBc0c");
      return gapi.client
        .load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
        .then(
          function () {
            console.log("GAPI client loaded for API");
            //After our client is successfully authenticated, we can call our fetch functions
            //Get congressman
            fetchCivics("country", "legislatorLowerBody", setRepresentativeInfo);
            //Get Senators
            fetchCivics("country", "legislatorUpperBody", setSenatorInfo);
            //Get President
            fetchCivics("country", "headOfState", setPresidentInfo);
            //Get Governor
            fetchCivics("administrativeArea1", "headOfGovernment", setGovernorInfo);
          },
          function (err) {
            console.error("Error loading GAPI client for API", err);
            window.location.replace("/");
          }
        );
    } else {
      //A cheap workaround for giving "gapi.load("client") more time to initialize. Need to come up with something better.
      setTimeout(() => {
        authenticateGoogleClient();
      }, "500");
    }
  }

    //After the client is loaded, fetch the civics data via Google.
    function fetchCivics(levels, roles, setData) {
      return gapi.client.civicinfo.representatives
        .representativeInfoByAddress({
          address: address,
          includeOffices: true,
          levels: [levels],
          roles: [roles],
        })
        .then(
          function (response) {
            // Handle the results here (response.result has the parsed body).
            setData(response.result);
            //With this particular data fetch, Lets go ahead and also store googles formatted address information in a local variable so we can display it back to the user.
            if(!userLocationInfo){
              setUserLocationInfo(response.result.normalizedInput);
            }
          },
          function (err) {
            console.error("Execute error", err);
            window.location.replace("/");
          }
        );
    }


  return (
    <div className="container">
      {/* Page Header */}
      <div
        className="alert alert-primary mt-5"
        style={{ textAlign: "center", maxWidth: "700px", margin: "auto" }}
      >
        <h3>Google Civics</h3>
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
        {userLocationInfo && (
          <div
            className="col-sm-12 col-md-10 col-lg-6"
            style={{ margin: "auto" }}
          >
            <div className="card mt-4 p-3" style={{ textAlign: "center" }}>
              <h2>Showing results for:</h2>
              <h4>{userLocationInfo.line1}</h4>
              <h4>{userLocationInfo.city}</h4>
              <h4>{userLocationInfo.state}</h4>
              <h4>{userLocationInfo.zip}</h4>
            </div>
          </div>
        )}
      </div>

      <div className="row">

        {/* With our senatorinfo we are mapping over an array of officials so we need to return each one using our DataCardMap */}
        {senatorInfo && <DataCardMap data={senatorInfo.officials[0]} title={senatorInfo.offices[0]} />}
        {senatorInfo && <DataCardMap data={senatorInfo.officials[1]} title={senatorInfo.offices[0]} />}
        {/* If representative data has been successfully fetched - display a DataCard containing that info */}
        {representativeInfo && <DataCard data={representativeInfo} />}
        {/* Lets map over the array of senators and return a unique card for each one */}
        
        {/* If president data has been successfully fetched - display a DataCard containing that info */}
        {presidentInfo && <DataCard data={presidentInfo} />}
        {/* If president data has been successfully fetched - display a DataCard containing that info */}
        {governorInfo && <DataCard data={governorInfo} />}
      </div>
    </div>
  );
}

export default GoogleCivics;
