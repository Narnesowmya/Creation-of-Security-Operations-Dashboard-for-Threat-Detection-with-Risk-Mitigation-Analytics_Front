import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { INITIAL_MOCK_EVENTS, INITIAL_MOCK_VULNERABILITIES } from './mockData.js'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const USE_MOCK = !API_BASE_URL;

// Create a central Axios client
export const apiClient = axios.create({
  baseURL: USE_MOCK ? '/api' : API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // 'x-api-key': API_KEY // TODO: confirm with backend if auth is required
  }
});

// Only attach the mock adapter when there's no real backend URL yet
let mock = null;
if (USE_MOCK) {
  mock = new AxiosMockAdapter(apiClient, { delayResponse: 150 });

  // In-memory data store for live status updates/simulated live alerts
  let mockEventsDatabase = [...INITIAL_MOCK_EVENTS];

  const MOCK_PREDICTIONS = [
    {
      event_id: "EVT-2001",
      prediction: "Suspicious",
      threat_type: "Brute Force",
      confidence_score: 94.2,
      anomaly_score: 0.892,
      severity: "Critical",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T10:15:30Z"
    },
    {
      event_id: "EVT-2002",
      prediction: "Normal",
      threat_type: "None",
      confidence_score: 99.1,
      anomaly_score: -0.124,
      severity: "Low",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T09:45:12Z"
    },
    {
      event_id: "EVT-2003",
      prediction: "Suspicious",
      threat_type: "Malware",
      confidence_score: 87.5,
      anomaly_score: 0.781,
      severity: "High",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T08:30:00Z"
    },
    {
      event_id: "EVT-2004",
      prediction: "Normal",
      threat_type: "None",
      confidence_score: 95.4,
      anomaly_score: 0.012,
      severity: "Low",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T08:12:45Z"
    },
    {
      event_id: "EVT-2005",
      prediction: "Suspicious",
      threat_type: "DDoS Attack",
      confidence_score: 91.8,
      anomaly_score: 0.835,
      severity: "High",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T07:55:20Z"
    },
    {
      event_id: "EVT-2006",
      prediction: "Suspicious",
      threat_type: "SQL Injection",
      confidence_score: 88.9,
      anomaly_score: 0.796,
      severity: "High",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T06:40:10Z"
    },
    {
      event_id: "EVT-2007",
      prediction: "Normal",
      threat_type: "None",
      confidence_score: 98.7,
      anomaly_score: -0.098,
      severity: "Low",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T05:30:15Z"
    },
    {
      event_id: "EVT-2008",
      prediction: "Suspicious",
      threat_type: "Data Exfiltration",
      confidence_score: 93.6,
      anomaly_score: 0.867,
      severity: "Critical",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T04:15:00Z"
    },
    {
      event_id: "EVT-2009",
      prediction: "Normal",
      threat_type: "None",
      confidence_score: 92.1,
      anomaly_score: 0.054,
      severity: "Medium",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T03:50:22Z"
    },
    {
      event_id: "EVT-2010",
      prediction: "Suspicious",
      threat_type: "Unauthorized Access",
      confidence_score: 84.2,
      anomaly_score: 0.724,
      severity: "Medium",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T03:10:05Z"
    },
    {
      event_id: "EVT-2011",
      prediction: "Normal",
      threat_type: "None",
      confidence_score: 97.5,
      anomaly_score: -0.045,
      severity: "Low",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T02:45:00Z"
    },
    {
      event_id: "EVT-2012",
      prediction: "Suspicious",
      threat_type: "Brute Force",
      confidence_score: 79.8,
      anomaly_score: 0.685,
      severity: "Medium",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T01:30:18Z"
    },
    {
      event_id: "EVT-2013",
      prediction: "Normal",
      threat_type: "None",
      confidence_score: 94.6,
      anomaly_score: 0.021,
      severity: "Low",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-22T00:55:00Z"
    },
    {
      event_id: "EVT-2014",
      prediction: "Suspicious",
      threat_type: "Phishing",
      confidence_score: 86.3,
      anomaly_score: 0.758,
      severity: "Medium",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-21T23:40:12Z"
    },
    {
      event_id: "EVT-2015",
      prediction: "Normal",
      threat_type: "None",
      confidence_score: 96.9,
      anomaly_score: -0.088,
      severity: "Low",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-21T22:15:30Z"
    },
    {
      event_id: "EVT-2016",
      prediction: "Suspicious",
      threat_type: "Reconnaissance",
      confidence_score: 72.1,
      anomaly_score: 0.612,
      severity: "Low",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-21T21:05:00Z"
    },
    {
      event_id: "EVT-2017",
      prediction: "Normal",
      threat_type: "None",
      confidence_score: 98.2,
      anomaly_score: -0.111,
      severity: "Low",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-21T20:20:45Z"
    },
    {
      event_id: "EVT-2018",
      prediction: "Suspicious",
      threat_type: "Malware",
      confidence_score: 95.8,
      anomaly_score: 0.915,
      severity: "Critical",
      model_version: "IF_v1",
      prediction_timestamp: "2026-08-21T19:50:00Z"
    }
  ];

  // Helper to filter events based on request parameters
  function filterEvents(events, params = {}) {
    const { severity, eventType, searchIp, dateRange } = params;

    return events.filter(evt => {
      if (severity && severity !== 'All') {
        if (evt.severity.toLowerCase() !== severity.toLowerCase()) return false;
      }

      if (eventType && eventType !== 'All') {
        if (evt.eventType.toLowerCase() !== eventType.toLowerCase()) return false;
      }

      if (searchIp && searchIp.trim() !== '') {
        const term = searchIp.trim().toLowerCase();
        const ipMatch = evt.sourceIP.toLowerCase().includes(term) || evt.destinationIP.toLowerCase().includes(term);
        const assetMatch = evt.affectedAsset.toLowerCase().includes(term);
        const idMatch = evt.id.toLowerCase().includes(term);
        if (!ipMatch && !assetMatch && !idMatch) return false;
      }

      if (dateRange && dateRange !== 'All') {
        const eventTime = new Date(evt.timestamp).getTime();
        const now = new Date().getTime();

        if (dateRange === '24h') {
          if (now - eventTime > 24 * 60 * 60 * 1000) return false;
        } else if (dateRange === '7d') {
          if (now - eventTime > 7 * 24 * 60 * 60 * 1000) return false;
        } else if (dateRange === '30d') {
          if (now - eventTime > 30 * 24 * 60 * 60 * 1000) return false;
        }
      }

      return true;
    });
  }

  mock.onGet('/events').reply(config => {
    const filtered = filterEvents(mockEventsDatabase, config.params);
    return [200, { success: true, count: filtered.length, events: filtered }];
  });

  mock.onGet('/vulnerabilities').reply(() => {
    return [200, { success: true, count: INITIAL_MOCK_VULNERABILITIES.length, vulnerabilities: INITIAL_MOCK_VULNERABILITIES }]
  });

  mock.onPatch(/\/events\/.+/).reply(config => {
    const eventId = config.url.split('/').pop();
    const { status } = JSON.parse(config.data || '{}');

    const idx = mockEventsDatabase.findIndex(e => e.id === eventId);
    if (idx !== -1) {
      mockEventsDatabase[idx].status = status;
      return [200, { success: true, event: mockEventsDatabase[idx] }];
    }
    return [404, { success: false, message: 'Event not found' }];
  });

  mock.onPost('/events/simulate').reply(() => {
    const severities = ['Critical', 'High', 'Medium'];
    const types = ['Brute Force', 'Malware', 'SQL Injection', 'DDoS Attack', 'Data Exfiltration'];
    const newEvt = {
      id: `EVT-${3000 + Math.floor(Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      eventType: types[Math.floor(Math.random() * types.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      sourceIP: `185.220.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      destinationIP: '10.0.1.88',
      status: 'Open',
      affectedAsset: 'Auth-Gateway-Primary',
      aiRiskScore: 92,
      description: 'Simulated real-time automated intrusion event detected by SentinelAI engine.',
      recommendation: 'Immediate SOC Analyst triage recommended.'
    };

    mockEventsDatabase.unshift(newEvt);
    return [201, { success: true, event: newEvt }];
  });

  // Mock handlers for predictions and related APIs
  mock.onGet(/\/predictions\/([A-Za-z0-9-]+)/).reply(config => {
    const eventId = config.url.split('/').pop();
    const prediction = MOCK_PREDICTIONS.find(p => p.event_id === eventId);
    if (prediction) {
      return [200, prediction];
    }
    return [404, { success: false, message: 'Prediction not found' }];
  });

  mock.onGet('/predictions').reply(() => {
    return [200, { success: true, predictions: MOCK_PREDICTIONS }];
  });
    const MOCK_THREATS = [
    { id: 'THREAT-1001', indicator: 'Credential theft chain on FIN-DB-02', threat_type: 'Brute Force', confidence: 82, mitre_id: 'FIN-DB-02', tactic: 'Credential Access' },
    { id: 'THREAT-1002', indicator: 'Suspicious outbound transfer from HR-FILE-01', threat_type: 'Data Exfiltration', confidence: 68, mitre_id: 'HR-FILE-01', tactic: 'Exfiltration' },
    { id: 'THREAT-1003', indicator: 'Repeated failed logins on VPN-GW-01', threat_type: 'Brute Force', confidence: 41, mitre_id: 'VPN-GW-01', tactic: 'Initial Access' }
  ];

  mock.onGet('/threats').reply(config => {
    const { threat_type, tactic } = config.params || {};
    let filtered = MOCK_THREATS;
    if (threat_type) filtered = filtered.filter(t => t.threat_type === threat_type);
    if (tactic) filtered = filtered.filter(t => t.tactic === tactic);
    return [200, filtered];
  });

  mock.onGet('/anomalies').reply(() => {
    const anomalies = MOCK_PREDICTIONS.filter(p => p.prediction === 'Suspicious');
    return [200, anomalies];
  });

  mock.onGet('/model-performance').reply(() => {
    const total_predictions = MOCK_PREDICTIONS.length;
    const normal_predictions = MOCK_PREDICTIONS.filter(p => p.prediction === 'Normal').length;
    const suspicious_predictions = MOCK_PREDICTIONS.filter(p => p.prediction === 'Suspicious').length;
    const anomaly_rate = total_predictions > 0 ? parseFloat((suspicious_predictions / total_predictions).toFixed(4)) : 0.0;

    return [200, {
      total_predictions,
      normal_predictions,
      suspicious_predictions,
      anomaly_rate,
      model_version: "IF_v1"
    }];
  });

  mock.onGet('/threat-summary').reply(() => {
    const total_predictions = MOCK_PREDICTIONS.length;
    const normal_count = MOCK_PREDICTIONS.filter(p => p.prediction === 'Normal').length;
    const suspicious_count = MOCK_PREDICTIONS.filter(p => p.prediction === 'Suspicious').length;

    const severity_breakdown = {
      Low: MOCK_PREDICTIONS.filter(p => p.severity === 'Low').length,
      Medium: MOCK_PREDICTIONS.filter(p => p.severity === 'Medium').length,
      High: MOCK_PREDICTIONS.filter(p => p.severity === 'High').length,
      Critical: MOCK_PREDICTIONS.filter(p => p.severity === 'Critical').length
    };

    return [200, {
      total_predictions,
      normal_count,
      suspicious_count,
      severity_breakdown
    }];
  });
}

