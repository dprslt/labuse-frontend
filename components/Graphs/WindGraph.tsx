import { Serie, ResponsiveLine } from '@nivo/line';
import React from 'react';
import { Measurement } from '../../objects/Measurement';

type WindGraphProps = {
    measurements: Array<Measurement>;
};

const WindGraph: React.FC<WindGraphProps> = ({ measurements }) => {
    const series: Array<Serie> = [
        {
            id: 'Rafales Min',
            color: 'hsl(102, 38%, 85%)',
            data: measurements.map((m) => ({
                x: new Date(m.timestamp),
                y: m.wind_speed_min,
            })),
        },
        {
            id: 'Moyenne',
            color: 'hsl(102, 38%, 24%)',
            data: measurements.map((m) => ({
                x: new Date(m.timestamp),
                y: m.wind_speed_avg,
            })),
        },
        {
            id: 'Rafales Max',
            color: 'hsl(102, 31%, 75%)',
            data: measurements.map((m) => ({
                x: new Date(m.timestamp),
                y: m.wind_speed_max,
            })),
        },
        {
            id: 'Orientation',
            color: 'hsl(102, 20%, 45%)',
            data: measurements.map((m) => ({
                x: new Date(m.timestamp),
                y: m.wind_heading_avg,
            })),
        },
    ];
    return (
        <div className="wind-graph">
            <ResponsiveLine
                colors={series.map((s) => s.color as string)}
                data={series}
                margin={{ top: 30, right: 60, bottom: 50, left: 60 }}
                xScale={{
                    format: '%Y-%m-%d %H:%M:%S.%L%Z',
                    type: 'time',
                }}
                xFormat="time:%d/%m %H:%M:%S"
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    reverse: false,
                }}
                yFormat={(value) => `${value}`}
                enableSlices="x"
                axisTop={null}
                axisRight={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Orientation ??',
                    legendOffset: 40,
                    legendPosition: 'middle',
                }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    format: '%d/%m %H:%M',
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
                // useMesh={true}
                // tooltip={(props) => {
                //     return <span>{`${props.point.y} km/h`}</span>;
                // }}
            />
        </div>
    );
};

export default WindGraph;
