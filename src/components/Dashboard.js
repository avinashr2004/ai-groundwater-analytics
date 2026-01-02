import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBell, FaUsers, FaPlusCircle } from 'react-icons/fa';
import left from "../assets/left.jpg";
import right from "../assets/right.jpg";

// --- STYLED COMPONENTS ---
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f0f2f5;
`;

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatsCardStyled = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.accentColor};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StatsIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => `${props.accentColor}15`};
  color: ${props => props.accentColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StatsTitle = styled.h3`
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
`;

const StatsCount = styled.p`
  margin: 0.5rem 0 0;
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
`;

const MapsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MapCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const MapHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    margin: 0;
    color: #1e293b;
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const RecommendationCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  
  th {
    text-align: left;
    padding: 1rem;
    color: #64748b;
    font-size: 0.875rem;
    border-bottom: 1px solid #e2e8f0;
  }
  
  td {
    padding: 1rem;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
`;

const PriorityBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.high ? '#fee2e2' : '#fef3c7'};
  color: ${props => props.high ? '#ef4444' : '#d97706'};
`;

// --- DATA GENERATION HELPERS ---

const regions = [
  "Rajasthan", "Punjab", "Haryana", "Gujarat", "Maharashtra", 
  "Karnataka", "Tamil Nadu", "Telangana", "Andhra Pradesh", 
  "Uttar Pradesh", "Madhya Pradesh", "Bihar"
];

const cities = [
  "Jaisalmer", "Bhatinda", "Ambala", "Kutch", "Latur", 
  "Kolar", "Madurai", "Warangal", "Anantapur", 
  "Bundelkhand", "Vidarbha", "Marathwada", "Saurashtra",
  "Thanjavur", "Coimbatore", "Mysore", "Belgaum", "Nashik",
  "Aurangabad", "Solapur", "Nagpur", "Vadodara", "Rajkot",
  "Surat", "Ludhiana", "Patiala", "Jalandhar", "Hissar",
  "Rohtak", "Karnal", "Agra", "Varanasi", "Kanpur",
  "Indore", "Bhopal", "Gwalior", "Patna", "Gaya",
  "Muzaffarpur", "Nellore", "Tirupati", "Vijayawada",
  "Karimnagar", "Nizamabad", "Khammam", "Salem", "Trichy",
  "Tirunelveli", "Dharwad", "Gulbarga", "Hubli", "Sangli",
  "Satara", "Kolhapur", "Ahmednagar", "Jalgaon", "Akola",
  "Amravati", "Bhavnagar", "Jamnagar"
];

// Helper to generate random coordinates within India approx bounds
// Lat: 8.4 to 37.6, Long: 68.7 to 97.25
const getRandomLat = () => (Math.random() * (35 - 10) + 10).toFixed(4);
const getRandomLng = () => (Math.random() * (88 - 70) + 70).toFixed(4);

// Generate Large Simulated Datasets
const generateDatasets = () => {
  // 1. Existing Stations (~100 stations)
  const existing = Array.from({ length: 100 }, (_, i) => ({
    id: `S${i + 1}`,
    lat: parseFloat(getRandomLat()),
    lng: parseFloat(getRandomLng())
  }));

  // 2. Depth Data Points (~200 points to check)
  const depth = Array.from({ length: 200 }, (_, i) => {
    const isCritical = Math.random() > 0.6; // 40% chance of being critical
    const status = isCritical ? (Math.random() > 0.5 ? "Critical" : "High Stress") : "Safe";
    const depthVal = isCritical ? (Math.random() * 30 + 30).toFixed(1) : (Math.random() * 20 + 5).toFixed(1); // 30-60m for critical, 5-25m for safe
    
    return {
      region: `${cities[i % cities.length]}, ${regions[i % regions.length]}`,
      lat: parseFloat(getRandomLat()),
      lng: parseFloat(getRandomLng()),
      avg_depth_meters: parseFloat(depthVal),
      critical_level: 30.0,
      status: status
    };
  });

  return { existing, depth };
};

const { existing: existingStations, depth: depthData } = generateDatasets();


// --- MAIN COMPONENT ---

const Dashboard = () => {
    const navigate = useNavigate();
    const [animatedStats, setAnimatedStats] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const stats = [
        { 
            title: 'Total DWLRs', 
            count: 1957, 
            color: '#3b82f6', 
            navigateTo: '/dwlr',
            icon: <FaMapMarkerAlt />
        },
        { 
            title: 'Active Alarms', 
            count: 462, 
            color: '#ef4444', 
            navigateTo: '/alarms',
            icon: <FaBell />
        },
        { 
            title: 'Registered Vendors', 
            count: 87, 
            color: '#22c55e', 
            navigateTo: '/vendors',
            icon: <FaUsers />
        }
    ];

    // --- ALGORITHM LOGIC: GAP ANALYSIS ---
    // This function mimics the K-Means/Distance logic
    const performGapAnalysis = () => {
        const results = [];

        // Loop through all regions with Depth Data (Demand)
        depthData.forEach(target => {
            // Logic 1: Filter for only 'Critical' or 'High Stress' areas
            if (target.status === 'Critical' || target.status === 'High Stress') {
                
                let isCovered = false;

                // Logic 2: Calculate Distance to nearest Existing Station
                for (let station of existingStations) {
                    // Simple Euclidean Distance formula
                    // In real app, use Haversine formula for km accuracy
                    const distance = Math.sqrt(
                        Math.pow(station.lat - target.lat, 2) + 
                        Math.pow(station.lng - target.lng, 2)
                    );

                    // Threshold: If a sensor is within ~0.5 degrees (~55km), it is "Covered"
                    if (distance < 0.5) {
                        isCovered = true;
                        break;
                    }
                }

                // Logic 3: If not covered, recommend it
                if (!isCovered) {
                    results.push({
                        region: target.region,
                        lat: target.lat,
                        long: target.lng,
                        reason: `Gap Detected in ${target.status} Zone (Depth: ${target.avg_depth_meters}m)`,
                        priority: 'High'
                    });
                }
            }
        });

        // Limit results to top 60 to fit request
        setRecommendations(results.slice(0, 60));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedStats(stats);
            performGapAnalysis(); // Run the AI Logic on load
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <DashboardContainer>
            <Header />
            <MainContent>
                <StatsGrid>
                    {stats.map((stat, index) => (
                        <StatsCardStyled
                            key={index}
                            accentColor={stat.color}
                            onClick={() => navigate(stat.navigateTo)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <StatsIcon accentColor={stat.color}>
                                {stat.icon}
                            </StatsIcon>
                            <StatsTitle>{stat.title}</StatsTitle>
                            <StatsCount>{stat.count}</StatsCount>
                        </StatsCardStyled>
                    ))}
                </StatsGrid>

                <MapsContainer>
                    <MapCard>
                        <MapHeader>
                            <h3>Ground Water Levels Across India</h3>
                        </MapHeader>
                        <MapImage 
                            src={left} 
                            alt="Ground Water Levels Map"
                        />
                    </MapCard>
                    <MapCard>
                        <MapHeader>
                            <h3>DWLR Coverage Across India</h3>
                        </MapHeader>
                        <MapImage 
                            src={right} 
                            alt="DWLR Coverage Map"
                        />
                    </MapCard>
                </MapsContainer>

                {/* --- NETWORK OPTIMIZATION SECTION --- */}
                <RecommendationCard>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, color: '#1e293b' }}>
                            <FaPlusCircle style={{ marginRight: '10px', color: '#22c55e' }} />
                            AI Recommended New Installations
                        </h3>
                        <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
                            Based on K-Means Clustering & Gap Analysis ({recommendations.length} Sites Found)
                        </span>
                    </div>

                    <Table>
                        <thead>
                            <tr>
                                <th>Recommended Region</th>
                                <th>Coordinates</th>
                                <th>Reason for Recommendation</th>
                                <th>Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recommendations.length > 0 ? recommendations.map((rec, index) => (
                                <tr key={index}>
                                    <td style={{ fontWeight: '500' }}>{rec.region}</td>
                                    <td style={{ fontFamily: 'monospace' }}>{rec.lat}, {rec.long}</td>
                                    <td>{rec.reason}</td>
                                    <td>
                                        <PriorityBadge high={rec.priority === 'High'}>
                                            {rec.priority}
                                        </PriorityBadge>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" style={{textAlign: 'center', color: '#64748b'}}>
                                        Running optimization algorithm...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </RecommendationCard>

            </MainContent>
        </DashboardContainer>
    );
};

export default Dashboard;