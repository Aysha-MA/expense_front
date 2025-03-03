import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, TimeScale, LineController } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, TimeScale, LineController);

const ChartComponent = ({ chartData }) => {
    const chartInstanceRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        chartInstanceRef.current = new ChartJS(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Income and Expense Chart for One Month',
                    },
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'yyyy-MM-dd',
                        },
                    },
                },
            },
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [chartData]);

    return (
        <div style={{ width: '100%', height: '300px', marginBottom: '50px' }}>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default ChartComponent;