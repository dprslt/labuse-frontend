import React, { useState, useEffect } from 'react';
import { Device } from '../objects/Device';
import DeviceCard from './DeviceCard';
import CloseIcon from '@mui/icons-material/Close';
import { useSwipeable } from 'react-swipeable';
import BottomDrawer from './BottomDrawer';
import AirIcon from '@mui/icons-material/Air';

type DevicesListProps = {
    devices: Array<Device>;
};

const DevicesList: React.FC<DevicesListProps> = ({ devices }) => {
    return (
        <BottomDrawer
            className={'devices-list'}
            title={
                <>
                    <AirIcon sx={{ marginRight: '0.5em' }} />
                    Les balises
                </>
            }
        >
            <div className="grid">
                {devices.map((device) => (
                    <DeviceCard device={device} key={device.id} />
                ))}
            </div>
        </BottomDrawer>
    );
};

export default DevicesList;
