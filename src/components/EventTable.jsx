import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Chip,
  Box,
  Typography,
  IconButton,
  Skeleton,
  Tooltip
} from '@mui/material';
import { FiEye, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { SEVERITY_COLORS, STATUS_COLORS } from '../theme/socTheme.js';

export default function EventTable({ events = [], loading, onSelectEvent }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('timestamp');
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

  const sortedEvents = [...events].sort((a, b) => {
    let aVal = a[orderBy];
    let bVal = b[orderBy];

    if (orderBy === 'timestamp') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    } else if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (bVal < aVal) return order === 'asc' ? 1 : -1;
    if (bVal > aVal) return order === 'asc' ? -1 : 1;
    return 0;
  });

  const paginatedEvents = sortedEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
          <Typography variant="h6" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC', fontSize: '1.05rem' }}>
            Security Events & Network Telemetry Stream
          </Typography>
          <Chip
            label={`${events.length} Events`}
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
        <Table sx={{ minWidth: 700 }} aria-label="security events table">
          <TableHead sx={{ backgroundColor: 'rgba(13, 15, 26, 0.85)' }}>
            <TableRow>
              <TableCell sx={{ color: '#94A3B8', fontWeight: 700, py: 2 }}>
                <TableSortLabel
                  active={orderBy === 'timestamp'}
                  direction={orderBy === 'timestamp' ? order : 'asc'}
                  onClick={() => handleRequestSort('timestamp')}
                  sx={{ color: '#94A3B8 !important', '&:hover': { color: '#F8FAFC !important' } }}
                >
                  Time / Timestamp
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'eventType'}
                  direction={orderBy === 'eventType' ? order : 'asc'}
                  onClick={() => handleRequestSort('eventType')}
                  sx={{ color: '#94A3B8 !important', '&:hover': { color: '#F8FAFC !important' } }}
                >
                  Event Type
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'severity'}
                  direction={orderBy === 'severity' ? order : 'asc'}
                  onClick={() => handleRequestSort('severity')}
                  sx={{ color: '#94A3B8 !important', '&:hover': { color: '#F8FAFC !important' } }}
                >
                  Severity
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'sourceIP'}
                  direction={orderBy === 'sourceIP' ? order : 'asc'}
                  onClick={() => handleRequestSort('sourceIP')}
                  sx={{ color: '#94A3B8 !important', '&:hover': { color: '#F8FAFC !important' } }}
                >
                  Source IP
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleRequestSort('status')}
                  sx={{ color: '#94A3B8 !important', '&:hover': { color: '#F8FAFC !important' } }}
                >
                  Status
                </TableSortLabel>
              </TableCell>

              <TableCell align="right" sx={{ color: '#94A3B8', fontWeight: 700, pr: 3 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell><Skeleton variant="text" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} /></TableCell>
                  <TableCell><Skeleton variant="text" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={80} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: 1 }} /></TableCell>
                  <TableCell><Skeleton variant="text" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={80} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: 1 }} /></TableCell>
                  <TableCell align="right"><Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', display: 'inline-block' }} /></TableCell>
                </TableRow>
              ))
            ) : paginatedEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                    <FiCheckCircle size={48} color="#10B981" />
                    <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                      No Telemetry Events Match Criteria
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                      Try clearing or adjusting active severity/timeframe filters.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedEvents.map((evt) => {
                const severityStyle = SEVERITY_COLORS[evt.severity] || SEVERITY_COLORS.Low;
                const statusStyle = STATUS_COLORS[evt.status] || STATUS_COLORS.Open;
                const isCritical = evt.severity === 'Critical';

                return (
                  <TableRow
                    key={evt.id}
                    hover
                    onClick={() => onSelectEvent(evt)}
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
                    {/* Time */}
                    <TableCell sx={{ color: '#E2E8F0', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      {new Date(evt.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </TableCell>

                    {/* Event Type */}
                    <TableCell sx={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.9rem' }}>
                      {evt.eventType}
                    </TableCell>

                    {/* Severity Chip */}
                    <TableCell>
                      <Chip
                        label={evt.severity}
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

                    {/* Source IP */}
                    <TableCell sx={{ color: '#22D3EE', fontFamily: 'monospace', fontWeight: 700, fontSize: '0.875rem' }}>
                      {evt.sourceIP}
                    </TableCell>

                    {/* Status Chip */}
                    <TableCell>
                      <Chip
                        label={evt.status}
                        size="small"
                        sx={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.main,
                          border: `1px solid ${statusStyle.border}`,
                          fontWeight: 800,
                          fontSize: '0.72rem',
                          height: 25
                        }}
                      />
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right" sx={{ pr: 2 }}>
                      <Tooltip title="Inspect Telemetry Payload">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectEvent(evt);
                          }}
                          sx={{
                            color: '#94A3B8',
                            '&:hover': { color: '#22D3EE', backgroundColor: 'rgba(34, 211, 238, 0.15)' }
                          }}
                        >
                          <FiEye size={18} />
                        </IconButton>
                      </Tooltip>
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
        count={events.length}
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
