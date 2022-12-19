import { Measurement } from './Measurement';

export type Device = {
    id: number;
    name: string;
    description: string;
    token: string;
    last_seen: string;
    last_bat: number;
    last_lat: string;
    last_lon: string;
    last_measurement?: Measurement;
};
