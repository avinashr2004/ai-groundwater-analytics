import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AlarmsPage from './components/AlarmsPage'; // Existing Alarms page component
import DWLRPage from './components/DWLRPage'; // DWLR page component
import Vendor from './components/vendors'; // Vendor page component
import Header1 from './components/Header1'; // Settings page

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} /> {/* Default route */}
                <Route path="/alarms" element={<AlarmsPage />} /> {/* Alarms route */}
                <Route path="/dwlr" element={<DWLRPage />} /> {/* DWLR route */}
                <Route path="/vendors" element={<Vendor />} /> {/* Vendor route */}
                <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
                <Route path="/Header1" element={<Header1 />} /> {/* Settings route */}
                
                {/* Add other routes as necessary */}
            </Routes>
        </Router>
    );
}

export default App;
