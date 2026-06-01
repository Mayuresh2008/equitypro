import { useState } from 'react'

const REPORTS = [
  { id: 1, name: 'Cap Table Report', desc: 'Full cap table with all stakeholders and ownership', format: 'PDF, Excel, CSV' },
  { id: 2, name: 'Ownership Summary', desc: 'High-level ownership breakdown by class', format: 'PDF, Excel' },
  { id: 3, name: 'ESOP Report', desc: 'ESOP pool details, grants, and vesting', format: 'PDF, CSV' },
  { id: 4, name: 'Shareholder Register', desc: 'Complete list of all shareholders with contact info', format: 'PDF, Excel' },
  { id: 5, name: 'Funding Round Report', desc: 'Historical funding rounds, valuations, and terms', format: 'PDF, Excel' },
  { id: 6, name: 'Dilution Analysis', desc: 'Dilution impact across all rounds and classes', format: 'PDF' },
]

export default function Reports() {
  const [startup, setStartup] = useState('All Startups')

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">Startup</label>
          <select value={startup} onChange={e => setStartup(e.target.value)}>
            <option>All Startups</option>
            <option>NeuralPath AI</option>
            <option>GreenGrid Energy</option>
            <option>PayFlow Inc</option>
            <option>BlockVault</option>
            <option>MediSync Labs</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ gap: 16 }}>
        {REPORTS.map(r => (
          <div className="card" key={r.id}>
            <div className="card-header">
              <span className="card-title">{r.name}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{r.format}</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 14 }}>{r.desc}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-sm btn-primary">📄 PDF</button>
              <button className="btn btn-sm">📊 Excel</button>
              <button className="btn btn-sm">📋 CSV</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
