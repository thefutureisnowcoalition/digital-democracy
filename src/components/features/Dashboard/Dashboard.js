import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DistrictMap from "../DistrictMap/mapcomponent/DistrictMap";
import RepresentativeMap from "./representatives/RepresentativeMap";

//The below line prevents some errors associated with the google client authentication
/* global gapi */

function Dashboard() {
  const [userLocationInfo, setUserLocationInfo] = useState(null);


  //This is our bank of state variables where we will hold the google civics responses for each call
  const [representativeInfo, setRepresentativeInfo] = useState(null);
  const [senatorInfo, setSenatorInfo] = useState(null);
  const [presidentInfo, setPresidentInfo] = useState(null);
  const [governorInfo, setGovernorInfo] = useState(null);

  //Retrieve our url search parameters
  let { address } = useParams();

  useEffect(() => {
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
    authenticateGoogleClient();
  }, [address]);


  //1st step in Google API authentication process. Must be completed before we can do any requests.
  gapi.load("client");






  return (
    <div className="container">

      {/* If our formatted address has been returned in userLocationInfo, lets pass it through to our DistrictMap component */}
      {userLocationInfo && (
      <DistrictMap locationString={userLocationInfo.line1 + ' ' + userLocationInfo.city + ' ' + userLocationInfo.state + ' ' + userLocationInfo.zip} />
      )}

      <div className="row">
        <RepresentativeMap representativeInfo={representativeInfo} governorInfo={governorInfo} senatorInfo={senatorInfo} presidentInfo={presidentInfo} userLocationInfo={userLocationInfo} />
      </div>
    </div>
  );
}

export default Dashboard;
