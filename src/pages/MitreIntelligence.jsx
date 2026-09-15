import { useState, useEffect } from 'react'
import { Box, Typography, Paper, Chip, CircularProgress } from '@mui/material'
import { getThreats } from '../services/api.js'

export default function MitreIntelligence() {
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
                <Typography sx={{ color: '#F87171' }}>Failed to load MITRE data: {error}</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', mb: 3 }}>
                MITRE ATT&CK Intelligence
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
                            <Chip
                                label={t.mitre_id || 'N/A'}
                                size="small"
                                sx={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8B5CF6', fontWeight: 700 }}
                            />
                            <Typography sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                                {t.technique_name || 'Unknown Technique'}
                            </Typography>
                        </Box>
                        <Typography sx={{ color: '#94A3B8', fontSize: '0.8rem' }}>
                            Tactic: {t.tactic || 'N/A'} &nbsp;|&nbsp; Threat Type: {t.threat_type || 'N/A'} &nbsp;|&nbsp; Confidence: {t.confidence ?? 'N/A'}
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Box>
    )
}