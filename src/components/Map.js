import React, {useState} from 'react'
import 'leaflet/dist/leaflet.css'
import {MapContainer, TileLayer, Marker} from 'react-leaflet'
import testData from '../constants/testData'

const Map = ({height = '300px', width = '500px', latLong = [44.65107, -63.582687]}) => {

    const mapStyles = {
        height: height,
        width: width
    }

    const [drivers, setDrivers] = useState([])

    for(key in testData){
        
    }

    return(
        <div style={mapStyles}>
            <MapContainer center={latLong} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
}

export default Map