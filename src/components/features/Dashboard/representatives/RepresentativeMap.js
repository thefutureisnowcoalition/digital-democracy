import React from 'react'
import RepresentativeCard from './cards/RepresentativeCard'
import RepresentativeCardMap from './cards/RepresentativeCardMap'

function RepresentativeMap({governorInfo, senatorInfo, representativeInfo, presidentInfo, userLocationInfo}) {
  return (
    <>
<div className="row">
    {userLocationInfo && (
      <div
        className="col-sm-12 col-md-10 col-lg-6"
        style={{ margin: "auto" }}
      >
        <div className="card mt-4 p-3" style={{ textAlign: "center" }}>
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

    {/* With our senatorinfo we are mapping over an array of officials so we need to return each one using our DataCardMap */}
    {senatorInfo && <RepresentativeCardMap data={senatorInfo.officials[0]} title={senatorInfo.offices[0]} />}
    {senatorInfo && <RepresentativeCardMap data={senatorInfo.officials[1]} title={senatorInfo.offices[0]} />}
    {/* If representative data has been successfully fetched - display a DataCard containing that info */}
    {representativeInfo && <RepresentativeCard data={representativeInfo} />}
    {/* Lets map over the array of senators and return a unique card for each one */}
    
    {/* If president data has been successfully fetched - display a DataCard containing that info */}
    {presidentInfo && <RepresentativeCard data={presidentInfo} />}
    {/* If president data has been successfully fetched - display a DataCard containing that info */}
    {governorInfo && <RepresentativeCard data={governorInfo} />}
    </div>
    </>
  )
}

export default RepresentativeMap