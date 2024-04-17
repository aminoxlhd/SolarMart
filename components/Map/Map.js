import React, { useRef } from "react";
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Typography } from "@material-ui/core";
import "leaflet/dist/leaflet.css";
import { BiReset } from "react-icons/bi";
import MarkerIcon from "../../public/images/placeholder.png";
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
        <Marker icon={
          new L.Icon({
            iconUrl: MarkerIcon.src,
            iconRetinaUrl: MarkerIcon.src,
            iconSize: [40, 40],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
            shadowUrl: MarkerShadow.src,
            shadowSize: [61, 61],
            shadowAnchor: [10, 60]

          })
        } position={[49.35455436791739, 4.070174271164345]}>
          <Popup>
            Visitez-nous ici.
          </Popup>
        </Marker>
        <ResetControl />
      </MapContainer>
    </div>
  );
}

export default Map;