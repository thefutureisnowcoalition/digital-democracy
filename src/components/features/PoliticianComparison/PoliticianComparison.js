import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DisplayCard from "./displaycard/DisplayCard";

import "./PoliticianComparison.css";

function PoliticianComparison() {
  //Our state for storing fetched api data
  const [politicianInfo, setPoliticianInfo] = useState([]);


  //Fires when component is first rendered
  useEffect(() => {
    fetchPoliticians();
  }, []);

  function fetchPoliticians(){
  
    const url = `http://localhost:8000/api`
    setPoliticianInfo([])

    fetch(url)
    .then((response) => response.json())
    .then((ourdata) => setPoliticianInfo(ourdata, ...politicianInfo))
}


  return (
    <div className="container-lg">
      {/* Page Header */}

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
