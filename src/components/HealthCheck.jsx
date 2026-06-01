import { useState } from 'react'

const ALL_ISSUES = [
  { id: 1, startup: 'NeuralPath AI', severity: 'High', description: 'Ownership totals 98% — does not equal 100%', status: 'Open' },
  { id: 2, startup: 'GreenGrid Energy', severity: 'Medium', description: 'Duplicate shareholder entry for "Sarah Kim"', status: 'Open' },
  { id: 3, startup: 'PayFlow Inc', severity: 'Low', description: 'Missing founder agreement for Raj Patel', status: 'Open' },
  { id: 4, startup: 'BlockVault', severity: 'Critical', description: 'Invalid date on Series A investment (2027-13-01)', status: 'Open' },
  { id: 5, startup: 'MediSync Labs', severity: 'Medium', description: 'Negative share count for ESOP pool', status: 'Resolved' },
  { id: 6, startup: 'NeuralPath AI', severity: 'Low', description: 'Missing board consent for share issuance', status: 'Open' },
]

const HEALTH_CHECKS = [
  { name: 'Ownership Totals 100%', status: 'fail', detail: 'NeuralPath AI: 98%, GreenGrid: 102%' },
  { name: 'No Duplicate Shareholders', status: 'fail', detail: 'GreenGrid Energy has duplicate entry' },
  { name: 'Valid Share Counts', status: 'fail', detail: 'MediSync Labs: negative value detected' },
  { name: 'Missing Agreements', status: 'warn', detail: 'PayFlow Inc: founder agreement missing' },
  { name: 'Valid Dates', status: 'fail', detail: 'BlockVault: invalid date format' },
  { name: 'Founder Records Present', status: 'pass', detail: 'All startups have founder records' },
  { name: 'No Negative Holdings', status: 'pass', detail: 'All holdings are non-negative' },
]

const SEVERITY = { Critical: 'badge-red', High: 'badge-yellow', Medium: 'badge-blue', Low: 'badge-green' }

export default function HealthCheck() {
  const [tab, setTab] = useState('health')

  return (
    <>
      <div className="tabs">
        <button className={`tab ${tab === 'health' ? 'active' : ''}`} onClick={() => setTab('health')}>
          🔍 Health Checks
        </button>
        <button className={`tab ${tab === 'issues' ? 'active' : ''}`} onClick={() => setTab('issues')}>
          ⚠️ Reported Issues ({ALL_ISSUES.filter(i => i.status === 'Open').length})
        </button>
      </div>

      {tab === 'health' ? (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Automated Cap Table Health Checks</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Last checked: Today at 2:00 AM (Lambda)
            </span>
          </div>
          {HEALTH_CHECKS.map(h => (
            <div key={h.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '1rem' }}>
                {h.status === 'pass' ? '✅' : h.status === 'fail' ? '❌' : '⚠️'}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{h.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{h.detail}</div>
              </div>
              <span className={`badge ${h.status === 'pass' ? 'badge-green' : h.status === 'fail' ? 'badge-red' : 'badge-yellow'}`}>
                {h.status === 'pass' ? 'Pass' : h.status === 'fail' ? 'Fail' : 'Warning'}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <span className="card-title">All Reported Issues</span>
          </div>
          {ALL_ISSUES.map(i => (
            <div className="issue-item" key={i.id}>
              <span className="issue-icon">
                {i.severity === 'Critical' ? '🚨' : i.severity === 'High' ? '⚠️' : i.severity === 'Medium' ? '🔶' : 'ℹ️'}
              </span>
              <div className="issue-content">
                <div className="issue-title">{i.description}</div>
                <div className="issue-meta">{i.startup} · Auto-detected</div>
              </div>
              <span className={`badge ${SEVERITY[i.severity]}`}>{i.severity}</span>
              <span className={`badge ${i.status === 'Open' ? 'badge-yellow' : 'badge-green'}`}>{i.status}</span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
