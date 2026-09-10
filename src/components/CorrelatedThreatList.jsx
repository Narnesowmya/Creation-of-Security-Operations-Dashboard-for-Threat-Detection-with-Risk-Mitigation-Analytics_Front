import React from 'react';
import { Paper, Box, Typography, Chip } from '@mui/material';
import { SEVERITY_COLORS } from '../theme/socTheme.js';

// `threats` shape: [{ id, title, priority, riskScore, threatType, asset, timestamp }]
export default function CorrelatedThreatList({ threats = [], selectedThreat, onSelectThreat }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: 'rgba(18, 17, 31, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(34, 211, 238, 0.2)',
        borderRadius: '16px'
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC', mb: 2 }}
      >
        Correlated Threats ({threats.length})
      </Typography>

      {threats.length === 0 && (
        <Typography sx={{ color: '#94A3B8', fontSize: '0.9rem' }}>
          No correlated threats match the current filters.
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
        {threats.map((threat) => {
          const isSelected = selectedThreat?.id === threat.id;
          const colors = SEVERITY_COLORS[threat.priority] || SEVERITY_COLORS.Medium;

          return (
            <Box
              key={threat.id}
              onClick={() => onSelectThreat(threat)}
              sx={{
                p: 1.8,
                borderRadius: '10px',
                cursor: 'pointer',
                border: isSelected ? `1px solid ${colors.border}` : '1px solid rgba(148, 163, 184, 0.15)',
                backgroundColor: isSelected ? colors.bg : 'rgba(255, 255, 255, 0.02)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
                '&:hover': {
                  borderColor: colors.border,
                  backgroundColor: colors.bg
                }
              }}
            >
              <Box>
                <Typography sx={{ color: '#F8FAFC', fontWeight: 600, fontSize: '0.9rem' }}>
                  {threat.title || threat.id}
                </Typography>
                <Typography sx={{ color: '#94A3B8', fontSize: '0.78rem' }}>
                  {threat.threatType} · {threat.asset}
                </Typography>
              </Box>
              <Chip
                label={`${threat.priority} · ${threat.riskScore}`}
                size="small"
                sx={{ backgroundColor: colors.bg, color: colors.main, border: `1px solid ${colors.border}`, fontWeight: 700 }}
              />
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}