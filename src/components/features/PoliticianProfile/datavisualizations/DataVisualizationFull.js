import React from 'react'
import CanvasJSReact from '../../../../lib/canvasjs.react'




function DataVisualizationFull({politician}) {

  // console.log(politician.votes_with_party)
   var CanvasJSChart = CanvasJSReact.CanvasJSChart;
   var CanvasJS =  CanvasJSReact.CanvasJS;

  const options2 = {
    animationEnabled: true,
    exportEnabled:true,
    theme:{
     text: "Missed Votes"
    },
    data: [{
     type: "pie",
     indexLabel: "{label}:{y}",
     startAngle: -90,
     dataPoints: [
       {y:politician.missed_votes, label:
       "Missed Votes"},
       {y:politician.total_votes, label:
       "Total Votes"}
     ]
    }]
   }

   const options = {
    animationEnabled: true,
    exportEnabled:true,
    theme:{
     text: "Voted Within Party Vs. Outside"
    },
    data: [{
     type: "doughnut",
     indexLabel: "{label}:{y}%",
     startAngle: -90,
     dataPoints: [
       {y:politician.votes_with_party, label:
       "Votes with party"},
       {y:politician.votes_against_party, label:
       "Votes against party"}
     ]
    }]
   }

  return (
    <div className="col-12" style={{ textAlign: "center" }}>
    <h3 className="mt-5">Voting History</h3>
   
    <div className="row">
      <div className="col-12 col-lg-6 mt-4">
        {/* <h5
          className="mt-3"
          style={{ textAlign: "center" }}
        >
          Total Votes:{" "}
          <span style={{ color: "green" }}>
            {politician.total_votes}
          </span>
        </h5>
        <h5
          className="mt-3"
          style={{ textAlign: "center" }}
        >
          Missed Votes:{" "}
          <span style={{ color: "red" }}>
            {politician.missed_votes}
          </span>
        </h5>
        <h5
          className="mt-3 mb-5"
          style={{ textAlign: "center" }}
        >
          % of votes missed:{" "}
          <span style={{ color: "red" }}>
            {politician.missed_votes_pct}
          </span>
        </h5> */}

<h5
          
          style={{ textAlign: "center" }}
        >
          Votes Missed:{" "}
          <span style={{ color: "red" , padding: 0}}>
            {politician.missed_votes_pct}%
          </span>
        </h5> 
        
        <CanvasJSChart options={options2} /> 

      
      </div>
   

      <div className="col-12 col-lg-6 mt-4">

      <h5
          
          style={{ textAlign: "center" }}
        >
          Votes In Party:{" "}
          <span style={{ color: "green" }}>
            {politician.votes_with_party}%
          </span>{" "}

        </h5>

      <CanvasJSChart options={options} /> 
    
      </div>
    </div>
    <div>

    </div>
  </div>
  
  )
}

export default DataVisualizationFull