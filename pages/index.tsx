import Head from 'next/head';
import Image from 'next/image';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import dynamic from 'next/dynamic';
import { Device } from '../objects/Device';
import { NextPage } from 'next';
import DeviceCard from '../components/DeviceCard';
import DevicesList from '../components/DevicesList';
import LabuseLogo from '../components/LabuseLogo';

const MainMap = dynamic(() => import('../components/MainMap'), { ssr: false });

type HomePageProps = {
    devices: Array<Device>;
};

const HomePage: NextPage<HomePageProps> = ({ devices }) => {
    return (
        <div>
            <MainMap devices={devices} />
            <DevicesList devices={devices} />
            <LabuseLogo />
        </div>
    );
};

export default HomePage;

export async function getServerSideProps() {
    const result = await fetch(
        'http://api.labuse.uiguig.ovh/v1/devices/?format=json'
    );
    // const devices = (await result.json()) as Array<Device>;

    const devices = [
        {
            id: 3,
            name: 'La Buse de Dom',
            description: 'Balise de test chez Dom',
            token: '5b8bf6feefe1d47e',
            last_seen: '2022-12-16T09:16:27.787880Z',
            last_bat: 0,
            last_lat: '45.760000',
            last_lon: '3.050000',
            last_measurement: {
                id: 30074,
                device: 3,
                timestamp: '2022-12-16T09:16:27.753751Z',
                wind_speed_avg: 6,
                wind_speed_max: 120,
                wind_speed_min: 24,
                wind_heading_avg: 0,
                gps_lat: '45.760000',
                gps_lon: '3.050000',
                temperature: '0.00',
                humidity: 0,
                pressure: 0,
                debug_data: {
                    dbg_wd_tops: null,
                    dbg_wd_data_pts: null,
                },
            },
        },
    ];

    return {
        props: {
            devices,
        }, // will be passed to the page component as props
    };
}
