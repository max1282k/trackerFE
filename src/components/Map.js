import React, { useState } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';

export const DeviceMap = ({ h, latitude, longitude, imei }) => {
  const [hoveredMarker, setHoveredMarker] = useState(null);
  console.log(latitude, longitude);
  
  const markerPositions = [
    { id: 2, position: [Number(latitude), Number(longitude)], info: `imei: ${imei}` }, // Add more positions and info as needed
  ];

  return (
    <div className="d-flex justify-content-center border border-rounded">
      <Map center={[Number(latitude), Number(longitude)]} zoom={7} width={"100%"} height={h || 500}>
        {markerPositions.map((marker) => (
          <Marker
            key={marker.id}
            anchor={marker.position}
            payload={marker.id}
            onMouseOver={() => setHoveredMarker(marker)}
            onMouseOut={() => setHoveredMarker(null)}
          />
        ))}

        {hoveredMarker && (
          <Overlay
            anchor={hoveredMarker.position}
            offset={[0, -20]}
          >
            <div style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}>
              {hoveredMarker.info}
            </div>
          </Overlay>
        )}
      </Map>
    </div>
  );
};




export const DashboardMap = ({ h, data }) => {

  const markerPositions = data.map((item) => ({
    id: item.id,
    position: [Number(item.latitude), Number(item.longitude)],
  }));

  // Calculate the average latitude and longitude
  const averagePosition = markerPositions.reduce(
    (acc, curr) => [acc[0] + curr.position[0], acc[1] + curr.position[1]],
    [0, 0]
  );

  const center = [
    averagePosition[0] / markerPositions.length,
    averagePosition[1] / markerPositions.length,
  ];

  return (
    <div className="d-flex justify-content-center border border-rounded">
      <Map zoom={7} center={center} width="100%" height={h || 500}>
        {markerPositions.map((marker) => (
          <Marker key={marker.id} anchor={marker.position} payload={marker.id} />
        ))}
      </Map>
    </div>
  );
};

