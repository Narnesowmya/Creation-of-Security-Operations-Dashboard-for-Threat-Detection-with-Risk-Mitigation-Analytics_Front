import { useState, useEffect } from 'react'
import { Box, Typography, Paper, Chip, CircularProgress, TextField, InputAdornment } from '@mui/material'
import { FiShield, FiTrendingUp, FiSearch } from 'react-icons/fi'
import { getPredictions } from '../services/api.js'
import { SEVERITY_COLORS } from '../theme/socTheme.js'
import ThreatTable from '../components/ThreatTable.jsx'

export default function ThreatIntelligence() {
    const [analytics, setAnalytics] = useState(null)
    const [highRiskEvents, setHighRiskEvents] = useState([])
    const [predictions, setPredictions] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [predictionsLoading, setPredictionsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        setPredictionsLoading(true)

        getPredictions()
            .then((predData) => {
                const records = predData?.predictions || predData?.data || (Array.isArray(predData) ? predData : []);
                setPredictions(records)

                // 1. Derive topAttackTypes: group predictions by threat_type, count occurrences, sort descending
                const attackCounts = {};
                records.forEach(p => {
                    const type = p.threat_type || 'None';
                    attackCounts[type] = (attackCounts[type] || 0) + 1;
                });
                const topAttackTypes = Object.keys(attackCounts)
                    .map(type => ({ type, count: attackCounts[type] }))
                    .sort((a, b) => b.count - a.count);
                
                setAnalytics({ topAttackTypes });

                // 2. Derive highRiskEvents: filter same predictions array for severity === 'Critical', take first 8
                const criticals = records
                    .filter(p => p.severity === 'Critical')
                    .slice(0, 8);
                setHighRiskEvents(criticals);

                setError(null)
            })
            .catch((err) => {
                console.error('Failed to load threat predictions:', err);
                setError(err.message);
                setPredictions([]);
            })
            .finally(() => {
                setLoading(false);
                setPredictionsLoading(false);
            });
    }, [])

    if (loading) {
        return (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: '#22D3EE' }} />
            </Box>
        )
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography sx={{ color: '#F87171' }}>Failed to load threat intelligence: {error}</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', mb: 3 }}>
                Threat Intelligence
            </Typography>

            {/* Top Attack Types */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    backgroundColor: 'rgba(18, 17, 31, 0.75)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(34, 211, 238, 0.15)',
                    borderRadius: '16px'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
                    <FiTrendingUp size={20} color="#22D3EE" />
                    <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC' }}>
                        Top Attack Vectors
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {analytics?.topAttackTypes?.map((attack) => {
                        const maxCount = analytics.topAttackTypes[0]?.count || 1
                        const widthPct = (attack.count / maxCount) * 100
                        return (
                            <Box key={attack.type}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 600 }}>
                                        {attack.type}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#22D3EE', fontWeight: 700 }}>
                                        {attack.count}
                                    </Typography>
                                </Box>
                                <Box sx={{ height: 8, borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                    <Box
                                        sx={{
                                            height: '100%',
                                            width: `${widthPct}%`,
                                            background: 'linear-gradient(90deg, #22D3EE, #8B5CF6)',
                                            borderRadius: '4px',
                                            transition: 'width 0.5s ease'
                                        }}
                                    />
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Paper>

            {/* Active High-Risk Threats */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    backgroundColor: 'rgba(18, 17, 31, 0.75)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(34, 211, 238, 0.15)',
                    borderRadius: '16px'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
                    <FiShield size={20} color="#EF4444" />
                    <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC' }}>
                        Active Critical Threats
                    </Typography>
                </Box>

                {highRiskEvents.length === 0 ? (
                    <Typography sx={{ color: '#94A3B8' }}>No critical threats currently detected.</Typography>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {highRiskEvents.map((evt) => (
                            <Box
                                key={evt.event_id}
                                sx={{
                                    p: 2,
                                    borderRadius: '10px',
                                    backgroundColor: 'rgba(239, 68, 68, 0.06)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Box>
                                    <Typography sx={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.9rem' }}>
                                        {evt.threat_type}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                                        <Typography sx={{ color: '#94A3B8', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                                            {evt.event_id}
                                        </Typography>
                                        <Typography sx={{ color: '#E2E8F0', fontSize: '0.8rem' }}>
                                            ({evt.confidence_score}% confidence)
                                        </Typography>
                                    </Box>
                                </Box>
                                <Chip
                                    label={evt.severity}
                                    size="small"
                                    sx={{
                                        backgroundColor: SEVERITY_COLORS.Critical.bg,
                                        color: SEVERITY_COLORS.Critical.main,
                                        border: `1px solid ${SEVERITY_COLORS.Critical.border}`,
                                        fontWeight: 800
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
            </Paper>

            {/* AI Threat Predictions Section */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC', mb: 2 }}>
                    AI Threat Analysis & Predictions
                </Typography>

                {/* Client-side Event ID Search bar */}
                <Box sx={{ mb: 2.5, maxWidth: 400 }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search Event ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FiSearch color="#22D3EE" size={16} />
                                    </InputAdornment>
                                )
                            }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'rgba(13, 15, 26, 0.7)',
                                '& fieldset': {
                                    borderColor: 'rgba(34, 211, 238, 0.2)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(34, 211, 238, 0.4)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#22D3EE',
                                },
                                fontSize: '0.88rem',
                                borderRadius: '10px'
                            }
                        }}
                    />
                </Box>

                <ThreatTable
                    predictions={predictions.filter((pred) => {
                        if (!searchQuery.trim()) return true;
                        if (!pred || !pred.event_id) return false;
                        return pred.event_id.toLowerCase().includes(searchQuery.trim().toLowerCase());
                    })}
                    loading={predictionsLoading}
                />
            </Box>
        </Box>
    )
}