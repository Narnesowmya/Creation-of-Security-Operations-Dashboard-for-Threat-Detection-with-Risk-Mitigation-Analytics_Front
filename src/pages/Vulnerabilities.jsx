import { useState, useEffect } from 'react'
import { Box, Typography, Paper, Chip, CircularProgress } from '@mui/material'
import { FiZap, FiCheckCircle } from 'react-icons/fi'
import { getVulnerabilities } from '../services/api.js'
import { SEVERITY_COLORS } from '../theme/socTheme.js'

export default function Vulnerabilities() {
    const [vulnerabilities, setVulnerabilities] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getVulnerabilities()
            .then((data) => {
                setVulnerabilities(data.vulnerabilities || [])
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
                <Typography sx={{ color: '#F87171' }}>Failed to load vulnerabilities: {error}</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', mb: 3 }}>
                Vulnerabilities
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {vulnerabilities.map((vuln) => {
                    const severityStyle = SEVERITY_COLORS[vuln.severity] || SEVERITY_COLORS.Low

                    return (
                        <Paper
                            key={vuln.id}
                            elevation={0}
                            sx={{
                                p: 2.5,
                                backgroundColor: 'rgba(18, 17, 31, 0.75)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(34, 211, 238, 0.15)',
                                borderRadius: '14px',
                                borderLeft: `4px solid ${severityStyle.main}`
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                                        <Typography sx={{ color: '#22D3EE', fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem' }}>
                                            {vuln.id}
                                        </Typography>
                                        <Chip
                                            label={vuln.severity}
                                            size="small"
                                            sx={{
                                                backgroundColor: severityStyle.bg,
                                                color: severityStyle.main,
                                                border: `1px solid ${severityStyle.border}`,
                                                fontWeight: 800,
                                                fontSize: '0.7rem',
                                                height: 22
                                            }}
                                        />
                                        <Typography sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                                            CVSS {vuln.cvss}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ color: '#F8FAFC', fontWeight: 600, fontSize: '0.92rem', mb: 0.5 }}>
                                        {vuln.title}
                                    </Typography>
                                    <Typography sx={{ color: '#64748B', fontSize: '0.8rem' }}>
                                        Asset: {vuln.asset}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                                    <Chip
                                        label={vuln.status}
                                        size="small"
                                        sx={{
                                            backgroundColor: vuln.status === 'Resolved' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                                            color: vuln.status === 'Resolved' ? '#10B981' : '#94A3B8',
                                            fontWeight: 700,
                                            fontSize: '0.72rem'
                                        }}
                                    />
                                    {vuln.patchAvailable && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <FiCheckCircle size={13} color="#10B981" />
                                            <Typography sx={{ color: '#10B981', fontSize: '0.72rem', fontWeight: 600 }}>
                                                Patch Available
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Paper>
                    )
                })}
            </Box>
        </Box>
    )
}