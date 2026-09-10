import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Chip,
  Divider,
  Button,
  Grid,
  Paper,
  LinearProgress
} from '@mui/material';
import { FiX, FiShield, FiAlertTriangle, FiCpu, FiCheckCircle, FiClock, FiServer } from 'react-icons/fi';
import { SEVERITY_COLORS, STATUS_COLORS } from '../theme/socTheme.js';

export default function EventDetailDrawer({ open, event, onClose, onStatusChange }) {
  if (!event) return null;

  const severityStyle = SEVERITY_COLORS[event.severity] || SEVERITY_COLORS.Low;
  const statusStyle = STATUS_COLORS[event.status] || STATUS_COLORS.Open;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 460 },
          backgroundColor: '#0B0F17',
          borderLeft: '1px solid #1F2937',
          p: 0
        }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          backgroundColor: '#111827',
          borderBottom: '1px solid #1F2937',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '8px',
              backgroundColor: severityStyle.bg,
              color: severityStyle.main,
              border: `1px solid ${severityStyle.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FiAlertTriangle size={20} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#F3F4F6', fontSize: '1rem' }}>
              {event.id}
            </Typography>

            <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
              {new Date(event.timestamp).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <IconButton onClick={onClose} sx={{ color: '#9CA3AF' }}>
          <FiX size={20} />
        </IconButton>
      </Box>

      {/* Main Drawer Body */}
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3, overflowY: 'auto' }}>
        {/* Severity & Status Badges */}
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Chip
            label={`SEVERITY: ${event.severity.toUpperCase()}`}
            sx={{
              backgroundColor: severityStyle.bg,
              color: severityStyle.main,
              border: `1px solid ${severityStyle.border}`,
              fontWeight: 700,
              fontSize: '0.75rem'
            }}
          />

          <Chip
            label={`STATUS: ${event.status.toUpperCase()}`}
            sx={{
              backgroundColor: statusStyle.bg,
              color: statusStyle.main,
              border: `1px solid ${statusStyle.border}`,
              fontWeight: 700,
              fontSize: '0.75rem'
            }}
          />
        </Box>

        {/* AI Threat Score Card */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            backgroundColor: 'rgba(17, 24, 39, 0.8)',
            border: '1px solid #1F2937',
            borderRadius: '10px'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FiCpu color="#3B82F6" size={18} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#F3F4F6' }}>
                SentinelAI Threat Index
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: event.aiRiskScore > 75 ? '#EF4444' : event.aiRiskScore > 40 ? '#FBBF24' : '#10B981'
              }}
            >
              {event.aiRiskScore}/100
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={event.aiRiskScore}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: '#1F2937',
              '& .MuiLinearProgress-bar': {
                backgroundColor: event.aiRiskScore > 75 ? '#EF4444' : event.aiRiskScore > 40 ? '#FBBF24' : '#10B981'
              }
            }}
          />
        </Paper>

        {/* Technical Event Details Grid */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#9CA3AF', mb: 1.5, fontWeight: 700, textTransform: 'uppercase' }}>
            Event Telemetry
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ p: 1.5, borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #1F2937' }}>
                <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                  Event Type
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#F3F4F6' }}>
                  {event.eventType}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ p: 1.5, borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #1F2937' }}>
                <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                  Source IP
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#60A5FA', fontFamily: 'monospace' }}>
                  {event.sourceIP}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ p: 1.5, borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #1F2937' }}>
                <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                  Destination IP
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#F3F4F6', fontFamily: 'monospace' }}>
                  {event.destinationIP}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ p: 1.5, borderRadius: '8px', backgroundColor: '#111827', border: '1px solid #1F2937' }}>
                <Typography variant="caption" sx={{ color: '#6B7280', display: 'block' }}>
                  Target Asset
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#FBBF24' }}>
                  {event.affectedAsset}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Payload / Description */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#9CA3AF', mb: 1, fontWeight: 700 }}>
            Incident Description
          </Typography>
          <Paper
            elevation={0}
            sx={{ p: 2, backgroundColor: '#111827', border: '1px solid #1F2937', color: '#D1D5DB', fontSize: '0.85rem' }}
          >
            {event.description}
          </Paper>
        </Box>

        {/* AI Action Guidance */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#3B82F6', mb: 1, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
            <FiShield /> Recommended Remediation
          </Typography>
          <Paper
            elevation={0}
            sx={{ p: 2, backgroundColor: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#93C5FD', fontSize: '0.85rem' }}
          >
            {event.recommendation}
          </Paper>
        </Box>

        <Divider sx={{ borderColor: '#1F2937', my: 1 }} />

        {/* Status Update Action Controls */}
        <Box>
          <Typography variant="subtitle2" sx={{ color: '#9CA3AF', mb: 1.5, fontWeight: 700 }}>
            Analyst Triage Action
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              fullWidth
              variant={event.status === 'Investigating' ? 'contained' : 'outlined'}
              color="primary"
              size="small"
              onClick={() => onStatusChange(event.id, 'Investigating')}
              startIcon={<FiClock />}
              sx={{ py: 1 }}
            >
              Investigate
            </Button>

            <Button
              fullWidth
              variant={event.status === 'Resolved' ? 'contained' : 'outlined'}
              color="success"
              size="small"
              onClick={() => onStatusChange(event.id, 'Resolved')}
              startIcon={<FiCheckCircle />}
              sx={{ py: 1 }}
            >
              Resolve
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
