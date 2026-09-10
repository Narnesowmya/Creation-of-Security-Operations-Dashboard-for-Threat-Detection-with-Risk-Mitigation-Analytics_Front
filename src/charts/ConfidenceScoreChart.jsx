import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Paper, Typography, Box, Skeleton } from '@mui/material';
import { FiTrendingUp } from 'react-icons/fi';
import MouseGlowTiltCard from '../components/MouseGlowTiltCard.jsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ConfidenceScoreChart({ data = [], loading }) {
  const fallbackData = [
    { label: 'Very Low', score: 20 },
    { label: 'Low', score: 40 },
    { label: 'Medium', score: 60 },
    { label: 'High', score: 80 },
    { label: 'Very High', score: 95 }
  ];

  const chartPoints = data && data.length > 0 ? data : fallbackData;
  const labels = chartPoints.map(point => point.label || point.category || '');
  const scores = chartPoints.map(point => point.score ?? point.value ?? 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Confidence Level (%)',
        data: scores,
        backgroundColor: 'rgba(34, 211, 238, 0.75)',
        hoverBackgroundColor: '#22D3EE',
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        padding: 12
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#94A3B8',
          font: {
            family: 'Inter',
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#94A3B8',
          font: {
            family: 'Inter',
            size: 11
          },
          min: 0,
          max: 100
        }
      }
    }
  };

  return (
    <MouseGlowTiltCard glowColor="rgba(34, 211, 238, 0.2)">
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <FiTrendingUp size={20} color="#22D3EE" />

            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Sora", sans-serif',
                fontWeight: 700,
                color: '#F8FAFC',
                fontSize: '1.05rem'
              }}
            >
              Alert Confidence Score Index
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            minHeight: 250,
            position: 'relative'
          }}
        >
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={250}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 2
              }}
            />
          ) : (
            <Bar data={chartData} options={options} />
          )}
        </Box>
      </Paper>
    </MouseGlowTiltCard>
  );
}