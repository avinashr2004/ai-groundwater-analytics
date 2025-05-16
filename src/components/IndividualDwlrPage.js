import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import styled from 'styled-components';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const generateDummyData = () => {
  const alertTypes = [
    'water abnormality',    
    'Low battery level', 
    'Abnormal data', 
    'Core', 
    'Elective'
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const randomValue = Math.floor(Math.random() * 50) + 1;
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - i * 10);

    data.push({
      id: `AL${i + 1}`,
      type: randomType,
      timestamp: timestamp.toISOString().replace("T", " ").substring(0, 19),
      value: randomValue,
    });
  }
  return data;
};

const alarmData = generateDummyData();

const getCityCoordinates = (city) => {
  const coordinates = {
    'bangalore': { lat: 12.9716, lng: 77.5946 },
    'mumbai': { lat: 19.0760, lng: 72.8777 },
    'delhi': { lat: 28.6139, lng: 77.2090 },
    'chennai': { lat: 13.0827, lng: 80.2707 },
    'hyderabad': { lat: 17.3850, lng: 78.4867 },
    'kolkata': { lat: 22.5726, lng: 88.3639 }
  };

  const baseCoords = coordinates[city.toLowerCase()] || { lat: 20.5937, lng: 78.9629 };
  return {
    lat: baseCoords.lat + (Math.random() - 0.5) * 0.1,
    lng: baseCoords.lng + (Math.random() - 0.5) * 0.1
  };
};

const DashboardContainer = styled.div`
  padding: 2rem;
  background: #f6f8fa;
  min-height: 100vh;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;

  h2 {
    margin: 0;
    font-size: 2rem;
    font-weight: 600;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const MapCard = styled(Card)`
  margin-top: 2rem;
`;

const MapContainer = styled.div`
  height: 300px;
  width: 100%;
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e1e4e8;
`;

const LocationInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 1rem 0;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  span {
    font-size: 0.9rem;
    color: #6c757d;
  }

  strong {
    color: #2a5298;
  }
`;

const MapButton = styled.a`
  display: inline-block;
  background: #2a5298;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  margin-left: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background: #1e3c72;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e4e8;
  border-radius: 8px;
  font-size: 1rem;
  margin: 1rem 0;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    border-color: #2a5298;
    outline: none;
  }
`;

const ChartSelect = styled(Select)`
  max-width: 200px;
  margin-bottom: 1rem;
`;

const AlarmList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
`;

const AlarmItem = styled.li`
  padding: 1rem;
  border-bottom: 1px solid #e1e4e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f6f8fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

// Add after other styled components
const TimeFilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TimeFilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #2a5298;
  border-radius: 6px;
  background: ${props => props.active ? '#2a5298' : 'white'};
  color: ${props => props.active ? 'white' : '#2a5298'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #2a5298;
    color: white;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const HourlyDataSection = styled(Card)`
  margin-top: 2rem;
`;

const HourlyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  
  th, td {
    padding: 0.75rem;
    text-align: center;
    border-bottom: 1px solid #e1e4e8;
  }

  th {
    background-color: #f8f9fa;
    color: #2a5298;
    font-weight: 600;
  }

  tr:hover td {
    background-color: #f6f8fa;
  }
`;
const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: center;

  h4 {
    margin: 0;
    color: #6c757d;
    font-size: 0.875rem;
  }

  p {
    margin: 0.5rem 0 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #2a5298;
  }
`;

function IndividualDwlrPage() {
  const { city, dwlrId } = useParams();
  const [selectedType, setSelectedType] = useState('water abnormality');
  const [chartType, setChartType] = useState('line');
  const [mapCenter] = useState(getCityCoordinates(city));
  const alarmTypes = [...new Set(alarmData.map(alarm => alarm.type))];
  const filteredAlarms = alarmData.filter(alarm => alarm.type === selectedType);

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    styles: [
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
      }
    ]
  };

  // Add this function after the generateDummyData function
const generateHourlyData = () => {
  const baseValue = 25 + Math.random() * 5; // Base water level between 25-30 meters
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return hours.map(hour => {
    // Add small random variations (±0.5m) to the base value
    const variation = (Math.random() - 0.5) * 0.5;
    return {
      hour: hour,
      waterLevel: (baseValue + variation).toFixed(2),
      temperature: (20 + Math.random() * 5).toFixed(1),
      conductivity: (Math.random() * 100 + 400).toFixed(0)
    };
  });
};

// Inside the IndividualDwlrPage component, add this state
// Add this line near the other useState declarations
// const [hourlyData] = useState(generateHourlyData());

  const chartData = {
    labels: filteredAlarms.map(alarm => alarm.timestamp),
    datasets: [{
      label: `${selectedType} Alerts`,
      data: filteredAlarms.map(alarm => alarm.value),
      borderColor: '#2a5298',
      backgroundColor: chartType === 'pie' 
        ? [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
          ] 
        : 'rgba(42, 82, 152, 0.1)',
      fill: true,
      tension: 0.4,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Alert Trends'
      }
    },
    scales: chartType === 'pie' ? undefined : {
      y: {
        beginAtZero: true
      }
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      default:
        return <Line data={chartData} options={chartOptions} />;
    }
  };
  
  // Replace the existing generateHourlyData function
