import React, { useEffect, useRef, useMemo } from 'react';
import { Transaction } from '../types';

declare const Chart: any;

interface BalanceChartProps {
    transactions: Transaction[];
    currentBalance: number;
}

export const BalanceChart: React.FC<BalanceChartProps> = ({ transactions, currentBalance }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    const chartData = useMemo(() => {
        // Sort transactions from oldest to newest
        const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        const labels: string[] = [];
        const data: number[] = [];
        
        // Calculate the total change from transactions
        const totalChange = sortedTransactions.reduce((acc, tx) => acc + tx.amountPi, 0);
        // Infer the starting balance by working backwards from the current balance
        let balance = currentBalance - totalChange;

        // Add an initial data point for a cleaner graph start
        if (sortedTransactions.length > 0) {
            const firstDate = new Date(sortedTransactions[0].date);
            firstDate.setDate(firstDate.getDate() - 1); // A day before the first transaction
            labels.push(firstDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            data.push(balance);
        } else {
             // If no transactions, show a flat line with current balance
             const today = new Date();
             const yesterday = new Date(today);
             yesterday.setDate(today.getDate() - 1);
             labels.push(yesterday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
             labels.push(today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
             data.push(currentBalance);
             data.push(currentBalance);
        }

        // Process each transaction to create data points
        sortedTransactions.forEach(tx => {
            balance += tx.amountPi;
            labels.push(new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            data.push(balance);
        });

        return { labels, data };
    }, [transactions, currentBalance]);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: chartData.labels,
                        datasets: [{
                            label: 'Pi Balance',
                            data: chartData.data,
                            fill: true,
                            backgroundColor: 'rgba(167, 139, 250, 0.2)',
                            borderColor: 'rgba(167, 139, 250, 1)',
                            pointBackgroundColor: 'rgba(167, 139, 250, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(167, 139, 250, 1)',
                            tension: 0.3,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                                callbacks: {
                                    label: function(context: any) {
                                        return `Balance: ${context.parsed.y.toFixed(4)} Pi`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                    color: '#9CA3AF'
                                }
                            },
                            y: {
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                    color: '#9CA3AF',
                                    callback: function(value: number | string) {
                                        return typeof value === 'number' ? value.toFixed(2) : value;
                                    }
                                }
                            }
                        }
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

    return <canvas ref={chartRef}></canvas>;
};
