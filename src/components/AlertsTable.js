import React from 'react';
import './AlertsTable.css';

function Alerts() {
  const zones = ['Chennai', 'Delhi', 'Calcutta', 'Mumbai', 'Bangalore', 'Hyderabad', 'Bhopal'];
  const alertData = [
    { id: '1043', date: '27-09-2024 02:34:08 pm', vendor: '134id', type: 'water abnormality' },
    { id: '1695', date: '27-09-2024 02:34:08 pm', vendor: '134id', type: 'Low battery level' },
    { id: '7865', date: '27-09-2024 02:34:08 pm', vendor: '134id', type: 'Abnormal data' },
    { id: '1695', date: '27-09-2024 02:34:08 pm', vendor: '134id', type: 'Core' },
    { id: '2047', date: '27-09-2024 02:34:08 pm', vendor: '134id', type: 'Elective' },
  ];

  

  return (
    <div className="alerts-container">
      <div className="zones-section">
        <div className="zones-header">
          <h3>ZONES</h3>
          <div className="icons">
            <input type="text" className="search-bar" placeholder="Search..." />
            <i className="search-icon">🔍</i> {/* Updated icon */}
          </div>
        </div>
        <div className="zones-list">
          <div className="zones-list-header">
            <span>Area</span>
            <span>No. of alerts</span>
          </div>
          {zones.map((zone, index) => (
            <div key={index} className="zone-item">
              <span className="zone-name">{zone}</span>
              <span className="alert-count">8</span>
            </div>
          ))}
        </div>
      </div>
      <div className="zone-details-section">
        <div className="zone-details-header">
          <h3>ZONE1</h3>
          <div className="icons">
            <input type="text" className="search-bar" placeholder="Search..." />
            <i className="search-icon">🔍</i>
          </div>
        </div>
        <div className="zone-details-list">
          <div className="zone-details-list-header">
            <span>DWLR id</span>
            <span>Time and date</span>
            <span>Vendor id</span>
            <span>Type</span>
          </div>
          {alertData.map((item, index) => (
            <div key={index} className="detail-item">
              <span className="dwlr-id">{item.id}</span>
              <span className="time-date">{item.date}</span>
              <span className="vendor-id">{item.vendor}</span>
              <span className={`alert-type ${item.type.toLowerCase().replace(/ /g, '-')}`}>{item.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Alerts;
