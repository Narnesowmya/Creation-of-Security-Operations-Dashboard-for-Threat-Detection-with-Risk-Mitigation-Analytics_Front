import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Alert,
  Snackbar,
  Paper
} from '@mui/material';
import { FiCpu } from 'react-icons/fi';

import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import KpiCards from '../components/KpiCards.jsx';
import Filters from '../components/Filters.jsx';
import ThreatTable from '../components/ThreatTable.jsx';
import RiskOverviewCards from '../components/RiskOverviewCards.jsx';
import PriorityTable from '../components/PriorityTable.jsx';

import ThreatDistributionChart from '../charts/ThreatDistributionChart.jsx';
import EventTrendChart from '../charts/EventTrendChart.jsx';
import TopAttackTypesChart from '../charts/TopAttackTypesChart.jsx';
import ConfidenceScoreChart from '../charts/ConfidenceScoreChart.jsx';
import RiskDistributionChart from '../charts/RiskDistributionChart.jsx';
import RiskTrendChart from '../charts/RiskTrendChart.jsx';

import NetworkTopologyBackground from '../components/NetworkTopologyBackground.jsx';
import { FiShield } from 'react-icons/fi';

import {
  getPredictions,
  getThreatSummary,
  getModelPerformance
} from '../services/api.js';

import {
  getRiskSummary,
  getIncidents
} from '../services/riskApi.js';

