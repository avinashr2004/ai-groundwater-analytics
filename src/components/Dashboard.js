import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBell, FaUsers, FaChartLine } from 'react-icons/fa';
import left from "../assets/left.jpg";
import right from "../assets/right.jpg";

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
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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
  width: 100%;  // Ensures the image takes up the full container width
  height: 100%; // Ensures the image takes up the full container height
  object-fit: cover; // Adjust the image to cover the container without stretching
  object-position: center; // Center the image if it's larger than the container
`;

const Dashboard = () => {
    const navigate = useNavigate();
    const [animatedStats, setAnimatedStats] = useState([]);

    const stats = [
        { 
            title: 'Total DWLRs', 
            count: 4052, 
            color: '#3b82f6', 
            navigateTo: '/dwlr',
            icon: <FaMapMarkerAlt />
        },
        { 
            title: 'Active Alarms', 
            count: 220, 
            color: '#ef4444', 
            navigateTo: '/alarms',
            icon: <FaBell />
        },
        { 
            title: 'Registered Vendors', 
            count: 400, 
            color: '#22c55e', 
            navigateTo: '/vendors',
            icon: <FaUsers />
        }
    ];

    useEffect(() => {
        // Animate stats on mount
        const timer = setTimeout(() => {
            setAnimatedStats(stats);
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
            </MainContent>
        </DashboardContainer>
    );
};


export default Dashboard;