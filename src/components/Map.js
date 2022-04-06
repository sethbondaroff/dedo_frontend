import React, { useState, useEffect } from "react";
import "../styles/Map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { TextField, Button } from "@mui/material";

import icon from "leaflet/dist/images/marker-icon.png";
import redIcon from "../images/markerRed.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

let RedIcon = L.icon({
  iconUrl: redIcon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({
  height = "25em",
  width = "100%",
  userLatLong = [0, 0],
  setSourceCoords = (arr) => {},
  setDestCoords = (arr) => {},
  sourceOnly = false,
  defaultZoom = 1,
  defaultStreet='',
  defaultCity='',
  defaultProv='',
  defaultCountry='',
  styles={}
}) => {
  const mapStyles = {
    height: height,
    width: width,
    ...styles
  };

  const [center, setCenter] = useState(userLatLong);
  const [zoomLevel, setZoomLevel] = useState(defaultZoom);

  const [street, setStreet] = useState(defaultStreet);
  const [city, setCity] = useState(defaultCity);
  const [prov, setProv] = useState(defaultProv);
  const [country, setCountry] = useState(defaultCountry);

  const [markerData, setMarkerData] = useState({
    source: [],
    dest: [],
    center: [],
  });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const mapMarkers = [];
    if (markerData.source.length !== 0) {
      mapMarkers.push(
        <Marker key="source" position={markerData.source.slice(0, 2)}>
          <Popup>
            <p>
              <b>Source</b>
              <br /> {markerData.source[2]}
            </p>
            <Button color="secondary" onClick={() => removeMarker("s")}>
              Delete
            </Button>
          </Popup>
        </Marker>
      );
    }
    if (markerData.dest.length !== 0) {
      mapMarkers.push(
        <Marker key="dest" position={markerData.dest.slice(0, 2)}>
          <Popup>
            <p>
              <b>Destination</b>
              <br /> {markerData.dest[2]}
            </p>
            <Button color="secondary" onClick={() => removeMarker("d")}>
              Delete
            </Button>
          </Popup>
        </Marker>
      );
    }
    if (markerData.center.length !== 0) {
      mapMarkers.push(
        <Marker
          key="center"
          icon={RedIcon}
          position={markerData.center.slice(0, 2)}
        >
          <Popup>
            <p>{markerData.center[2]}</p>
            {!sourceOnly && <><Button onClick={() => updateMarkers("s")}>Set Source</Button>
            <Button onClick={() => updateMarkers("d")}>Set Destination</Button></>}
          </Popup>
        </Marker>
      );
    }
    setMarkers(mapMarkers);
  }, [markerData]);

  const searchAddress = () => {
    let searchString = "";
    searchString += street !== "" ? `&street=${street.replace(" ", "+")}` : "";
    searchString += city !== "" ? `&city=${city.replace(" ", "+")}` : "";
    searchString += prov !== "" ? `&state=${prov.replace(" ", "+")}` : "";
    searchString += country !== "" ? `&country=${country.replace(" ", "+")}` : "";

    //searchString += "&city=Halifax&state=Nova+Scotia&country=Canada";
    console.log(searchString);
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2${searchString}`;
    axios
      .get(url)
      .then((res) => {
        setCenter([parseFloat(res.data[0].lat), parseFloat(res.data[0].lon)]);
        setZoomLevel(15);
        const newCenter = [
          parseFloat(res.data[0].lat),
          parseFloat(res.data[0].lon),
          `${street} ${city} ${prov} ${country}`,
        ];
        setMarkerData((prevState) => {
          return { ...prevState, center: newCenter };
        });
        if(sourceOnly){
          setSourceCoords(newCenter)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateMarkers = (btn) => {
    if (btn === "s") {
      setSourceCoords(markerData.center);
      setMarkerData((prevState) => {
        return { ...prevState, center: [], source: prevState.center };
      });
    } else if (btn == "d") {
      setDestCoords(markerData.center);
      setMarkerData((prevState) => {
        return { ...prevState, center: [], dest: prevState.center };
      });
    } 
  };

  const removeMarker = (btn) => {
    if (btn === "s") {
      setSourceCoords([]);
      setMarkerData((prevState) => {
        return { ...prevState, source: [] };
      });
    } else {
      setDestCoords([]);
      setMarkerData((prevState) => {
        return { ...prevState, dest: [] };
      });
    }
  };

  return (
    <div style={mapStyles} className="map-container">
      <div className="map-controls">
        <TextField
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          label="House number / Street"
        />
        <TextField
          value={city}
          onChange={(e) => setCity(e.target.value)}
          label="City"
        />
        <TextField
          value={prov}
          onChange={(e) => setProv(e.target.value)}
          label="Province / State"
        />
        <TextField
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          label="Country"
        />
        <Button onClick={searchAddress}>Search</Button>
      </div>
      <MapContainer center={center} zoom={zoomLevel}>
        <ChangeMapView center={center} zoom={zoomLevel} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </MapContainer>
      {!sourceOnly && <div className="map-controls">
        <Button onClick={() => updateMarkers("s")}>Set Source</Button>
        <Button onClick={() => updateMarkers("d")}>Set Destination</Button>
      </div>}
    </div>
  );
};

const ChangeMapView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

export default Map;
