import { useState } from 'react'

const TEMPLATES = {
  founder: {
    name: 'Founder Agreement',
    template: `This Founder Agreement ("Agreement") is entered into on {{date}} between {{company_name}}, a {{state}} corporation ("Company"), and {{founder_name}} ("Founder").

WHEREAS, the Company is engaged in the business of {{industry}};

NOW, THEREFORE, the parties agree as follows:

1. GRANT OF SHARES
The Company grants to the Founder {{shares}} shares of Common Stock (the "Shares"), representing {{ownership_pct}}% of the fully diluted capitalization.

2. VESTING
The Shares shall vest over a {{vesting_period}}-year period, with a {{cliff_period}}-year cliff.

3. BOARD SEAT
The Founder shall be entitled to {{board_seats}} board seat(s).

4. CONFIDENTIALITY
The Founder agrees to maintain the confidentiality of the Company's proprietary information.

5. NON-COMPETE
For a period of {{non_compete_period}} following termination, the Founder shall not compete with the Company.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

{{company_name}}

By: ________________________
Name: {{signatory_name}}
Title: {{signatory_title}}

{{founder_name}}

By: ________________________`,
  },
  shareholder: {
    name: 'Shareholder Agreement',
    template: `SHAREHOLDER AGREEMENT

This Shareholder Agreement is made on {{date}} between {{company_name}} and {{shareholder_name}}.

The Shareholder agrees to purchase {{shares}} shares at ${{price_per_share}} per share for a total consideration of ${{total_investment}}.

Share Class: {{share_class}}
Rights: {{rights}}`,
  },
  esop: {
    name: 'ESOP Agreement',
    template: `EMPLOYEE STOCK OPTION PLAN AGREEMENT

Date: {{date}}
Company: {{company_name}}
Employee: {{employee_name}}
Total Options: {{options}} shares
Exercise Price: ${{exercise_price}}/share
Vesting: {{vesting_schedule}}
Expiry: {{expiry_date}}`,
  },
  nda: {
    name: 'NDA',
    template: `NON-DISCLOSURE AGREEMENT

This NDA is entered into on {{date}} by and between {{company_name}} ("Disclosing Party") and {{recipient_name}} ("Receiving Party").

The Receiving Party agrees not to disclose any confidential information shared by the Disclosing Party for a period of {{term}} years.

Purpose: {{purpose}}`,
  },
}

const STARTUPS = ['NeuralPath AI', 'GreenGrid Energy', 'PayFlow Inc', 'BlockVault', 'MediSync Labs']

const FILL_DATA = {
  'NeuralPath AI': { industry: 'Artificial Intelligence & Machine Learning', state: 'Delaware', founder_name: 'Alex Chen', signatory_name: 'Dr. Sarah Chen', signatory_title: 'CEO' },
  'GreenGrid Energy': { industry: 'Clean Energy Technology', state: 'California', founder_name: 'Sarah Kim', signatory_name: 'James Park', signatory_title: 'CEO' },
  'PayFlow Inc': { industry: 'Financial Technology', state: 'Delaware', founder_name: 'Raj Patel', signatory_name: 'Raj Patel', signatory_title: 'CEO' },
  'BlockVault': { industry: 'Cybersecurity', state: 'Texas', founder_name: 'Lisa Wang', signatory_name: 'Lisa Wang', signatory_title: 'CEO' },
  'MediSync Labs': { industry: 'Healthcare Technology', state: 'Massachusetts', founder_name: 'Dr. Mike Johnson', signatory_name: 'Dr. Mike Johnson', signatory_title: 'CEO' },
}

