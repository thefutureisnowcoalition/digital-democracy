import React from "react";

function DataVisualizationSpace({ politician }) {
  return (
    <>
      <p className="mb-2 text-muted">
        Votes with party %: {politician.votes_with_party}
      </p>
      <p className="mb-2 text-muted">
        Votes against party %: {politician.votes_against_party}
      </p>
    </>
  );
}

export default DataVisualizationSpace;
