import React, { useState } from 'react';
import Header from './Header1';
import { FiSearch } from 'react-icons/fi';
//ok
const styles = {
  alertsContainer: {
    padding: '2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '2rem',
    background: '#f0f2f5',
    minHeight: 'calc(100vh - 64px)',
  },
  section: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
  },
  header: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid #e2e8f0',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'relative',
    width: '240px',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem 0.75rem 2.5rem',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '0.875rem',
    outline: 'none',
  },
  searchIcon: {
    position: 'absolute',
    left: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  listHeader: {
    padding: '1rem 1.5rem',
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem',
    fontWeight: 600,
    color: '#64748b',
  },
  listItem: {
    padding: '1rem 1.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem',
    borderBottom: '1px solid #e2e8f0',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
  },
  alertType: {
    padding: '0.25rem 0.75rem',
    borderRadius: '16px',
    fontSize: '0.875rem',
    fontWeight: 500,
    textAlign: 'center',
    width: 'fit-content',
  }
};

const getAlertTypeStyle = (type) => {
  const types = {
    'Water Abnormality': { background: '#e3f2fd', color: '#1e88e5' },
    'Low Battery Level': { background: '#fff3e0', color: '#f57c00' },
    'Abnormal Data': { background: '#fce4ec', color: '#e91e63' },
    'Core Malfunction': { background: '#ffebee', color: '#d32f2f' },
    'System Error': { background: '#f3e5f5', color: '#8e24aa' }
  };
  return types[type] || { background: '#f5f5f5', color: '#9e9e9e' };
};

function Alerts() {
  const [selectedZone, setSelectedZone] = useState(null);
  const [searchZone, setSearchZone] = useState('');
  const [searchAlert, setSearchAlert] = useState('');

  const zones = [
    { name: 'Chennai', alertCount: 12, dwlrCount: 45 },
    { name: 'Delhi', alertCount: 8, dwlrCount: 38 },
    { name: 'Mumbai', alertCount: 15, dwlrCount: 52 },
    { name: 'Kolkata', alertCount: 6, dwlrCount: 31 },
    { name: 'Bangalore', alertCount: 9, dwlrCount: 43 },
    { name: 'Hyderabad', alertCount: 11, dwlrCount: 37 },
    { name: 'Pune', alertCount: 7, dwlrCount: 29 }
  ];
  
  const alertTypes = [
    'Water Abnormality',
    'Low Battery Level',
    'Abnormal Data',
    'Core Malfunction',
    'System Error',
    'Sensor Failure',
    'Temperature Spike'
  ];
  
  const severityLevels = ['low', 'medium', 'high', 'critical'];
  const statusOptions = ['active', 'resolved', 'investigating'];
  
  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function getRandomDate() {
    const start = new Date(2024, 2, 1); // March 1, 2024
    const end = new Date(2024, 2, 21); // March 21, 2024
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().replace('T', ' ').substring(0, 19);
  }
  
  let alertIdCounter = 1000;
  
  const generateAlertData = () => {
    const alertData = [];
  
    zones.forEach(zone => {
      for (let i = 0; i < 100; i++) {
        const id = `AL${alertIdCounter++}`;
        const date = getRandomDate();
        const vendor = `VEN${Math.floor(100 + Math.random() * 100)}`; // VEN100 - VEN199
        const dwlrId = `DW${Math.floor(100 + Math.random() * 900)}`;  // DW100 - DW999
        const type = getRandomItem(alertTypes);
        const severity = getRandomItem(severityLevels);
        const status = getRandomItem(statusOptions);
  
        alertData.push({
          id,
          date,
          vendor,
          dwlrId,
          type,
          severity,
          status,
          zone: zone.name
        });
      }
    });
  
    return alertData;
  };
  
  const alertData = generateAlertData();
  

  const handleZoneClick = (zoneName) => {
    setSelectedZone(zoneName === selectedZone ? null : zoneName);
  };

  const handleZoneSearch = (e) => {
    setSearchZone(e.target.value);
  };

  const handleAlertSearch = (e) => {
    setSearchAlert(e.target.value);
  };

  const filteredZones = zones.filter(zone => 
    zone.name.toLowerCase().includes(searchZone.toLowerCase())
  );

  const filteredAlerts = selectedZone 
    ? alertData.filter(alert => 
        alert.zone === selectedZone &&
        (alert.id.toLowerCase().includes(searchAlert.toLowerCase()) ||
         alert.type.toLowerCase().includes(searchAlert.toLowerCase()) ||
         alert.dwlrId.toLowerCase().includes(searchAlert.toLowerCase()))
      )
    : alertData.filter(alert =>
        alert.id.toLowerCase().includes(searchAlert.toLowerCase()) ||
        alert.type.toLowerCase().includes(searchAlert.toLowerCase()) ||
        alert.dwlrId.toLowerCase().includes(searchAlert.toLowerCase())
      );

  return (
    <div>
      <Header />
      <div style={styles.alertsContainer}>
        <div style={styles.section}>
          <div style={styles.header}>
            <h3 style={{ margin: 0 }}>ZONES</h3>
            <div style={styles.searchContainer}>
              <FiSearch style={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search zones..." 
                style={styles.searchInput}
                value={searchZone}
                onChange={handleZoneSearch}
              />
            </div>
          </div>
          <div style={styles.listHeader}>
            <span>Area</span>
            <span>Active Alerts</span>
          </div>
          {filteredZones.map((zone, index) => (
            <div 
              key={zone.name} 
              onClick={() => handleZoneClick(zone.name)}
              style={{
                ...styles.listItem,
                backgroundColor: selectedZone === zone.name 
                  ? '#e2e8f0' 
                  : index % 2 === 0 ? '#fff' : '#f8fafc',
                cursor: 'pointer'
              }}
            >
              <span>{zone.name}</span>
              <span style={{ 
                color: zone.alertCount > 10 ? '#ef4444' : '#2a5298', 
                fontWeight: 500 
              }}>
                {zone.alertCount}
              </span>
            </div>
          ))}
        </div>

        <div style={styles.section}>
          <div style={styles.header}>
            <h3 style={{ margin: 0 }}>
              {selectedZone ? `ALERTS - ${selectedZone}` : 'ALL ALERTS'}
            </h3>
            <div style={styles.searchContainer}>
              <FiSearch style={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search alerts..." 
                style={styles.searchInput}
                value={searchAlert}
                onChange={handleAlertSearch}
              />
            </div>
          </div>
          <div style={{
            ...styles.listHeader,
            gridTemplateColumns: 'repeat(5, 1fr)'
          }}>
            <span>Alert ID</span>
            <span>Time and Date</span>
            <span>DWLR ID</span>
            <span>Vendor ID</span>
            <span>Type</span>
          </div>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((item) => (
              <div 
                key={item.id} 
                style={{
                  ...styles.listItem,
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  backgroundColor: item.severity === 'critical' ? '#fff1f2' : 'transparent'
                }}
              >
                <span>{item.id}</span>
                <span>{new Date(item.date).toLocaleString()}</span>
                <span>{item.dwlrId}</span>
                <span>{item.vendor}</span>
                <span>
                  <div 
                    style={{
                      ...styles.alertType,
                      ...getAlertTypeStyle(item.type)
                    }}
                  >
                    {item.type}
                  </div>
                </span>
              </div>
            ))
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              No alerts found for this zone
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerts;