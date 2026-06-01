import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'

window.addEventListener('error', (e) => {
  const loading = document.getElementById('loading')
  if (loading) {
    loading.className = 'error'
    loading.textContent = 'JS Error: ' + e.message
  }
})
window.addEventListener('unhandledrejection', (e) => {
  const loading = document.getElementById('loading')
  if (loading) {
    loading.className = 'error'
    loading.textContent = 'Unhandled: ' + (e.reason?.message || e.reason)
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
