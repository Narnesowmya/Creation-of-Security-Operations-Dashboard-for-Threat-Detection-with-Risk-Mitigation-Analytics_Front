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
import { FiBarChart2 } from 'react-icons/fi';
import MouseGlowTiltCard from '../components/MouseGlowTiltCard.jsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TopAttackTypesChart({ data = [], loading }) {
  const attackTypes = [
    'Brute Force',
    'Malware',
    'Phishing',
    'SQL Injection',
    'Privilege Escalation'
  ];

  const labels = attackTypes;

  const counts = attackTypes.map((type) => {
    const item = data.find((entry) => entry.type === type);
    return item ? item.count : 0;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Incident Occurrences',
        data: counts,
        backgroundColor: [
          '#EF4444',
          '#F97316',
          '#FBBF24',
          '#22D3EE',
          '#8B5CF6'
        ],
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
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
        padding: 12
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
          font: {
            family: 'Inter',
            size: 11
          },
          precision: 0
        },
        beginAtZero: true
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: '#F8FAFC',
          font: {
            family: 'Inter',
            size: 12,
            weight: '600'
          }
        }
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
            <FiBarChart2 size={20} color="#22D3EE" />

            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Sora", sans-serif',
                fontWeight: 700,
                color: '#F8FAFC',
                fontSize: '1.05rem'
              }}
            >
              Top Attack Vectors Frequency
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
          ) : labels.length === 0 ? (
            <Typography
              variant="body2"
              sx={{
                color: '#64748B',
                textAlign: 'center',
                pt: 8
              }}
            >
              No attack vectors match current filter criteria
            </Typography>
          ) : (
            <Bar data={chartData} options={options} />
          )}
        </Box>
      </Paper>
    </MouseGlowTiltCard>
  );
}