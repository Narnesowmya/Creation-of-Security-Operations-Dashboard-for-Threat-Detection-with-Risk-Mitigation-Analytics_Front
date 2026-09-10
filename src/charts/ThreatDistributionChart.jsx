import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Paper, Typography, Box, Skeleton } from '@mui/material';
import { SEVERITY_COLORS } from '../theme/socTheme.js';
import { FiPieChart } from 'react-icons/fi';
import MouseGlowTiltCard from '../components/MouseGlowTiltCard.jsx';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ThreatDistributionChart({ data, loading }) {
  const chartData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        data: [
          data?.Critical ?? 0,
          data?.High ?? 0,
          data?.Medium ?? 0,
          data?.Low ?? 0
        ],
        backgroundColor: [
          SEVERITY_COLORS.Critical.main,
          SEVERITY_COLORS.High.main,
          SEVERITY_COLORS.Medium.main,
          SEVERITY_COLORS.Low.main
        ],
        borderColor: '#0D0F1A',
        borderWidth: 3,
        hoverOffset: 8
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94A3B8',
          font: { family: 'Inter', size: 12, weight: '600' },
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(13, 15, 26, 0.92)',
        titleColor: '#F8FAFC',
        bodyColor: '#94A3B8',
        borderColor: 'rgba(34, 211, 238, 0.3)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true
      }
    },
    cutout: '74%'
  };

  const total = (data?.Critical || 0) + (data?.High || 0) + (data?.Medium || 0) + (data?.Low || 0);

  return (
    <MouseGlowTiltCard glowColor="rgba(139, 92, 246, 0.3)">
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          height: '100%',
          backgroundColor: 'rgba(18, 17, 31, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(34, 211, 238, 0.15)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <FiPieChart size={20} color="#8B5CF6" />
            <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC', fontSize: '1.05rem' }}>
              Threat Severity Distribution
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }}>
            {total} Total Incidents
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, minHeight: 250, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loading ? (
            <Skeleton variant="circular" width={180} height={180} sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} />
          ) : total === 0 ? (
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              No distribution telemetry available
            </Typography>
          ) : (
            <>
              <Doughnut data={chartData} options={options} />
              <Box
                sx={{
                  position: 'absolute',
                  top: '44%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none'
                }}
              >
                <Typography variant="h4" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: '#F8FAFC', lineHeight: 1 }}>
                  {total}
                </Typography>
                <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  Events
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </MouseGlowTiltCard>
  );
}
