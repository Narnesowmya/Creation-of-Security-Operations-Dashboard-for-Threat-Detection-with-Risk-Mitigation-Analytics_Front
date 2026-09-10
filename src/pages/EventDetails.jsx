import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  Button,
  CircularProgress,
  LinearProgress,
  Divider
} from '@mui/material';
import { FiArrowLeft, FiAlertTriangle, FiCpu, FiTrendingUp } from 'react-icons/fi';
import { getEventById } from '../services/api.js';
import { SEVERITY_COLORS } from '../theme/socTheme.js';

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getEventById(eventId)
      .then((data) => {
        const record = data?.event || data;
        if (record && record.event_id) {
          setEvent(record);
          setError(null);
        } else {
          setError('Event details not found.');
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch event details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: '#22D3EE' }} />
      </Box>
    );
  }

  if (error || !event) {
    return (
      <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Button
          startIcon={<FiArrowLeft />}
          onClick={() => navigate('/dashboard/threat-intel')}
          sx={{ color: '#94A3B8', mb: 3, '&:hover': { color: '#22D3EE' } }}
        >
          Back to Threat Intelligence
        </Button>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: 'rgba(18, 17, 31, 0.75)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '16px'
          }}
        >
          <FiAlertTriangle size={48} color="#EF4444" style={{ marginBottom: '16px' }} />
          <Typography variant="h5" sx={{ color: '#F8FAFC', fontWeight: 700, mb: 1 }}>
            Error Loading Event Details
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', mb: 3 }}>
            {error || 'The requested event could not be found or retrieved.'}
          </Typography>
        </Paper>
      </Box>
    );
  }

  const severityStyle = SEVERITY_COLORS[event.severity] || SEVERITY_COLORS.Low;

  // Inline confidence color threshold rules:
  // - confidence_score > 80 -> red
  // - confidence_score >= 50 and <= 80 -> orange
  // - confidence_score < 50 -> green
  let confidenceColor = '#10B981'; // green
  if (event.confidence_score > 80) {
    confidenceColor = '#EF4444'; // red
  } else if (event.confidence_score >= 50) {
    confidenceColor = '#F97316'; // orange
  }

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: 'auto' }}>
      {/* Back Button */}
      <Button
        startIcon={<FiArrowLeft />}
        onClick={() => navigate('/dashboard/threat-intel')}
        sx={{
          color: '#94A3B8',
          mb: 3,
          fontWeight: 700,
          fontFamily: '"Sora", sans-serif',
          '&:hover': { color: '#22D3EE', backgroundColor: 'rgba(34, 211, 238, 0.08)' }
        }}
      >
        Back to Threat Intelligence
      </Button>

      {/* Main Details Card */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          backgroundColor: 'rgba(18, 17, 31, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(34, 211, 238, 0.15)',
          borderRadius: '16px'
        }}
      >
        {/* Header Block */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            mb: 4,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            pb: 3
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '10px',
                backgroundColor: severityStyle.bg,
                color: severityStyle.main,
                border: `1px solid ${severityStyle.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: severityStyle.glow
              }}
            >
              <FiAlertTriangle size={24} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#F8FAFC', fontFamily: '"Sora", sans-serif' }}>
                {event.event_id}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mt: 0.5 }}>
                Prediction Timestamp: {event.prediction_timestamp ? new Date(event.prediction_timestamp).toLocaleString() : 'N/A'}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Chip
              label={`SEVERITY: ${event.severity ? event.severity.toUpperCase() : 'LOW'}`}
              sx={{
                backgroundColor: severityStyle.bg,
                color: severityStyle.main,
                border: `1px solid ${severityStyle.border}`,
                boxShadow: severityStyle.glow,
                fontWeight: 800,
                fontSize: '0.75rem',
                height: 28
              }}
            />
          </Box>
        </Box>

        {/* Content Grid */}
        <Grid container spacing={4}>
          {/* Left Column - Confidence & AI Metrics */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Confidence Score Paper */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  backgroundColor: 'rgba(13, 15, 26, 0.75)',
                  border: '1px solid rgba(34, 211, 238, 0.12)',
                  borderRadius: '12px'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <FiCpu color="#22D3EE" size={20} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#F8FAFC', fontFamily: '"Sora", sans-serif' }}>
                      Prediction Confidence
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: confidenceColor,
                      fontFamily: '"Sora", sans-serif'
                    }}
                  >
                    {typeof event.confidence_score === 'number' ? `${event.confidence_score.toFixed(1)}%` : `${event.confidence_score}%`}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={event.confidence_score || 0}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: confidenceColor
                    }
                  }}
                />
              </Paper>

              {/* Anomaly Score Paper */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  backgroundColor: 'rgba(13, 15, 26, 0.75)',
                  border: '1px solid rgba(34, 211, 238, 0.12)',
                  borderRadius: '12px'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <FiTrendingUp color="#8B5CF6" size={20} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#F8FAFC', fontFamily: '"Sora", sans-serif' }}>
                      Anomaly Score
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: '#8B5CF6',
                      fontFamily: '"Sora", sans-serif'
                    }}
                  >
                    {typeof event.anomaly_score === 'number' ? event.anomaly_score.toFixed(3) : event.anomaly_score}
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>

          {/* Right Column - Event Telemetry Detail Grid */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ color: '#94A3B8', mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}
              >
                AI Model & Threat Telemetry
              </Typography>
              <Grid container spacing={2.5}>
                {/* Event Type / threat_type */}
                <Grid item xs={12}>
                  <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5, fontWeight: 600 }}>
                      Event Type
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#F8FAFC' }}>
                      {event.threat_type || 'N/A'}
                    </Typography>
                  </Box>
                </Grid>

                {/* Prediction */}
                <Grid item xs={6}>
                  <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5, fontWeight: 600 }}>
                      Prediction
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#22D3EE' }}>
                      {event.prediction || 'Unknown'}
                    </Typography>
                  </Box>
                </Grid>

                {/* Model Version */}
                <Grid item xs={6}>
                  <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5, fontWeight: 600 }}>
                      AI Model Version
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#F8FAFC', fontFamily: 'monospace' }}>
                      {event.model_version || 'N/A'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', my: 4 }} />

        {/* AI Analysis Section */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ color: '#94A3B8', mb: 2, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}
          >
            AI Analysis
          </Typography>
          <Grid container spacing={2.5}>
            {/* Prediction */}
            <Grid item xs={6} sm={4}>
              <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5, fontWeight: 600 }}>
                  Prediction
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#22D3EE' }}>
                  {event.prediction || 'Unknown'}
                </Typography>
              </Box>
            </Grid>

            {/* Threat Type */}
            <Grid item xs={6} sm={4}>
              <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5, fontWeight: 600 }}>
                  Threat Type
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#F8FAFC' }}>
                  {event.threat_type || 'N/A'}
                </Typography>
              </Box>
            </Grid>

            {/* Severity */}
            <Grid item xs={6} sm={4}>
              <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', minHeight: 64 }}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5, fontWeight: 600 }}>
                  Severity
                </Typography>
                <Chip
                  label={event.severity}
                  size="small"
                  sx={{
                    backgroundColor: severityStyle.bg,
                    color: severityStyle.main,
                    border: `1px solid ${severityStyle.border}`,
                    boxShadow: severityStyle.glow,
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    height: 25,
                    alignSelf: 'flex-start'
                  }}
                />
              </Box>
            </Grid>

            {/* Confidence % */}
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                    Confidence %
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: confidenceColor }}>
                    {typeof event.confidence_score === 'number' ? `${event.confidence_score.toFixed(1)}%` : `${event.confidence_score}%`}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={event.confidence_score || 0}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: confidenceColor
                    }
                  }}
                />
              </Box>
            </Grid>

            {/* Anomaly Score */}
            <Grid item xs={6} sm={3}>
              <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5, fontWeight: 600 }}>
                  Anomaly Score
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#8B5CF6' }}>
                  {typeof event.anomaly_score === 'number' ? event.anomaly_score.toFixed(3) : event.anomaly_score}
                </Typography>
              </Box>
            </Grid>

            {/* Model Version */}
            <Grid item xs={6} sm={3}>
              <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: 'rgba(13, 15, 26, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5, fontWeight: 600 }}>
                  Model Version
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#F8FAFC', fontFamily: 'monospace' }}>
                  {event.model_version || 'N/A'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
