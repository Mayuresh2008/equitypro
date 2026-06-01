const STATS = [
  { label: 'Total Startups', value: '312', sub: '+12 this quarter', icon: '🏢', color: 'blue' },
  { label: 'Pending Reviews', value: '28', sub: '12 overdue', icon: '⌛', color: 'yellow' },
  { label: 'Open Issues', value: '47', sub: '8 critical', icon: '⚠️', color: 'red' },
  { label: 'Health Score', value: '94%', sub: '↑ 2% from last month', icon: '✅', color: 'green' },
]

const RECENT = [
  { startup: 'NeuralPath AI', event: 'Cap table updated', time: '2 min ago', user: 'Admin' },
  { startup: 'GreenGrid Energy', event: 'Agreement generated', time: '15 min ago', user: 'Admin' },
  { startup: 'PayFlow Inc', event: 'Document uploaded', time: '1 hr ago', user: 'Startup' },
  { startup: 'BlockVault', event: 'Comment resolved', time: '2 hr ago', user: 'Admin' },
  { startup: 'MediSync Labs', event: 'Issue flagged', time: '3 hr ago', user: 'System' },
]

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-4">
        {STATS.map(s => (
          <div className="card" key={s.label}>
            <div className="card-header">
              <span className="card-title">{s.label}</span>
              <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            </div>
            <div className="card-value">{s.value}</div>
            <div className="card-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2" style={{ marginTop: 24 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Ownership Distribution</span>
          </div>
          <div style={{ height: 160, display: 'flex', alignItems: 'flex-end', gap: 8, padding: '12px 0' }}>
            {[
              { label: 'Founders', pct: 55, color: '#6366f1' },
              { label: 'Investors', pct: 30, color: '#10b981' },
              { label: 'ESOP', pct: 10, color: '#f59e0b' },
              { label: 'Advisors', pct: 5, color: '#ef4444' },
            ].map(d => (
              <div key={d.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, marginBottom: 4 }}>{d.pct}%</span>
                <div style={{ width: '100%', maxWidth: 60, height: `${d.pct * 1.4}px`, background: d.color, borderRadius: '6px 6px 0 0', transition: 'height 0.4s' }} />
                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: 6 }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Activity</span>
          </div>
          {RECENT.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < RECENT.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>{r.startup}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{r.event} · {r.user}</div>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{r.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
