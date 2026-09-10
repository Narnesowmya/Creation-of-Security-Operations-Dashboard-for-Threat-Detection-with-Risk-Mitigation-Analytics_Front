import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Box,
  Typography,
  Skeleton,
  Chip
} from '@mui/material';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { SEVERITY_COLORS } from '../theme/socTheme.js';
import ConfidenceCard from './ConfidenceCard.jsx';
import { useNavigate } from 'react-router-dom';

export default function ThreatTable({ predictions = [], loading }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('prediction_timestamp');
  const [order, setOrder] = useState('desc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedPredictions = [...predictions].sort((a, b) => {
    let aVal = a[orderBy];
    let bVal = b[orderBy];

    if (orderBy === 'prediction_timestamp') {
      aVal = aVal ? new Date(aVal).getTime() : 0;
      bVal = bVal ? new Date(bVal).getTime() : 0;
    } else if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (bVal < aVal) return order === 'asc' ? 1 : -1;
    if (bVal > aVal) return order === 'asc' ? -1 : 1;
    return 0;
  });

  const paginatedPredictions = sortedPredictions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'rgba(18, 17, 31, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(34, 211, 238, 0.15)',
        borderRadius: '16px',
        overflow: 'hidden'
      }}
    >
      {/* Header Bar */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: '1px solid rgba(34, 211, 238, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FiAlertCircle size={20} color="#22D3EE" />
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Sora", sans-serif',
              fontWeight: 700,
              color: '#F8FAFC',
              fontSize: '1.05rem'
            }}
          >
            AI Threat Predictions Stream
          </Typography>
          <Chip
            label={`${predictions.length} Predictions`}
            size="small"
            sx={{
              backgroundColor: 'rgba(34, 211, 238, 0.15)',
              color: '#22D3EE',
              border: '1px solid rgba(34, 211, 238, 0.35)',
              fontWeight: 800,
              fontSize: '0.75rem'
            }}
          />
        </Box>
      </Box>

      {/* Table Container */}
      <TableContainer sx={{ minHeight: 400 }}>
        <Table sx={{ minWidth: 700 }} aria-label="threat predictions table">
          <TableHead sx={{ backgroundColor: 'rgba(13, 15, 26, 0.85)' }}>
            <TableRow>
              <TableCell sx={{ color: '#94A3B8', fontWeight: 700, py: 2 }}>
                <TableSortLabel
                  active={orderBy === 'event_id'}
                  direction={orderBy === 'event_id' ? order : 'asc'}
                  onClick={() => handleRequestSort('event_id')}
                  sx={{
                    color: '#94A3B8 !important',
                    '&:hover': { color: '#F8FAFC !important' }
                  }}
                >
                  Event ID
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'threat_type'}
                  direction={orderBy === 'threat_type' ? order : 'asc'}
                  onClick={() => handleRequestSort('threat_type')}
                  sx={{
                    color: '#94A3B8 !important',
                    '&:hover': { color: '#F8FAFC !important' }
                  }}
                >
                  Event Type
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'prediction'}
                  direction={orderBy === 'prediction' ? order : 'asc'}
                  onClick={() => handleRequestSort('prediction')}
                  sx={{
                    color: '#94A3B8 !important',
                    '&:hover': { color: '#F8FAFC !important' }
                  }}
                >
                  Prediction
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'confidence_score'}
                  direction={orderBy === 'confidence_score' ? order : 'asc'}
                  onClick={() => handleRequestSort('confidence_score')}
                  sx={{
                    color: '#94A3B8 !important',
                    '&:hover': { color: '#F8FAFC !important' }
                  }}
                >
                  Confidence
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'severity'}
                  direction={orderBy === 'severity' ? order : 'asc'}
                  onClick={() => handleRequestSort('severity')}
                  sx={{
                    color: '#94A3B8 !important',
                    '&:hover': { color: '#F8FAFC !important' }
                  }}
                >
                  Severity
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'prediction_timestamp'}
                  direction={orderBy === 'prediction_timestamp' ? order : 'asc'}
                  onClick={() => handleRequestSort('prediction_timestamp')}
                  sx={{
                    color: '#94A3B8 !important',
                    '&:hover': { color: '#F8FAFC !important' }
                  }}
                >
                  Timestamp
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Skeleton variant="text" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rectangular" width={60} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: 1 }} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rectangular" width={80} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: 1 }} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} />
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedPredictions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                    <FiCheckCircle size={48} color="#10B981" />
                    <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                      No Threat Predictions Found
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                      There are no available predictions at this time.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedPredictions.map((pred) => {
                const severityStyle = SEVERITY_COLORS[pred.severity] || SEVERITY_COLORS.Low;
                const isCritical = pred.severity === 'Critical';

                return (
                  <TableRow
                    key={pred.event_id}
                    hover
                    onClick={() => navigate(`/events/${pred.event_id}`)}
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      borderLeft: isCritical ? '4px solid #EF4444' : '4px solid transparent',
                      boxShadow: isCritical ? 'inset 4px 0 12px rgba(239, 68, 68, 0.2)' : 'none',
                      backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.04)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(34, 211, 238, 0.08) !important',
                        transform: 'translateX(3px)'
                      },
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    {/* Event ID */}
                    <TableCell sx={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.9rem' }}>
                      {pred.event_id}
                    </TableCell>

                    {/* Event Type / threat_type */}
                    <TableCell sx={{ color: '#E2E8F0', fontSize: '0.9rem' }}>
                      {!pred.threat_type || pred.threat_type === 'None' ? '—' : pred.threat_type}
                    </TableCell>

                    {/* Prediction */}
                    <TableCell sx={{ color: '#F8FAFC', fontSize: '0.9rem' }}>
                      {pred.prediction || 'Unknown'}
                    </TableCell>

                    {/* Confidence */}
                    <TableCell>
                      <ConfidenceCard confidence_score={pred.confidence_score} />
                    </TableCell>

                    {/* Severity */}
                    <TableCell>
                      <Chip
                        label={pred.severity}
                        size="small"
                        sx={{
                          backgroundColor: severityStyle.bg,
                          color: severityStyle.main,
                          border: `1px solid ${severityStyle.border}`,
                          boxShadow: severityStyle.glow,
                          fontWeight: 800,
                          fontSize: '0.72rem',
                          height: 25
                        }}
                      />
                    </TableCell>

                    {/* Timestamp */}
                    <TableCell sx={{ color: '#E2E8F0', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      {pred.prediction_timestamp
                        ? new Date(pred.prediction_timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          })
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={predictions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: '#94A3B8',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          '.MuiTablePagination-selectIcon': { color: '#94A3B8' }
        }}
      />
    </Paper>
  );
}
