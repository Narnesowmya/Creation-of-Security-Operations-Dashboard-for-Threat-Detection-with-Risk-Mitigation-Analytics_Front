import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Paper, Typography, Box, Skeleton } from '@mui/material';
import { FiTrendingUp } from 'react-icons/fi';
import MouseGlowTiltCard from '../components/MouseGlowTiltCard.jsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function EventTrendChart({ data = [], loading }) {
  const labels = data.map(item => item.date);
  const counts = data.map(item => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Vigilon Telemetry Events',
        data: counts,
        borderColor: '#22D3EE',
        borderWidth: 3,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, 'rgba(34, 211, 238, 0.35)');
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#22D3EE',
        pointBorderColor: '#0D0F1A',
        pointBorderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(13, 15, 26, 0.92)',
        titleColor: '#F8FAFC',
        bodyColor: '#22D3EE',
        borderColor: 'rgba(34, 211, 238, 0.3)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        displayColors: false,
        callbacks: {
          label: (context) => `Events Recorded: ${context.parsed.y}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#94A3B8',
          font: { family: 'Inter', size: 11 }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#94A3B8',
          font: { family: 'Inter', size: 11 },
          precision: 0
        },
        beginAtZero: true
      }
    }
  };

  return (
    <MouseGlowTiltCard glowColor="rgba(34, 211, 238, 0.3)">
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
            <FiTrendingUp size={20} color="#22D3EE" />
            <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC', fontSize: '1.05rem' }}>
              Event Trend Telemetry (Over Time)
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1, minHeight: 260, position: 'relative' }}>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={260} sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: 2 }} />
          ) : (
            <Line data={chartData} options={options} />
          )}
        </Box>
      </Paper>
    </MouseGlowTiltCard>
  );
}
