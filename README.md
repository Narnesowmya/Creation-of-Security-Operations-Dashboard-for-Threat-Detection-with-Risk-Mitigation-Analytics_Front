🛡️ Vigilion

Creation of Security Operations Dashboard for Threat Detection with Risk Mitigation Analytics

Group 2

A modern Security Operations Center (SOC) dashboard for monitoring security events, understanding threats, prioritizing incidents, and supporting security investigation and response.

📌 Project Overview

Vigilion is a security operations dashboard designed to help SOC analysts understand security telemetry and quickly identify which incidents require attention first.

The dashboard brings together security events, threat intelligence, vulnerabilities, AI/ML predictions, risk prioritization, incident investigation, event correlation, attack-chain context, risk explanations, and response recommendations in one interface.

🎯 Main Objective

Transform raw security events into clear, prioritized, and actionable security information for SOC analysts.

✨ Key Features

Feature

Description

📊 Security Operations Overview

Monitor security telemetry and threat activity

🚨 Risk Overview

Identify high-risk and critical incidents

🔎 Threat Intelligence

Explore attack vectors and threat context

🛡️ Vulnerability Visibility

Review vulnerability-related security context

🤖 AI/ML Predictions

Display AI-assisted predictions and confidence

📈 Security Analytics

Visualize severity, attack types, and event trends

🔗 Event Correlation

Connect related security events

⛓️ Attack Chain

Visualize correlated attack progression

🧠 Risk Explanation

Understand factors contributing to risk

🚨 Recommendations

Support investigation and response

🔍 Filters

Search and filter security information

🖥️ Dashboard Screenshots

1. Login / Analyst Console



2. Main Security Operations Dashboard



3. Dashboard Analytics & Telemetry



4. AI Threat Predictions Stream



5. Risk Overview & Incident Priority Operations



6. Incident Risk Trend & Priority Queue



7. Threat Intelligence



8. Security Analytics



🧩 Main Application Views

Overview — High-level SOC telemetry and threat status

Security Events — Review security event telemetry

Threat Intelligence — Explore attack vectors and threat context

Vulnerabilities — Review vulnerability exposure

Analytics — Visualize security trends and distributions

Correlation — Review related security events

Risk Overview — Understand incident risk and priority

Incident Investigation — Investigate individual incidents

Attack Chain — Understand correlated attack progression

Recommendations — Review suggested response actions

🔄 Security Operations Workflow

Security Events
       │
       ▼
Threat / ML Context
       │
       ▼
Risk Calculation
       │
       ▼
Event Correlation
       │
       ▼
Incident Creation
       │
       ▼
Priority Queue
       │
       ▼
Incident Investigation
       │
       ├── Security Intelligence
       ├── Risk Explanation
       ├── Attack Chain
       └── Response Recommendations

Which security event or incident should the analyst investigate first, and why?

🏗️ Frontend Architecture

                  SOC Analyst
                       │
                       ▼
        ┌───────────────────────────┐
        │     Vigilion Frontend     │
        │                           │
        │  Dashboard                │
        │  Security Events          │
        │  Threat Intelligence      │
        │  Vulnerabilities          │
        │  Analytics                │
        │  Correlation              │
        │  Incident Investigation   │
        │  Attack Chain             │
        │  Recommendations          │
        └─────────────┬─────────────┘
                      │
                      │ REST API
                      ▼
        ┌───────────────────────────┐
        │      Security Backend     │
        │                           │
        │  Risk Calculation         │
        │  Incident Management      │
        │  IOC / MITRE Context      │
        │  Vulnerability Exposure   │
        │  Event Correlation        │
        │  Attack Chain Context     │
        │  Recommendations          │
        └─────────────┬─────────────┘
                      │
                      ▼
                Security Data

🔌 Backend API Integration

Method

Endpoint

Purpose

POST

/api/v1/risk/calculate

Calculate event risk

GET

/api/v1/risk/high

Retrieve high-risk events

GET

/api/v1/risk/summary

Retrieve risk summary

GET

/api/v1/incidents

Retrieve incidents

GET

/api/v1/incidents/{incident_id}

Retrieve a specific incident

PATCH

/api/v1/incidents/{incident_id}/status

Update incident status

GET

/api/v1/attack-chains

Retrieve attack-chain information

GET

/api/v1/recommendations/{incident_id}

Retrieve recommendations

Risk, correlation, and incident logic are handled by the backend. The frontend focuses on presenting the results clearly to the analyst.

📈 Risk & Incident Prioritization

Event
  ↓
Threat Severity
  ↓
ML / Anomaly Context
  ↓
Asset & Vulnerability Context
  ↓
Threat Intelligence
  ↓
Risk Score
  ↓
Risk Level
  ↓
Investigation Priority

This allows analysts to move from a large stream of security events to a focused incident investigation queue.

🧠 Incident Investigation

The investigation view brings together:

Incident details

Risk score

Risk level

Investigation priority

Asset information

Related events

Security intelligence

MITRE ATT&CK context

IOC context

Vulnerability context

Attack-chain information

Risk explanation

Response recommendations

Incident status

🛠️ Getting Started

Prerequisites

Node.js

npm

Git

Project backend/API for API-backed functionality

Installation

git clone https://github.com/Narnesowmya/Creation-of-Security-Operations-Dashboard-for-Threat-Detection-with-Risk-Mitigation-Analytics_Front.git
cd Creation-of-Security-Operations-Dashboard-for-Threat-Detection-with-Risk-Mitigation-Analytics_Front
npm install
npm run dev
