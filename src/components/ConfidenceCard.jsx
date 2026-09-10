import React from 'react';
import { Chip } from '@mui/material';

export default function ConfidenceCard({ confidence_score = 0 }) {
  // Determine color coding based on target rules:
  // - confidence_score > 80 -> red
  // - confidence_score >= 50 and <= 80 -> orange
  // - confidence_score < 50 -> green
  let colors = {
    main: '#10B981', // green
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.4)',
    glow: '0 0 8px rgba(16, 185, 129, 0.2)'
  };

  if (confidence_score > 80) {
    colors = {
      main: '#EF4444', // red
      bg: 'rgba(239, 68, 68, 0.12)',
      border: 'rgba(239, 68, 68, 0.4)',
      glow: '0 0 8px rgba(239, 68, 68, 0.2)'
    };
  } else if (confidence_score >= 50) {
    colors = {
      main: '#F97316', // orange
      bg: 'rgba(249, 115, 22, 0.12)',
      border: 'rgba(249, 115, 22, 0.4)',
      glow: '0 0 8px rgba(249, 115, 22, 0.2)'
    };
  }

  // Format confidence score percentage display
  const formattedScore = typeof confidence_score === 'number'
    ? `${confidence_score.toFixed(1)}%`
    : `${confidence_score}%`;

  return (
    <Chip
      label={formattedScore}
      size="small"
      sx={{
        backgroundColor: colors.bg,
        color: colors.main,
        border: `1px solid ${colors.border}`,
        boxShadow: colors.glow,
        fontWeight: 800,
        fontSize: '0.72rem',
        height: 25
      }}
    />
  );
}