// -------------------------------------------------------------
// PUBLIC API SERVICE METHODS (Callable by components via Axios)
// -------------------------------------------------------------

export const getEvents = async (filters = {}) => {
  const response = await apiClient.get('/events', { params: filters });
  return response.data;
};

export const updateEventStatus = async (eventId, newStatus) => {
  const response = await apiClient.patch(`/events/${eventId}`, { status: newStatus });
  return response.data;
};

export const simulateLiveAlert = async () => {
  const response = await apiClient.post('/events/simulate');
  return response.data;
};

export const getVulnerabilities = async () => {
  const response = await apiClient.get('/vulnerabilities');
  return response.data;
};

export const getPredictions = async () => {
  const response = await apiClient.get('/predictions');
  return response.data;
};

export const getEventById = async (eventId) => {
  const response = await apiClient.get(`/predictions/${eventId}`);
  return response.data;
};

export const getThreatSummary = async () => {
  const response = await apiClient.get('/threat-summary');
  return response.data;
};

export const getModelPerformance = async () => {
  const response = await apiClient.get('/model-performance');
  return response.data;
};

export const getAnomalies = async () => {
  const response = await apiClient.get('/anomalies');
  return response.data;
};
export function getCorrelatedThreats(filters) {
  const params = {}
  if (filters.threatType !== 'All') params.threat_type = filters.threatType
  if (filters.riskLevel !== 'All') params.tactic = filters.riskLevel // adjust once real risk-level field exists

  return apiClient.get('/threats', { params })
    .then((res) => ({
      threats: res.data.map((t) => ({
        id: t.id,
        title: t.indicator || t.technique_name || t.threat_type,
        riskScore: t.confidence ?? 0,
        priority: t.confidence >= 80 ? 'Critical' : t.confidence >= 60 ? 'High' : t.confidence >= 40 ? 'Medium' : 'Low',
        threatType: t.threat_type,
        asset: t.mitre_id || '—',
        attackStages: t.tactic ? [t.tactic] : []
      }))
    }))
}

export function getRecommendation(threatId) {
  // TODO: replace with real endpoint once Backend 4 (Risk Engine) exposes it
  return Promise.resolve({
    riskScore: 82,
    priority: 'Critical',
    actions: [
      'Isolate affected host from network',
      'Force credential reset for impacted accounts',
      'Escalate to Tier 2 SOC analyst'
    ]
  })
}