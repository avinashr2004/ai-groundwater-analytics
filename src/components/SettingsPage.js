import React from 'react';
import './SettingsPage.css';

const SettingsPage = () => {
    const handleLogout = () => {
        // Add your logout logic here
        alert('Logged out!'); // Placeholder for logout action
    };

    return (
        <div className="settings-page">
            <h1>Your Profile</h1>
            <div className="profile-section">
                <img
                    src="https://via.placeholder.com/150" // Placeholder for profile picture
                    alt="Profile"
                    className="profile-picture"
                />
                <div className="profile-info">
                    <h2>John Doe</h2> {/* Replace with dynamic data if needed */}
                    <p>Email: johndoe@example.com</p> {/* Replace with dynamic data if needed */}
                </div>
            </div>

            <h2>Manage Accounts</h2>
            <ul className="account-list">
                <li>Account 1</li>
                <li>Account 2</li>
                <li>Account 3</li>
            </ul>

            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default SettingsPage;
