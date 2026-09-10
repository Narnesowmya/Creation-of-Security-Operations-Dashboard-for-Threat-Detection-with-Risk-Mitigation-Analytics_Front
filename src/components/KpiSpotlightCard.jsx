import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Skeleton, Chip } from '@mui/material';
import { FiAlertOctagon, FiTrendingUp, FiShield } from 'react-icons/fi';
import { SEVERITY_COLORS } from '../theme/socTheme.js';

export default function KpiSpotlightCard({ value = 0, loading }) {
  const [displayVal, setDisplayVal] = useState(0);

  // Animated Count Up effect on load/update
  useEffect(() => {
    if (loading) return;
    let start = 0;
    const end = parseInt(value, 10) || 0;
    if (start === end) {
      setDisplayVal(end);
      return;
    }
    const duration = 1000;
    const stepTime = Math.abs(Math.floor(duration / (end || 1)));
    const timer = setInterval(() => {
      start += 1;
      setDisplayVal(start);
      if (start >= end) {
        setDisplayVal(end);
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [value, loading]);

  return (
    <Card
      sx={{
        height: '100%',
        backgroundColor: 'rgba(18, 17, 31, 0.85)',
        backdropFilter: 'blur(20px)',
        borderRadius: '18px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 0 35px rgba(239, 68, 68, 0.25)',
        border: '1px solid transparent',
        backgroundImage: 'linear-gradient(rgba(18, 17, 31, 0.9), rgba(18, 17, 31, 0.9)), linear-gradient(135deg, #EF4444, #8B5CF6, #22D3EE)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 0 45px rgba(239, 68, 68, 0.45)'
        }
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', '&:last-child': { pb: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              icon={<FiShield size={14} color="#EF4444" />}
              label="SPOTLIGHT CRITICAL METRIC"
              size="small"
              sx={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#EF4444',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                fontWeight: 800,
                fontSize: '0.68rem'
              }}
            />
          </Box>

          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: '14px',
              backgroundColor: 'rgba(239, 68, 68, 0.18)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#EF4444'
            }}
          >
            <FiAlertOctagon size={28} />
          </Box>
        </Box>

        <Box sx={{ my: 1.5 }}>
          <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Critical Threats Needing Immediate Response
          </Typography>

          {loading ? (
            <Skeleton variant="text" width="60%" height={64} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mt: 1 }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 800,
                  color: '#EF4444',
                  textShadow: '0 0 25px rgba(239, 68, 68, 0.6)',
                  lineHeight: 1
                }}
              >
                {displayVal}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.2,
                  py: 0.4,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  color: '#EF4444',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  fontSize: '0.8rem',
                  fontWeight: 800
                }}
              >
                <FiTrendingUp size={14} /> +8% vs 24h
              </Box>
            </Box>
          )}
        </Box>

        <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'block' }}>
          • Immediate SOC Analyst Incident Triage Priority 1
        </Typography>
      </CardContent>
    </Card>
  );
}
