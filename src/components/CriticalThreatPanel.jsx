import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Box,
  Typography,
  Chip,
  Skeleton,
  LinearProgress
} from '@mui/material';
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiServer,
  FiChevronRight
} from 'react-icons/fi';
import { STATUS_COLORS } from '../theme/socTheme.js';

export default function CriticalThreatPanel({ incidents = [], loading = false }) {
  const navigate = useNavigate();

  // Filter ONLY critical incidents
  const criticalIncidents = incidents.filter(inc => {
    const riskLevel = inc.risk_level || (inc.risk_score >= 85 ? 'Critical' : '');
    return riskLevel === 'Critical';
  });

  // Sort descending by risk_score
  const sortedCriticals = [...criticalIncidents].sort((a, b) => (Number(b.risk_score) || 0) - (Number(a.risk_score) || 0));

  // Top 5 items
  const displayIncidents = sortedCriticals.slice(0, 5);
  const remainingCount = sortedCriticals.length - 5;

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'rgba(18, 17, 31, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        boxShadow: '0 0 24px rgba(239, 68, 68, 0.2), inset 0 0 12px rgba(239, 68, 68, 0.08)',
        borderRadius: '16px',
        overflow: 'hidden',
        mb: 3
      }}
    >
      {/* Red Alert Header */}
      <Box
        sx={{
          p: 2.5,
          background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.2) 0%, rgba(18, 17, 31, 0.6) 100%)',
          borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1.5
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FiAlertTriangle size={22} color="#EF4444" />
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Sora", sans-serif',
              fontWeight: 800,
              color: '#F8FAFC',
              fontSize: '1.05rem',
              letterSpacing: '-0.01em'
            }}
          >
            Critical Incidents Needing Immediate Response
          </Typography>
        </Box>
        <Chip
          label={`${criticalIncidents.length} Critical`}
          size="small"
          sx={{
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            color: '#EF4444',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
            fontWeight: 800,
            fontSize: '0.75rem'
          }}
        />
      </Box>

      {/* Content Area */}
      <Box sx={{ p: 2.5 }}>
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton
                key={idx}
                variant="rectangular"
                height={72}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.06)', borderRadius: '12px' }}
              />
            ))}
          </Box>
        ) : displayIncidents.length === 0 ? (
          <Box
            sx={{
              py: 4,
              px: 2,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
              borderRadius: '12px',
              backgroundColor: 'rgba(16, 185, 129, 0.05)',
              border: '1px dashed rgba(16, 185, 129, 0.3)'
            }}
          >
            <FiCheckCircle size={40} color="#10B981" />
            <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 700, fontSize: '1rem' }}>
              No Critical Incidents — All Clear
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', maxWidth: 450 }}>
              Zero high-severity critical incidents requiring immediate analyst triage.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {displayIncidents.map((inc) => {
              const statusStyle = STATUS_COLORS[inc.status] || STATUS_COLORS.Open;
              return (
                <Paper
                  key={inc.incident_id}
                  elevation={0}
                  onClick={() => navigate(`/dashboard/investigation/${inc.incident_id}`)}
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderLeft: '5px solid #EF4444',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    flexWrap: 'wrap',
                    '&:hover': {
                      backgroundColor: 'rgba(239, 68, 68, 0.12)',
                      borderColor: 'rgba(239, 68, 68, 0.6)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 16px rgba(239, 68, 68, 0.25)'
                    }
                  }}
                >
                  {/* Left: ID & Threat Type */}
                  <Box sx={{ minWidth: 160 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ color: '#F8FAFC', fontWeight: 800, fontFamily: 'monospace' }}>
                        {inc.incident_id}
                      </Typography>
                      <Chip
                        label={inc.priority || 'P1'}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(239, 68, 68, 0.25)',
                          color: '#F8FAFC',
                          border: '1px solid rgba(239, 68, 68, 0.6)',
                          fontWeight: 800,
                          fontSize: '0.7rem',
                          height: 20
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#EF4444', fontWeight: 700 }}>
                      {inc.threat_type || 'Critical Threat'}
                    </Typography>
                  </Box>

                  {/* Middle: Asset */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 140 }}>
                    <FiServer size={16} color="#94A3B8" />
                    <Typography variant="body2" sx={{ color: '#94A3B8', fontFamily: 'monospace' }}>
                      {inc.affected_asset || inc.asset_id || 'N/A'}
                    </Typography>
                  </Box>

                  {/* Right: Risk Score & Bar */}
                  <Box sx={{ minWidth: 130 }}>
                    <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, display: 'block', mb: 0.3 }}>
                      Risk Score
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ color: '#EF4444', fontWeight: 800, minWidth: 28 }}>
                        {inc.risk_score}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(100, Math.max(0, inc.risk_score))}
                        sx={{
                          flexGrow: 1,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#EF4444',
                            borderRadius: 3
                          }
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Status Badge & Arrow */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Chip
                      label={inc.status || 'Open'}
                      size="small"
                      sx={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.main,
                        border: '1px solid ' + statusStyle.border,
                        fontWeight: 700,
                        fontSize: '0.72rem'
                      }}
                    />
                    <FiChevronRight size={18} color="#EF4444" />
                  </Box>
                </Paper>
              );
            })}

            {remainingCount > 0 && (
              <Box sx={{ textAlign: 'center', pt: 1 }}>
                <Chip
                  label={`+${remainingCount} more Critical Incidents`}
                  variant="outlined"
                  sx={{
                    color: '#EF4444',
                    borderColor: 'rgba(239, 68, 68, 0.4)',
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    fontWeight: 700,
                    fontSize: '0.75rem'
                  }}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
}
