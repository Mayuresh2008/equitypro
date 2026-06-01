import { useState } from 'react'

const DOCUMENTS = [
  { id: 1, startup: 'NeuralPath AI', type: 'Founder Agreement', version: 'v2', status: 'Pending Review' },
  { id: 2, startup: 'GreenGrid Energy', type: 'Shareholder Agreement', version: 'v1', status: 'Approved' },
  { id: 3, startup: 'PayFlow Inc', type: 'ESOP Agreement', version: 'v3', status: 'Changes Requested' },
  { id: 4, startup: 'BlockVault', type: 'NDA', version: 'v1', status: 'Pending Review' },
]

const INITIAL_COMMENTS = {
  1: [
    { id: 1, author: 'Admin', text: 'Please update the vesting schedule to include a 1-year cliff.', time: '2 hours ago', resolved: false },
    { id: 2, author: 'NeuralPath AI', text: 'Updated as requested. The cliff period is now 1 year.', time: '1 hour ago', resolved: false },
    { id: 3, author: 'Admin', text: 'Looks good. One more thing — please confirm the share count.', time: '30 min ago', resolved: false },
  ],
  2: [
    { id: 4, author: 'Admin', text: 'Shareholder rights section looks correct. Approved.', time: '1 day ago', resolved: true },
  ],
  3: [
    { id: 5, author: 'Admin', text: 'The option pool size needs to be increased to 15% per the board resolution.', time: '3 hours ago', resolved: false },
    { id: 6, author: 'PayFlow Inc', text: 'Will update and re-upload.', time: '2 hours ago', resolved: false },
  ],
  4: [
    { id: 7, author: 'Admin', text: 'Please add the jurisdiction clause.', time: '5 hours ago', resolved: false },
  ],
}

const DOC_CONTENT = {
  1: `FOUNDER AGREEMENT

This Founder Agreement is entered into on January 15, 2026 between NeuralPath AI ("Company") and Alex Chen ("Founder").

1. GRANT OF SHARES
The Company grants to the Founder 500,000 shares of Common Stock, representing 50% of the fully diluted capitalization.

2. VESTING
The Shares shall vest over a 4-year period, with a 1-year cliff. 25% of the Shares shall vest on the first anniversary of the Vesting Start Date, and the remaining Shares shall vest monthly over the following 36 months.

3. BOARD SEAT
The Founder shall be entitled to 1 board seat.

4. CONFIDENTIALITY
The Founder agrees to maintain the confidentiality of the Company's proprietary information.

5. NON-COMPETE
For a period of 12 months following termination, the Founder shall not compete with the Company.`,
  2: `SHAREHOLDER AGREEMENT

This Shareholder Agreement is made on January 10, 2026 between NeuralPath AI and Accel Ventures.

The Shareholder agrees to purchase 400,000 shares at $2.50 per share for a total consideration of $1,000,000.

Share Class: Series A Preferred
Rights: Information rights, pro-rata rights, pre-emptive rights, anti-dilution protection`,
  3: `EMPLOYEE STOCK OPTION PLAN AGREEMENT

Company: PayFlow Inc
Employee: Jane Employee
Total Options: 10,000 shares
Exercise Price: $2.00/share
Vesting: 4 years with 1-year cliff
Expiry: 10 years from date of grant`,
  4: `NON-DISCLOSURE AGREEMENT

This NDA is entered into on February 1, 2026 by and between BlockVault ("Disclosing Party") and Third Party ("Receiving Party").

The Receiving Party agrees not to disclose any confidential information shared by the Disclosing Party for a period of 5 years.

Purpose: Evaluation of potential business relationship`,
}

export default function Comments() {
  const [selectedDoc, setSelectedDoc] = useState(DOCUMENTS[0])
  const [comments, setComments] = useState(INITIAL_COMMENTS)
  const [newComment, setNewComment] = useState('')
  const [showResolved, setShowResolved] = useState(false)

  const docComments = (comments[selectedDoc.id] || []).filter(c => showResolved || !c.resolved)

  const addComment = () => {
    if (!newComment.trim()) return
    const c = {
      id: Date.now(),
      author: 'Admin',
      text: newComment.trim(),
      time: 'Just now',
      resolved: false,
    }
    setComments({
      ...comments,
      [selectedDoc.id]: [...(comments[selectedDoc.id] || []), c],
    })
    setNewComment('')
  }

  const toggleResolve = (commentId) => {
    setComments({
      ...comments,
      [selectedDoc.id]: (comments[selectedDoc.id] || []).map(c =>
        c.id === commentId ? { ...c, resolved: !c.resolved } : c
      ),
    })
  }

  const statusBadge = (status) => {
    const map = {
      'Pending Review': 'badge-yellow',
      'Approved': 'badge-green',
      'Changes Requested': 'badge-red',
    }
    return <span className={`badge ${map[status] || 'badge-blue'}`}>{status}</span>
  }

  return (
    <div style={{ display: 'flex', gap: 20, height: 'calc(100vh - 140px)' }}>
      {/* Document List */}
      <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {DOCUMENTS.map(d => (
          <div
            key={d.id}
            className="card"
            style={{
              cursor: 'pointer',
              padding: 14,
              borderColor: selectedDoc.id === d.id ? 'var(--primary)' : 'var(--border)',
            }}
            onClick={() => setSelectedDoc(d)}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{d.startup}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: 2 }}>{d.type} · {d.version}</div>
            <div style={{ marginTop: 6 }}>{statusBadge(d.status)}</div>
          </div>
        ))}
      </div>

      {/* Document + Comments */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
        {/* Comments Section - ABOVE the document */}
        <div className="card" style={{ flexShrink: 0, maxHeight: 300, display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <span className="card-title">
              Comments ({docComments.length})
            </span>
            <label style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <input type="checkbox" checked={showResolved} onChange={e => setShowResolved(e.target.checked)} />
              Show resolved
            </label>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
            {docComments.length === 0 ? (
              <div className="empty-state" style={{ padding: '20px' }}>
                <div className="icon" style={{ fontSize: '1.5rem' }}>💬</div>
                <h3 style={{ fontSize: '0.85rem' }}>No comments</h3>
              </div>
            ) : (
              docComments.map(c => (
                <div className="comment" key={c.id}>
                  <div className="comment-avatar">{c.author[0]}</div>
                  <div className="comment-body">
                    <div className="comment-header">
                      <span className="comment-author">{c.author}</span>
                      <span className="comment-time">{c.time}</span>
                      {c.resolved && <span className="comment-resolved">✓ Resolved</span>}
                    </div>
                    <div className="comment-text">{c.text}</div>
                    <div style={{ marginTop: 4 }}>
                      <button
                        className="btn btn-sm"
                        style={{ fontSize: '0.65rem', padding: '2px 8px' }}
                        onClick={() => toggleResolve(c.id)}
                      >
                        {c.resolved ? 'Reopen' : 'Resolve'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="comment-input-area" style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 8 }}>
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addComment() } }}
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={addComment}>Send</button>
          </div>
        </div>

        {/* Document Preview */}
        <div className="card" style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
          <div className="card-header">
            <span className="card-title">
              {selectedDoc.startup} — {selectedDoc.type}
            </span>
            <button className="btn btn-sm btn-primary">📄 Download</button>
          </div>
          <div className="agreement-preview" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.6 }}>
            {DOC_CONTENT[selectedDoc.id]}
          </div>
        </div>
      </div>
    </div>
  )
}
