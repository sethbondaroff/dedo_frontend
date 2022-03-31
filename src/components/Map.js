import React, {useState, useEffect} from 'react'
import '../styles/Map.css'
import 'leaflet/dist/leaflet.css'
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import L from 'leaflet'
import axios from 'axios'
import {
    TextField,
    Button
} from '@mui/material'

import icon from 'leaflet/dist/images/marker-icon.png';
import redIcon from '../images/markerRed.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

let RedIcon = L.icon({
    iconUrl: redIcon,
    shadowUrl: iconShadow
})

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({
        height = '500px', 
        width = '900px', 
        userLatLong = [0, 0],
    }) => {

    const mapStyles = {
        height: height,
        width: width
    }

    const [center, setCenter] = useState(userLatLong)
    const [zoomLevel, setZoomLevel] = useState(1)

    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [prov, setProv] = useState('')
    const [country, setCountry] = useState('')

    const [markerData, setMarkerData] = useState({source: [], dest: [], center: []})
    const [markers, setMarkers] = useState([])

    useEffect(() => {
        const mapMarkers = []
        if(markerData.source.length !== 0){
            mapMarkers.push(
                <Marker key='source' position={markerData.source.slice(0,2)}>
                    <Popup>Source: {markerData.source[2]}</Popup>
                </Marker>
            )
        }
        if(markerData.dest.length !== 0){
            mapMarkers.push(
                <Marker key='dest' position={markerData.dest.slice(0,2)}>
                    <Popup>Destination: {markerData.dest[2]}</Popup>
                </Marker>
            )
        }
        if(markerData.center.length !== 0){
            mapMarkers.push(
                <Marker key='center' icon={RedIcon} position={markerData.center.slice(0,2)}>
                    <Popup>{markerData.center[2]}</Popup>
                </Marker>
            )
        }
        setMarkers(mapMarkers)
    }, [markerData])

    const searchAddress = () => {
        let searchString = ''
        searchString += street !== '' ? `&street=${street.replace(' ', '+')}` : ''
        searchString += city !== '' ? `&city=${city.replace(' ', '+')}` : ''
        searchString += prov !== '' ? `&state=${prov.replace(' ', '+')}` : ''
        searchString += country !== '' ? `&country=${country.replace(' ', '+')}` : ''
        const url = `https://nominatim.openstreetmap.org/search?format=jsonv2${searchString}`
        axios.get(url)
            .then((res) => {
                setCenter([parseFloat(res.data[0].lat), parseFloat(res.data[0].lon)])
                setZoomLevel(15)
                const newCenter = [parseFloat(res.data[0].lat), parseFloat(res.data[0].lon),`${street} ${city} ${prov} ${country}`]
                setMarkerData(prevState => {
                    return {...prevState, center: newCenter}
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const updateMarkers = (btn) => {
        if(btn === 's'){
            setMarkerData(prevState => {
                return {...prevState, center: [], source: prevState.center}
            })
        } else {
            setMarkerData(prevState => {
                return {...prevState, center: [], dest: prevState.center}
            })
        }
    }

    return(
        <div style={mapStyles}>
            <div className='map-controls'>
                <TextField value={street} onChange={(e) => setStreet(e.target.value)} label='House number / Street'/>
                <TextField value={city} onChange={(e) => setCity(e.target.value)} label='City'/>
                <TextField value={prov} onChange={(e) => setProv(e.target.value)} label='Province / State'/>
                <TextField value={country} onChange={(e) => setCountry(e.target.value)} label='Country'/>
                <Button onClick={searchAddress}>Search</Button>
            </div>
            <MapContainer center={center} zoom={zoomLevel}>
                <ChangeMapView center={center} zoom={zoomLevel}/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
            </MapContainer>
            <div className='map-controls'>
                <Button onClick={() => updateMarkers('s')}>Set Source</Button>
                <Button onClick={() => updateMarkers('d')}>Set Destination</Button>
            </div>
        </div>
    )
}

const ChangeMapView = ({center, zoom}) => {
    const map = useMap()
    map.setView(center, zoom)
    return null
}

export default Map