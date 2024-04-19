import React, { useRef } from "react";
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Typography } from "@material-ui/core";
import "leaflet/dist/leaflet.css";
import { BiReset } from "react-icons/bi";
import MarkerShadow from '../../node_modules/leaflet/dist/images/marker-shadow.png'
import Styles from '../../styles/Map.module.css';


function Map() {
  const mapRef = useRef(null);
  const ResetControl = () => {
    const map = useMap();

    const resetMap = () => {
      map.setView([49.35455436791739, 4.070174271164345], 13);
    };

    return (
      <button className={Styles.resetButton} onClick={resetMap}>
        <BiReset className={Styles.resetIcon}/>
      </button>
    );
  };
  return (
    <div className="map-container">
      <Typography component="h2" variant="h2" >Visit us</Typography>
      <MapContainer
        center={[49.35455436791739, 4.070174271164345]}
        zoom={13}
        scrollWheelZoom={false}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[49.35455436791739, 4.070174271164345]}>
          <Popup>
            Visit Us.
          </Popup>
        </Marker>
        <ResetControl />
      </MapContainer>
    </div>
  );
}

export default Map;