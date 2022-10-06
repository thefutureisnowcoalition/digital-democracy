import axios from 'axios';
import React from 'react';

function App() {



  const url = 'https://v3.openstates.org/people?jurisdiction=Alabama'
  const getMember = () =>{
    axios.get(url,{
      headers: {"X-API-key": "cfc15d27-3fe6-47c5-b5e5-db1dd20f563b"
      }
    })
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

  }
  return (
    <div className="App">
      <button onClick={getMember}> Get Member</button>
    </div>
  );
}

export default App;
