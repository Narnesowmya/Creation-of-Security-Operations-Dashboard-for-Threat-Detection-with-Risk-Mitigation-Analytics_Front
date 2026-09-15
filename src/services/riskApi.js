import { apiClient } from './api.js';

export function normalizeIncident(raw) {
  if (!raw) return null;
  const explainability = raw.explainability || {};
  let attack_chain = raw.attack_chain;
  if (Array.isArray(attack_chain)) {
    attack_chain = [...attack_chain]
      .sort((a, b) => (a.stage_order ?? 0) - (b.stage_order ?? 0))
      .map(s => ({
        stage_order: s.stage_order,
        tactic: s.tactic,
        technique: s.technique,
        technique_name: s.technique_name,
        description: s.description
      }));
  }
  return {
    ...raw,
    incident_id: raw.incident_id,
    threat_type: raw.threat_type || 'Unknown Threat',
    risk_score: raw.risk_score ?? 0,
    risk_level: raw.risk_level || 'Medium',
    priority: raw.priority || 'Investigate Soon',
    status: raw.status || 'Open',
    affected_asset: raw.affected_asset || raw.asset_id || 'N/A',
    affected_user: raw.affected_user || 'N/A',
    source_ip: raw.source_ip || 'N/A',
    ml_confidence: raw.ml_confidence ?? explainability.ml_confidence_score ?? 0,
    risk_factors: {
      severity: explainability.severity_score ?? raw.risk_factors?.severity ?? 0,
      ml_confidence: explainability.ml_confidence_score ?? raw.risk_factors?.ml_confidence ?? 0,
      asset_criticality: explainability.asset_criticality_score ?? raw.risk_factors?.asset_criticality ?? 0,
      vulnerability: explainability.vulnerability_score ?? raw.risk_factors?.vulnerability ?? 0,
      threat_intelligence: explainability.threat_intel_score ?? raw.risk_factors?.threat_intelligence ?? 0
    },
    reasons: raw.reasons || explainability.reasons || [],
    recommendations: raw.recommendations || [],
    mitre_techniques: raw.mitre_techniques || [],
    mitre_tactics: raw.mitre_tactics || [],
    event_ids: raw.event_ids || [],
    event_count: raw.event_count ?? (raw.event_ids?.length || 0),
    related_events: raw.event_ids || raw.related_events || [],
    attack_chain,
    created_at: raw.created_at || new Date().toISOString(),
    updated_at: raw.updated_at
  };
}

export async function getIncidents(filters = {}) {
  try {
    const params = { limit: 50, skip: 0, ...filters };
    const res = await apiClient.get('/api/v1/incidents', { params });
    const data = res.data;
    const rawList = Array.isArray(data) ? data : (data.incidents || data.data || []);
    return rawList.map(normalizeIncident);
  } catch (err) {
    console.error('Failed to fetch incidents:', err);
    throw err;
  }
}

export async function getIncidentById(incident_id) {
  try {
    const res = await apiClient.get('/api/v1/incidents/' + incident_id);
    return normalizeIncident(res.data);
  } catch (err) {
    console.error('Failed to fetch incident:', err);
    throw err;
  }
}

export async function getRiskSummary() {
  try {
    const incidents = await getIncidents();
    const total_incidents = incidents.length;
    const critical = incidents.filter(i => i.risk_level === 'Critical').length;
    const high = incidents.filter(i => i.risk_level === 'High').length;
    const medium = incidents.filter(i => i.risk_level === 'Medium').length;
    const low = incidents.filter(i => i.risk_level === 'Low').length;
    const open_incidents = incidents.filter(i => i.status === 'Open').length;
    return { total_incidents, critical, high, medium, low, open_incidents };
  } catch (err) {
    return { total_incidents: 0, critical: 0, high: 0, medium: 0, low: 0, open_incidents: 0 };
  }
}