/**
 * ============================================================================
 * RISK API SERVICE - INCIDENT INVESTIGATION & RISK DATA ENGINE
 * ============================================================================
 * 
 * CONFIRMED SCHEMAS / ENUMS:
 * - status enum values: ['Open', 'Investigating', 'Resolved', 'False Positive'] (Confirmed by Backend)
 * 
 * Agreed 13-field Incident Schema:
 * {
 *   incident_id, threat_type, risk_score, risk_level, priority,
 *   affected_asset, ml_confidence, related_events, mitre_techniques,
 *   ioc_status, reasons, recommendations, status, [risk_factors, attack_chain, security_intelligence, created_at]
 * }
 * 
 * Priority Scale: ['P1', 'P2', 'P3', 'P4']
 * PENDING: priority format not yet confirmed by backend (P1-P4 vs Low/Medium/High/Immediate) — do not treat as final, update once contract is locked.
 * Risk Level: ['Critical', 'High', 'Medium', 'Low']
 * ============================================================================
 */

export const MOCK_INCIDENTS = [
  {
    incident_id: "INC-1001",
    created_at: "2026-08-29T10:15:30Z",
    security_intelligence: {
      cve_id: "CVE-2024-30078",
      cvss_score: 9.2,
      vulnerability_status: "Open",
      ioc_indicators: [
        {
          type: "IP",
          value: "185.220.101.5",
          status: "Malicious",
          threat_actor: "APT29 / Midnight Blizzard",
          confidence: "High"
        },
        {
          type: "Account",
          value: "root",
          status: "Targeted",
          threat_actor: "Unknown",
          confidence: "Medium"
        }
      ]
    },
    threat_type: "Brute Force",
    risk_score: 88.5,
    risk_level: "Critical",
    // PENDING: priority format not yet confirmed by backend (P1-P4 vs Low/Medium/High/Immediate) — do not treat as final, update once contract is locked.
    priority: "P1",
    affected_asset: "DB-Prod-Cluster-01",
    ml_confidence: 94.2,
    risk_factors: {
      severity: 90,
      ml_confidence: 94,
      asset_criticality: 95,
      vulnerability: 85,
      threat_intelligence: 80
    },
    related_events: [
      {
        event_id: "EVT-2001",
        timestamp: "2026-08-29T10:15:30Z",
        source_ip: "185.220.101.5",
        description: "150+ failed SSH login attempts in 60s"
      },
      {
        event_id: "EVT-2002",
        timestamp: "2026-08-29T10:16:12Z",
        source_ip: "185.220.101.5",
        description: "Multiple root password guessing failures detected"
      }
    ],
    mitre_techniques: [
      "T1110.001 - Password Guessing",
      "T1078 - Valid Accounts"
    ],
    ioc_status: "Active",
    reasons: [
      "Anomalous spike in SSH authentication failures from unassigned IP 185.220.101.5",
      "Targeted account 'root' and 'admin' on core production database node"
    ],
    recommendations: [
      "Advisory: Block source IP 185.220.101.5 at edge perimeter firewall",
      "Advisory: Enforce multi-factor authentication for DB-Prod-Cluster-01 root access",
      "Advisory: Review and rotate compromised SSH credentials"
    ],
    status: "Investigating",
    attack_chain: {
      attack_chain_id: "AC-001",
      events: [
        { event_id: "EVT-2001", timestamp: "2026-08-29T10:15:30Z", event_type: "SSH Login Attempt" },
        { event_id: "EVT-2002", timestamp: "2026-08-29T10:16:12Z", event_type: "Root Credential Guessing" }
      ],
      mitre_techniques: ["T1110.001 - Password Guessing", "T1078 - Valid Accounts"],
      tactics: ["Credential Access", "Initial Access"],
      stages: ["Reconnaissance", "Initial Access", "Credential Access"],
      current_stage: "Credential Access",
      risk_score: 88.5,
      confidence: 94,
      start_time: "2026-08-29T10:15:30Z",
      end_time: "2026-08-29T10:16:12Z",
      asset: "DB-Prod-Cluster-01",
      source_ip: "185.220.101.5"
    }
  },
  {
    incident_id: "INC-1002",
    created_at: "2026-08-29T09:40:00Z",
    security_intelligence: {
      cve_id: "CVE-2024-21413",
      cvss_score: 9.8,
      vulnerability_status: "Critical Unpatched",
      ioc_indicators: [
        {
          type: "SHA256",
          value: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          status: "Active",
          threat_actor: "FIN7",
          confidence: "High"
        },
        {
          type: "Domain",
          value: "c2-update-beacon.net",
          status: "Active C2",
          threat_actor: "FIN7",
          confidence: "High"
        }
      ]
    },
    threat_type: "Malware",
    risk_score: 92.0,
    risk_level: "Critical",
    priority: "P1",
    affected_asset: "Auth-Gateway-Primary",
    ml_confidence: 91.5,
    risk_factors: {
      severity: 95,
      ml_confidence: 92,
      asset_criticality: 90,
      vulnerability: 90,
      threat_intelligence: 88
    },
    related_events: [
      {
        event_id: "EVT-2003",
        timestamp: "2026-08-29T09:40:00Z",
        source_ip: "45.154.255.77",
        description: "Cobalt Strike Beacon heuristic signature match"
      }
    ],
    mitre_techniques: [
      "T1059.001 - PowerShell",
      "T1055 - Process Injection"
    ],
    ioc_status: "Active",
    reasons: [
      "Process execution pattern matched known C2 beacon profile",
      "Unsigned binary spawned from temp directory"
    ],
    recommendations: [
      "Advisory: Isolate host via EDR policy and terminate parent process",
      "Advisory: Collect memory dump for forensic analysis"
    ],
    status: "Open",
    attack_chain: {
      attack_chain_id: "AC-002",
      events: [
        { event_id: "EVT-2003", timestamp: "2026-08-29T09:40:00Z", event_type: "Malware Beacon Execution" }
      ],
      mitre_techniques: ["T1059.001 - PowerShell", "T1055 - Process Injection"],
      tactics: ["Execution", "Defense Evasion"],
      stages: ["Execution", "Persistence", "Command and Control"],
      current_stage: "Command and Control",
      risk_score: 92.0,
      confidence: 92,
      start_time: "2026-08-29T09:40:00Z",
      end_time: "2026-08-29T09:40:00Z",
      asset: "Auth-Gateway-Primary",
      source_ip: "45.154.255.77"
    }
  },
  {
    incident_id: "INC-1003",
    created_at: "2026-08-29T08:22:15Z",
    security_intelligence: {
      cve_id: "CVE-2024-6112",
      cvss_score: 7.5,
      vulnerability_status: "Under Review",
      ioc_indicators: [
        {
          type: "IP",
          value: "194.26.29.112",
          status: "Suspicious",
          threat_actor: "Unknown",
          confidence: "Medium"
        }
      ]
    },
    threat_type: "SQL Injection",
    risk_score: 76.4,
    risk_level: "High",
    priority: "P2",
    affected_asset: "HR-Portal-Web-01",
    ml_confidence: 88.9,
    risk_factors: {
      severity: 75,
      ml_confidence: 89,
      asset_criticality: 70,
      vulnerability: 75,
      threat_intelligence: 65
    },
    related_events: [
      {
        event_id: "EVT-2006",
        timestamp: "2026-08-29T08:22:15Z",
        source_ip: "194.26.29.112",
        description: "Malicious payload detected in HTTP POST parameters"
      }
    ],
    mitre_techniques: [
      "T1190 - Exploit Public-Facing Application"
    ],
    ioc_status: "Investigating",
    reasons: [
      "UNION SELECT query pattern detected in HTTP body request",
      "Multiple 500 internal server error responses triggered"
    ],
    recommendations: [
      "Advisory: Update WAF rule set to inspect and drop SQLi signatures",
      "Advisory: Parameterize queries on vulnerable HR-Portal endpoint"
    ],
    status: "Investigating",
    attack_chain: {
      attack_chain_id: "AC-003",
      events: [
        { event_id: "EVT-2005", timestamp: "2026-08-29T08:20:00Z", event_type: "HTTP Reconnaissance Probe" },
        { event_id: "EVT-2006", timestamp: "2026-08-29T08:22:15Z", event_type: "SQL Injection Payload Execution" }
      ],
      mitre_techniques: ["T1190 - Exploit Public-Facing Application"],
      tactics: ["Initial Access", "Execution"],
      stages: ["Reconnaissance", "Initial Access", "Execution"],
      current_stage: "Execution",
      risk_score: 76.4,
      confidence: 85,
      start_time: "2026-08-29T08:20:00Z",
      end_time: "2026-08-29T08:22:15Z",
      asset: "HR-Portal-Web-01",
      source_ip: "194.26.29.112"
    }
  },
  {
    incident_id: "INC-1004",
    created_at: "2026-08-29T07:11:05Z",
    security_intelligence: {
      cve_id: "CVE-2024-38077",
      cvss_score: 8.4,
      vulnerability_status: "Active Exploitation",
      ioc_indicators: [
        {
          type: "IP",
          value: "103.251.170.8",
          status: "Malicious Egress",
          threat_actor: "Lazarus Group",
          confidence: "High"
        }
      ]
    },
    threat_type: "Data Exfiltration",
    risk_score: 84.1,
    risk_level: "High",
    priority: "P2",
    affected_asset: "Cloud-Storage-S3-Bucket",
    ml_confidence: 96.0,
    risk_factors: {
      severity: 85,
      ml_confidence: 96,
      asset_criticality: 80,
      vulnerability: 80,
      threat_intelligence: 75
    },
    related_events: [
      {
        event_id: "EVT-2008",
        timestamp: "2026-08-29T07:11:05Z",
        source_ip: "103.251.170.8",
        description: "Anomalous 12.4 GB outbound network transfer over non-standard port"
      }
    ],
    mitre_techniques: [
      "T1048 - Exfiltration Over Alternative Protocol"
    ],
    ioc_status: "Active",
    reasons: [
      "Egress data transfer 400% above historical baseline",
      "Outbound connection directed to low-reputation IP in unassigned ASN"
    ],
    recommendations: [
      "Advisory: Temporarily block outbound connection on port 8443",
      "Advisory: Perform audit on S3 bucket access policies"
    ],
    status: "Open",
    attack_chain: {
      attack_chain_id: "AC-004",
      events: [
        { event_id: "EVT-2007", timestamp: "2026-08-29T07:05:00Z", event_type: "Bucket Access Policy Change" },
        { event_id: "EVT-2008", timestamp: "2026-08-29T07:11:05Z", event_type: "Large Data Transfer Egress" }
      ],
      mitre_techniques: ["T1048 - Exfiltration Over Alternative Protocol"],
      tactics: ["Exfiltration"],
      stages: ["Initial Access", "Collection", "Exfiltration"],
      current_stage: "Exfiltration",
      risk_score: 84.1,
      confidence: 94,
      start_time: "2026-08-29T07:05:00Z",
      end_time: "2026-08-29T07:11:05Z",
      asset: "Cloud-Storage-S3-Bucket",
      source_ip: "103.251.170.8"
    }
  },
  {
    incident_id: "INC-1005",
    created_at: "2026-08-29T06:05:40Z",
    security_intelligence: {
      cve_id: "CVE-2023-38831",
      cvss_score: 5.3,
      vulnerability_status: "Mitigated",
      ioc_indicators: [
        {
          type: "Domain",
          value: "auth-update-verify.com",
          status: "Phishing",
          threat_actor: "FIN7",
          confidence: "High"
        },
        {
          type: "IP",
          value: "198.51.100.44",
          status: "Suspicious",
          threat_actor: "FIN7",
          confidence: "Low"
        }
      ]
    },
    threat_type: "Phishing",
    risk_score: 45.0,
    risk_level: "Medium",
    priority: "P3",
    affected_asset: "API-Gateway-Internal",
    ml_confidence: 79.5,
    risk_factors: {
      severity: 45,
      ml_confidence: 80,
      asset_criticality: 30,
      vulnerability: 35,
      threat_intelligence: 25
    },
    related_events: [
      {
        event_id: "EVT-2010",
        timestamp: "2026-08-29T06:05:40Z",
        source_ip: "198.51.100.44",
        description: "Suspicious link click detected in user inbox log"
      }
    ],
    mitre_techniques: [
      "T1566.002 - Spearphishing Link"
    ],
    ioc_status: "Remediated",
    reasons: [
      "User clicked credential harvesting link in external email",
      "No secondary authentication token submission detected"
    ],
    recommendations: [
      "Advisory: Purge malicious email from organization mailboxes",
      "Advisory: Reset user corporate single sign-on credentials"
    ],
    status: "Resolved",
    attack_chain: {
      attack_chain_id: "AC-005",
      events: [
        { event_id: "EVT-2009", timestamp: "2026-08-29T06:00:10Z", event_type: "Phishing Email Delivered" },
        { event_id: "EVT-2010", timestamp: "2026-08-29T06:05:40Z", event_type: "Malicious Link Clicked" }
      ],
      mitre_techniques: ["T1566.002 - Spearphishing Link"],
      tactics: ["Initial Access"],
      stages: ["Reconnaissance", "Initial Access"],
      current_stage: "Initial Access",
      risk_score: 45.0,
      confidence: 78,
      start_time: "2026-08-29T06:00:10Z",
      end_time: "2026-08-29T06:05:40Z",
      asset: "API-Gateway-Internal",
      source_ip: "198.51.100.44"
    }
  },
  {
    incident_id: "INC-1006",
    created_at: "2026-08-28T14:30:00Z",
    security_intelligence: {
      cve_id: "CVE-2024-4471",
      cvss_score: 6.2,
      vulnerability_status: "Patch Pending",
      ioc_indicators: [
        {
          type: "IP",
          value: "91.240.118.172",
          status: "Scanning",
          threat_actor: "Unknown",
          confidence: "Medium"
        }
      ]
    },
    threat_type: "Reconnaissance",
    risk_score: 38.0,
    risk_level: "Low",
    priority: "P4",
    affected_asset: "VPN-Edge-Router-02",
    ml_confidence: 84.0,
    risk_factors: {
      severity: 30,
      ml_confidence: 84,
      asset_criticality: 40,
      vulnerability: 40,
      threat_intelligence: 30
    },
    related_events: [
      {
        event_id: "EVT-2014",
        timestamp: "2026-08-28T14:30:00Z",
        source_ip: "91.240.118.172",
        description: "Port sweep on internal subnet ranges"
      }
    ],
    mitre_techniques: [
      "T1046 - Network Service Discovery"
    ],
    ioc_status: "Active",
    reasons: [
      "Rapid sequential TCP SYN probes targeting non-standard ports"
    ],
    recommendations: [
      "Advisory: Rate-limit ICMP and SYN requests on VPN gateway"
    ],
    status: "Investigating",
    attack_chain: null
  },
  {
    incident_id: "INC-1007",
    created_at: "2026-08-28T11:10:20Z",
    security_intelligence: {
      cve_id: "CVE-2024-7723",
      cvss_score: 7.1,
      vulnerability_status: "Open",
      ioc_indicators: [
        {
          type: "IP",
          value: "185.190.140.23",
          status: "Volumetric Egress",
          threat_actor: "Mirai Botnet",
          confidence: "High"
        }
      ]
    },
    threat_type: "DDoS Attack",
    risk_score: 82.5,
    risk_level: "High",
    priority: "P2",
    affected_asset: "K8s-Ingress-Controller",
    ml_confidence: 93.0,
    risk_factors: {
      severity: 85,
      ml_confidence: 93,
      asset_criticality: 85,
      vulnerability: 70,
      threat_intelligence: 80
    },
    related_events: [
      {
        event_id: "EVT-2016",
        timestamp: "2026-08-28T11:10:20Z",
        source_ip: "185.190.140.23",
        description: "SYN Flood spike reaching 45,000 packets/sec"
      }
    ],
    mitre_techniques: [
      "T1498 - Network Denial of Service"
    ],
    ioc_status: "Active",
    reasons: [
      "High packet-rate volumetric anomaly detected at border ingress"
    ],
    recommendations: [
      "Advisory: Engage cloud scrubbing center and enforce rate throttling"
    ],
    status: "Open",
    attack_chain: null
  },
  {
    incident_id: "INC-1008",
    created_at: "2026-08-27T16:45:00Z",
    security_intelligence: {
      cve_id: "CVE-2024-5561",
      cvss_score: 5.3,
      vulnerability_status: "Resolved",
      ioc_indicators: [
        {
          type: "IP",
          value: "172.16.45.89",
          status: "Internal Pivot",
          threat_actor: "Insider Threat",
          confidence: "Medium"
        }
      ]
    },
    threat_type: "Unauthorized Access",
    risk_score: 58.0,
    risk_level: "Medium",
    priority: "P3",
    affected_asset: "Finance-App-Server",
    ml_confidence: 82.0,
    risk_factors: {
      severity: 60,
      ml_confidence: 82,
      asset_criticality: 70,
      vulnerability: 45,
      threat_intelligence: 40
    },
    related_events: [
      {
        event_id: "EVT-2018",
        timestamp: "2026-08-27T16:45:00Z",
        source_ip: "172.16.45.89",
        description: "Privilege escalation attempt using expired Service Account token"
      }
    ],
    mitre_techniques: [
      "T1078.004 - Cloud Accounts"
    ],
    ioc_status: "Remediated",
    reasons: [
      "Service account token re-use from non-whitelisted workstation IP"
    ],
    recommendations: [
      "Advisory: Invalidate leaked service token and rotate secrets vault"
    ],
    status: "Resolved",
    attack_chain: null
  }
];

