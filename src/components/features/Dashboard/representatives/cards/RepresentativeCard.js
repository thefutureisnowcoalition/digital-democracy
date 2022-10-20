import React from "react";

function DataCard({ data }) {
  return (
    <div className="col-12 mb-5 col-md-6 col-lg-4" style={{ margin: "auto" }}>
      <div className="card mt-5 p-3">
        <h2 style={{ textAlign: "center" }}>{data.offices[0].name}</h2>
        <h3 className="card-header" style={{ textAlign: "center" }}>
          {data.officials[0].name}
        </h3>
        <h4 style={{ textAlign: "center" }} className="{textColor}">
          {data.officials[0].party}
        </h4>

        {/* Is there an address present? If so we'll want a header for the Address section */}
        {data.officials[0].address && (
          <h6 className="mt-3" style={{ textAlign: "center" }}>
            Address
          </h6>
        )}
        {/* Map through the array of addresses if present and display each one */}
        {data.officials[0].address &&
          data.officials[0].address.map((address) => {
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
        {data.officials[0].phones && (
          <h6 className="mt-3" style={{ textAlign: "center" }}>
            Phone Number
          </h6>
        )}
        {/* Map through the array of phone numbers if present and display each one */}
        {data.officials[0].phones &&
          data.officials[0].phones.map((number) => {
            return <p key={number}>{number}</p>;
          })}
        {/* Are there any channels present? If so we'll want a header for the Channels section */}
        {data.officials[0].channels && (
          <h6 className="mt-3" style={{ textAlign: "center" }}>
            Channels
          </h6>
        )}
        {/* Map through the array of channels if present and display each one */}
        {data.officials[0].channels &&
          data.officials[0].channels.map((channel) => {
            return (
              <p key={channel.type}>
                {channel.type}: {channel.id}
              </p>
            );
          })}

        {/* Is there any url present? If so we'll want a header for the URL section */}
        {data.officials[0].urls && (
          <h6 className="mt-3" style={{ textAlign: "center" }}>
            Urls
          </h6>
        )}
        {/* Map through the array of urls if present and display each one */}
        {data.officials[0].urls &&
          data.officials[0].urls.map((url) => {
            return (
              <a target="_blank" rel="noreferrer" key={url} href={url}>
                {url}
              </a>
            );
          })}
      </div>
    </div>
  );
}

export default DataCard;
