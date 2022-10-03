import React, { useState } from "react";
import { Link } from "react-router-dom";

//The below line prevents some errors associated with the google client authentication
/* global gapi */

function GoogleCivics() {
  const [locationInfo, setLocationInfo] = useState({
    street: "",
    city: "",
    state: "",
  });
  const [representativeInfo, setRepresentativeInfo] = useState(null);

  //Authenticate our client through google using our API Key
  function authenticateGoogleClient() {
  //API Key is exposed! (And is a personal key) Will need to fix this before launch
    gapi.client.setApiKey("AIzaSyDb9iyzlZ4i8xfzw5BM2KiAy1mKt4WBc0c");
    return gapi.client
      .load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
      .then(
        function () {
          console.log("GAPI client loaded for API");
          //After our client is successfully authenticated, we can call execute function
          execute();
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }

  //After the client is loaded, fetch the representative data via Google.
  function execute() {
    return gapi.client.civicinfo.representatives
      .representativeInfoByAddress({
        address: locationInfo.street + locationInfo.city + locationInfo.state,
        includeOffices: true,
        levels: ["country"],
        roles: ["legislatorLowerBody"],
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response.result);
          setRepresentativeInfo(response.result);
          console.log(representativeInfo);
          setLocationInfo({
            street: "",
            city: "",
            state: "",
          });
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }
  gapi.load("client");

  //When a user inputs location information into the form, store it in state in the locationInfo variable
  //We will spread in existing values in addition to new ones the user has input
  function handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setLocationInfo({
      ...locationInfo,
      [name]: value,
    });
    console.log(locationInfo);
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
        <div className="col-12 col-lg-8" style={{ margin: "auto" }}>
          <div className="card mt-5 p-5">
            <div className="row g-3">
              <div className="col-12 row g-3">
                <h5>Find your district representative</h5>
                <label htmlFor="street" className="form-label">
                  Street Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  placeholder="123 Main St"
                  onChange={handleChange}
                  value={locationInfo.street}
                  name="street"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={locationInfo.city}
                  name="city"
                  className="form-control"
                  id="city"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={locationInfo.state}
                  name="state"
                  className="form-control"
                  id="inputPassword4"
                />
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  onClick={authenticateGoogleClient}
                  className="btn btn-primary"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {representativeInfo && (
        <div className="row">
          <div className="col-12 mb-5 col-lg-8" style={{ margin: "auto" }}>
            <div className="card mt-5 p-5">
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
        </div>
      )}
    </div>
  );
}

export default GoogleCivics;
