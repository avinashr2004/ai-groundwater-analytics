import React from 'react';
import { Helmet } from 'react-helmet';

const styles = {
  header: {
    width: '100%',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  headerContent: {
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e5e7eb',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  siteLogo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
    gap: '1rem',
  },
  logoImage: {
    height: '60px',
    width: 'auto',
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  hindiTitle: {
    color: '#1e3c72',
    fontSize: '1.25rem',
    fontWeight: '600',
    margin: 0,
  },
  englishTitle: {
    color: '#2a5298',
    fontSize: '1rem',
    fontWeight: '500',
    margin: 0,
    maxWidth: '400px',
    lineHeight: '1.4',
  },
  subtitle: {
    color: '#4b5563',
    fontSize: '0.875rem',
    margin: '0.25rem 0 0 0',
  },
  additionalLogos: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  additionalLogo: {
    height: '50px',
    width: 'auto',
  },
  menuBar: {
    padding: '0.75rem 2rem',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuOptions: {
    display: 'flex',
    gap: '1rem',
  },
  menuItem: {
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s',
    textDecoration: 'none',
  },
  settingsOption: {
    marginLeft: 'auto',
  },
  settingsIcon: {
    fontSize: '1.25rem',
  }
};

const Header = () => {
    return (
        <>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=settings"
                />
            </Helmet>

            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={styles.logoSection}>
                        <a
                            title="Go to home"
                            style={styles.siteLogo}
                            rel="home"
                        >
                            <img
                                src="https://jalshakti-dowr.gov.in/wp-content/themes/sdo-theme/images/emblem.svg"
                                alt="State Emblem of India"
                                style={styles.logoImage}
                            />
                            <div style={styles.logoText}>
                                <strong lang="hi" style={styles.hindiTitle}>
                                    जलसंसाधन, नदी विकास और गंगा संरक्षण विभाग
                                </strong>
                                <h1 style={styles.englishTitle}>
                                    Department of Water Resources, River Development and Ganga Rejuvenation
                                </h1>
                                <p style={styles.subtitle}>सत्यमेव जयते</p>
                            </div>
                        </a>
                    </div>

                    <div style={styles.additionalLogos}>
                        <a
                            aria-label="State Logo"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="State Logo"
                        >
                            <img
                                src="https://cdnbbsr.s3waas.gov.in/s3a70dc40477bc2adceef4d2c90f47eb82/uploads/2023/01/2023010925-e1673257612984.png"
                                alt="G20 Logo"
                                style={styles.additionalLogo}
                            />
                        </a>
                        <a
                            aria-label="Azadi ka Amrit Mahotsav"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Azadi ka Amrit Mahotsav"
                        >
                            <img
                                src="https://cdnbbsr.s3waas.gov.in/s3a70dc40477bc2adceef4d2c90f47eb82/uploads/2023/01/2023010958.png"
                                alt="Azadi Ka Amrit Mahotsav Logo"
                                style={styles.additionalLogo}
                            />
                        </a>
                    </div>
                </div>

                <div style={styles.menuBar}>
                    {/* <div style={styles.menuOptions}>
                        <a href="/administration" style={styles.menuItem}>Administration</a>
                        <a href="/accounts" style={styles.menuItem}>Accounts</a>
                    </div> */}

                    <div style={styles.settingsOption}>
                        <a href="/settings" style={styles.menuItem}>
                            <span className="material-symbols-outlined" style={styles.settingsIcon}>
                                settings
                            </span>
                            Settings
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
