import React from 'react';
import { Grid, Box } from '@mui/material';
import KpiCard from './KpiCard.jsx';
import KpiSpotlightCard from './KpiSpotlightCard.jsx';
import MouseGlowTiltCard from './MouseGlowTiltCard.jsx';
import { SEVERITY_COLORS } from '../theme/socTheme.js';
import {
  FiActivity,
  FiAlertTriangle,
  FiShieldOff,
  FiClock
} from 'react-icons/fi';

export default function KpiCards({ stats, loading }) {
  const secondaryCards = [
    {
      title: 'Total Telemetry Events',
      value: stats?.totalEvents ?? 0,
      icon: FiActivity,
      color: { main: '#22D3EE', bg: 'rgba(34, 211, 238, 0.15)', border: 'rgba(34, 211, 238, 0.4)', glow: '0 0 15px rgba(34, 211, 238, 0.3)' },
      trend: 'up',
      trendValue: '+12%',
      subtitle: 'Ingested security logs'
    },
    {
      title: 'High-Risk Events',
      value: stats?.highRiskEvents ?? 0,
      icon: FiAlertTriangle,
      color: SEVERITY_COLORS.High,
      trend: 'down',
      trendValue: '-4%',
      subtitle: 'Elevated threat triage'
    },
    {
      title: 'Anomalies Detected',
      value: stats?.anomaliesDetected ?? 0,
      icon: FiShieldOff,
      color: SEVERITY_COLORS.Medium,
      trend: 'down',
      trendValue: '-2%',
      subtitle: 'Flagged by AI engine'
    },
    {
      title: 'Normal Events',
      value: stats?.normalEvents ?? 0,
      icon: FiClock,
      color: { main: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.4)', glow: '0 0 15px rgba(139, 92, 246, 0.3)' },
      trend: 'up',
      trendValue: '+5%',
      subtitle: 'Safe events stream'
    }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2.5}>
        {/* Left Asymmetric Spotlight Hero Card (~40% desktop) */}
        <Grid item xs={12} lg={5}>
          <MouseGlowTiltCard glowColor="rgba(239, 68, 68, 0.35)">
            <KpiSpotlightCard value={stats?.criticalThreats ?? 0} loading={loading} />
          </MouseGlowTiltCard>
        </Grid>

        {/* Right 2x2 Grid for Remaining 4 Cards (~60% desktop) */}
        <Grid item xs={12} lg={7}>
          <Grid container spacing={2}>
            {secondaryCards.map((card, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
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
        </Grid>
      </Grid>
    </Box>
  );
}