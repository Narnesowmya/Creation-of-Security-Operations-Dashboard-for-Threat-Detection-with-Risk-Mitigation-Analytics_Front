import React from 'react';
import { Box, Paper, Typography, Chip, List, ListItem, ListItemText } from '@mui/material';
import { FiShield } from 'react-icons/fi';
import { SEVERITY_COLORS } from '../theme/socTheme.js';

export default function RecommendationPanel({ recommendation }) {
  if (!recommendation) {
    return (
      <Paper
        elevation={0}
        sx={{ p: 3, backgroundColor: 'rgba(18, 17, 31, 0.85)', border: '1px solid rgba(34, 211, 238, 0.2)', borderRadius: '16px' }}
      >
        <Typography sx={{ color: '#94A3B8', fontSize: '0.9rem' }}>
          Select a correlated threat to see the recommended response.
        </Typography>
      </Paper>
    );
  }

  const { riskScore, priority = 'Medium', actions = [] } = recommendation;
  const colors = SEVERITY_COLORS[priority] || SEVERITY_COLORS.Medium;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: 'rgba(18, 17, 31, 0.85)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${colors.border}`,
        borderRadius: '16px'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <FiShield size={18} color={colors.main} />
          <Typography sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC' }}>
            Response Recommendation
          </Typography>
        </Box>
        <Chip
          label={`${priority} · ${riskScore}/100`}
          sx={{ backgroundColor: colors.bg, color: colors.main, border: `1px solid ${colors.border}`, fontWeight: 700 }}
        />
      </Box>

      <List dense>
        {actions.length === 0 && (
          <Typography sx={{ color: '#94A3B8', fontSize: '0.85rem' }}>
            No specific actions returned for this priority level.
          </Typography>
        )}
        {actions.map((action, idx) => (
          <ListItem key={idx} sx={{ pl: 0 }}>
            <ListItemText primary={action} primaryTypographyProps={{ sx: { color: '#E2E8F0', fontSize: '0.9rem' } }} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}