/**
 * Fetch all security incidents with optional filtering.
 * 
 * @param {Object} [filters={}] - Filter criteria (e.g. { status, risk_level, priority, search })
 * @returns {Promise<Array>} List of incident objects matching exact team schema
 */
export async function getIncidents(filters = {}) {
  await new Promise((resolve) => setTimeout(resolve, 150));

  let results = [...MOCK_INCIDENTS];

  if (filters.status && filters.status !== 'All') {
    results = results.filter((inc) => inc.status.toLowerCase() === filters.status.toLowerCase());
  }

  if (filters.risk_level && filters.risk_level !== 'All') {
    results = results.filter((inc) => inc.risk_level.toLowerCase() === filters.risk_level.toLowerCase());
  }

  if (filters.priority && filters.priority !== 'All') {
    results = results.filter((inc) => inc.priority.toLowerCase() === filters.priority.toLowerCase());
  }

  if (filters.search) {
    const term = filters.search.toLowerCase();
    results = results.filter((inc) =>
      inc.incident_id.toLowerCase().includes(term) ||
      inc.threat_type.toLowerCase().includes(term) ||
      inc.affected_asset.toLowerCase().includes(term)
    );
  }

  return results;
}

/**
 * Fetch a single incident by its unique ID.
 * 
 * @param {string} incident_id - Unique incident identifier (e.g. "INC-1001")
 * @returns {Promise<Object|null>} Incident object matching exact team schema or null if not found
 */
export async function getIncidentById(incident_id) {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const incident = MOCK_INCIDENTS.find((inc) => inc.incident_id === incident_id);
  return incident ? { ...incident } : null;
}

/**
 * Dynamically computes summary metrics from MOCK_INCIDENTS.
 * Derived from the exact same array PriorityTable reads.
 * 
 * @returns {Promise<Object>} Aggregated incident risk counts
 */
export async function getRiskSummary() {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const total_incidents = MOCK_INCIDENTS.length;
  const critical = MOCK_INCIDENTS.filter((i) => i.risk_level === 'Critical').length;
  const high = MOCK_INCIDENTS.filter((i) => i.risk_level === 'High').length;
  const medium = MOCK_INCIDENTS.filter((i) => i.risk_level === 'Medium').length;
  const low = MOCK_INCIDENTS.filter((i) => i.risk_level === 'Low').length;
  const open_incidents = MOCK_INCIDENTS.filter((i) => i.status === 'Open').length;

  return {
    total_incidents,
    critical,
    high,
    medium,
    low,
    open_incidents
  };
}
