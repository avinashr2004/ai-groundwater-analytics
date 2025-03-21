import React,{useRef,useState} from 'react';
import './SettingsPage.css';
import { FiLogOut, FiUser, FiMail, FiShield } from 'react-icons/fi';

const SettingsPage = () => {
    const [profileImage, setProfileImage] = useState("https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=150");
    const fileInputRef = useRef(null);

    const handleLogout = () => {
        alert('Logged out!');
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChangePhotoClick = () => {
        fileInputRef.current.click();
    };


    return (
        <div className="settings-page">
            <div className="settings-container">
                <div className="settings-header">
                    <h1>Profile Settings</h1>
                    <p className="subtitle">Manage your account and preferences</p>
                </div>

                <div className="profile-section">
                    <div className="profile-image-container">
                    <img
                            src={profileImage}
                            alt="Profile"
                            className="profile-picture"
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <button className="change-photo-btn" onClick={handleChangePhotoClick}>
                            Change Photo
                        </button>
                
                    </div>
                    <div className="profile-info">
                        <div className="info-item">
                            <FiUser className="info-icon" />
                            <div>
                                <h3>John Doe</h3>
                                <p className="text-muted">Administrator</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <FiMail className="info-icon" />
                            <div>
                                <h3>Email Address</h3>
                                <p className="text-muted">johndoe@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h2><FiShield className="section-icon" /> Security</h2>
                    <div className="account-list">
                        <div className="account-item">
                            <div>
                                <h3>Password</h3>
                                <p className="text-muted">Last changed 3 months ago</p>
                            </div>
                            <button className="secondary-button">Change</button>
                        </div>
                        <div className="account-item">
                            <div>
                                <h3>Two-Factor Authentication</h3>
                                <p className="text-muted">Currently disabled</p>
                            </div>
                            <button className="secondary-button">Enable</button>
                        </div>
                    </div>
                </div>

                <button className="logout-button" onClick={handleLogout}>
                    <FiLogOut className="button-icon" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;