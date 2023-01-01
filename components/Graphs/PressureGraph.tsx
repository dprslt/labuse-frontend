import { Serie, ResponsiveLine } from '@nivo/line';
import React from 'react';
import { Measurement } from '../../objects/Measurement';

type PressureGraphProps = {
    measurements: Array<Measurement>;
};

const PressureGraph: React.FC<PressureGraphProps> = ({ measurements }) => {
    const series: Array<Serie> = [
        {
            id: 'Pression Atmosphérique',
            color: 'hsl(102, 38%, 24%)',
            data: measurements.map((m) => ({
                x: new Date(m.timestamp),
                y: m.pressure,
            })),
        },
    ];
    return (
        <div className="pressure-graph">
            <ResponsiveLine
                colors={series.map((s) => s.color as string)}
                data={series}
                margin={{ top: 30, right: 30, bottom: 50, left: 80 }}
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
                yFormat={(value) => `${value} hPa`}
                axisTop={null}
                axisRight={null}
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
                    legend: 'Pression Atmosphérique (hPa)',
                    legendOffset: -60,
                    legendPosition: 'middle',
                }}
            />
        </div>
    );
};

export default PressureGraph;
