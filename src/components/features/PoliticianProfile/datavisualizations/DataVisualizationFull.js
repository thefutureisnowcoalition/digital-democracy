import React from 'react'
import CanvasJSReact from '../../../../lib/canvasjs.react'




function DataVisualizationFull({politician}) {

   var CanvasJSChart = CanvasJSReact.CanvasJSChart;
   var CanvasJS =  CanvasJSReact.CanvasJS;

  const votes_missed_pie = {
    backgroundColor: "transparent",
    animationEnabled: true,
    exportEnabled:false,
    theme:{
     text: "Missed Votes",
     verticalAlign:"bottom",
    },
    data: [{
     type: "pie",
     indexLabel: "{label}:{y}",
     startAngle: -90,
     dataPoints: [
       {y:politician.missed_votes, label:
       "Missed Votes",color:"#404040"},
       {y:politician.total_votes, label:
       "Total Votes",color:"#000000"}
     ]
    }]
   }

   const votes_in_party_chart = {
    backgroundColor: "transparent",
    animationEnabled: true,
    exportEnabled:false,
    theme:{
     text: "Voted Within Party Vs. Outside",
     verticalAlign:"bottom",
    },
    data: [{
     type: "doughnut",
     indexLabel: "{label}:{y}%",
     startAngle: -90,
     dataPoints: [
       {y:politician.votes_with_party, label:
       "Votes with party",color:"#000000"},
       {y:politician.votes_against_party, label:
       "Votes against party",color:"#404040"}
     ]
    }]
   }

  return (
    <div className="col-12" style={{ textAlign: "center" }}>
    <h3 className="mt-5">Voting History</h3>
   
    <div className="row">
      <div className="col-12 col-lg-6 mt-4">


<h5
          
          style={{ textAlign: "center",verticalAlign: "bottom" }}
        >
          Votes Missed:{" "}
          <span style={{ color: "red" , padding: 0}}>
            {politician.missed_votes_pct}%
          </span>
        </h5> 
        
        <CanvasJSChart options={votes_missed_pie} /> 

      </div>
   

      <div className="col-12 col-lg-6 mt-4">

      <h5
          
          style={{ textAlign: "center" ,verticalAlign: "bottom"}}
        >
          Votes In Party:{" "}
          <span style={{ color: "green" }}>
            {politician.votes_with_party}%
          </span>{" "}

        </h5>

      <CanvasJSChart options={votes_in_party_chart} /> 
    
      </div>
    </div>
    <div>

    </div>
  </div>
  
  )
}

export default DataVisualizationFull