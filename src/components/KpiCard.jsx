import React from 'react';
import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function KpiCard({ title, value, icon: Icon, color, trend, trendValue, subtitle, loading }) {
  return (
    <Card
      sx={{
        height: '100%',
        backgroundColor: 'rgba(17, 24, 39, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: color ? color.main : '#00F2FE',
          boxShadow: color ? color.glow : '0 0 20px rgba(0, 242, 254, 0.35)'
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: color ? `linear-gradient(90deg, ${color.main} 0%, transparent 100%)` : 'linear-gradient(90deg, #00F2FE 0%, #4FACFE 100%)'
        }
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant="body2" sx={{ color: '#9CA3AF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', fontSize: '0.75rem' }}>
            {title}
          </Typography>

          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              backgroundColor: color ? color.bg : 'rgba(0, 242, 254, 0.15)',
              border: `1px solid ${color ? color.border : 'rgba(0, 242, 254, 0.4)'}`,
              boxShadow: color ? color.glow : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color ? color.main : '#00F2FE'
            }}
          >
            <Icon size={22} />
          </Box>
        </Box>

        {loading ? (
          <Skeleton variant="text" width="60%" height={48} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#F9FAFB', letterSpacing: '-0.03em' }}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </Typography>

            {trend && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1,
                  py: 0.3,
                  borderRadius: '8px',
                  backgroundColor: trend === 'up' ? 'rgba(255, 51, 102, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  color: trend === 'up' ? '#FF3366' : '#34D399',
                  border: `1px solid ${trend === 'up' ? 'rgba(255, 51, 102, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                  fontSize: '0.75rem',
                  fontWeight: 800
                }}
              >
                {trend === 'up' ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
                {trendValue}
              </Box>
            )}
          </Box>
        )}

        <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', mt: 1, fontWeight: 500 }}>
          {subtitle || 'Real-time telemetry metric'}
        </Typography>
      </CardContent>
    </Card>
  );
}
