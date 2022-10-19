import React from "react";

function DataCardMap({ data, title }) {
  return (
    <div className="col-12 mb-5 col-md-6 col-lg-4" style={{ margin: "auto" }}>
      <div className="card mt-5 p-3">
        <h2 style={{ textAlign: "center" }}>{title.name}</h2>
        <h3 className="card-header" style={{ textAlign: "center" }}>
          {data.name}
        </h3>
        <h4 style={{ textAlign: "center" }} className="{textColor}">
          {data.party}
        </h4>

        {/* Is there an address present? If so we'll want a header for the Address section */}
        {data.address && (
          <h6 className="mt-3" style={{ textAlign: "center" }}>
            Address
          </h6>
        )}
        {/* Map through the array of addresses if present and display each one */}
        {data.address &&
          data.address.map((address) => {
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
        {data.phones && (
          <h6 className="mt-3" style={{ textAlign: "center" }}>
            Phone Number
          </h6>
        )}
        {/* Map through the array of phone numbers if present and display each one */}
        {data.phones &&
          data.phones.map((number) => {
            return <p key={number}>{number}</p>;
          })}
        {/* Are there any channels present? If so we'll want a header for the Channels section */}
        {data.channels && (
          <h6 className="mt-3" style={{ textAlign: "center" }}>
            Channels
          </h6>
        )}
        {/* Map through the array of channels if present and display each one */}
        {data.channels &&
          data.channels.map((channel) => {
            return (
              <p key={channel.type}>
                {channel.type}: {channel.id}
              </p>
            );
          })}

        {/* Is there any url present? If so we'll want a header for the URL section */}
        {data.urls && (
          <h6 className="mt-3" style={{ textAlign: "center" }}>
            Urls
          </h6>
        )}
        {/* Map through the array of urls if present and display each one */}
        {data.urls &&
          data.urls.map((url) => {
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

export default DataCardMap;