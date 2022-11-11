import React from "react";
import PlaceholderImage from "../images/placeholder.jpg";
import DataVisualizationSpace from "./datavisualizationspace/DataVisualizationSpace";
import Demographics from "./demographics/Demographics";

function DisplayCard({ politician }) {
  // Lets set a variable inside of each mapped politician to display a unique ID including the politician.id value from propublica. This corresponds with the ID unitedstates.io is looking for.
  const imageURL = politician.image;

  //Set some unique background styling for each card component based on their party affiliation
  if (politician.party === "R") {
    var background = "card card-republican";
  } else if (politician.party === "D") {
    background = "card card-democrat";
  } else {
    background = "card card-other";
  }
  return (
    <div className="col-12 card mt-3" key={Math.random()}>
      <div className="row">
        <div className="col-12 col-md-6">
          <Demographics
            politician={politician}
            imageURL={imageURL}
            PlaceholderImage={PlaceholderImage}
            background={background}
          />
        </div>
        <div
           className="col-12 col-md-6 col-6"

          style={{ textAlign: "right",width: "100px, height: 100px" }}
          
        >
          <DataVisualizationSpace politician={politician} />
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;
