'use client'
import React, { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase'

const TOTAL_STEPS = 7

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string, path: string, size: number }[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    fullName: '',
    industry: '',
    experience: 'Intermediate',
    product: '',
    website: '',
    competitors: ['', '', ''],
    objectionStyle: '',
    closingStyle: '',
    monthlyTarget: '',
    dailyCalls: '',
  })

  const update = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }))

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    if (uploadedFiles.length + files.length > 3) { setUploadError('Maximum 3 files allowed'); return }
    const allowed = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    for (const file of files) {
      if (!allowed.includes(file.type)) { setUploadError('Only PDF, TXT, and Word documents allowed'); return }
      if (file.size > 5 * 1024 * 1024) { setUploadError('Each file must be under 5MB'); return }
    }
    setUploadError('')
    setUploading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not logged in')
      for (const file of files) {
        const path = user.id + '/' + Date.now() + '_' + file.name
        const { error } = await supabase.storage.from('user-documents').upload(path, file)
        if (error) throw error
        setUploadedFiles(prev => [...prev, { name: file.name, path, size: file.size }])
      }
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed')
    }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeFile = async (index: number) => {
    try {
      const supabase = createClient()
      await supabase.storage.from('user-documents').remove([uploadedFiles[index].path])
      setUploadedFiles(prev => prev.filter((_, i) => i !== index))
    } catch (err) { console.error(err) }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleFinish = async () => {
    setSaving(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('profiles').upsert({
          id: user.id,
          full_name: form.fullName,
          industry: form.industry,
          experience: form.experience,
          product: form.product,
          website: form.website,
          competitors: form.competitors.filter(c => c.trim()),
          objection_style: form.objectionStyle,
          closing_style: form.closingStyle,
          monthly_target: form.monthlyTarget,
          daily_calls: form.dailyCalls,
          document_paths: uploadedFiles.map(f => f.path),
          onboarded: true,
        })
      }
    } catch (err) { console.error(err) }
    setSaving(false)
    window.location.href = '/'
  }

  const canProceed = () => {
    if (step === 1) return form.fullName.trim().length > 0
    if (step === 2) return form.industry !== '' && form.product.trim().length > 0
    if (step === 5) return form.objectionStyle.length > 0
    if (step === 6) return form.monthlyTarget.trim().length > 0
    return true
  }

  const industries = ['Real Estate', 'SaaS / Tech', 'Finance', 'Insurance', 'Healthcare', 'E-commerce', 'Consulting', 'Other']
  const experiences = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  const objectionStyles = [
    { label: 'Assertive Closer', desc: 'Direct, confident, persistent' },
    { label: 'Consultative Guide', desc: 'Empathetic, relationship-focused' },
    { label: 'Data-Driven', desc: 'Facts, ROI, logic-based' },
    { label: 'Storyteller', desc: 'Narratives, social proof, emotion' },
  ]
  const closingStyles = [
    { label: 'Assumptive Close', desc: 'Act as if the deal is done' },
    { label: 'Urgency Close', desc: 'Create time pressure' },
    { label: 'Question Close', desc: 'Use questions to guide' },
    { label: 'Summary Close', desc: 'Recap value before asking' },
  ]

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px', borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)', color: '#fff',
    fontSize: 15, outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  }

  const optionBtn = (selected: boolean): React.CSSProperties => ({
    padding: '13px 18px', borderRadius: 14, cursor: 'pointer',
    border: '1px solid ' + (selected ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'),
    background: selected ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
    color: selected ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.45)',
    fontSize: 14, fontWeight: selected ? 500 : 400,
    transition: 'all 0.2s',
  })

  const label: React.CSSProperties = {
    fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)',
    letterSpacing: '0.05em', marginBottom: 10, display: 'block'
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #000; color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; -webkit-font-smoothing: antialiased; }
        input::placeholder { color: rgba(255,255,255,0.2); }
        input:focus { border-color: rgba(255,255,255,0.2) !important; outline: none; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>

        {/* Spatial mesh */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '70%', height: '70%', borderRadius: '50%', background: '#00e5a0', filter: 'blur(160px)', opacity: 0.05, mixBlendMode: 'screen' }} />
          <div style={{ position: 'absolute', bottom: '-30%', right: '-20%', width: '60%', height: '60%', borderRadius: '50%', background: '#4488ff', filter: 'blur(160px)', opacity: 0.05, mixBlendMode: 'screen' }} />
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, position: 'relative', zIndex: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 13, background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px', color: 'rgba(255,255,255,0.9)' }}>DealFlow AI</span>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 40, position: 'relative', zIndex: 10 }}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} style={{ height: 3, borderRadius: 2, transition: 'all 0.3s', width: i + 1 === step ? 28 : 8, background: i + 1 <= step ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>

        {/* Card */}
        <div key={step} style={{ width: '100%', maxWidth: 520, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32, padding: '40px 36px', backdropFilter: 'blur(40px)', position: 'relative', zIndex: 10, animation: 'fadeUp 0.35s ease' }}>

          {/* Step label */}
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>
            Step {step} of {TOTAL_STEPS}
          </div>

          {/* Step 1 — About you */}
          {step === 1 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 6, color: 'rgba(255,255,255,0.92)' }}>Tell me about you</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>This helps me personalize your AI agent</div>
              <div style={{ marginBottom: 20 }}>
                <span style={label}>Full Name</span>
                <input style={inputStyle} placeholder="Your full name" value={form.fullName} onChange={e => update('fullName', e.target.value)} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <span style={label}>Industry</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {industries.map(ind => (
                    <div key={ind} style={optionBtn(form.industry === ind)} onClick={() => update('industry', ind)}>{ind}</div>
                  ))}
                </div>
              </div>
              <div>
                <span style={label}>Experience Level</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                  {experiences.map(exp => (
                    <div key={exp} style={{ ...optionBtn(form.experience === exp), textAlign: 'center', padding: '10px 8px', fontSize: 13 }} onClick={() => update('experience', exp)}>{exp}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — What you sell */}
          {step === 2 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 6, color: 'rgba(255,255,255,0.92)' }}>Teach me what you sell</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>I'll use this to generate smarter insights during calls</div>
              <div style={{ marginBottom: 20 }}>
                <span style={label}>What do you sell?</span>
                <input style={inputStyle} placeholder="e.g. Luxury apartments in Dubai Marina" value={form.product} onChange={e => update('product', e.target.value)} />
              </div>
              <div>
                <span style={label}>Company website <span style={{ color: 'rgba(255,255,255,0.2)' }}>(optional)</span></span>
                <input style={inputStyle} placeholder="https://yourcompany.com" value={form.website} onChange={e => update('website', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 3 — Competitors */}
          {step === 3 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 6, color: 'rgba(255,255,255,0.92)' }}>Know your battlefield</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>Add your top competitors so I can help you differentiate</div>
              {form.competitors.map((comp, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <span style={label}>Competitor {i + 1} {i > 0 && <span style={{ color: 'rgba(255,255,255,0.2)' }}>(optional)</span>}</span>
                  <input style={inputStyle} placeholder={['Main competitor', 'Second competitor', 'Third competitor'][i]}
                    value={comp} onChange={e => {
                      const updated = [...form.competitors]
                      updated[i] = e.target.value
                      update('competitors', updated)
                    }} />
                </div>
              ))}
            </div>
          )}

          {/* Step 4 — Document upload */}
          {step === 4 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 6, color: 'rgba(255,255,255,0.92)' }}>Train your AI agent</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>Upload documents so your AI learns your exact context</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', marginBottom: 28 }}>Max 3 files · PDF, TXT, Word · 5MB each · Optional</div>

              {/* Doc type hints */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
                {[
                  { icon: '📄', label: 'Sales scripts' },
                  { icon: '📊', label: 'Product sheets' },
                  { icon: '🏆', label: 'Case studies' },
                  { icon: '📝', label: 'Company docs' },
                ].map((d, i) => (
                  <div key={i} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{d.icon}</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{d.label}</span>
                  </div>
                ))}
              </div>

              {/* Upload area */}
              {uploadedFiles.length < 3 && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{ border: '1px dashed rgba(255,255,255,0.12)', borderRadius: 18, padding: '28px 20px', textAlign: 'center', cursor: 'pointer', marginBottom: 16, transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.25)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                >
                  {uploading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
                      <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                      Uploading...
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>📎</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Click to upload documents</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>PDF, TXT, DOC, DOCX · Max 5MB each</div>
                    </>
                  )}
                </div>
              )}

              <input ref={fileInputRef} type="file" accept=".pdf,.txt,.doc,.docx" multiple style={{ display: 'none' }} onChange={handleFileUpload} />

              {uploadError && (
                <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,69,58,0.08)', border: '1px solid rgba(255,69,58,0.2)', fontSize: 13, color: '#ff453a', marginBottom: 12 }}>⚠ {uploadError}</div>
              )}

              {uploadedFiles.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {uploadedFiles.map((file, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{file.name.endsWith('.pdf') ? '📄' : '📝'}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{formatSize(file.size)}</div>
                      </div>
                      <button onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 16, padding: '2px 6px', flexShrink: 0, fontFamily: 'inherit' }}>✕</button>
                    </div>
                  ))}
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 4 }}>
                    {uploadedFiles.length}/3 files · Your AI agent will learn from these
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5 — Objection style */}
          {step === 5 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 6, color: 'rgba(255,255,255,0.92)' }}>Choose your style</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>How do you prefer to handle objections?</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {objectionStyles.map(s => (
                  <div key={s.label} style={{ ...optionBtn(form.objectionStyle === s.label), display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => update('objectionStyle', s.label)}>
                    <div>
                      <div style={{ fontWeight: 500, marginBottom: 2, color: form.objectionStyle === s.label ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.6)' }}>{s.label}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{s.desc}</div>
                    </div>
                    {form.objectionStyle === s.label && (
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#000', fontWeight: 700, flexShrink: 0 }}>✓</div>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <span style={label}>Preferred closing style</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {closingStyles.map(s => (
                    <div key={s.label} style={{ ...optionBtn(form.closingStyle === s.label), fontSize: 13 }} onClick={() => update('closingStyle', s.label)}>
                      <div style={{ fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 6 — Targets */}
          {step === 6 && (
            <div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 6, color: 'rgba(255,255,255,0.92)' }}>Set your targets</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>I'll track your progress and coach you toward these goals</div>
              <div style={{ marginBottom: 24 }}>
                <span style={label}>Monthly Revenue Target</span>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>AED</span>
                  <input style={{ ...inputStyle, paddingLeft: 56 }} placeholder="500,000" value={form.monthlyTarget} onChange={e => update('monthlyTarget', e.target.value)} />
                </div>
              </div>
              <div>
                <span style={label}>Daily Calls Target</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
                  {['5', '10', '15', '20', '25+'].map(n => (
                    <div key={n} style={{ ...optionBtn(form.dailyCalls === n), textAlign: 'center', padding: '12px 8px' }} onClick={() => update('dailyCalls', n)}>
                      <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.5px' }}>{n}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>calls</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 7 — All set */}
          {step === 7 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px', animation: 'float 3s ease-in-out infinite' }}>
                🎉
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.5px', marginBottom: 8, color: 'rgba(255,255,255,0.92)' }}>You're all set!</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32, lineHeight: 1.7 }}>
                Your AI agent is calibrated and ready.<br />Let's close some deals.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left', marginBottom: 8 }}>
                {[
                  { label: 'Name', value: form.fullName },
                  { label: 'Industry', value: form.industry },
                  { label: 'Objection style', value: form.objectionStyle },
                  { label: 'Documents', value: uploadedFiles.length > 0 ? uploadedFiles.length + ' file' + (uploadedFiles.length > 1 ? 's' : '') : 'None' },
                  { label: 'Monthly target', value: form.monthlyTarget ? 'AED ' + form.monthlyTarget : 'Not set' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'rgba(255,255,255,0.7)', flexShrink: 0, fontWeight: 700 }}>✓</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 1 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{item.value || '—'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
            {step > 1 && step < 7 && (
              <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: '14px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)', fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                Back
              </button>
            )}

            {step < 4 && (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} style={{ flex: 1, padding: '14px', borderRadius: 16, border: 'none', background: canProceed() ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.07)', color: canProceed() ? '#000' : 'rgba(255,255,255,0.2)', fontSize: 15, fontWeight: 600, cursor: canProceed() ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                Next →
              </button>
            )}

            {step === 4 && (
              <button onClick={() => setStep(5)} style={{ flex: 1, padding: '14px', borderRadius: 16, border: 'none', background: 'rgba(255,255,255,0.9)', color: '#000', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {uploadedFiles.length > 0 ? 'Continue with ' + uploadedFiles.length + ' file' + (uploadedFiles.length > 1 ? 's' : '') + ' →' : 'Skip for now →'}
              </button>
            )}

            {(step === 5 || step === 6) && (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} style={{ flex: 1, padding: '14px', borderRadius: 16, border: 'none', background: canProceed() ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.07)', color: canProceed() ? '#000' : 'rgba(255,255,255,0.2)', fontSize: 15, fontWeight: 600, cursor: canProceed() ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                {step === 6 ? 'Finish Setup →' : 'Next →'}
              </button>
            )}

            {step === 7 && (
              <button onClick={handleFinish} disabled={saving} style={{ flex: 1, padding: '14px', borderRadius: 16, border: 'none', background: saving ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)', color: saving ? 'rgba(255,255,255,0.3)' : '#000', fontSize: 15, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {saving && <div style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
                {saving ? 'Saving...' : 'Go to Dashboard →'}
              </button>
            )}
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.15)', position: 'relative', zIndex: 10 }}>
          Step {step} of {TOTAL_STEPS}
        </div>
      </div>
    </>
  )
}