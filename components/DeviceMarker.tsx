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
    const windPerc = Math.round(
        Math.min(
            Math.log10((device.last_measurement?.wind_speed_avg || 0) / 10 + 1),
            10
        ) * 100
    );

    console.log(windPerc);

    const dashArray =
        windPerc === 0 ? '100 0' : `${windPerc} ${100 - windPerc}`;

    console.log(dashArray);

    const content = (
        <div className="device-marker">
            <NavigationIcon
                sx={{
                    transform: `rotate(${device.last_measurement?.wind_heading_avg}deg)`,
                    fontSize: '5em',
                }}
                className="wind-icon"
            />

            <svg className="donut-container" viewBox="-12 -12 24 24">
                <circle
                    className="donut-segment"
                    cx="0"
                    cy="0"
                    r="10"
                    fill="white"
                    stroke="#345426"
                    opacity={0.8}
                    strokeWidth="2"
                ></circle>
            </svg>

            {/* {device.last_measurement && (
                <div className="avg-speed">
                    {Math.round(device.last_measurement?.wind_heading_avg)}
                </div>
            )} */}
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
