import React from 'react';

const styles = {
  mapContainer: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s ease-in-out',
    height: '100%', // Ensure full height
    display: 'flex',
    flexDirection: 'column'
  },
  
  mapHeader: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid #e2e8f0',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    color: 'white'
  },

  headerTitle: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  mapContent: {
    position: 'relative',
    width: '100%',
    height: '100%', // Ensure full height for the map content
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%', // Ensure the image takes up the full width
    height: '100%', // Ensure the image takes up the full height
    objectFit: 'contain', // Maintain aspect ratio without distortion
    transition: 'transform 0.3s ease',
  },

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.7)', // Semi-transparent overlay
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.125rem',
    color: '#64748b',
  }
};

const MapDisplay = ({ title, src }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError(true);
  };

  const handleMouseEnter = (e) => {
    e.target.style.transform = 'scale(1.02)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = 'scale(1)';
  };

  return (
    <div 
      style={styles.mapContainer}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
      }}
    >
      <div style={styles.mapHeader}>
        <h2 style={styles.headerTitle}>{title}</h2>
      </div>
      <div style={styles.mapContent}>
        {isLoading && (
          <div style={styles.loadingOverlay}>
            Loading map...
          </div>
        )}
        {error ? (
          <div style={styles.loadingOverlay}>
            Failed to load map
          </div>
        ) : (
          <img
            src={src}
            alt={title}
            style={styles.image}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </div>
    </div>
  );
};

export default MapDisplay;
