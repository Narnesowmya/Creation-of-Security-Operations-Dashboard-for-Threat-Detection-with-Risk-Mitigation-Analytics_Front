import React from 'react';
import { Paper, Box, FormControl, InputLabel, Select, MenuItem, Grid, Typography, IconButton } from '@mui/material';
import { FiFilter, FiRotateCcw } from 'react-icons/fi';

const RISK_LEVELS = ['All', 'Critical', 'High', 'Medium', 'Low'];
const THREAT_TYPES = ['All', 'Brute Force', 'Malware', 'Phishing', 'Reconnaissance', 'DDoS Attack', 'SQL Injection', 'Unauthorized Access', 'Data Exfiltration'];
const STATUSES = ['All', 'Open', 'Investigating', 'Resolved'];
const DATE_RANGES = ['All', 'Last 24 Hours', 'Last 7 Days', 'Last 30 Days'];
const ASSETS = ['All'];
const DEPARTMENTS = ['All'];
const MITRE_TECHNIQUES = ['All'];

const FIELD_SX = { minWidth: 160 };

export default function CorrelationFilters({ filters, onFilterChange, onResetFilters }) {
  const renderSelect = (label, key, options) => (
    <FormControl size="small" sx={FIELD_SX}>
      <InputLabel sx={{ color: '#94A3B8' }}>{label}</InputLabel>
      <Select
        value={filters[key]}
        label={label}
        onChange={(e) => onFilterChange(key, e.target.value)}
        sx={{ color: '#F8FAFC', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(34, 211, 238, 0.25)' } }}
      >
        {options.map((opt) => (
          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Paper
      elevation={0}
      sx={{ p: 2.5, backgroundColor: 'rgba(18, 17, 31, 0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(34, 211, 238, 0.2)', borderRadius: '16px' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <FiFilter size={18} color="#22D3EE" />
          <Typography variant="subtitle1" sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, color: '#F8FAFC', fontSize: '0.98rem' }}>
            Correlation Filters
          </Typography>
        </Box>
        <IconButton onClick={onResetFilters} size="small" sx={{ color: '#94A3B8' }}>
          <FiRotateCcw size={16} />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        <Grid item>{renderSelect('Risk Level', 'riskLevel', RISK_LEVELS)}</Grid>
        <Grid item>{renderSelect('Threat Type', 'threatType', THREAT_TYPES)}</Grid>
        <Grid item>{renderSelect('Asset', 'asset', ASSETS)}</Grid>
        <Grid item>{renderSelect('Department', 'department', DEPARTMENTS)}</Grid>
        <Grid item>{renderSelect('MITRE Technique', 'mitreTechnique', MITRE_TECHNIQUES)}</Grid>
        <Grid item>{renderSelect('Date Range', 'dateRange', DATE_RANGES)}</Grid>
        <Grid item>{renderSelect('Status', 'status', STATUSES)}</Grid>
      </Grid>
    </Paper>
  );
}