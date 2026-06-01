import React from 'react'
import ReactDOM from 'react-dom/client'

window.addEventListener('error', (e) => {
  const loading = document.getElementById('loading')
  if (loading) {
    loading.className = 'error'
    loading.innerHTML = 'JS Error: ' + (e.message || e) + ' at ' + (e.filename || '?') + ':' + (e.lineno || '?') + '\nStack: ' + (e.error?.stack || 'no stack')
  }
})
window.addEventListener('unhandledrejection', (e) => {
  const loading = document.getElementById('loading')
  if (loading) {
    loading.className = 'error'
    loading.innerHTML = 'Unhandled: ' + (e.reason?.message || e.reason) + '\nStack: ' + (e.reason?.stack || 'no stack')
  }
})

try {
  console.log('[main] Starting render')
  ReactDOM.createRoot(document.getElementById('root')).render(
    <div style={{padding: 20}}>
      <h1>Hello from React!</h1>
      <p>If you see this, React works. The full app is broken somewhere.</p>
    </div>
  )
  console.log('[main] Rendered successfully')
  const loading = document.getElementById('loading')
  if (loading) loading.remove()
} catch (e) {
  console.error('[main] Caught error:', e)
  const loading = document.getElementById('loading')
  if (loading) {
    loading.className = 'error'
    loading.innerHTML = 'Caught: ' + e.message + '\nStack: ' + e.stack
  }
}
