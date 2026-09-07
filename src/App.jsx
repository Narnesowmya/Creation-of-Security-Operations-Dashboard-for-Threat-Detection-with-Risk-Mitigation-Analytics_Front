import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SecurityEvents from './pages/SecurityEvents.jsx'
import ThreatIntelligence from './pages/ThreatIntelligence.jsx'
import Vulnerabilities from './pages/Vulnerabilities.jsx'
import Analytics from './pages/Analytics.jsx'
import EventDetails from './pages/EventDetails.jsx'
import Correlation from './pages/Correlation.jsx'
import IncidentInvestigation from './pages/IncidentInvestigation.jsx'

function App() {
    return (
        <Routes>
            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Main Dashboard */}
            <Route path="/dashboard" element={<Dashboard />}>
                {/* Dashboard sub-pages */}
                <Route
                    path="events"
                    element={<SecurityEvents />}
                />
                <Route
                    path="threat-intel"
                    element={<ThreatIntelligence />}
                />
                <Route
                    path="vulnerabilities"
                    element={<Vulnerabilities />}
                />
                <Route
                    path="analytics"
                    element={<Analytics />}
                />
                                <Route
                    path="correlation"
                    element={<Correlation />}
                <Route
                    path="investigation/:incidentId"
                    element={<IncidentInvestigation />}
                />
            </Route>

            {/* Standalone Event Details Page */}
            <Route path="/events/:eventId" element={<EventDetails />} />

            {/* Default */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* Unknown route */}
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    )
}

export default App