export default function Dashboard() {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    severity: 'All',
    eventType: 'All',
    dateRange: 'All',
    searchIp: ''
  });

  // Data State
  const [predictions, setPredictions] = useState([]);
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [riskSummary, setRiskSummary] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [riskError, setRiskError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setRiskError(null);

    try {
      const [predictionsRes, summaryRes, perfRes, riskSummaryRes, incidentsRes] = await Promise.all([
        getPredictions(),
        getThreatSummary(),
        getModelPerformance(),
        getRiskSummary().catch((err) => {
          console.error('Failed to load risk summary:', err);
          setRiskError(err?.message || 'Failed to fetch risk summary');
          return null;
        }),
        getIncidents().catch((err) => {
          console.error('Failed to load incidents:', err);
          setRiskError(err?.message || 'Failed to fetch incidents');
          return { incidents: [] };
        })
      ]);

      if (riskSummaryRes) {
        setRiskSummary(riskSummaryRes);
      }
      const incList = incidentsRes?.incidents || (Array.isArray(incidentsRes) ? incidentsRes : []);
      setIncidents(incList);

      const predictionsList = predictionsRes?.predictions || predictionsRes?.data || (Array.isArray(predictionsRes) ? predictionsRes : []);
      setPredictions(predictionsList);

      const statsObj = {
        totalEvents: summaryRes.total_predictions ?? 0,
        anomaliesDetected: summaryRes.suspicious_count ?? 0,
        normalEvents: summaryRes.normal_count ?? 0,
        highRiskEvents: summaryRes.severity_breakdown?.High ?? 0,
        criticalThreats: summaryRes.severity_breakdown?.Critical ?? 0
      };
      setStats(statsObj);

      // threatDistribution: use summaryRes.severity_breakdown directly, default any missing key to 0
      const threatDistribution = {
        Critical: summaryRes.severity_breakdown?.Critical ?? 0,
        High: summaryRes.severity_breakdown?.High ?? 0,
        Medium: summaryRes.severity_breakdown?.Medium ?? 0,
        Low: summaryRes.severity_breakdown?.Low ?? 0
      };

      // topAttackTypes: group predictions by threat_type, count, sort descending
      const attackCounts = {};
      predictionsList.forEach(p => {
        const type = p.threat_type || 'None';
        attackCounts[type] = (attackCounts[type] || 0) + 1;
      });
      const topAttackTypes = Object.keys(attackCounts)
        .map(type => ({ type, count: attackCounts[type] }))
        .sort((a, b) => b.count - a.count);

      // eventTrend: group predictions by date portion of prediction_timestamp, sort chronologically ascending
      const dailyCounts = {};
      predictionsList.forEach(p => {
        const dateObj = new Date(p.prediction_timestamp);
        const dateKey = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()).getTime();
        dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;
      });
      const eventTrend = Object.keys(dailyCounts)
        .map(Number)
        .sort((a, b) => a - b)
        .map(timestamp => {
          const date = new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          return { date, count: dailyCounts[timestamp] };
        });

      // confidenceScore: bucket predictions by confidence_score into 5 ranges
      let veryLow = 0, low = 0, medium = 0, high = 0, veryHigh = 0;
      predictionsList.forEach(p => {
        const score = p.confidence_score ?? 0;
        if (score <= 20) veryLow++;
        else if (score <= 40) low++;
        else if (score <= 60) medium++;
        else if (score <= 80) high++;
        else veryHigh++;
      });
      const confidenceScore = [
        { label: 'Very Low', score: veryLow },
        { label: 'Low', score: low },
        { label: 'Medium', score: medium },
        { label: 'High', score: high },
        { label: 'Very High', score: veryHigh }
      ];

      setAnalytics({
        threatDistribution,
        topAttackTypes,
        eventTrend,
        confidenceScore
      });

    } catch (err) {
      console.error('Failed fetching Vigilon telemetry data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      severity: 'All',
      eventType: 'All',
      dateRange: 'All',
      searchIp: ''
    });
  };

  const isOverviewTab =
    location.pathname === '/dashboard' ||
    location.pathname === '/dashboard/';

  // Client-side filtering logic for predictions array
  const filteredPredictions = predictions.filter(pred => {
    // 1. Severity filter
    if (filters.severity && filters.severity !== 'All') {
      if (pred.severity !== filters.severity) return false;
    }

    // 2. Event Type filter (mapped to threat_type)
    if (filters.eventType && filters.eventType !== 'All') {
      if (pred.threat_type !== filters.eventType) return false;
    }

    // 3. Search IP/Asset/Event ID filter (mapped to event_id / threat_type substring search)
    if (filters.searchIp && filters.searchIp.trim() !== '') {
      const term = filters.searchIp.trim().toLowerCase();
      const idMatch = pred.event_id?.toLowerCase().includes(term);
      const typeMatch = pred.threat_type?.toLowerCase().includes(term);
      if (!idMatch && !typeMatch) return false;
    }

    return true;
  });

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#0D0F1A',
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      {/* Animated Network Background */}
      <NetworkTopologyBackground />

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Workspace */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: '100%',
            md: `calc(100% - ${collapsed ? 80 : 270}px)`
          },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Navbar */}
        <Navbar
          handleDrawerToggle={handleDrawerToggle}
        />

        {/* Dashboard Content */}
        <Box
          sx={{
            p: {
              xs: 1.5,
              sm: 2.5,
              md: 3
            },
            flexGrow: 1,
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {isOverviewTab ? (
            <Container
              maxWidth="xl"
              disableGutters
              sx={{
                width: '100%',
                maxWidth: '100%'
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  mb: {
                    xs: 2,
                    sm: 3
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Sora", sans-serif',
                      fontWeight: 800,
                      color: '#F8FAFC',
                      letterSpacing: '-0.02em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      fontSize: {
                        xs: '1.25rem',
                        sm: '1.5rem'
                      }
                    }}
                  >
                    Vigilon Threat Operations Center
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#94A3B8',
                      mt: 0.5,
                      fontSize: {
                        xs: '0.78rem',
                        sm: '0.875rem'
                      }
                    }}
                  >
                    AI-powered incident telemetry, real-time risk index
                    scoring, and automated threat triage stream.
                  </Typography>
                </Box>

                {/* Engine Active Status */}
                <Paper
                  elevation={0}
                  sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: 'rgba(34, 211, 238, 0.08)',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    width: {
                      xs: '100%',
                      sm: 'auto'
                    },
                    boxSizing: 'border-box'
                  }}
                >
                  <FiCpu size={20} color="#22D3EE" />

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#22D3EE',
                        fontWeight: 800,
                        display: 'block',
                        lineHeight: 1,
                        textTransform: 'uppercase'
                      }}
                    >
                      Vigilon AI Engine Active
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: '#94A3B8',
                        fontSize: '0.7rem'
                      }}
                    >
                      AI-Powered Threat Intelligence
                    </Typography>
                  </Box>
                </Paper>
              </Box>

              {/* =====================================================
                  TASK 1: 5 KPI CARDS
                 ===================================================== */}
              <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                <KpiCards
                  stats={stats}
                  loading={loading}
                />
              </Box>

              {/* =====================================================
                  TASK 5: RESPONSIVE CHART + FILTER GRID
                 ===================================================== */}
              <Grid
                container
                spacing={{
                  xs: 2,
                  sm: 2.5,
                  md: 3
                }}
                sx={{
                  width: '100%',
                  m: 0
                }}
              >
                {/* 1. Event Trend Chart */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      minWidth: 0,
                      height: '100%',
                      minHeight: 380
                    }}
                  >
                    <EventTrendChart
                      data={analytics?.eventTrend || []}
                      loading={loading}
                    />
                  </Box>
                </Grid>

                {/* 2. Threat Distribution */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      minWidth: 0,
                      minHeight: 380
                    }}
                  >
                    <ThreatDistributionChart
                      data={analytics?.threatDistribution || null}
                      loading={loading}
                    />
                  </Box>
                </Grid>

                {/* 3. Top Attack Types */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      minWidth: 0,
                      minHeight: 380
                    }}
                  >
                    <TopAttackTypesChart
                      data={analytics?.topAttackTypes || []}
                      loading={loading}
                    />
                  </Box>
                </Grid>

                {/* 4. Confidence Score */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      minWidth: 0,
                      height: '100%'
                    }}
                  >
                    <ConfidenceScoreChart
                      data={analytics?.confidenceScore || []}
                      loading={loading}
                    />
                  </Box>
                </Grid>

                {/* Filters */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      minWidth: 0
                    }}
                  >
                    <Filters
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onResetFilters={handleResetFilters}
                    />
                  </Box>
                </Grid>

                {/* Threat Predictions Table */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      minWidth: 0,
                      overflowX: 'auto'
                    }}
                  >
                    <ThreatTable
                      predictions={filteredPredictions}
                      loading={loading}
                    />
                  </Box>
                </Grid>

                {/* =====================================================
                    MILESTONE 3: RISK INTELLIGENCE & PRIORITY MANAGEMENT
                   ===================================================== */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    minWidth: 0,
                    mt: 2
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <FiShield size={24} color="#F97316" />
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Sora", sans-serif',
                          fontWeight: 800,
                          color: '#F8FAFC',
                          letterSpacing: '-0.02em',
                          fontSize: {
                            xs: '1.15rem',
                            sm: '1.35rem'
                          }
                        }}
                      >
                        Risk Overview & Incident Priority Operations
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
                      Incident severity distribution, longitudinal risk score trends, and prioritized threat escalation queues.
                    </Typography>
                  </Box>

                  {/* 6 Risk Overview KPI Cards */}
                  <RiskOverviewCards
                    riskSummary={riskSummary}
                    loading={loading}
                    error={riskError}
                  />
                </Grid>

                {/* Risk Trend Chart (6 cols) */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      minWidth: 0,
                      minHeight: 380
                    }}
                  >
                    <RiskTrendChart
                      incidents={incidents}
                      loading={loading}
                      error={riskError}
                    />
                  </Box>
                </Grid>

                {/* Risk Distribution Chart (6 cols) */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      minWidth: 0,
                      minHeight: 380
                    }}
                  >
                    <RiskDistributionChart
                      incidents={incidents}
                      loading={loading}
                      error={riskError}
                    />
                  </Box>
                </Grid>

                {/* Incident Priority Table (12 cols) */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    minWidth: 0
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      minWidth: 0,
                      overflowX: 'auto'
                    }}
                  >
                    <PriorityTable
                      incidents={incidents}
                      loading={loading}
                      error={riskError}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          ) : (
            <Outlet
              context={{
                predictions,
                stats,
                analytics,
                riskSummary,
                incidents,
                riskError,
                loading,
                filters,
                handleFilterChange,
                handleResetFilters
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

