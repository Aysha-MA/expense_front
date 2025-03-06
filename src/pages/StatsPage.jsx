import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import statsService from '../services/statsService';
import expenseService from '../services/expenseService';
import incomeService from '../services/incomeService';
import ChartComponent from '../components/Common/ChartComponent';
import { subDays, format } from 'date-fns';

const StatsPage = () => {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [balance, setBalance] = useState(0);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Get user ID from local storage
        const endDate = new Date();
        const startDate = subDays(endDate, 30);

        const fetchStats = async () => {
            try {
                const statsResponse = await statsService.getStats(userId);
                console.log('Stats response:', statsResponse.data);

                setTotalIncome(statsResponse.data.totalIncome);
                setTotalExpense(statsResponse.data.totalExpense);
                setBalance(statsResponse.data.balance);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        const fetchChartData = async () => {
            try {
                const expenseResponse = await expenseService.getExpensesByDateRange(userId, format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd'));
                const incomeResponse = await incomeService.getIncomesByDateRange(userId, format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd'));
                console.log('Expense List response:', expenseResponse.data);
                console.log('Income List response:', incomeResponse.data);

                const expenseList = expenseResponse.data || [];
                const incomeList = incomeResponse.data || [];

                const processedData = {};

                expenseList.forEach(expense => {
                    const date = expense.date.split('T')[0];
                    if (!processedData[date]) {
                        processedData[date] = { income: 0, expense: 0 };
                    }
                    processedData[date].expense += expense.amount;
                });

                incomeList.forEach(income => {
                    const date = income.date.split('T')[0];
                    if (!processedData[date]) {
                        processedData[date] = { income: 0, expense: 0 };
                    }
                    processedData[date].income += income.amount;
                });

                const labels = Object.keys(processedData).sort();
                const incomeData = labels.map(date => processedData[date].income);
                const expenseData = labels.map(date => processedData[date].expense);

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