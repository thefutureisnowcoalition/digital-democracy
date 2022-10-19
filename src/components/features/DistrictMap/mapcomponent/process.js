// script to process json file

var importStates = require('./states');

var states = importStates.states;

const fs = require('fs')

// read JSON object from file
fs.readFile('merged.json', 'utf-8', (err, data) => {
  if (err) {
    throw err
  }

  // parse JSON object
  var processedData = JSON.parse(data.toString());


  for (const feature of processedData.features){
    feature.properties.STATEFP = states.find(state => state.FIPS == feature.properties.STATEFP).USPS;
  }

  const exportData = JSON.stringify(processedData);

  fs.writeFile('merged_2022_sldu_processed.json', exportData, err => {
    if (err) {
      throw err
    }
  })

})