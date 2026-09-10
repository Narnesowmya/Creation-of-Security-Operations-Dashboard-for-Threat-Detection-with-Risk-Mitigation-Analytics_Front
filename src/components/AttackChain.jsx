import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { FiArrowRight } from 'react-icons/fi';

const DEFAULT_STAGES = [
  'Initial Access',
  'Credential Access',
  'Privilege Escalation',
  'Lateral Movement',
  'Data Exfiltration'
];

export default function AttackChain({ stages = DEFAULT_STAGES, activeStages = [] }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: 'rgba(18, 17, 31, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(34, 211, 238, 0.2)',
        borderRadius: '16px'
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC', mb: 2.5 }}
      >
        Attack Chain
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        {stages.map((stage, idx) => {
          const isActive = activeStages.includes(stage);
          return (
            <React.Fragment key={stage}>
              <Box
                sx={{
                  px: 2,
                  py: 1.2,
                  borderRadius: '10px',
                  border: isActive ? '1px solid rgba(239, 68, 68, 0.6)' : '1px solid rgba(148, 163, 184, 0.2)',
                  backgroundColor: isActive ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  boxShadow: isActive ? '0 0 16px rgba(239, 68, 68, 0.25)' : 'none',
                  minWidth: 150,
                  textAlign: 'center'
                }}
              >
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: isActive ? '#F87171' : '#94A3B8' }}>
                  {stage}
                </Typography>
              </Box>
              {idx < stages.length - 1 && <FiArrowRight size={18} color="rgba(148, 163, 184, 0.4)" />}
            </React.Fragment>
          );
        })}
      </Box>
    </Paper>
  );
}