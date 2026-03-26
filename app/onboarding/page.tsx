'use client'
import React, { useState } from 'react'
import { createClient } from '@/lib/supabase'

const TOTAL_STEPS = 6

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    industry: '',
    experience: 'Intermediate',
    product: '',
    website: '',
    competitors: ['', '', ''],
    objectionStyle: '',
    monthlyTarget: '',
    dailyCalls: '',
    closingStyle: '',
  })

  const update = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }))

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
          monthly_target: form.monthlyTarget,
          daily_calls: form.dailyCalls,
          closing_style: form.closingStyle,
          onboarded: true,
        })
      }
    } catch (err) {
      console.error('Save error:', err)
    }
    setSaving(false)
    window.location.href = '/'
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px', borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)', color: '#fff',
    fontSize: 15, outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
    transition: 'border-color 0.2s',
  }

  const optionStyle = (selected: boolean): React.CSSProperties => ({
    padding: '14px 20px', borderRadius: 12, cursor: 'pointer',
    border: `1px solid ${selected ? 'rgba(0,229,160,0.4)' : 'rgba(255,255,255,0.08)'}`,
    background: selected ? 'rgba(0,229,160,0.08)' : 'rgba(255,255,255,0.03)',
    color: selected ? '#00e5a0' : 'rgba(255,255,255,0.6)',
    fontSize: 14, fontWeight: selected ? 600 : 400,
    transition: 'all 0.2s',
  })

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

  const canProceed = () => {
    if (step === 1) return form.fullName.trim().length > 0
    if (step === 2) return form.industry && form.product.trim().length > 0
    if (step === 3) return true
    if (step === 4) return form.objectionStyle.length > 0
    if (step === 5) return form.monthlyTarget.trim().length > 0
    return true
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0f0f18; color: #fff; font-family: 'DM Sans', sans-serif; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        input:focus, textarea:focus { border-color: rgba(0,229,160,0.4) !important; outline: none; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0f0f18', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', position: 'relative', overflow: 'hidden' }}>

        {/* Ambient glows */}
        <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,160,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#00e5a0,#4488ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, color: '#000' }}>DF</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, background: 'linear-gradient(90deg,#00e5a0,#4488ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DealFlow AI</span>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} style={{ height: 4, borderRadius: 2, transition: 'all 0.3s', width: i + 1 === step ? 24 : 8, background: i + 1 <= step ? '#00e5a0' : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>

        {/* Card */}
        <div style={{ width: '100%', maxWidth: 520, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '40px 36px', backdropFilter: 'blur(20px)', animation: 'fadeIn 0.4s ease' }} key={step}>

          {/* Step 1 — About you */}
          {step === 1 && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>STEP 1 OF {TOTAL_STEPS}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Tell me about you</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>This helps me personalize your AI agent</div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Full Name</div>
                <input style={inputStyle} placeholder="Your full name" value={form.fullName} onChange={e => update('fullName', e.target.value)} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Industry</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {industries.map(ind => (
                    <div key={ind} style={optionStyle(form.industry === ind)} onClick={() => update('industry', ind)}>{ind}</div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Experience Level</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  {experiences.map(exp => (
                    <div key={exp} style={{ ...optionStyle(form.experience === exp), textAlign: 'center', padding: '10px 8px', fontSize: 13 }} onClick={() => update('experience', exp)}>{exp}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — What you sell */}
          {step === 2 && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>STEP 2 OF {TOTAL_STEPS}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Teach me what you sell</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>I'll use this to generate smarter insights during calls</div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>What do you sell?</div>
                <input style={inputStyle} placeholder="e.g. Luxury apartments in Dubai Marina" value={form.product} onChange={e => update('product', e.target.value)} />
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Company website (optional)</div>
                <input style={inputStyle} placeholder="https://yourcompany.com" value={form.website} onChange={e => update('website', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 3 — Competitors */}
          {step === 3 && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>STEP 3 OF {TOTAL_STEPS}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Know your battlefield</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>Add your top competitors so I can help you differentiate</div>

              {form.competitors.map((comp, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Competitor {i + 1} {i > 0 && <span style={{ color: 'rgba(255,255,255,0.25)' }}>(optional)</span>}</div>
                  <input style={inputStyle} placeholder={`e.g. ${['Competitor name or brand', 'Another competitor', 'Third competitor'][i]}`}
                    value={comp} onChange={e => {
                      const updated = [...form.competitors]
                      updated[i] = e.target.value
                      update('competitors', updated)
                    }} />
                </div>
              ))}
            </div>
          )}

          {/* Step 4 — Objection style */}
          {step === 4 && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>STEP 4 OF {TOTAL_STEPS}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Choose your style</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>How do you prefer to handle objections?</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {objectionStyles.map(s => (
                  <div key={s.label} style={{ ...optionStyle(form.objectionStyle === s.label), display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => update('objectionStyle', s.label)}>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                      <div style={{ fontSize: 12, opacity: 0.6 }}>{s.desc}</div>
                    </div>
                    {form.objectionStyle === s.label && <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#00e5a0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#000', fontWeight: 700, flexShrink: 0 }}>✓</div>}
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Preferred closing style</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {closingStyles.map(s => (
                    <div key={s.label} style={{ ...optionStyle(form.closingStyle === s.label), fontSize: 13 }} onClick={() => update('closingStyle', s.label)}>
                      <div style={{ fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                      <div style={{ fontSize: 11, opacity: 0.6 }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5 — Set targets */}
          {step === 5 && (
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>STEP 5 OF {TOTAL_STEPS}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Set your targets</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>I'll track your progress and coach you toward these goals</div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Monthly Revenue Target</div>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: 15 }}>AED</span>
                  <input style={{ ...inputStyle, paddingLeft: 56 }} placeholder="500,000" value={form.monthlyTarget} onChange={e => update('monthlyTarget', e.target.value)} />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>Daily Calls Target</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                  {['5', '10', '15', '20', '25+'].map(n => (
                    <div key={n} style={{ ...optionStyle(form.dailyCalls === n), textAlign: 'center', padding: '12px 8px' }} onClick={() => update('dailyCalls', n)}>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700 }}>{n}</div>
                      <div style={{ fontSize: 10, opacity: 0.6 }}>calls</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 6 — All set */}
          {step === 6 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#00e5a0,#4488ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px', animation: 'float 3s ease-in-out infinite', boxShadow: '0 0 40px rgba(0,229,160,0.3)' }}>
                🎉
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 12 }}>You're all set!</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 32, lineHeight: 1.7 }}>
                Your AI agent is calibrated and ready.<br />
                Let's close some deals.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', marginBottom: 32 }}>
                {[
                  { label: 'Profile calibrated', value: form.fullName },
                  { label: 'Industry set', value: form.industry },
                  { label: 'Objection style', value: form.objectionStyle },
                  { label: 'Monthly target', value: form.monthlyTarget ? `AED ${form.monthlyTarget}` : 'Not set' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'rgba(0,229,160,0.06)', border: '1px solid rgba(0,229,160,0.15)' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#00e5a0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#000', fontWeight: 700, flexShrink: 0 }}>✓</div>
                    <div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#00e5a0' }}>{item.value || '—'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
            {step > 1 && step < 6 && (
              <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: '14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                Back
              </button>
            )}
            {step < 5 && (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                style={{ flex: 1, padding: '14px', borderRadius: 12, border: 'none', background: canProceed() ? 'linear-gradient(135deg,#00e5a0,#00b8ff)' : 'rgba(255,255,255,0.08)', color: canProceed() ? '#000' : 'rgba(255,255,255,0.25)', fontSize: 15, fontWeight: 700, cursor: canProceed() ? 'pointer' : 'not-allowed', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s' }}>
                Next →
              </button>
            )}
            {step === 5 && (
              <button onClick={() => setStep(6)} style={{ flex: 1, padding: '14px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#00e5a0,#00b8ff)', color: '#000', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                Finish Setup →
              </button>
            )}
            {step === 6 && (
              <button onClick={handleFinish} disabled={saving} style={{ flex: 1, padding: '14px', borderRadius: 12, border: 'none', background: saving ? 'rgba(0,229,160,0.4)' : 'linear-gradient(135deg,#00e5a0,#00b8ff)', color: '#000', fontSize: 15, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {saving && <div style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
                {saving ? 'Saving...' : 'Go to Dashboard →'}
              </button>
            )}
          </div>
        </div>

        {/* Step counter */}
        <div style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
          Step {step} of {TOTAL_STEPS}
        </div>
      </div>
    </>
  )
}