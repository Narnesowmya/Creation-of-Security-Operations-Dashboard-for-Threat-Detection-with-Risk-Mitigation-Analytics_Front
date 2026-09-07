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
  Chip,
  LinearProgress,
  Alert
} from '@mui/material';
import { FiShield, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { SEVERITY_COLORS, STATUS_COLORS } from '../theme/socTheme.js';
import { useNavigate } from 'react-router-dom';

export default function PriorityTable({ incidents = [], loading, error }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('risk_score');
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

  const sortedIncidents = [...incidents].sort((a, b) => {
    let aVal = a[orderBy];
    let bVal = b[orderBy];

    if (orderBy === 'risk_score') {
      aVal = Number(aVal) || 0;
      bVal = Number(bVal) || 0;
    } else if (orderBy === 'created_at') {
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

  const paginatedIncidents = sortedIncidents.slice(
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
          <FiShield size={20} color="#F97316" />
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Sora", sans-serif',
              fontWeight: 700,
              color: '#F8FAFC',
              fontSize: '1.05rem'
            }}
          >
            Incident Priority & Risk Queue
          </Typography>
          <Chip
            label={`${incidents.length} Incidents`}
            size="small"
            sx={{
              backgroundColor: 'rgba(249, 115, 22, 0.15)',
              color: '#F97316',
              border: '1px solid rgba(249, 115, 22, 0.35)',
              fontWeight: 800,
              fontSize: '0.75rem'
            }}
          />
        </Box>
      </Box>

      {/* Error state */}
      {error && (
        <Box sx={{ p: 2 }}>
          <Alert
            severity="error"
            variant="outlined"
            icon={<FiAlertTriangle size={20} />}
            sx={{
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              borderColor: 'rgba(239, 68, 68, 0.3)',
              color: '#F8FAFC'
            }}
          >
            {typeof error === 'string' ? error : 'Failed to load incident priority data.'}
          </Alert>
        </Box>
      )}

      {/* Table Container */}
      <TableContainer sx={{ minHeight: 380 }}>
        <Table sx={{ minWidth: 720 }} aria-label="incident priority table">
          <TableHead sx={{ backgroundColor: 'rgba(13, 15, 26, 0.85)' }}>
            <TableRow>
              <TableCell sx={{ color: '#94A3B8', fontWeight: 700, py: 2 }}>
                <TableSortLabel
                  active={orderBy === 'incident_id'}
                  direction={orderBy === 'incident_id' ? order : 'asc'}
                  onClick={() => handleRequestSort('incident_id')}
                  sx={{ color: '#94A3B8 !important', '&:hover': { color: '#F8FAFC !important' } }}
                >
                  Incident
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'threat_type'}
                  direction={orderBy === 'threat_type' ? order : 'asc'}
                  onClick={() => handleRequestSort('threat_type')}
                  sx={{ color: '#94A3B8 !important', '&:hover': { color: '#F8FAFC !important' } }}
                >
                  Threat
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'risk_score'}
                  direction={orderBy === 'risk_score' ? order : 'desc'}
                  onClick={() => handleRequestSort('risk_score')}
                  sx={{ color: '#94A3B8 !important', '&:hover': { color: '#F8FAFC !important' } }}
                >
                  Risk Score
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'risk_level'}
                  direction={orderBy === 'risk_level' ? order : 'asc'}
                  onClick={() => handleRequestSort('risk_level')}
                  sx={{ color: '#94A3B8 !important', '&:hover': { color: '#F8FAFC !important' } }}
                >
                  Risk Level
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'priority'}
                  direction={orderBy === 'priority' ? order : 'asc'}
                  onClick={() => handleRequestSort('priority')}
                  sx={{ color: '#94A3B8 !important', '&:hover': { color: '#F8FAFC !important' } }}
                >
                  Priority
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: '#94A3B8', fontWeight: 700 }}>
                <TableSortLabel
                  active={orderBy === 'affected_asset'}
                  direction={orderBy === 'affected_asset' ? order : 'asc'}
                  onClick={() => handleRequestSort('affected_asset')}
                  sx={{ color: '#94A3B8 !important', '&:hover': { color: '#F8FAFC !important' } }}
                >
                  Asset
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
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell><Skeleton variant="text" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} /></TableCell>
                  <TableCell><Skeleton variant="text" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={90} height={20} sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: 1 }} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={75} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: 1 }} /></TableCell>
                  <TableCell><Skeleton variant="text" width={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} /></TableCell>
                  <TableCell><Skeleton variant="text" sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={80} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: 1 }} /></TableCell>
                </TableRow>
              ))
            ) : paginatedIncidents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                    <FiCheckCircle size={44} color="#10B981" />
                    <Typography variant="h6" sx={{ color: '#F8FAFC', fontWeight: 600 }}>
                      No Incidents in Queue
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                      All systems operating within normal security thresholds.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedIncidents.map((inc) => {
                const riskLevel = inc.risk_level || (inc.risk_score >= 85 ? 'Critical' : inc.risk_score >= 70 ? 'High' : inc.risk_score >= 40 ? 'Medium' : 'Low');
                const riskStyle = SEVERITY_COLORS[riskLevel] || SEVERITY_COLORS.Low;
                const statusStyle = STATUS_COLORS[inc.status] || STATUS_COLORS.Open;
                const isCritical = riskLevel === 'Critical';

                return (
                  <TableRow
                    key={inc.incident_id}
                    hover
                    onClick={() => navigate(`/dashboard/investigation/${inc.incident_id}`)}
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
                    {/* Incident */}
                    <TableCell sx={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.9rem' }}>
                      {inc.incident_id}
                    </TableCell>

                    {/* Threat */}
                    <TableCell sx={{ color: '#E2E8F0', fontSize: '0.9rem' }}>
                      {inc.threat_type || '—'}
                    </TableCell>

                    {/* Risk Score */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 100 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 800,
                            color: riskStyle.main,
                            minWidth: 28
                          }}
                        >
                          {inc.risk_score}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(100, Math.max(0, inc.risk_score))}
                          sx={{
                            flexGrow: 1,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: riskStyle.main,
                              borderRadius: 3
                            }
                          }}
                        />
                      </Box>
                    </TableCell>

                    {/* Risk Level (SEVERITY_COLORS) */}
                    <TableCell>
                      <Chip
                        label={riskLevel}
                        size="small"
                        sx={{
                          backgroundColor: riskStyle.bg,
                          color: riskStyle.main,
                          border: `1px solid ${riskStyle.border}`,
                          boxShadow: riskStyle.glow,
                          fontWeight: 800,
                          fontSize: '0.72rem',
                          height: 25
                        }}
                      />
                    </TableCell>

                    {/* Priority (Plain Text / Subtle Badge P1-P4) */}
                    {/* PENDING: priority format not yet confirmed by backend (P1-P4 vs Low/Medium/High/Immediate) — do not treat as final, update once contract is locked. */}
                    <TableCell sx={{ color: '#F8FAFC', fontWeight: 700, fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      <Box
                        component="span"
                        sx={{
                          px: 1,
                          py: 0.3,
                          borderRadius: '6px',
                          backgroundColor: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          color: '#CBD5E1'
                        }}
                      >
                        {/* PENDING: priority format not yet confirmed by backend (P1-P4 vs Low/Medium/High/Immediate) — do not treat as final, update once contract is locked. */}
                        {inc.priority || '—'}
                      </Box>
                    </TableCell>

                    {/* Asset */}
                    <TableCell sx={{ color: '#94A3B8', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      {inc.affected_asset || inc.asset_id || '—'}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Chip
                        label={inc.status}
                        size="small"
                        sx={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.main,
                          border: `1px solid ${statusStyle.border}`,
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          height: 25
                        }}
                      />
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
        count={incidents.length}
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
