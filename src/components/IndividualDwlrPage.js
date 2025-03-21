  import React, { useState } from 'react';
  import { useParams } from 'react-router-dom';
  import { Line } from 'react-chartjs-2';
  import { Chart as ChartJS } from 'chart.js/auto';
  import styled from 'styled-components';

  // ...existing generateDummyData and alarmData code...

  // Generate 100 random alarms (Centralized Data)
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
        const randomValue = Math.floor(Math.random() * 50) + 1; // Random value between 1-50
        const timestamp = new Date();
        timestamp.setMinutes(timestamp.getMinutes() - i * 10); // Decreasing time for sequential order
    
        data.push({
          id: `AL${i + 1}`,
          type: randomType,
          timestamp: timestamp.toISOString().replace("T", " ").substring(0, 19), // Formatting timestamp
          value: randomValue,
        });
      }
    
      return data;
    };
    
    // Centralized Alarm Data (same across all instances)
    const alarmData = generateDummyData();

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

  const Stats = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
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
    const alarmTypes = [...new Set(alarmData.map(alarm => alarm.type))];
    const filteredAlarms = alarmData.filter(alarm => alarm.type === selectedType);

    const alarmChartData = {
      labels: filteredAlarms.map(alarm => alarm.timestamp),
      datasets: [{
        label: `${selectedType} Alerts`,
        data: filteredAlarms.map(alarm => alarm.value),
        borderColor: '#2a5298',
        backgroundColor: 'rgba(42, 82, 152, 0.1)',
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
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

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
        </Stats>

        <Grid>
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
          <Card>
            <Line data={alarmChartData} options={chartOptions} />
          </Card>
        </Grid>
      </DashboardContainer>
    );
  }

  export default IndividualDwlrPage;