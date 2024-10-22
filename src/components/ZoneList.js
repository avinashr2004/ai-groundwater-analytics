import React from 'react';
import './ZoneList.css';

const zones = ['Chennai', 'Delhi', 'Calcutta', 'Mumbai', 'Bangalore', 'Hyderabad', 'Bhopal'];

const ZoneList = ({ onZoneClick, selectedZone }) => {
    return (
        <div className="zone-list-container">
            <div className="zone-header">
                <h3>ZONES</h3>
                <i className="search-icon">🔍</i>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Area</th>
                        <th>No. of alerts</th>
                    </tr>
                </thead>
                <tbody>
                    {zones.map((zone) => (
                        <tr
                            key={zone}
                            className={selectedZone === zone ? 'selected' : ''}
                            onClick={() => onZoneClick(zone)}
                        >
                            <td>{zone}</td>
                            <td>8</td> {/* Replace '8' with dynamic data if needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ZoneList;
