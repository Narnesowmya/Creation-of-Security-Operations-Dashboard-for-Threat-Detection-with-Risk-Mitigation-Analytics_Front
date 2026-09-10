import React, { useMemo } from 'react';
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
import { Paper, Typography, Box, Skeleton, Alert } from '@mui/material';
import { FiTrendingUp, FiAlertTriangle } from 'react-icons/fi';
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

export default function RiskTrendChart({ data = [], incidents = [], loading, error }) {
  const trendData = useMemo(() => {
    if (data && data.length > 0 && data[0].date && typeof data[0].score !== 'undefined') {
      return data;
    }

    const list = Array.isArray(incidents) && incidents.length > 0 ? incidents : (Array.isArray(data) ? data : []);
    if (!list || list.length === 0) return [];

    // Group incidents by date
    const dailyScores = {};
    list.forEach(item => {
      const rawTimestamp = item.created_at || item.related_events?.[0]?.timestamp || item.attack_chain?.start_time;
      if (!rawTimestamp) return;
      const dateObj = new Date(rawTimestamp);
      if (isNaN(dateObj.getTime())) return;
      const dateKey = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()).getTime();
      
      if (!dailyScores[dateKey]) {
        dailyScores[dateKey] = { total: 0, count: 0, max: 0 };
      }
      const score = typeof item.risk_score === 'number' ? item.risk_score : 50;
      dailyScores[dateKey].total += score;
      dailyScores[dateKey].count += 1;
      if (score > dailyScores[dateKey].max) {
        dailyScores[dateKey].max = score;
      }
    });

    return Object.keys(dailyScores)
      .map(Number)
      .sort((a, b) => a - b)
      .map(timestamp => {
        const date = new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const avgScore = Math.round(dailyScores[timestamp].total / dailyScores[timestamp].count);
        return {
          date,
          score: avgScore,
          count: dailyScores[timestamp].count,
          maxScore: dailyScores[timestamp].max
        };
      });
  }, [data, incidents]);

  const labels = trendData.map(item => item.date);
  const scores = trendData.map(item => item.score);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Average Risk Score Index',
        data: scores,
        borderColor: '#F97316',
        borderWidth: 3,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, 'rgba(249, 115, 22, 0.4)');
          gradient.addColorStop(0.5, 'rgba(239, 68, 68, 0.15)');
          gradient.addColorStop(1, 'rgba(13, 15, 26, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#F97316',
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
        bodyColor: '#F97316',
        borderColor: 'rgba(249, 115, 22, 0.4)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const item = trendData[context.dataIndex];
            const extra = item?.count ? ` (${item.count} incident${item.count > 1 ? 's' : ''})` : '';
            return ` Avg Risk Score: ${context.parsed.y}/100${extra}`;
          }
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
        min: 0,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#94A3B8',
          font: { family: 'Inter', size: 11 },
          stepSize: 20
        }
      }
    }
  };

  return (
    <MouseGlowTiltCard glowColor="rgba(249, 115, 22, 0.25)">
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
            <FiTrendingUp size={20} color="#F97316" />
            <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC', fontSize: '1.05rem' }}>
              Incident Risk Score Trend
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
            Timeline Analysis
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, minHeight: 260, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {error ? (
            <Alert
              severity="error"
              variant="outlined"
              icon={<FiAlertTriangle size={20} />}
              sx={{
                width: '100%',
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                borderColor: 'rgba(239, 68, 68, 0.3)',
                color: '#F8FAFC'
              }}
            >
              Failed to load incident risk trend data.
            </Alert>
          ) : loading ? (
            <Skeleton variant="rectangular" width="100%" height={260} sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: 2 }} />
          ) : trendData.length === 0 ? (
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              No risk trend telemetry available
            </Typography>
          ) : (
            <Line data={chartData} options={options} />
          )}
        </Box>
      </Paper>
    </MouseGlowTiltCard>
  );
}
