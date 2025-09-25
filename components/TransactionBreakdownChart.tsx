import React, { useEffect, useRef, useMemo } from 'react';
import { Transaction } from '../types';

declare const Chart: any;

interface TransactionBreakdownChartProps {
    transactions: Transaction[];
}

export const TransactionBreakdownChart: React.FC<TransactionBreakdownChartProps> = ({ transactions }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    const chartData = useMemo(() => {
        const typeCounts = transactions.reduce((acc, tx) => {
            acc[tx.type] = (acc[tx.type] || 0) + 1;
            return acc;
        }, {} as Record<Transaction['type'], number>);

        const labels = Object.keys(typeCounts);
        const data = Object.values(typeCounts);
        
        return { labels, data };
    }, [transactions]);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstance.current = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: chartData.labels,
                        datasets: [{
                            label: 'Transactions',
                            data: chartData.data,
                            backgroundColor: [
                                'rgba(239, 68, 68, 0.7)',  // Purchase (Red)
                                'rgba(34, 197, 94, 0.7)',  // Sale (Green)
                                'rgba(59, 130, 246, 0.7)', // Reward (Blue)
                                'rgba(107, 114, 128, 0.7)' // Transfer (Gray)
                            ],
                            borderColor: [
                                '#1F2937' // bg-gray-800
                            ],
                            borderWidth: 2,
                            hoverOffset: 8
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: '#D1D5DB', // text-gray-300
                                    padding: 15,
                                    font: {
                                        size: 12
                                    }
                                }
                            }
                        },
                        cutout: '70%'
                    }
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [chartData]);

    if (transactions.length === 0) {
        return <div className="text-gray-500 text-center">No transaction data to display.</div>;
    }

    return <canvas ref={chartRef}></canvas>;
};
