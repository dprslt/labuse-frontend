import L, { LatLngTuple } from 'leaflet';
import React from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Device } from '../objects/Device';

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

type MainMapProps = {
    devices: Array<Device>;
};

const position: LatLngTuple = [45.7870437, 3.0776882];

const MainMap: React.FC<MainMapProps> = ({ devices }) => {
    return (
        <MapContainer
            center={position}
            zoom={13}
            className="map-container"
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            />
            {devices.map((device) => {
                if (!device.last_lat || !device.last_lon) {
                    return null;
                }
                return (
                    <Marker
                        position={[
                            Number.parseFloat(device.last_lat),
                            Number.parseFloat(device.last_lon),
                        ]}
                        key={device.id}
                    >
                        <Popup>{device.description}</Popup>
                    </Marker>
                );
            })}

            {/* <ZoomControl position="bottomleft" /> */}
        </MapContainer>
    );
};

export default MainMap;
