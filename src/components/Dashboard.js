import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Header';
import StatsCard from './StatsCard';
import MapDisplay from './MapDisplay';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const handleCardClick = (navigateTo) => {
        if (navigateTo) {
            navigate(navigateTo); // Programmatically navigate to the route if provided
        }
    };

    const stats = [
        { title: 'No of DWLRs', count: 4052, color: '#3498db', navigateTo: '/dwlr' }, // Add navigateTo here
        { title: 'Alarms Raised', count: 220, color: '#e74c3c', navigateTo: '/alarms' },
        { title: 'Vendors', count: 400, color: '#2ecc71', navigateTo: '/vendors' },
        { title: 'Officers', count: 52, color: '#8e44ad' },
    ];

    return (
        <div className="dashboard">
            <Header />
            <div className="stats">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        title={stat.title}
                        count={stat.count}
                        color={stat.color}
                        onClick={() => handleCardClick(stat.navigateTo)} // Pass the click handler to StatsCard
                    />
                ))}
            </div>
            <div className="maps">
                <MapDisplay title="Ground Water Levels Across India" />
                <MapDisplay title="DWLR Coverage Across India" />
            </div>
        </div>
    );
};

export default Dashboard;