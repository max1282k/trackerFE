import { Map, Marker } from "pigeon-maps";
import React from "react";

const DeviceMap = ({h}) => {
  const markerPositions = [
    { id: 1, position: [51.5074, -0.1278] },
    { id: 2, position: [51.508, -0.129] }, // Add more positions as needed
    { id: 3, position: [51.506, -0.126] },
  ];

  return (
    <div className="d-flex justify-content-center border border-rounded">
      <Map center={[51.5074, -0.1278]} zoom={15} width={'100%'} height={h || 500}>
        {markerPositions.map((marker) => (
          <Marker key={marker.id} anchor={marker.position} payload={marker.id} />
        ))}
      </Map>
    </div>
  );
};

export default DeviceMap;
