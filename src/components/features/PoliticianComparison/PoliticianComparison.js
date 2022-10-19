import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DisplayCard from "./displaycard/DisplayCard";

import "./PoliticianComparison.css";

function PoliticianComparison() {
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
          politicianInfo.map((politician) => {
            return <DisplayCard politician={politician} key={Math.random()} />;
          })}
      </div>
    </div>
  );
}

export default PoliticianComparison;
