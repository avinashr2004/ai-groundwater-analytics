import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, count, color, onClick }) => {
    return (
        <div className="stats-card" style={{ borderColor: color }} onClick={onClick}> {/* Add onClick */}
            <h3>{title}</h3>
            <div className="circular-number" style={{ color: color }}>
                {count}
            </div>
        </div>
    );
};

export default StatsCard;
