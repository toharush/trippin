import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import './Map.css';
import { Component } from 'react';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from 'leaflet';

class Map extends Component {
    startPosition = [51.50853 , - 0.12574];
    startPositionName = 'London';
    blueIcon = new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] });

    render() {
        return(
            <div className="map" id="map" >
                <MapContainer center={this.startPosition} zoom={6} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={this.startPosition} 
                        icon={this.blueIcon}>
                        <Popup>
                            {this.startPositionName}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        );
    }
}
export default Map;