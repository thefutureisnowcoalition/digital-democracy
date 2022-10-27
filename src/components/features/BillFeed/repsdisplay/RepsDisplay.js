import React from 'react'
import RepresentativeCard from '../../Dashboard/representatives/cards/RepresentativeCard'
import RepresentativeCardMap from '../../Dashboard/representatives/cards/RepresentativeCardMap'

function RepsDisplay({senatorInfo, representativeInfo}) {
  return (
    <div className="row">
    {/* With our senatorinfo we are mapping over an array of officials so we need to return each one using our DataCardMap */}
    {senatorInfo && <RepresentativeCardMap data={senatorInfo.officials[0]} title={senatorInfo.offices[0]} />}
    {senatorInfo && <RepresentativeCardMap data={senatorInfo.officials[1]} title={senatorInfo.offices[0]} />}
    {/* If representative data has been successfully fetched - display a DataCard containing that info */}
    {representativeInfo && <RepresentativeCard data={representativeInfo} />}
    </div>
  )
}

export default RepsDisplay