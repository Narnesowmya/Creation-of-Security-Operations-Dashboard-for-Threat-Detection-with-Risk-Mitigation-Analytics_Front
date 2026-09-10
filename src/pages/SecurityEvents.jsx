import { useState, useEffect } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import Filters from '../components/Filters.jsx'
import ThreatTable from '../components/ThreatTable.jsx'
import { getPredictions } from '../services/api.js'

const DEFAULT_FILTERS = {
    severity: 'All',
    eventType: 'All',
    dateRange: 'All',
    searchIp: ''
}

export default function SecurityEvents() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS)
    const [predictions, setPredictions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getPredictions()
            .then((data) => {
                const records = data?.predictions || data?.data || (Array.isArray(data) ? data : []);
                setPredictions(records)
                setError(null)
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const handleResetFilters = () => {
        setFilters(DEFAULT_FILTERS)
    }

    // Client-side filtering logic for predictions array
    const filteredPredictions = predictions.filter(pred => {
        // 1. Severity filter
        if (filters.severity && filters.severity !== 'All') {
            if (pred.severity !== filters.severity) return false;
        }

        // 2. Event Type filter (mapped to threat_type)
        if (filters.eventType && filters.eventType !== 'All') {
            if (pred.threat_type !== filters.eventType) return false;
        }

        // 3. Search IP/Asset/Event ID filter (mapped to event_id / threat_type substring search)
        if (filters.searchIp && filters.searchIp.trim() !== '') {
            const term = filters.searchIp.trim().toLowerCase();
            const idMatch = pred.event_id?.toLowerCase().includes(term);
            const typeMatch = pred.threat_type?.toLowerCase().includes(term);
            if (!idMatch && !typeMatch) return false;
        }

        return true;
    });

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', mb: 3 }}>
                Security Events
            </Typography>

            <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
            />

            <Box sx={{ mt: 3 }}>
                {loading && <CircularProgress sx={{ color: '#22D3EE' }} />}
                {error && <Typography sx={{ color: '#F87171' }}>Failed to load events: {error}</Typography>}
                {!loading && !error && (
                    <ThreatTable predictions={filteredPredictions} loading={loading} />
                )}
            </Box>
        </Box>
    )
}