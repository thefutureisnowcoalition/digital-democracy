import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import SocialMediaEmbed from "./socialmediaembed/SocialMediaEmbed";
import DataVisualizationFull from "./datavisualizations/DataVisualizationFull";
import DemographicsFull from "./demographics/DemographicsFull";
import ProfileHeader from "./profileheader/ProfileHeader";

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
            //Set some unique background styling for each card component based on their party affiliation
            if (politician.party === "R") {
              var profileCardBackground = "repbackground col-12 col-md-8 mt-5";
              var profileBanner = {
                backgroundColor: "rgba(255, 0, 0, 0.85)",
                borderRadius: "0px",
                margin: "auto",
              };
            } else if (politician.party === "D") {
              profileCardBackground = "dembackground col-12 col-md-8 mt-5";
              profileBanner = {
                backgroundColor: "rgba(0, 0, 255, 0.85)",
                borderRadius: "0px",
                margin: "auto",
              };
            } else {
              profileCardBackground = "col-12 col-md-8 mt-5";
              profileBanner = {
                backgroundColor: "rgba(255, 194, 0, 0.85)",
                borderRadius: "0px",
                margin: "auto",
              };
            }
            return (
              <>
                <div className="col-12 card mt-3" key={Math.random()}>
                  <div className="row">
                    <ProfileHeader politician={politician} />

                    <div className={profileCardBackground}>
                      <DemographicsFull politician={politician} />
                      <div
                        className="alert col-12 col-md-10"
                        style={profileBanner}
                      >
                        <h3
                          className="mt-2"
                          style={{ textAlign: "center", color: "white" }}
                        >
                          Party Affiliation: {politician.party}
                        </h3>
                      </div>

                      <div
                        className="card col-12 col-md-10"
                        style={{
                          borderRadius: "0px",
                          border: "none",
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                          margin: "auto",
                        }}
                      >
                        <DataVisualizationFull politician={politician} />
                      </div>
                    </div>
                  </div>
                </div>
                <SocialMediaEmbed politician={politician} />
              </>
            );
          })}
      </div>
    </div>
  );
}

export default PoliticianProfile;
