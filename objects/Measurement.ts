export type Measurement = {
    id: number;
    device: number;
    timestamp: string;
    wind_speed_avg: number;
    wind_speed_max: number;
    wind_speed_min: number;
    wind_heading_avg: number;
    gps_lat: string;
    gps_lon: string;
    temperature: string;
    humidity: number;
    pressure: number;
    debug_data: {
        dbg_wd_tops: null;
        dbg_wd_data_pts: null;
    };
};
