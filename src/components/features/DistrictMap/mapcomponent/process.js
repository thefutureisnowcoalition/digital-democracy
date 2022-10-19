// script to process json file

var importStates = require('./states');

var states = importStates.states;

const fs = require('fs')

// read JSON object from file
fs.readFile('gz_2010_us_500_11_5m.json', 'utf-8', (err, data) => {
  if (err) {
    throw err
  }

  // parse JSON object
  var processedData = JSON.parse(data.toString());


  for (const feature of processedData.features){
    feature.properties.STATE = states.find(state => state.FIPS == feature.properties.STATE).USPS;
  }

  const exportData = JSON.stringify(processedData);

  fs.writeFile('gz_2010_us_500_11_5m_processed.json', exportData, err => {
    if (err) {
      throw err
    }
  })

})