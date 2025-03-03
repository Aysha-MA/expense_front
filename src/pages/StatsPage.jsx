import React, { useState, useEffect } from 'react';
import ChartComponent from '../components/Common/ChartComponent';
import Navbar from '../components/Navbar';
import statsService from '../services/statsService';

const StatsPage = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Get user ID from local storage

        const fetchStats = async () => {
            try {
                const response = await statsService.getStats(userId);
                console.log('Total Income:', response.data.totalIncome);
                console.log('Total Expenses:', response.data.totalExpense);
                console.log('Balance:', response.data.balance);
                setTotalIncome(response.data.totalIncome);
                setTotalExpense(response.data.totalExpense);
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        const fetchChartData = async () => {
            try {
                const response = await statsService.getChartData(userId);
                const expenseList = response.data.expenseList || [];
                const incomeList = response.data.incomeList || [];

                console.log('Expense List:', expenseList);
                console.log('Income List:', incomeList);

                const labels = [...new Set([...expenseList.map(expense => expense.date), ...incomeList.map(income => income.date)])];
                const incomeData = incomeList.map(income => ({ x: income.date, y: income.amount }));
                const expenseData = expenseList.map(expense => ({ x: expense.date, y: expense.amount }));

                console.log('Labels:', labels);
                console.log('Income Data:', incomeData);
                console.log('Expense Data:', expenseData);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Income',
                            data: incomeData,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                        },
                        {
                            label: 'Expense',
                            data: expenseData,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            fill: true,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchStats();
        fetchChartData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>Statistics</h2>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Total Income</h3>
                                <p className="card-text">{totalIncome}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Total Expense</h3>
                                <p className="card-text">{totalExpense}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Balance</h3>
                                <p className="card-text">{balance}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <ChartComponent chartData={chartData} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StatsPage;