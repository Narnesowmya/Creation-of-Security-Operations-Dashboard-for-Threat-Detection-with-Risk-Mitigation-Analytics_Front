import React, { useState } from 'react';
import {
  Paper,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  Grid,
  Typography,
  Chip,
  Collapse,
  IconButton
} from '@mui/material';
import { FiSearch, FiFilter, FiRotateCcw, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { SEVERITY_COLORS } from '../theme/socTheme.js';

const EVENT_TYPES = [
  'All',
  'Brute Force',
  'Malware',
  'Phishing',
  'Reconnaissance',
  'DDoS Attack',
  'SQL Injection',
  'Unauthorized Access',
  'Data Exfiltration'
];

export default function Filters({ filters, onFilterChange, onResetFilters }) {
  const [expanded, setExpanded] = useState(true);

  const isFiltered =
    filters.severity !== 'All' ||
    filters.eventType !== 'All' ||
    filters.dateRange !== 'All' ||
    filters.searchIp.trim() !== '';

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        backgroundColor: 'rgba(18, 17, 31, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(34, 211, 238, 0.2)',
        borderRadius: '16px',
        position: 'sticky',
        top: 80,
        zIndex: 10
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <FiFilter size={18} color="#22D3EE" />
          <Typography variant="subtitle1" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC', fontSize: '0.98rem' }}>
            Telemetry Filter Matrix
          </Typography>
          {isFiltered && (
            <Chip
              label="FILTER ACTIVE"
              size="small"
              sx={{
                backgroundColor: 'rgba(34, 211, 238, 0.15)',
                color: '#22D3EE',
                border: '1px solid rgba(34, 211, 238, 0.4)',
                fontSize: '0.68rem',
                fontWeight: 800,
                height: 22
              }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isFiltered && (
            <Button
              size="small"
              onClick={onResetFilters}
              startIcon={<FiRotateCcw size={14} />}
              sx={{
                color: '#94A3B8',
                fontSize: '0.8rem',
                '&:hover': { color: '#EF4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }
              }}
            >
              Reset
            </Button>
          )}

          <IconButton size="small" onClick={() => setExpanded(!expanded)} sx={{ color: '#94A3B8' }}>
            {expanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </IconButton>
        </Box>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search IP, Asset or Event ID..."
            value={filters.searchIp}
            onChange={(e) => onFilterChange('searchIp', e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 1.2 }}>
                    <FiSearch color="#22D3EE" size={16} />
                  </InputAdornment>
                )
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(13, 15, 26, 0.7)',
                borderColor: 'rgba(34, 211, 238, 0.2)',
                fontSize: '0.88rem',
                borderRadius: '10px'
              },
              '& .MuiOutlinedInput-input': {
                color: '#E2E8F0',
                paddingLeft: '4px'
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: '#94A3B8',
                opacity: 1
              }
            }}
          />

          <Grid container spacing={1.5}>
            <Grid size={{ xs: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="severity-label" sx={{ color: '#94A3B8', fontSize: '0.82rem' }}>
                  Severity
                </InputLabel>
                <Select
                  labelId="severity-label"
                  id="severity-select"
                  value={filters.severity}
                  label="Severity"
                  onChange={(e) => onFilterChange('severity', e.target.value)}
                  sx={{
                    backgroundColor: 'rgba(13, 15, 26, 0.7)',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    color: '#E2E8F0',
                    '& .MuiSelect-icon': { color: '#94A3B8' }
                  }}
                >
                  <MenuItem value="All">All Severities</MenuItem>
                  <MenuItem value="Critical" sx={{ color: SEVERITY_COLORS.Critical.main, fontWeight: 700 }}>
                    Critical
                  </MenuItem>
                  <MenuItem value="High" sx={{ color: SEVERITY_COLORS.High.main, fontWeight: 700 }}>
                    High
                  </MenuItem>
                  <MenuItem value="Medium" sx={{ color: SEVERITY_COLORS.Medium.main, fontWeight: 700 }}>
                    Medium
                  </MenuItem>
                  <MenuItem value="Low" sx={{ color: SEVERITY_COLORS.Low.main, fontWeight: 700 }}>
                    Low
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="date-range-label" sx={{ color: '#94A3B8', fontSize: '0.82rem' }}>
                  Timeframe
                </InputLabel>
                <Select
                  labelId="date-range-label"
                  id="date-range-select"
                  value={filters.dateRange}
                  label="Timeframe"
                  onChange={(e) => onFilterChange('dateRange', e.target.value)}
                  sx={{
                    backgroundColor: 'rgba(13, 15, 26, 0.7)',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    color: '#E2E8F0',
                    '& .MuiSelect-icon': { color: '#94A3B8' }
                  }}
                >
                  <MenuItem value="All">All Time</MenuItem>
                  <MenuItem value="24h">Last 24 Hours</MenuItem>
                  <MenuItem value="7d">Last 7 Days</MenuItem>
                  <MenuItem value="30d">Last 30 Days</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <FormControl fullWidth size="small">
            <InputLabel id="event-type-label" sx={{ color: '#94A3B8', fontSize: '0.82rem' }}>
              Event Category
            </InputLabel>
            <Select
              labelId="event-type-label"
              id="event-type-select"
              value={filters.eventType}
              label="Event Category"
              onChange={(e) => onFilterChange('eventType', e.target.value)}
              sx={{
                backgroundColor: 'rgba(13, 15, 26, 0.7)',
                borderRadius: '10px',
                fontSize: '0.85rem',
                color: '#E2E8F0',
                '& .MuiSelect-icon': { color: '#94A3B8' }
              }}
            >
              {EVENT_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type === 'All' ? 'All Event Types' : type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Collapse>
    </Paper>
  );
}