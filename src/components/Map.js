import React, {useState, useEffect} from 'react'
import 'leaflet/dist/leaflet.css'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({
        height = '300px', 
        width = '500px', 
        userLatLong = [44.65107, -63.582687],
        nearbyDrivers = {}
    }) => {

    const mapStyles = {
        height: height,
        width: width
    }

    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        const markers = []
        for(const key in nearbyDrivers){
            markers.push(
                <Marker position={nearbyDrivers[key].coordinates}>
                    <Popup>
                        {nearbyDrivers[key].userName}
                    </Popup>
                </Marker>
            )
        }
        setDrivers(markers)
    }, [nearbyDrivers])

    return(
        <div style={mapStyles}>
            <MapContainer center={userLatLong} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {drivers}
            </MapContainer>
        </div>
    )
}

export default Map