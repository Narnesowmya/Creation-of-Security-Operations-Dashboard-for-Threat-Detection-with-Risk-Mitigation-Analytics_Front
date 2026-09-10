import React from 'react';
import { Grid, Box, Alert, AlertTitle, Typography, Paper } from '@mui/material';
import KpiCard from './KpiCard.jsx';
import MouseGlowTiltCard from './MouseGlowTiltCard.jsx';
import { SEVERITY_COLORS } from '../theme/socTheme.js';
import {
  FiActivity,
  FiAlertOctagon,
  FiAlertTriangle,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiAlertCircle as FiErrorIcon
} from 'react-icons/fi';

export default function RiskOverviewCards({ riskSummary, loading, error }) {
  if (error) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          backgroundColor: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          borderRadius: '16px'
        }}
      >
        <Alert
          severity="error"
          variant="outlined"
          icon={<FiErrorIcon size={22} />}
          sx={{
            color: '#F8FAFC',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            p: 0,
            '& .MuiAlert-icon': { color: '#EF4444' }
          }}
        >
          <AlertTitle sx={{ fontWeight: 700, color: '#EF4444', mb: 0.5 }}>
            Failed to Load Risk Overview Metrics
          </AlertTitle>
          <Typography variant="body2" sx={{ color: '#94A3B8' }}>
            {typeof error === 'string' ? error : 'Unable to connect to risk summary telemetry API. Please verify backend status or retry.'}
          </Typography>
        </Alert>
      </Paper>
    );
  }

  const cards = [
    {
      title: 'Total Incidents',
      value: riskSummary?.total_incidents ?? 0,
      icon: FiActivity,
      color: {
        main: '#22D3EE',
        bg: 'rgba(34, 211, 238, 0.15)',
        border: 'rgba(34, 211, 238, 0.4)',
        glow: '0 0 16px rgba(34, 211, 238, 0.35)'
      },
      trend: 'up',
      trendValue: '+8%',
      subtitle: 'Aggregate active incidents'
    },
    {
      title: 'Critical Priority',
      value: riskSummary?.critical ?? 0,
      icon: FiAlertOctagon,
      color: SEVERITY_COLORS.Critical,
      trend: 'up',
      trendValue: '+3%',
      subtitle: 'Immediate triage required'
    },
    {
      title: 'High Priority',
      value: riskSummary?.high ?? 0,
      icon: FiAlertTriangle,
      color: SEVERITY_COLORS.High,
      trend: 'down',
      trendValue: '-5%',
      subtitle: 'Elevated risk operations'
    },
    {
      title: 'Medium Priority',
      value: riskSummary?.medium ?? 0,
      icon: FiAlertCircle,
      color: SEVERITY_COLORS.Medium,
      trend: 'down',
      trendValue: '-2%',
      subtitle: 'Moderate risk threshold'
    },
    {
      title: 'Low Priority',
      value: riskSummary?.low ?? 0,
      icon: FiCheckCircle,
      color: SEVERITY_COLORS.Low,
      trend: 'up',
      trendValue: '+4%',
      subtitle: 'Informational / benign'
    },
    {
      title: 'Open Incidents',
      value: riskSummary?.open_incidents ?? 0,
      icon: FiClock,
      color: {
        main: '#8B5CF6',
        bg: 'rgba(139, 92, 246, 0.15)',
        border: 'rgba(139, 92, 246, 0.4)',
        glow: '0 0 16px rgba(139, 92, 246, 0.35)'
      },
      trend: 'up',
      trendValue: '+6%',
      subtitle: 'Awaiting SOC resolution'
    }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        {cards.map((card, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={idx}>
            <MouseGlowTiltCard glowColor={card.color?.main || '#22D3EE'}>
              <KpiCard
                title={card.title}
                value={card.value}
                icon={card.icon}
                color={card.color}
                trend={card.trend}
                trendValue={card.trendValue}
                subtitle={card.subtitle}
                loading={loading}
              />
            </MouseGlowTiltCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
