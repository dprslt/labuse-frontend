import { Serie, ResponsiveLine } from '@nivo/line';
import React from 'react';
import { Measurement } from '../../objects/Measurement';

type TempAndHumidityGraphProps = {
    measurements: Array<Measurement>;
};

const TempAndHumidityGraph: React.FC<TempAndHumidityGraphProps> = ({
    measurements,
}) => {
    const series: Array<Serie> = [
        {
            id: 'Humidité',
            color: 'hsl(102, 31%, 75%)',
            data: measurements.map((m) => ({
                x: new Date(m.timestamp),
                y: m.humidity,
            })),
        },
        {
            id: 'Température',
            color: 'hsl(102, 38%, 24%)',
            data: measurements.map((m) => ({
                x: new Date(m.timestamp),
                y: m.temperature,
            })),
        },
    ];
    return (
        <div className="temp-graph">
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
                enableSlices="x"
                axisTop={null}
                axisRight={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Humidité (%)',
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
                    legend: 'Température (°C)',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                enablePoints={false}
            />
        </div>
    );
};

export default TempAndHumidityGraph;
