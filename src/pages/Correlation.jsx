import { useState, useEffect } from 'react'
import { Box, Typography, CircularProgress, Grid } from '@mui/material'
import CorrelationFilters from '../components/CorrelationFilters.jsx'
import CorrelatedThreatList from '../components/CorrelatedThreatList.jsx'
import AttackChain from '../components/AttackChain.jsx'
import RecommendationPanel from '../components/RecommendationPanel.jsx'
import { getCorrelatedThreats, getRecommendation } from '../services/api.js'

const DEFAULT_FILTERS = {
    riskLevel: 'All',
    threatType: 'All',
    asset: 'All',
    department: 'All',
    mitreTechnique: 'All',
    dateRange: 'All',
    status: 'All'
}

export default function Correlation() {
    const [filters, setFilters] = useState(DEFAULT_FILTERS)
    const [threats, setThreats] = useState([])
    const [selectedThreat, setSelectedThreat] = useState(null)
    const [recommendation, setRecommendation] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getCorrelatedThreats(filters)
            .then((data) => {
                setThreats(data.threats || [])
                setError(null)
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [filters])

    useEffect(() => {
        if (!selectedThreat) {
            setRecommendation(null)
            return
        }
        getRecommendation(selectedThreat.id)
            .then((data) => setRecommendation(data))
            .catch(() => setRecommendation(null))
    }, [selectedThreat])

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    const handleResetFilters = () => {
        setFilters(DEFAULT_FILTERS)
        setSelectedThreat(null)
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', mb: 3 }}>
                Threat Correlation &amp; Recommendations
            </Typography>

            <CorrelationFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
            />

            <Box sx={{ mt: 3 }}>
                {loading && <CircularProgress sx={{ color: '#22D3EE' }} />}
                {error && <Typography sx={{ color: '#F87171' }}>Failed to load correlated threats: {error}</Typography>}
            </Box>

            {!loading && !error && (
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <CorrelatedThreatList
                            threats={threats}
                            selectedThreat={selectedThreat}
                            onSelectThreat={setSelectedThreat}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AttackChain activeStages={selectedThreat?.attackStages || []} />
                    </Grid>
                    <Grid item xs={12}>
                        <RecommendationPanel recommendation={recommendation} />
                    </Grid>
                </Grid>
            )}
        </Box>
    )
}