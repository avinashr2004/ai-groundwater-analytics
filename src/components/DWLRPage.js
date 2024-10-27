import React, { useState } from 'react';
import './DWLRPage.css';
import Header from './Header1';

function DWLRPage() {
  const zones = [
    { city: 'Chennai', count: 100 },
    { city: 'Delhi', count: 85 },
    { city: 'Mumbai', count: 90 },
    { city: 'Kolkata', count: 75 },
    { city: 'Bangalore', count: 60 },
    { city: 'Hyderabad', count: 80 },
    { city: 'Pune', count: 50 },
    { city: 'Ahmedabad', count: 45 },
    { city: 'Jaipur', count: 55 },
    { city: 'Lucknow', count: 70 },
    // Add more cities as needed
  ];

  const dwlrData = {
    'Chennai': Array.from({ length: 100 }, (_, i) => ({
      id: `CH${i + 1}`,
      date: `27-09-2024 02:${i % 60}:0${i % 10} pm`,
      vendor: `Vendor${i + 1}`,
      type: i % 2 === 0 ? 'Water abnormality' : 'Low battery level',
    })),
    'Delhi': Array.from({ length: 85 }, (_, i) => ({
      id: `DL${i + 1}`,
      date: `25-09-2024 12:${i % 60}:0${i % 10} pm`,
      vendor: `Vendor${i + 1}`,
      type: i % 2 === 0 ? 'Abnormal data' : 'Core',
    })),
    'Mumbai': Array.from({ length: 90 }, (_, i) => ({
      id: `MU${i + 1}`,
      date: `24-09-2024 11:${i % 60}:0${i % 10} am`,
      vendor: `Vendor${i + 1}`,
      type: i % 2 === 0 ? 'Water abnormality' : 'Low battery level',
    })),
    // Continue for each new area....
  };

  const recommendationZones = [
    { city: 'Chennai', recommendedCount: 20 },
    { city: 'Delhi', recommendedCount: 15 },
    { city: 'Mumbai', recommendedCount: 18 },
    { city: 'Kolkata', recommendedCount: 12 },
    { city: 'Bangalore', recommendedCount: 10 },
    // Add more cities as needed
  ];

  const recommendedLocations = {
    'Chennai': Array.from({ length: 20 }, (_, i) => ({
      id: `CH-R${i + 1}`,
      coordinates: `13.08${i % 10 + 1}, 80.27${i % 10 + 1}`,
    })),
    'Delhi': Array.from({ length: 15 }, (_, i) => ({
      id: `DL-R${i + 1}`,
      coordinates: `28.70${i % 10 + 1}, 77.10${i % 10 + 1}`,
    })),
    'Mumbai': Array.from({ length: 18 }, (_, i) => ({
      id: `MU-R${i + 1}`,
      coordinates: `19.07${i % 10 + 1}, 72.87${i % 10 + 1}`,
    })),
    // Continue for each new area...
  };

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRecommendationCity, setSelectedRecommendationCity] = useState(null);

  const handleZoneClick = (city) => {
    setSelectedCity(city);
  };

  const handleRecommendationZoneClick = (city) => {
    setSelectedRecommendationCity(city);
  };

  return (
    <div>
      <Header />
      <div className="dwlr-container">
        <div className="zones-section">
          <div className="zones-header">
            <h3>ZONES</h3>
            <input type="text" className="search-bar" placeholder="Search..." />
          </div>
          <div className="zones-list">
            <div className="zones-list-header">
              <span>Area</span>
              <span>No. of DWLRs</span>
            </div>
            {zones.map((zone, index) => (
              <div key={index} className="zone-item" onClick={() => handleZoneClick(zone.city)}>
                <span className="zone-name">{zone.city}</span>
                <span className="dwlr-count">{zone.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="zone-details-section">
          {selectedCity ? (
            <>
              <div className="zone-details-header">
                <h3>{selectedCity} DWLRs</h3>
              </div>
              <div className="zone-details-list">
                <div className="zone-details-list-header">
                  <span>DWLR ID</span>
                  <span>Time and Date</span>
                  <span>Vendor ID</span>
                  <span>Type</span>
                </div>
                {dwlrData[selectedCity]?.map((item, index) => (
                  <div key={index} className="detail-item">
                    <span className="dwlr-id">{item.id}</span>
                    <span className="time-date">{item.date}</span>
                    <span className="vendor-id">{item.vendor}</span>
                    <span className={`alert-type ${item.type.toLowerCase().replace(/ /g, '-')}`}>{item.type}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <h3>Please select a city to view DWLR details.</h3>
            </div>
          )}
        </div>
      </div>

      {/* Recommendation System Section */}
      <div className="recommendation-container">
        <div className="recommendation-zones-section">
          <div className="zones-header">
            <h3>Recommended Zones</h3>
          </div>
          <div className="zones-list">
            <div className="zones-list-header">
              <span>Area</span>
              <span>Recommended Locations</span>
            </div>
            {recommendationZones.map((zone, index) => (
              <div key={index} className="zone-item" onClick={() => handleRecommendationZoneClick(zone.city)}>
                <span className="zone-name">{zone.city}</span>
                <span className="recommended-count">{zone.recommendedCount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="recommendation-details-section">
          {selectedRecommendationCity ? (
            <>
              <div className="zone-details-header">
                <h3>{selectedRecommendationCity} Recommended Locations</h3>
              </div>
              <div className="zone-details-list">
                <div className="zone-details-list-header">
                  <span>ID</span>
                  <span>Coordinates</span>
                </div>
                {recommendedLocations[selectedRecommendationCity]?.map((location, index) => (
                  <div key={index} className="detail-item">
                    <span className="location-id">{location.id}</span>
                    <span className="coordinates">{location.coordinates}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <h3>Please select a zone to view recommended locations.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DWLRPage;
