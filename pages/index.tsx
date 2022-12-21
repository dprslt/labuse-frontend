import Head from 'next/head';

import dynamic from 'next/dynamic';
import { Device } from '../objects/Device';
import { NextPage } from 'next';
import DevicesList from '../components/DevicesList';
import LabuseLogo from '../components/LabuseLogo';

const MainMap = dynamic(() => import('../components/MainMap'), { ssr: false });

type HomePageProps = {
    devices: Array<Device>;
};

const HomePage: NextPage<HomePageProps> = ({ devices }) => {
    return (
        <div>
            <Head>
                <title>Balises Météo Labuse</title>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    sizes="any"
                    href="/favicon.png"
                />
            </Head>

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
