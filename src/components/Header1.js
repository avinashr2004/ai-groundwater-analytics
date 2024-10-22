import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Header.css';

const Header = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleBackToDashboard = () => {
        navigate('/dashboard'); // Update this path to the Dashboard route
    };

    return (
        <>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=settings"
                />
            </Helmet>

            <header className="header">
                <div className="header-content">
                    <div className="logo-section">
                        <a
                            title="Go to home"
                            className="site-logo"
                            rel="home"
                        >
                            <img
                                src="https://jalshakti-dowr.gov.in/wp-content/themes/sdo-theme/images/emblem.svg"
                                alt="State Emblem of India"
                                className="logo-image"
                            />
                            <div className="logo-text">
                                <strong lang="hi">
                                    जलसंसाधन, नदी विकास और गंगा संरक्षण विभाग
                                </strong>
                                <h1 className="title">
                                    Department of Water Resources, River Development and Ganga Rejuvenation
                                </h1>
                                <p>सत्यमेव जयते</p>
                            </div>
                        </a>
                    </div>

                    <div className="additional-logos">
                        <a
                            aria-label="State Logo - External site that opens in a new window"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="State Logo"
                        >
                            <img
                                src="https://cdnbbsr.s3waas.gov.in/s3a70dc40477bc2adceef4d2c90f47eb82/uploads/2023/01/2023010925-e1673257612984.png"
                                alt="G20 Logo"
                                className="additional-logo"
                            />
                        </a>
                        <a
                            aria-label="Azadi ka Amrit Mahotsav - External site that opens in a new window"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Azadi ka Amrit Mahotsav"
                        >
                            <img
                                src="https://cdnbbsr.s3waas.gov.in/s3a70dc40477bc2adceef4d2c90f47eb82/uploads/2023/01/2023010958.png"
                                alt="Azadi Ka Amrit Mahotsav Logo"
                                className="additional-logo"
                            />
                        </a>
                    </div>
                </div>

                {/* New section for the menu options */}
                <div className="menu-bar">
                    <div className="menu-options">
                        <button onClick={handleBackToDashboard} className="menu-item">
                            Back to HomePage
                        </button>
                    </div>

                    {/* Settings option aligned to the right */}
                    <div className="settings-option">
                        <a href="/settings" className="menu-item settings">
                            <span className="material-symbols-outlined settings-icon">
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