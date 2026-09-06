import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { INITIAL_MOCK_EVENTS, INITIAL_MOCK_VULNERABILITIES } from './mockData.js'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const USE_MOCK = !API_BASE_URL;
console.log('API_BASE_URL:', API_BASE_URL, 'USE_MOCK:', USE_MOCK);

export const apiClient = axios.create({
  baseURL: USE_MOCK ? '/api' : API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

let mock = null;
if (USE_MOCK) {
  mock = new AxiosMockAdapter(apiClient, { delayResponse: 150 });
  let mockEventsDatabase = [...INITIAL_MOCK_EVENTS];

  const MOCK_PREDICTIONS = [
    { event_id: "EVT-2001", prediction: "Suspicious", threat_type: "Brute Force", confidence_score: 94.2, anomaly_score: 0.892, severity: "Critical", model_version: "IF_v1", prediction_timestamp: "2026-08-22T10:15:30Z" },
    { event_id: "EVT-2002", prediction: "Normal", threat_type: "None", confidence_score: 99.1, anomaly_score: -0.124, severity: "Low", model_version: "IF_v1", prediction_timestamp: "2026-08-22T09:45:12Z" }
  ];

  function filterEvents(events, params = {}) {
    const { severity, eventType, searchIp, dateRange } = params;
    return events.filter(evt => {
      if (severity && severity !== 'All' && evt.severity.toLowerCase() !== severity.toLowerCase()) return false;
      if (eventType && eventType !== 'All' && evt.eventType.toLowerCase() !== eventType.toLowerCase()) return false;
      if (searchIp && searchIp.trim() !== '') {
        const term = searchIp.trim().toLowerCase();
        if (!evt.sourceIP.toLowerCase().includes(term) && !evt.destinationIP.toLowerCase().includes(term) && !evt.affectedAsset.toLowerCase().includes(term) && !evt.id.toLowerCase().includes(term)) return false;
      }
      return true;
    });
  }

  mock.onGet('/events').reply(config => {
    const filtered = filterEvents(mockEventsDatabase, config.params);
    return [200, { success: true, count: filtered.length, events: filtered }];
  });

  mock.onGet('/vulnerabilities').reply(() => [200, { success: true, count: INITIAL_MOCK_VULNERABILITIES.length, vulnerabilities: INITIAL_MOCK_VULNERABILITIES }]);

  mock.onPatch(/\/events\/.+/).reply(config => {
    const eventId = config.url.split('/').pop();
    const { status } = JSON.parse(config.data || '{}');
    const idx = mockEventsDatabase.findIndex(e => e.id === eventId);
    if (idx !== -1) { mockEventsDatabase[idx].status = status; return [200, { success: true, event: mockEventsDatabase[idx] }]; }
    return [404, { success: false, message: 'Event not found' }];
  });

  mock.onPost('/events/simulate').reply(() => {
    const newEvt = { id: `EVT-${3000 + Math.floor(Math.random() * 9000)}`, timestamp: new Date().toISOString(), eventType: 'Brute Force', severity: 'Critical', sourceIP: '185.220.1.1', destinationIP: '10.0.1.88', status: 'Open', affectedAsset: 'Auth-Gateway-Primary', aiRiskScore: 92, description: 'Simulated event.', recommendation: 'Triage recommended.' };
    mockEventsDatabase.unshift(newEvt);
    return [201, { success: true, event: newEvt }];
  });

  mock.onGet(/\/predictions\/([A-Za-z0-9-]+)/).reply(config => {
    const eventId = config.url.split('/').pop();
    const prediction = MOCK_PREDICTIONS.find(p => p.event_id === eventId);
    return prediction ? [200, prediction] : [404, { success: false, message: 'Prediction not found' }];
  });

  mock.onGet('/predictions').reply(() => [200, { success: true, predictions: MOCK_PREDICTIONS }]);
  mock.onGet('/anomalies').reply(() => [200, MOCK_PREDICTIONS.filter(p => p.prediction === 'Suspicious')]);
  mock.onGet('/model-performance').reply(() => [200, { total_predictions: MOCK_PREDICTIONS.length, model_version: "IF_v1" }]);
  mock.onGet('/threat-summary').reply(() => [200, { total_predictions: MOCK_PREDICTIONS.length }]);
}

export const getEvents = async (filters = {}) => (await apiClient.get('/events', { params: filters })).data;
export const updateEventStatus = async (eventId, newStatus) => (await apiClient.patch(`/events/${eventId}`, { status: newStatus })).data;
export const simulateLiveAlert = async () => (await apiClient.post('/events/simulate')).data;
export const getVulnerabilities = async () => (await apiClient.get('/vulnerabilities')).data;
export const getPredictions = async () => (await apiClient.get('/predictions')).data;
export const getEventById = async (eventId) => (await apiClient.get(`/predictions/${eventId}`)).data;
export const getThreatSummary = async () => (await apiClient.get('/threat-summary')).data;
export const getModelPerformance = async () => (await apiClient.get('/model-performance')).data;
export const getAnomalies = async () => (await apiClient.get('/anomalies')).data;

export function getCorrelatedThreats(filters) {
  console.log('REAL API VERSION IS RUNNING', filters);
  const params = {}
  if (filters.riskLevel !== 'All') params.priority = filters.riskLevel
  if (filters.status !== 'All') params.status = filters.status
  if (filters.asset !== 'All') params.asset_id = filters.asset
  if (filters.threatType !== 'All') params.threat_type = filters.threatType

  return apiClient.get('/api/v1/incidents', { params })
    .then((res) => ({
      threats: res.data.map((incident) => ({
        id: incident.incident_id,
        title: incident.threat_type,
        riskScore: Math.round(incident.risk_score),
        priority: incident.risk_level,
        priorityLabel: incident.priority,
        threatType: incident.threat_type,
        asset: incident.asset_id,
        attackStages: (incident.mitre_tactics || []),
        eventIds: incident.event_ids || [],
        status: incident.status
      }))
    }))
}

export function getRecommendation(incidentId) {
  return apiClient.get(`/api/v1/incidents/${incidentId}`)
    .then((res) => {
      const incident = res.data
      return {
        riskScore: Math.round(incident.risk_score),
        priority: incident.risk_level,
        actions: incident.recommendations || []
      }
    })
}