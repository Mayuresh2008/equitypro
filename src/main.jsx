import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

window.addEventListener('error', (e) => {
  const loading = document.getElementById('loading')
  if (loading) {
    loading.className = 'error'
    loading.innerHTML = 'JS Error: ' + (e.message || e) + ' at ' + (e.filename || '?') + ':' + (e.lineno || '?')
  }
})
window.addEventListener('unhandledrejection', (e) => {
  const loading = document.getElementById('loading')
  if (loading) {
    loading.className = 'error'
    loading.innerHTML = 'Unhandled: ' + (e.reason?.message || e.reason)
  }
})

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { err: null } }
  static getDerivedStateFromError(err) { return { err } }
  componentDidCatch(err, info) {
    const loading = document.getElementById('loading')
    if (loading) {
      loading.className = 'error'
      loading.innerHTML = 'React Error: ' + err.message + '\nComponent: ' + (info?.componentStack?.split('\n')[1]?.trim() || '?')
    }
  }
  render() {
    if (this.state.err) return <div style={{padding:20,color:'#ef4444'}}>Error: {String(this.state.err)}</div>
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </ErrorBoundary>
)
