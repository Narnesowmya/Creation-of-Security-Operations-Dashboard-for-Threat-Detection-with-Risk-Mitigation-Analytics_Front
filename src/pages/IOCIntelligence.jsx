import { useState, useEffect } from 'react'
import { Box, Typography, Paper, Chip, CircularProgress } from '@mui/material'
import { getThreats } from '../services/api.js'

export default function IOCIntelligence() {
    const [threats, setThreats] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getThreats()
            .then((data) => {
                setThreats(data || [])
                setError(null)
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
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
                <Typography sx={{ color: '#F87171' }}>Failed to load IOC data: {error}</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', mb: 3 }}>
                Indicators of Compromise
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {threats.map((t) => (
                    <Paper
                        key={t.id}
                        elevation={0}
                        sx={{
                            p: 2.5,
                            backgroundColor: 'rgba(18, 17, 31, 0.75)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(34, 211, 238, 0.15)',
                            borderRadius: '14px'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                            <Typography sx={{ color: '#22D3EE', fontFamily: 'monospace', fontWeight: 700 }}>
                                {t.indicator || 'N/A'}
                            </Typography>
                            <Chip
                                label={t.threat_type || 'Unknown'}
                                size="small"
                                sx={{ backgroundColor: 'rgba(248, 113, 113, 0.15)', color: '#F87171', fontWeight: 700 }}
                            />
                        </Box>
                        <Typography sx={{ color: '#94A3B8', fontSize: '0.8rem' }}>
                            Confidence: {t.confidence ?? 'N/A'}%
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Box>
    )
}