const generateTimeData = (days) => {
  const data = [];
  const baseValue = 25 + Math.random() * 5;
  
  for (let d = 0; d < days; d++) {
    for (let h = 0; h < 24; h++) {
      const date = new Date();
      date.setDate(date.getDate() - d);
      date.setHours(h);
      
      // Create smoother transitions between hours
      const timeBasedVariation = Math.sin(h / 24 * Math.PI) * 0.3;
      const randomVariation = (Math.random() - 0.5) * 0.2;
      
      data.push({
        timestamp: date,
        hour: h,
        day: date.getDate(),
        waterLevel: (baseValue + timeBasedVariation + randomVariation).toFixed(2),
        temperature: (20 + Math.sin(h / 24 * Math.PI) * 2 + Math.random()).toFixed(1),
        conductivity: (450 + Math.sin(h / 24 * Math.PI) * 50 + Math.random() * 20).toFixed(0)
      });
    }
  }
  
  return data.sort((a, b) => b.timestamp - a.timestamp);
};

// Add inside the IndividualDwlrPage component, near other state declarations
const [timeFilter, setTimeFilter] = useState('day');
const [timeData] = useState(generateTimeData(31)); // Generate a month of data

// Add this function inside the IndividualDwlrPage component
const getFilteredData = () => {
  const now = new Date();
  switch (timeFilter) {
    case 'month':
      return timeData;
    case 'week':
      return timeData.filter(reading => {
        const diff = (now - reading.timestamp) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      });
    case 'day':
      return timeData.filter(reading => {
        const diff = (now - reading.timestamp) / (1000 * 60 * 60 * 24);
        return diff <= 1;
      });
    default:
      return timeData;
  }
};

// Inside the IndividualDwlrPage component, add this state
// Add this line near the other useState declarations
const [hourlyData] = useState(generateHourlyData());

  return (
    <DashboardContainer>
      <Header>
        <h2>{city} - {dwlrId} Dashboard</h2>
      </Header>

      <Stats>
        <StatCard>
          <h4>Total Alarms</h4>
          <p>{alarmData.length}</p>
        </StatCard>
        <StatCard>
          <h4>{selectedType} Alarms</h4>
          <p>{filteredAlarms.length}</p>
        </StatCard>
        <StatCard>
          <h4>Alert Types</h4>
          <p>{alarmTypes.length}</p>
        </StatCard>
        <StatCard>
          <h4>Location</h4>
          <p>{city}</p>
        </StatCard>
      </Stats>

      <Grid>
        <div>
          <Card>
            <h3>Filter Alarms</h3>
            <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              {alarmTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </Select>
            <AlarmList>
              {filteredAlarms.map((alarm, index) => (
                <AlarmItem key={index}>
                  <span>ID: {alarm.id}</span>
                  <span>{alarm.timestamp}</span>
                </AlarmItem>
              ))}
            </AlarmList>
          </Card>
          <MapCard>
            <h3>DWLR Location</h3>
            <LocationInfo>
              <div>
                <span>Coordinates:</span>
                <strong>{mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}</strong>
              </div>
              <MapButton 
                href={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                See in Google Maps
              </MapButton>
            </LocationInfo>
            <LoadScript googleMapsApiKey="AIzaSyD_QrXlONgqwk64krIiuSHnYFdUTkM19ms">
              <MapContainer>
                <GoogleMap
                  mapContainerStyle={{ height: "100%", width: "100%" }}
                  center={mapCenter}
                  zoom={13}
                  options={mapOptions}
                >
                  <Marker
                    position={mapCenter}
                    title={`DWLR ${dwlrId}`}
                  />
                </GoogleMap>
              </MapContainer>
            </LoadScript>
          </MapCard>
        </div>
        <Card>
          <ChartSelect value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </ChartSelect>
          {renderChart()}
        </Card>
      </Grid>
      
      // Replace the existing HourlyDataSection JSX
<HourlyDataSection>
  <h3>Historical Readings</h3>
  <TimeFilterContainer>
    <TimeFilterButton 
      active={timeFilter === 'day'} 
      onClick={() => setTimeFilter('day')}
    >
      24 Hours
    </TimeFilterButton>
    <TimeFilterButton 
      active={timeFilter === 'week'} 
      onClick={() => setTimeFilter('week')}
    >
      Week
    </TimeFilterButton>
    <TimeFilterButton 
      active={timeFilter === 'month'} 
      onClick={() => setTimeFilter('month')}
    >
      Month
    </TimeFilterButton>
  </TimeFilterContainer>
  <HourlyTable>
    <thead>
      <tr>
        <th>Date</th>
        <th>Time</th>
        <th>Water Level (m)</th>
        <th>Temperature (°C)</th>
        <th>Conductivity (µS/cm)</th>
      </tr>
    </thead>
    <tbody>
      {getFilteredData().map((reading) => (
        <tr key={`${reading.timestamp}`}>
          <td>{reading.timestamp.toLocaleDateString()}</td>
          <td>{reading.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
          <td>{reading.waterLevel}</td>
          <td>{reading.temperature}</td>
          <td>{reading.conductivity}</td>
        </tr>
      ))}
    </tbody>
  </HourlyTable>
</HourlyDataSection>
    </DashboardContainer>
  );
}

export default IndividualDwlrPage;