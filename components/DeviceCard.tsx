import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    IconButton,
    Typography,
} from '@mui/material';
import React from 'react';
import { Device } from '../objects/Device';

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import WifiTetheringErrorIcon from '@mui/icons-material/WifiTetheringError';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import NavigationIcon from '@mui/icons-material/Navigation';
import GrainIcon from '@mui/icons-material/Grain';
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import Link from 'next/link';

type DeviceCardProps = {
    device: Device;
};

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
    return (
        <Link href={`/devices/${device.id}`}>
            <Card sx={{ display: 'flex' }} className="device-card">
                <Box className={'wind-direction-container'}>
                    {device.last_measurement ? (
                        <>
                            <NavigationIcon
                                sx={{
                                    transform: `rotate(${device.last_measurement?.wind_heading_avg}deg)`,
                                    fontSize: '5em',
                                }}
                                className="wind-icon"
                            />
                            <Box
                                sx={{
                                    pt: 1,
                                }}
                                className="wind-box"
                            >
                                <span className="wind-min">
                                    {device.last_measurement?.wind_speed_min}
                                </span>
                                <span className="wind-avg">
                                    {device.last_measurement?.wind_speed_avg}
                                </span>
                                <span className="wind-max">
                                    {device.last_measurement?.wind_speed_max}
                                </span>
                            </Box>
                        </>
                    ) : (
                        <>
                            <WifiTetheringErrorIcon className="wind-icon" />
                        </>
                    )}
                </Box>
                <Box className="device-infos">
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <h5>{device.name}</h5>
                        <span className="subtitle">{device.description}</span>
                    </CardContent>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                        className="card-measures"
                    >
                        {/* TODO improve battery icon based on the perc */}
                        <Chip
                            icon={<BatteryStdIcon />}
                            label={`${device.last_bat}%`}
                            title={'Batterie'}
                        />
                        {device.last_measurement && (
                            <>
                                <Chip
                                    icon={<DeviceThermostatIcon />}
                                    label={`${device.last_measurement?.temperature}°C`}
                                    title={'Température'}
                                />
                                <Chip
                                    icon={<GrainIcon />}
                                    label={`${device.last_measurement?.humidity}%`}
                                    title={'Humidité'}
                                />
                                <Chip
                                    icon={<LineWeightIcon />}
                                    label={`${device.last_measurement?.pressure}hPa`}
                                    title={'Pression'}
                                />
                            </>
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', pr: 3 }}
                    className="link-icon"
                >
                    <IconButton aria-label="details">
                        <KeyboardDoubleArrowRightIcon />
                    </IconButton>
                </Box>
            </Card>
        </Link>
    );
};

export default DeviceCard;
