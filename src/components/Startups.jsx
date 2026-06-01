import { useState } from 'react'

const STARTUPS = [
  { id: 1, name: 'NeuralPath AI', industry: 'AI/ML', stage: 'Series A', status: 'Active' },
  { id: 2, name: 'GreenGrid Energy', industry: 'CleanTech', stage: 'Seed', status: 'Active' },
  { id: 3, name: 'PayFlow Inc', industry: 'FinTech', stage: 'Series B', status: 'Active' },
  { id: 4, name: 'BlockVault', industry: 'Security', stage: 'Seed', status: 'Active' },
  { id: 5, name: 'MediSync Labs', industry: 'HealthTech', stage: 'Series A', status: 'Active' },
]

export default function Startups() {
  const [search, setSearch] = useState('')
  const list = STARTUPS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">All Startups</span>
        <input
          placeholder="Search startups..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 240 }}
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Industry</th>
              <th>Stage</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 500 }}>{s.name}</td>
                <td>{s.industry}</td>
                <td><span className="badge badge-blue">{s.stage}</span></td>
                <td><span className="badge badge-green">{s.status}</span></td>
                <td><button className="btn btn-sm">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
