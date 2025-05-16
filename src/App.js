import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AlarmsPage from './components/AlarmsPage';
import DWLRPage from './components/DWLRPage';
import Vendor from './components/vendors';
import Header1 from './components/Header1';
import SettingsPage from './components/SettingsPage'; // Import the new Settings page
import IndividualDwlrPage from './components/IndividualDwlrPage';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/alarms" element={<AlarmsPage />} />
                <Route path="/dwlr" element={<DWLRPage />} />
                <Route path="/vendors" element={<Vendor />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<SettingsPage />} /> {/* New Settings route */}
                {/* <Route path="/dwlr/:id" element/> */}
                <Route path="/dwlr/:city/:dwlrId" element={<IndividualDwlrPage />} />  {/* Define route for individual DWLR */}

                {/* Add other routes as necessary */}
            </Routes>
        </Router>
    );
}

export default App;
