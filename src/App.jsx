import { useState } from 'react'
import { useTheme } from './context/ThemeContext'
import Dashboard from './components/Dashboard'
import CapTableView from './components/CapTableView'
import Agreements from './components/Agreements'
import Comments from './components/Comments'
import HealthCheck from './components/HealthCheck'
import Reports from './components/Reports'
import Startups from './components/Startups'

const NAV = [
  { section: 'Main' },
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'startups', label: 'Startups', icon: '🏢' },
  { section: 'Cap Table' },
  { id: 'cap-table', label: 'By Stakeholder', icon: '👥' },
  { id: 'agreements', label: 'Agreements', icon: '📝' },
  { section: 'Review' },
  { id: 'comments', label: 'Comments', icon: '💬' },
  { id: 'health', label: 'Cap Table Health', icon: '🔍' },
  { id: 'reports', label: 'Reports', icon: '📈' },
]

const start = window.performance?.getEntriesByType?.('navigation')?.[0]

export default function App() {
  const [page, setPage] = useState('dashboard')
  const { theme, toggle } = useTheme()

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard />
      case 'startups': return <Startups />
      case 'cap-table': return <CapTableView />
      case 'agreements': return <Agreements />
      case 'comments': return <Comments />
      case 'health': return <HealthCheck />
      case 'reports': return <Reports />
      default: return <Dashboard />
    }
  }

  const pageTitle = {
    dashboard: 'Dashboard',
    startups: 'Startups',
    'cap-table': 'Cap Table — By Stakeholder',
    agreements: 'Agreement Generation',
    comments: 'Document Reviews',
    health: 'Cap Table Health',
    reports: 'Reports & Exports',
  }[page] || 'Dashboard'

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          EquityPro <span>BETA</span>
        </div>
        <nav className="sidebar-nav">
          {NAV.map((item, i) =>
            item.section ? (
              <div key={i} className="nav-section">{item.section}</div>
            ) : (
              <button
                key={item.id}
                className={`nav-item ${page === item.id ? 'active' : ''}`}
                onClick={() => setPage(item.id)}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </button>
            )
          )}
        </nav>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <h1 className="topbar-title">{pageTitle}</h1>
          <div className="topbar-actions">
            <button className="theme-toggle" onClick={toggle} title="Toggle theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <div className="user-badge">
              <div className="user-avatar">SA</div>
              <span className="user-name">Super Admin</span>
            </div>
          </div>
        </header>
        <main className="content">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
