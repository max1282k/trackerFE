import { Map, Marker } from "pigeon-maps";
import React from "react";

const DeviceMap = ({ h }) => {
  const markerPositions = [
    { id: 1, position: [15.7631063, -86.79698653] },
    { id: 2, position: [13.94399699, -86.85099854] }, // Add more positions as needed
    { id: 3, position: [13.5299868, -87.48996749] },
  ];

  return (
    <div className="d-flex justify-content-center border border-rounded">
      <Map center={[15.2, -86.2419]} zoom={7} width={"100%"} height={h || 500}>
        {markerPositions.map((marker) => (
          <Marker
            key={marker.id}
            anchor={marker.position}
            payload={marker.id}
          />
        ))}
      </Map>
    </div>
  );
};

export default DeviceMap;
