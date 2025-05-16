import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header1';

const PageContainer = styled.div`
  background: #f0f2f5;
  min-height: 100vh;
`;

const MainContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const CardHeader = styled.div`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 1.5rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  width: 200px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const ListHeader = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-weight: 600;
  color: #495057;
`;

const ListItem = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
    transform: translateX(4px);
  }

  span {
    color: #495057;
  }
`;

const NoSelection = styled.div`
  padding: 3rem;
  text-align: center;
  color: #6c757d;

  h3 {
    margin: 0;
    font-weight: 500;
  }
`;

const Badge = styled.span`
  background: ${props => props.type === 'primary' ? '#e3f2fd' : '#fff3e0'};
  color: ${props => props.type === 'primary' ? '#1e88e5' : '#f57c00'};
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
`;

function DWLRPage() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRecommendationCity, setSelectedRecommendationCity] = useState(null);
  const [zonesData, setZonesData] = useState([]);
  const [dwlrData, setDwlrData] = useState({});
  const [recommendationZones, setRecommendationZones] = useState([]);
  const [recommendedLocations, setRecommendedLocations] = useState({});
  const [searchZone, setSearchZone] = useState('');

  const cities = [
    "Chennai", "Delhi", "Mumbai", "Kolkata", "Bangalore", "Hyderabad",
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Kanpur",
    "Nagpur", "Visakhapatnam", "Bhopal", "Patna", "Ludhiana", "Agra",
    "Nashik", "Vadodara", "Meerut", "Rajkot", "Varanasi", "Srinagar"
  ];

  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    // Generate zones data
    const generatedZones = cities.map(city => ({
      city,
      count: getRandomNumber(40, 150)
    }));
    setZonesData(generatedZones);

    // Generate DWLR data
    const generatedDwlrData = {};
    cities.forEach(city => {
      const count = generatedZones.find(z => z.city === city).count;
      generatedDwlrData[city] = Array.from({ length: count }, (_, i) => ({
        id: `${city.slice(0, 2).toUpperCase()}${i + 1}`,
        vendor: `Vendor${i + 1}`
      }));
    });
    setDwlrData(generatedDwlrData);

    // Generate recommendation zones
    const generatedRecommendationZones = cities.map(city => ({
      city,
      recommendedCount: getRandomNumber(5, 30)
    }));
    setRecommendationZones(generatedRecommendationZones);

    // Generate recommended locations
    const generatedLocations = {};
    cities.forEach(city => {
      const recCount = generatedRecommendationZones.find(z => z.city === city).recommendedCount;
      generatedLocations[city] = Array.from({ length: recCount }, (_, i) => ({
        id: `${city.slice(0, 2).toUpperCase()}-R${i + 1}`,
        coordinates: `${(Math.random() * (35 - 8) + 8).toFixed(4)}, ${(Math.random() * (95 - 68) + 68).toFixed(4)}`
      }));
    });
    setRecommendedLocations(generatedLocations);
  }, []);

  const handleZoneClick = (city) => {
    setSelectedCity(city);
  };

  const handleDwlrClick = (city, dwlrId) => {
    navigate(`/dwlr/${city}/${dwlrId}`);
  };

  const handleRecommendationZoneClick = (city) => {
    setSelectedRecommendationCity(city);
  };

  const handleSearchChange = (e) => {
    setSearchZone(e.target.value);
  };

  const filteredZones = zonesData.filter(zone =>
    zone.city.toLowerCase().includes(searchZone.toLowerCase())
  );

  return (
    <PageContainer>
      <Header />
      <MainContainer>
        <SectionContainer>
          {/* Zones Section */}
          <Card>
            <CardHeader>
              <h3>ZONES</h3>
              <SearchInput 
                type="text" 
                placeholder="Search zones..." 
                value={searchZone}
                onChange={handleSearchChange}
              />
            </CardHeader>
            <ListHeader>
              <span>Area</span>
              <span>No. of DWLRs</span>
            </ListHeader>
            {filteredZones.map((zone, index) => (
              <ListItem key={zone.city} onClick={() => handleZoneClick(zone.city)}>
                <span>{zone.city}</span>
                <Badge type="primary">{zone.count}</Badge>
              </ListItem>
            ))}
          </Card>

          {/* DWLR Details Section */}
          <Card>
            {selectedCity ? (
              <>
                <CardHeader>
                  <h3>{selectedCity} DWLRs</h3>
                </CardHeader>
                <ListHeader>
                  <span>DWLR ID</span>
                  <span>Vendor ID</span>
                </ListHeader>
                {dwlrData[selectedCity]?.map((item, index) => (
                  <ListItem 
                    key={`${selectedCity}-${item.id}`}
                    onClick={() => handleDwlrClick(selectedCity, item.id)}
                  >
                    <span>{item.id}</span>
                    <span>{item.vendor}</span>
                  </ListItem>
                ))}
              </>
            ) : (
              <NoSelection>
                <h3>Please select a city to view DWLR details</h3>
              </NoSelection>
            )}
          </Card>
        </SectionContainer>

        {/* Recommendation Section */}
        <SectionContainer>
          <Card>
            <CardHeader>
              <h3>Recommended Zones</h3>
            </CardHeader>
            <ListHeader>
              <span>Area</span>
              <span>Recommended</span>
            </ListHeader>
            {recommendationZones.map((zone, index) => (
              <ListItem
                key={`rec-${zone.city}`}
                onClick={() => handleRecommendationZoneClick(zone.city)}
              >
                <span>{zone.city}</span>
                <Badge type="secondary">{zone.recommendedCount}</Badge>
              </ListItem>
            ))}
          </Card>

          <Card>
            {selectedRecommendationCity ? (
              <>
                <CardHeader>
                  <h3>{selectedRecommendationCity} Locations</h3>
                </CardHeader>
                <ListHeader>
                  <span>ID</span>
                  <span>Coordinates</span>
                </ListHeader>
                {recommendedLocations[selectedRecommendationCity]?.map((location, index) => (
                  <ListItem key={`${selectedRecommendationCity}-${location.id}`}>
                    <span>{location.id}</span>
                    <span>{location.coordinates}</span>
                  </ListItem>
                ))}
              </>
            ) : (
              <NoSelection>
                <h3>Please select a zone to view recommended locations</h3>
              </NoSelection>
            )}
          </Card>
        </SectionContainer>
      </MainContainer>
    </PageContainer>
  );
}

export default DWLRPage;