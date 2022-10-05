import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'

//The below line prevents some errors associated with the google client authentication
/* global gapi */

function GoogleCivics() {

  const [userLocationInfo, setUserLocationInfo] = useState({
    city: '',
    street: '',
    state: '',
    zip: ''
  })

  //This is our bank of state variables where we will hold the google civics responses for each call
  const [representativeInfo, setRepresentativeInfo] = useState(null);
  const [senatorInfo, setSenatorInfo] = useState(null);
  const [presidentInfo, setPresidentInfo] = useState(null);
  const [governorInfo, setGovernorInfo] = useState(null);
  const [countyInfo, setCountyInfo] = useState(null);


    //Retrieve our url search parameters
    let {address} = useParams();



    useEffect(() => {
      authenticateGoogleClient()
    }, [address])

    //1st step in Google API authentication process. Must be completed before we can do any requests.
    gapi.load("client");

  //Authenticate our client through google using our API Key
  function authenticateGoogleClient() {
    if(gapi.client){
  //API Key is exposed! (And is a personal key) Will need to fix this before launch
    gapi.client.setApiKey("AIzaSyDb9iyzlZ4i8xfzw5BM2KiAy1mKt4WBc0c");
    return gapi.client
      .load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
      .then(
        function () {
          console.log("GAPI client loaded for API");
          //After our client is successfully authenticated, we can call our fetch functions
          fetchCongressman()
          fetchSenator()
          fetchPresident()
          fetchGovernor()
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
          window.location.replace('/')
        }
      );
    } else {
      //A cheap workaround for giving "gapi.load("client") more time to initialize. Need to come up with something better.
      setTimeout(() => {
        authenticateGoogleClient()
      }, "500")
    }
  }

  //After the client is loaded, fetch the representative data via Google.
  function fetchCongressman() {

    return gapi.client.civicinfo.representatives
      .representativeInfoByAddress({
        address: address,
        includeOffices: true,
        levels: ["country"],
        roles: ["legislatorLowerBody"],
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response.result);
          setRepresentativeInfo(response.result);
          //With this particular data fetch, Lets go ahead and also store googles formatted address information in a local variable so we can display it back to the user.
          setUserLocationInfo(response.result.normalizedInput)
          console.log(userLocationInfo)
          console.log(representativeInfo);
        },
        function (err) {
          console.error("Execute error", err);
          window.location.replace('/')
        }
      );
  }

  //After the client is loaded, fetch the senator data via Google.
  function fetchSenator() {

    return gapi.client.civicinfo.representatives
      .representativeInfoByAddress({
        address: address,
        includeOffices: true,
        levels: ["country"],
        roles: ["legislatorUpperBody"],
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response.result);
          setSenatorInfo(response.result);
          console.log(senatorInfo);
        },
        function (err) {
          console.error("Execute error", err);
          window.location.replace('/')
        }
      );
  }

    //After the client is loaded, fetch the president data via Google.
    function fetchPresident() {

      return gapi.client.civicinfo.representatives
        .representativeInfoByAddress({
          address: address,
          includeOffices: true,
          levels: ["country"],
          roles: ["headOfState"],
        })
        .then(
          function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response.result);
            setPresidentInfo(response.result);
            console.log(presidentInfo);
          },
          function (err) {
            console.error("Execute error", err);
            window.location.replace('/')
          }
        );
    }

        //After the client is loaded, fetch the governor data via Google.
        function fetchGovernor() {

          return gapi.client.civicinfo.representatives
            .representativeInfoByAddress({
              address: address,
              includeOffices: true,
              levels: ["administrativeArea1"],
              roles: ["headOfGovernment"],
            })
            .then(
              function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response.result);
                setGovernorInfo(response.result);
                console.log(governorInfo);
              },
              function (err) {
                console.error("Execute error", err);
                window.location.replace('/')
              }
            );
        }

            //After the client is loaded, fetch the county officials.
            //To be implemented at another time?
                function fetchCounty() {

                  return gapi.client.civicinfo.representatives
                    .representativeInfoByAddress({
                      address: address,
                      includeOffices: true,
                      levels: ["administrativeArea2"],
                      roles: ["governmentOfficer"],
                    })
                    .then(
                      function (response) {
                        // Handle the results here (response.result has the parsed body).
                        console.log("Response", response.result);
                        setCountyInfo(response.result);
                        console.log(countyInfo);
                      },
                      function (err) {
                        console.error("Execute error", err);
                        window.location.replace('/')
                      }
                    );
                }


  return (
    <div className="container">
      {/* Page Header */}
      <div
        className="alert alert-primary mt-5"
        style={{ textAlign: "center", maxWidth: "700px", margin: "auto" }}
      >
        <h3>Google Civics</h3>
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
      {userLocationInfo && (
        <div className="col-sm-12 col-md-10 col-lg-6" style={{margin: 'auto'}}>
        <div className="card mt-4 p-3" style={{textAlign: 'center'}}>
          <h2>Showing results for:</h2>
          <h4>{userLocationInfo.line1}</h4>
          <h4>{userLocationInfo.city}</h4>
          <h4>{userLocationInfo.state}</h4>
          <h4>{userLocationInfo.zip}</h4>
        </div>
        </div>
      )}
    </div>

    <div className="row">
      {representativeInfo && (
          <div className="col-12 mb-5 col-md-6 col-lg-4" style={{ margin: "auto" }}>
            <div className="card mt-5 p-3">
              <h2 style={{textAlign: 'center'}}>{representativeInfo.offices[0].name}</h2>
              <h3 className="card-header" style={{ textAlign: "center" }}>
                {representativeInfo.officials[0].name}
              </h3>
              <h4 style={{ textAlign: "center" }} className="{textColor}">
                {representativeInfo.officials[0].party}
              </h4>

              {/* Is there an address present? If so we'll want a header for the Address section */}
              {representativeInfo.officials[0].address && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Address
                </h6>
              )}
              {/* Map through the array of addresses if present and display each one */}
              {representativeInfo.officials[0].address &&
                representativeInfo.officials[0].address.map((address) => {
                  return (
                    <div key={address.line1}>
                      <p>Street: {address.line1}</p>
                      <p>City: {address.city}</p>
                      <p>State: {address.state}</p>
                      <p>Zip: {address.zip}</p>
                    </div>
                  );
                })}
              {/* Is there an phone number present? If so we'll want a header for the Phone section */}
              {representativeInfo.officials[0].phones && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Phone Number
                </h6>
              )}
              {/* Map through the array of phone numbers if present and display each one */}
              {representativeInfo.officials[0].phones &&
                representativeInfo.officials[0].phones.map((number) => {
                  return <p key={number}>{number}</p>;
                })}
              {/* Are there any channels present? If so we'll want a header for the Channels section */}
              {representativeInfo.officials[0].channels && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Channels
                </h6>
              )}
              {/* Map through the array of channels if present and display each one */}
              {representativeInfo.officials[0].channels &&
                representativeInfo.officials[0].channels.map((channel) => {
                  return (
                    <p key={channel.type}>
                      {channel.type}: {channel.id}
                    </p>
                  );
                })}

              {/* Is there any url present? If so we'll want a header for the URL section */}
              {representativeInfo.officials[0].urls && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Urls
                </h6>
              )}
              {/* Map through the array of urls if present and display each one */}
              {representativeInfo.officials[0].urls &&
                representativeInfo.officials[0].urls.map((url) => {
                  return (
                    <a target="_blank" rel="noreferrer" key={url} href={url}>
                      {url}
                    </a>
                  );
                })}
            </div>
          </div>
      )}
  {/* Lets map over the array of senators and return a unique card for each one */}
      {senatorInfo && senatorInfo.officials.map(senator => (
          <div className="col-12 mb-5 col-md-6 col-lg-4" style={{ margin: "auto" }}>
            <div className="card mt-5 p-3">
              <h2 style={{textAlign: 'center'}}>{senatorInfo.offices[0].name}</h2>
              <h3 className="card-header" style={{ textAlign: "center" }}>
                {senator.name}
              </h3>
              <h4 style={{ textAlign: "center" }} className="{textColor}">
                {senator.party}
              </h4>

              {/* Is there an address present? If so we'll want a header for the Address section */}
              {senator.address && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Address
                </h6>
              )}
              {/* Map through the array of addresses if present and display each one */}
              {senator.address &&
                senator.address.map((address) => {
                  return (
                    <div key={address.line1}>
                      <p>Street: {address.line1}</p>
                      <p>City: {address.city}</p>
                      <p>State: {address.state}</p>
                      <p>Zip: {address.zip}</p>
                    </div>
                  );
                })}
              {/* Is there an phone number present? If so we'll want a header for the Phone section */}
              {senator.phones && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Phone Number
                </h6>
              )}
              {/* Map through the array of phone numbers if present and display each one */}
              {senator.phones &&
                senator.phones.map((number) => {
                  return <p key={number}>{number}</p>;
                })}
              {/* Are there any channels present? If so we'll want a header for the Channels section */}
              {senator.channels && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Channels
                </h6>
              )}
              {/* Map through the array of channels if present and display each one */}
              {senator.channels &&
                senator.channels.map((channel) => {
                  return (
                    <p key={channel.type}>
                      {channel.type}: {channel.id}
                    </p>
                  );
                })}

              {/* Is there any url present? If so we'll want a header for the URL section */}
              {senator.urls && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Urls
                </h6>
              )}
              {/* Map through the array of urls if present and display each one */}
              {senator.urls &&
                senator.urls.map((url) => {
                  return (
                    <a target="_blank" rel="noreferrer" key={url} href={url}>
                      {url}
                    </a>
                  );
                })}
            </div>
          </div>
))}
            {presidentInfo && ( 
          <div className="col-12 mb-5 col-md-6 col-lg-4" style={{ margin: "auto" }}>
            <div className="card mt-5 p-3">
              <h2 style={{textAlign: 'center'}}>{presidentInfo.offices[0].name}</h2>
              <h3 className="card-header" style={{ textAlign: "center" }}>
                {presidentInfo.officials[0].name}
              </h3>
              <h4 style={{ textAlign: "center" }} className="{textColor}">
                {presidentInfo.officials[0].party}
              </h4>

              {/* Is there an address present? If so we'll want a header for the Address section */}
              {presidentInfo.officials[0].address && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Address
                </h6>
              )}
              {/* Map through the array of addresses if present and display each one */}
              {presidentInfo.officials[0].address &&
                presidentInfo.officials[0].address.map((address) => {
                  return (
                    <div key={address.line1}>
                      <p>Street: {address.line1}</p>
                      <p>City: {address.city}</p>
                      <p>State: {address.state}</p>
                      <p>Zip: {address.zip}</p>
                    </div>
                  );
                })}
              {/* Is there an phone number present? If so we'll want a header for the Phone section */}
              {presidentInfo.officials[0].phones && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Phone Number
                </h6>
              )}
              {/* Map through the array of phone numbers if present and display each one */}
              {presidentInfo.officials[0].phones &&
                presidentInfo.officials[0].phones.map((number) => {
                  return <p key={number}>{number}</p>;
                })}
              {/* Are there any channels present? If so we'll want a header for the Channels section */}
              {presidentInfo.officials[0].channels && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Channels
                </h6>
              )}
              {/* Map through the array of channels if present and display each one */}
              {presidentInfo.officials[0].channels &&
                presidentInfo.officials[0].channels.map((channel) => {
                  return (
                    <p key={channel.type}>
                      {channel.type}: {channel.id}
                    </p>
                  );
                })}

              {/* Is there any url present? If so we'll want a header for the URL section */}
              {presidentInfo.officials[0].urls && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Urls
                </h6>
              )}
              {/* Map through the array of urls if present and display each one */}
              {presidentInfo.officials[0].urls &&
                presidentInfo.officials[0].urls.map((url) => {
                  return (
                    <a target="_blank" rel="noreferrer" key={url} href={url}>
                      {url}
                    </a>
                  );
                })}
            </div>
          </div>
    )  }
                {governorInfo && ( 
          <div className="col-12 mb-5 col-md-6 col-lg-4" style={{ margin: "auto" }}>
            <div className="card mt-5 p-3">
              <h2 style={{textAlign: 'center'}}>{governorInfo.offices[0].name}</h2>
              <h3 className="card-header" style={{ textAlign: "center" }}>
                {governorInfo.officials[0].name}
              </h3>
              <h4 style={{ textAlign: "center" }} className="{textColor}">
                {governorInfo.officials[0].party}
              </h4>

              {/* Is there an address present? If so we'll want a header for the Address section */}
              {governorInfo.officials[0].address && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Address
                </h6>
              )}
              {/* Map through the array of addresses if present and display each one */}
              {governorInfo.officials[0].address &&
                governorInfo.officials[0].address.map((address) => {
                  return (
                    <div key={address.line1}>
                      <p>Street: {address.line1}</p>
                      <p>City: {address.city}</p>
                      <p>State: {address.state}</p>
                      <p>Zip: {address.zip}</p>
                    </div>
                  );
                })}
              {/* Is there an phone number present? If so we'll want a header for the Phone section */}
              {governorInfo.officials[0].phones && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Phone Number
                </h6>
              )}
              {/* Map through the array of phone numbers if present and display each one */}
              {governorInfo.officials[0].phones &&
                governorInfo.officials[0].phones.map((number) => {
                  return <p key={number}>{number}</p>;
                })}
              {/* Are there any channels present? If so we'll want a header for the Channels section */}
              {governorInfo.officials[0].channels && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Channels
                </h6>
              )}
              {/* Map through the array of channels if present and display each one */}
              {governorInfo.officials[0].channels &&
                governorInfo.officials[0].channels.map((channel) => {
                  return (
                    <p key={channel.type}>
                      {channel.type}: {channel.id}
                    </p>
                  );
                })}

              {/* Is there any url present? If so we'll want a header for the URL section */}
              {governorInfo.officials[0].urls && (
                <h6 className="mt-3" style={{ textAlign: "center" }}>
                  Urls
                </h6>
              )}
              {/* Map through the array of urls if present and display each one */}
              {governorInfo.officials[0].urls &&
                governorInfo.officials[0].urls.map((url) => {
                  return (
                    <a target="_blank" rel="noreferrer" key={url} href={url}>
                      {url}
                    </a>
                  );
                })}
            </div>
          </div>
    )  }
  



    </div>
    </div>
  );
}

export default GoogleCivics;
