import React from 'react';
import { Device } from '../objects/Device';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import * as ReactDOMServer from 'react-dom/server';
import NavigationIcon from '@mui/icons-material/Navigation';
import DeviceCard from './DeviceCard';

type DeviceMarkerProps = {
    device: Device;
};

const DeviceMarker: React.FC<DeviceMarkerProps> = ({ device }) => {
    const content = (
        <div className="device-marker">
            <NavigationIcon
                sx={{
                    transform: `rotate(${device.last_measurement?.wind_heading_avg}deg)`,
                    fontSize: '5em',
                }}
                className="wind-icon"
            />
        </div>
    );

    const icon = L.divIcon({
        className: 'custom-icon',
        html: ReactDOMServer.renderToString(content),
        popupAnchor: [-5, -40],
    });

    return (
        <Marker
            icon={icon}
            position={[
                Number.parseFloat(device.last_lat),
                Number.parseFloat(device.last_lon),
            ]}
        >
            <Popup className="device-marker-popup">
                <DeviceCard device={device} />
            </Popup>
        </Marker>
    );
};

export default DeviceMarker;
