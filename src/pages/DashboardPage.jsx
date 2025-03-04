import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import apiService from '../services/statsService';

const DashboardPage = () => {
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                await apiService.getDashboard();
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <>
            <Navbar />
            <Dashboard />
        </>
    );
};

export default DashboardPage;