export default function Agreements() {
  const [startup, setStartup] = useState(STARTUPS[0])
  const [template, setTemplate] = useState('founder')
  const [generated, setGenerated] = useState(null)
  const [edits, setEdits] = useState({})

  const tpl = TEMPLATES[template]

  const defaultVals = {
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    company_name: startup,
    industry: FILL_DATA[startup]?.industry || '',
    state: FILL_DATA[startup]?.state || '',
    founder_name: FILL_DATA[startup]?.founder_name || '',
    signatory_name: FILL_DATA[startup]?.signatory_name || '',
    signatory_title: FILL_DATA[startup]?.signatory_title || '',
    shares: '500,000',
    ownership_pct: '50',
    vesting_period: '4',
    cliff_period: '1',
    board_seats: '1',
    non_compete_period: '12 months',
    shareholder_name: 'John Investor',
    price_per_share: '1.50',
    total_investment: '600,000',
    share_class: 'Series A Preferred',
    rights: 'Information rights, pro-rata rights, MFN',
    employee_name: 'Jane Employee',
    options: '10,000',
    exercise_price: '2.00',
    vesting_schedule: '4 years with 1-year cliff',
    expiry_date: '10 years from grant',
    recipient_name: 'Third Party',
    term: '5',
    purpose: 'Evaluation of potential business relationship',
  }

  const generate = () => {
    const vals = { ...defaultVals, ...edits }
    let result = tpl.template
    Object.entries(vals).forEach(([k, v]) => {
      result = result.replaceAll(`{{${k}}}`, v)
    })
    // highlight placeholders that were filled
    Object.entries(vals).forEach(([k, v]) => {
      result = result.replaceAll(v, `<span class="placeholder">${v}</span>`)
    })
    setGenerated(result)
  }

  const fields = [
    ...(template === 'founder' ? [
      { key: 'industry', label: 'Industry' },
      { key: 'state', label: 'State of Incorporation' },
      { key: 'founder_name', label: 'Founder Name' },
      { key: 'shares', label: 'Shares Granted' },
      { key: 'ownership_pct', label: 'Ownership %' },
      { key: 'vesting_period', label: 'Vesting Period (years)' },
      { key: 'cliff_period', label: 'Cliff Period (years)' },
    ] : template === 'shareholder' ? [
      { key: 'shareholder_name', label: 'Shareholder Name' },
      { key: 'shares', label: 'Shares' },
      { key: 'price_per_share', label: 'Price Per Share ($)' },
      { key: 'total_investment', label: 'Total Investment ($)' },
      { key: 'share_class', label: 'Share Class' },
    ] : template === 'esop' ? [
      { key: 'employee_name', label: 'Employee Name' },
      { key: 'options', label: 'Total Options' },
      { key: 'exercise_price', label: 'Exercise Price ($)' },
      { key: 'vesting_schedule', label: 'Vesting Schedule' },
      { key: 'expiry_date', label: 'Expiry Date' },
    ] : [
      { key: 'recipient_name', label: 'Recipient Name' },
      { key: 'term', label: 'Term (years)' },
      { key: 'purpose', label: 'Purpose' },
    ]),
    { key: 'signatory_name', label: 'Signatory Name' },
    { key: 'signatory_title', label: 'Signatory Title' },
  ]

  return (
    <>
      <div className="grid grid-cols-2" style={{ gap: 20 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Generate Agreement</span>
          </div>
          <div className="form-group">
            <label className="form-label">Startup</label>
            <select value={startup} onChange={e => setStartup(e.target.value)} style={{ width: '100%' }}>
              {STARTUPS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Agreement Type</label>
            <select value={template} onChange={e => { setTemplate(e.target.value); setGenerated(null) }} style={{ width: '100%' }}>
              {Object.entries(TEMPLATES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
            </select>
          </div>
          {fields.map(f => (
            <div className="form-group" key={f.key}>
              <label className="form-label">{f.label}</label>
              <input
                value={edits[f.key] !== undefined ? edits[f.key] : defaultVals[f.key] || ''}
                onChange={e => setEdits({ ...edits, [f.key]: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>
          ))}
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={generate}>
            ✨ Generate Agreement
          </button>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Preview — {tpl.name}</span>
            {generated && <button className="btn btn-sm btn-primary">📄 Export PDF</button>}
          </div>
          {generated ? (
            <div className="agreement-preview" dangerouslySetInnerHTML={{ __html: generated }} />
          ) : (
            <div className="empty-state">
              <div className="icon">📝</div>
              <h3>No agreement generated yet</h3>
              <p>Fill in the details and click "Generate Agreement"</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
