import React from 'react';
import { useNavigate } from 'react-router-dom';
// 1. IMPORT THE IMAGE HERE
import emblem from '../assets/emblem.png'; // Make sure the file name is exactly 'emblem.png'

const Header1 = () => {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <div style={styles.logoSection} onClick={() => navigate('/')}>
        {/* 2. ADD THE IMAGE TAG HERE */}
        <img 
          src={emblem} 
          alt="Govt Emblem" 
          style={{ height: '55px', marginRight: '15px' }} 
        />
        
        <div>
          <h1 style={styles.title}>National Groundwater Monitoring</h1>
          <p style={styles.subtitle}>Ministry of Jal Shakti, Govt. of India</p>
        </div>
      </div>
      
      {/* User Profile Section */}
      <div style={styles.userSection}>
        <div style={styles.avatar}>A</div>
        <span style={styles.username}>Admin Official</span>
      </div>
    </header>
  );
};

// Styles
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 2rem',
    background: 'white',
    borderBottom: '1px solid #e2e8f0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  title: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#1e3a8a', // Official looking dark blue
    fontWeight: 'bold'
  },
  subtitle: {
    margin: 0,
    fontSize: '0.75rem',
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  avatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    background: '#1e3a8a',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  username: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#334155'
  }
};

export default Header1;