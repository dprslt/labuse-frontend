import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Device } from '../../objects/Device';
import { Measurement } from '../../objects/Measurement';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

import Head from 'next/head';
import { ResponsiveLine, Serie } from '@nivo/line';
import WindGraph from '../../components/Graphs/WindGraph';
import TempAndHumidityGraph from '../../components/Graphs/TempAndHumidityGraph';
import DeviceCard from '../../components/DeviceCard';
import PressureGraph from '../../components/Graphs/PressureGraph';

type DevicePageProps = {
    device: Device;
    measurements: Array<Measurement>;
};

const DevicePage: React.FC<DevicePageProps> = ({ device, measurements }) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div className="device-details-page">
            <Head>
                <title>{device.name}</title>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    sizes="any"
                    href="/favicon.png"
                />
            </Head>
            <div className="header-container">
                <Link href={`/`}>
                    <div className="go-back">
                        <ArrowBackIcon />
                    </div>
                </Link>
                <div className="header-text">
                    <h1>{device.name}</h1>
                    <p className="description">{device.description}</p>
                </div>
            </div>

            <DeviceCard device={device} />
            {/* <pre>{JSON.stringify(device, null, 4)}</pre> */}
            {/* <pre>{JSON.stringify(measurements, null, 4)}</pre> */}

            <h3>Vent</h3>
            {/* TODO séparer les deux graphs */}
            <WindGraph measurements={measurements} />
            <h3>Température et humidité</h3>
            {/* TODO séparer les deux graph */}
            <TempAndHumidityGraph measurements={measurements} />
            <h3>Pression Athmosphérique</h3>
            <PressureGraph measurements={measurements} />
        </div>
    );
};

export default DevicePage;

export const getServerSideProps: GetServerSideProps<DevicePageProps> = async (
    context
) => {
    const deviceRequest = await fetch(
        `http://api.labuse.uiguig.ovh/v1/devices/${context.query.id}?format=json`
    );
    const device = (await deviceRequest.json()) as Device;

    const measurementRequest = await fetch(
        `http://api.labuse.uiguig.ovh/v1/measurements?format=json&device=${context.query.id}`
    );

    const measurements =
        (await measurementRequest.json()) as Array<Measurement>;
    return {
        props: {
            device,
            measurements: measurements,
        }, // will be passed to the page component as props
    };
};
