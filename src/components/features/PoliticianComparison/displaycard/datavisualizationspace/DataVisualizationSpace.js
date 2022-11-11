import React from "react";
import CanvasJSReact from '../../../../../lib/canvasjs.react'

function DataVisualizationSpace({ politician }) {
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;



   const votes_in_party_chart = {
    backgroundColor: "transparent",
    animationEnabled: true,
    exportEnabled:false,
    responsive: true,
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
    <>
      {/* <p className="mb-2 text-muted">
        Votes with party %: {politician.votes_with_party}
      </p> */}
     
      <CanvasJSChart options={votes_in_party_chart}  containerProps={{ width: '250px', height: '275px' }}/> 
      
    </>
  );
}

export default DataVisualizationSpace;
