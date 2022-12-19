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
    const devices = (await result.json()) as Array<Device>;

    return {
        props: {
            devices,
        }, // will be passed to the page component as props
    };
}
