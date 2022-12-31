import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Device } from '../../objects/Device';
import { Measurement } from '../../objects/Measurement';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

import Head from 'next/head';
import { ResponsiveLine, Serie } from '@nivo/line';

type DevicePageProps = {
    device: Device;
    measurements: Array<Measurement>;
};

const DevicePage: React.FC<DevicePageProps> = ({ device, measurements }) => {
    const router = useRouter();
    const { id } = router.query;

    const series: Array<Serie> = [
        {
            id: 'Rafales Min',
            color: 'hsl(231, 70%, 30%)',
            data: measurements.map((m) => ({
                x: new Date(m.timestamp),
                y: m.wind_speed_min,
            })),
        },
        {
            id: 'Avg',
            color: 'hsl(102, 38%, 24%)',
            data: measurements.map((m) => ({
                x: new Date(m.timestamp),
                y: m.wind_speed_avg,
            })),
        },
        {
            id: 'Rafales Max',
            color: 'hsl(11, 70%, 70%)',
            data: measurements.map((m) => ({
                x: new Date(m.timestamp),
                y: m.wind_speed_max,
            })),
        },
    ];
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
            {/* <pre>{JSON.stringify(device, null, 4)}</pre> */}
            {/* <pre>{JSON.stringify(measurements, null, 4)}</pre> */}

            <h3>Vent</h3>

            <div className="wind-graph">
                <ResponsiveLine
                    data={series}
                    margin={{ top: 10, right: 110, bottom: 50, left: 60 }}
                    xScale={{
                        format: '%Y-%m-%d %H:%M:%S.%L%Z',
                        type: 'time',
                    }}
                    xFormat="time:%d/%m %H:%M:%S"
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: true,
                        reverse: false,
                    }}
                    yFormat={(value) => `${value} km/h`}
                    enableSlices="x"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        format: '%d/%m %H:%M',
                        // legend: 'Time',
                        legendOffset: 36,
                        legendPosition: 'middle',
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Vitesse (km/h)',
                        legendOffset: -40,
                        legendPosition: 'middle',
                    }}
                    useMesh={true}
                    // tooltip={(props) => {
                    //     return <span>{`${props.point.y} km/h`}</span>;
                    // }}
                />
            </div>
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
