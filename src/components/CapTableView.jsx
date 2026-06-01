import { useState } from 'react'

const SHAREHOLDERS = [
  { id: 1, name: 'Alex Chen', type: 'Founder', class: 'Common', shares: 500000 },
  { id: 2, name: 'Sarah Kim', type: 'Founder', class: 'Common', shares: 300000 },
  { id: 3, name: 'Accel Ventures', type: 'Investor', class: 'Series A Preferred', shares: 400000 },
  { id: 4, name: 'Sequoia Capital', type: 'Investor', class: 'Series A Preferred', shares: 250000 },
  { id: 5, name: 'ESOP Pool', type: 'ESOP', class: 'Common', shares: 100000 },
  { id: 6, name: 'Mike Johnson', type: 'Advisor', class: 'Common (Restricted)', shares: 50000 },
]

const SHARE_CLASSES = ['All', 'Common', 'Series A Preferred', 'Common (Restricted)']

export default function CapTableView() {
  const [view, setView] = useState('stakeholder')
  const totalShares = SHAREHOLDERS.reduce((s, h) => s + h.shares, 0)

  return (
    <>
      <div className="tabs">
        <button className={`tab ${view === 'stakeholder' ? 'active' : ''}`} onClick={() => setView('stakeholder')}>
          👥 By Stakeholder
        </button>
        <button className={`tab ${view === 'class' ? 'active' : ''}`} onClick={() => setView('class')}>
          📁 By Share Class
        </button>
      </div>

      {view === 'stakeholder' ? (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Shareholder Breakdown</span>
            <span className="card-sub">Total Shares: {totalShares.toLocaleString()}</span>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Shareholder</th>
                  <th>Type</th>
                  <th>Class</th>
                  <th>Shares</th>
                  <th>Ownership</th>
                </tr>
              </thead>
              <tbody>
                {SHAREHOLDERS.map(h => (
                  <tr key={h.id}>
                    <td style={{ fontWeight: 500 }}>{h.name}</td>
                    <td><span className={`badge ${h.type === 'Founder' ? 'badge-green' : h.type === 'Investor' ? 'badge-blue' : 'badge-yellow'}`}>{h.type}</span></td>
                    <td>{h.class}</td>
                    <td>{h.shares.toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 80, height: 6, background: 'var(--bg-hover)', borderRadius: 3 }}>
                          <div style={{ width: `${(h.shares / totalShares) * 100}%`, height: '100%', background: 'var(--primary)', borderRadius: 3 }} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{((h.shares / totalShares) * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ fontWeight: 600 }}>
                  <td colSpan={3}>Total</td>
                  <td>{totalShares.toLocaleString()}</td>
                  <td>100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {SHARE_CLASSES.filter(c => c !== 'All').map(cls => {
            const holders = SHAREHOLDERS.filter(h => h.class === cls)
            const clsTotal = holders.reduce((s, h) => s + h.shares, 0)
            return (
              <div className="card" key={cls}>
                <div className="card-header">
                  <span className="card-title">{cls}</span>
                  <span className="card-sub">{((clsTotal / totalShares) * 100).toFixed(1)}% · {holders.length} holders</span>
                </div>
                {holders.map(h => (
                  <div key={h.id} className="chart-bar">
                    <span className="chart-bar-label">{h.name}</span>
                    <div className="chart-bar-track">
                      <div className="chart-bar-fill" style={{ width: `${(h.shares / clsTotal) * 100}%`, background: h.type === 'Founder' ? '#6366f1' : h.type === 'Investor' ? '#10b981' : '#f59e0b' }}>
                        {h.shares >= 100000 ? `${((h.shares / clsTotal) * 100).toFixed(0)}%` : ''}
                      </div>
                    </div>
                    <span className="chart-bar-value">{h.shares.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
