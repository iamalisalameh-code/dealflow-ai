'use client'
import React, { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'

type Lang = 'en' | 'ar'
type Tab = 'profile' | 'sales' | 'targets' | 'danger'

const industries = ['Real Estate', 'SaaS / Tech', 'Finance', 'Insurance', 'Healthcare', 'E-commerce', 'Consulting', 'Other']
const experiences = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

export default function MobileSettings() {
  const [lang, setLang] = useState<Lang>('en')
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [form, setForm] = useState({
    fullName: '', industry: '', experience: '', role: '',
    targetCallsPerDay: 10, targetDealsPerMonth: 5, targetRevenue: '',
    objectionStyle: '', closingStyle: '', salesNotes: '',
  })

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang
    if (saved) setLang(saved)
    loadProfile()
  }, [])

  const isAr = lang === 'ar'

  const loadProfile = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (profile) {
        setForm({
          fullName: profile.full_name || '',
          industry: profile.industry || '',
          experience: profile.experience_level || '',
          role: profile.role || '',
          targetCallsPerDay: profile.target_calls_per_day || 10,
          targetDealsPerMonth: profile.target_deals_per_month || 5,
          targetRevenue: profile.target_revenue || '',
          objectionStyle: profile.objection_style || '',
          closingStyle: profile.closing_style || '',
          salesNotes: profile.sales_notes || '',
        })
      }
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const saveProfile = async () => {
    setSaving(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      await supabase.from('profiles').upsert({
        id: user.id,
        full_name: form.fullName,
        industry: form.industry,
        experience_level: form.experience,
        role: form.role,
        target_calls_per_day: form.targetCallsPerDay,
        target_deals_per_month: form.targetDealsPerMonth,
        target_revenue: form.targetRevenue,
        objection_style: form.objectionStyle,
        closing_style: form.closingStyle,
        sales_notes: form.salesNotes,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') return
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      window.location.href = '/landing'
    } catch (err) { console.error(err) }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 48, padding: '0 16px', borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)',
    color: '#fff', fontSize: 15, fontFamily: 'inherit', outline: 'none',
  }

  const tabs: { id: Tab, label: string, labelAr: string, icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', labelAr: 'الملف', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { id: 'sales', label: 'Sales', labelAr: 'المبيعات', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
    { id: 'targets', label: 'Targets', labelAr: 'الأهداف', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
    { id: 'danger', label: 'Danger', labelAr: 'خطر', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  ]

  const label = (en: string, ar: string) => isAr ? ar : en

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent; }
        body { font-family:${isAr ? "'Noto Sans Arabic'" : "'DM Sans'"}, -apple-system,sans-serif;background:#000;color:#fff;-webkit-font-smoothing:antialiased; }
        input::placeholder,textarea::placeholder { color:rgba(255,255,255,0.3); }
        select option { background:#1c1c1e;color:#fff; }
        .tap-btn { transition:transform 0.15s; } .tap-btn:active { transform:scale(0.97); }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      {/* Header */}
      <div style={{ padding: '56px 20px 16px', direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => window.location.href = '/'} className="tap-btn"
              style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">{isAr ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}</svg>
            </button>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{label('Settings', 'الإعدادات')}</div>
          </div>
          <button onClick={() => { const next = isAr ? 'en' : 'ar'; localStorage.setItem('lang', next); setLang(next) }}
            style={{ height: 30, padding: '0 12px', borderRadius: 15, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
            {isAr ? 'EN' : 'AR'}
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ height: 36, padding: '0 14px', borderRadius: 18, border: `1px solid ${activeTab === tab.id ? (tab.id === 'danger' ? '#ff453a' : '#0a84ff') : 'rgba(255,255,255,0.1)'}`, background: activeTab === tab.id ? (tab.id === 'danger' ? 'rgba(255,69,58,0.12)' : 'rgba(10,132,255,0.12)') : 'transparent', color: activeTab === tab.id ? (tab.id === 'danger' ? '#ff453a' : '#0a84ff') : 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              {tab.icon}
              {isAr ? tab.labelAr : tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '8px 20px 120px', direction: isAr ? 'rtl' : 'ltr' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ width: 24, height: 24, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto' }} />
          </div>
        ) : (
          <>
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{label('Personal Info', 'المعلومات الشخصية')}</div>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{label('Full Name', 'الاسم الكامل')}</div>
                  <input style={inputStyle} value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} placeholder={label('Your full name', 'اسمك الكامل')} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{label('Role / Title', 'المسمى الوظيفي')}</div>
                  <input style={inputStyle} value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder={label('e.g. Sales Manager', 'مثال: مدير مبيعات')} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{label('Industry', 'القطاع')}</div>
                  <select style={{...inputStyle, appearance: 'none'} as React.CSSProperties} value={form.industry} onChange={e => setForm({...form, industry: e.target.value})}>
                    <option value="">{label('Select industry', 'اختر القطاع')}</option>
                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{label('Experience Level', 'مستوى الخبرة')}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {experiences.map(exp => (
                      <button key={exp} onClick={() => setForm({...form, experience: exp})}
                        style={{ height: 44, borderRadius: 12, border: `1px solid ${form.experience === exp ? '#0a84ff' : 'rgba(255,255,255,0.1)'}`, background: form.experience === exp ? 'rgba(10,132,255,0.15)' : 'transparent', color: form.experience === exp ? '#0a84ff' : 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>
                        {exp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SALES TAB */}
            {activeTab === 'sales' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{label('Sales Style', 'أسلوب المبيعات')}</div>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{label('Objection Handling Style', 'أسلوب التعامل مع الاعتراضات')}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Assertive Closer', 'Consultative Guide', 'Data-Driven', 'Storyteller'].map(style => (
                      <button key={style} onClick={() => setForm({...form, objectionStyle: style})}
                        style={{ height: 48, borderRadius: 14, border: `1px solid ${form.objectionStyle === style ? '#0a84ff' : 'rgba(255,255,255,0.1)'}`, background: form.objectionStyle === style ? 'rgba(10,132,255,0.12)' : 'rgba(255,255,255,0.04)', color: form.objectionStyle === style ? '#0a84ff' : 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', textAlign: isAr ? 'right' : 'left', padding: '0 16px' }}>
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{label('Closing Style', 'أسلوب الإغلاق')}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Assumptive Close', 'Urgency Close', 'Question Close', 'Summary Close'].map(style => (
                      <button key={style} onClick={() => setForm({...form, closingStyle: style})}
                        style={{ height: 48, borderRadius: 14, border: `1px solid ${form.closingStyle === style ? '#bf5af2' : 'rgba(255,255,255,0.1)'}`, background: form.closingStyle === style ? 'rgba(191,90,242,0.12)' : 'rgba(255,255,255,0.04)', color: form.closingStyle === style ? '#bf5af2' : 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', textAlign: isAr ? 'right' : 'left', padding: '0 16px' }}>
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{label('Sales Notes', 'ملاحظات المبيعات')}</div>
                  <textarea style={{...inputStyle, height: 100, padding: '12px 16px', resize: 'none'} as React.CSSProperties}
                    placeholder={label('Notes about your product, clients, typical objections...', 'ملاحظات عن منتجك وعملائك والاعتراضات الشائعة...')}
                    value={form.salesNotes} onChange={e => setForm({...form, salesNotes: e.target.value})} />
                </div>
              </div>
            )}

            {/* TARGETS TAB */}
            {activeTab === 'targets' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{label('Daily & Monthly Targets', 'الأهداف اليومية والشهرية')}</div>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{label('Calls per day', 'مكالمات يومياً')}: <span style={{ color: '#0a84ff', fontWeight: 700 }}>{form.targetCallsPerDay}</span></div>
                  <input type="range" min={1} max={50} value={form.targetCallsPerDay}
                    onChange={e => setForm({...form, targetCallsPerDay: parseInt(e.target.value)})}
                    style={{ width: '100%', accentColor: '#0a84ff' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                    <span>1</span><span>50</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{label('Deals per month', 'صفقات شهرياً')}: <span style={{ color: '#34c759', fontWeight: 700 }}>{form.targetDealsPerMonth}</span></div>
                  <input type="range" min={1} max={50} value={form.targetDealsPerMonth}
                    onChange={e => setForm({...form, targetDealsPerMonth: parseInt(e.target.value)})}
                    style={{ width: '100%', accentColor: '#34c759' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
                    <span>1</span><span>50</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{label('Revenue Target / Month', 'هدف الإيرادات / شهر')}</div>
                  <input style={inputStyle} type="number" value={form.targetRevenue} onChange={e => setForm({...form, targetRevenue: e.target.value})} placeholder="e.g. 50000" />
                </div>
              </div>
            )}

            {/* DANGER TAB */}
            {activeTab === 'danger' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ padding: '16px', borderRadius: 16, background: 'rgba(255,69,58,0.06)', border: '1px solid rgba(255,69,58,0.15)' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#ff453a', marginBottom: 6 }}>{label('Delete Account', 'حذف الحساب')}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: 16 }}>{label('This will permanently delete your account and all data. This cannot be undone.', 'سيؤدي هذا إلى حذف حسابك وجميع بياناتك نهائياً. لا يمكن التراجع عن هذا.')}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{label('Type DELETE to confirm', 'اكتب DELETE للتأكيد')}</div>
                  <input style={{...inputStyle, border: '1px solid rgba(255,69,58,0.3)', background: 'rgba(255,69,58,0.06)'}} value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder="DELETE" />
                  <button onClick={handleDeleteAccount} disabled={deleteConfirm !== 'DELETE'} className="tap-btn"
                    style={{ width: '100%', height: 48, borderRadius: 24, border: 'none', background: deleteConfirm === 'DELETE' ? '#ff453a' : 'rgba(255,69,58,0.15)', color: deleteConfirm === 'DELETE' ? '#fff' : 'rgba(255,69,58,0.4)', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', marginTop: 10, cursor: 'pointer' }}>
                    {label('Delete My Account', 'حذف حسابي')}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Save button — fixed at bottom */}
      {activeTab !== 'danger' && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px 20px 32px', background: 'linear-gradient(transparent, #000 40%)', direction: isAr ? 'rtl' : 'ltr' }}>
          <button onClick={saveProfile} disabled={saving} className="tap-btn"
            style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: saved ? '#34c759' : '#0a84ff', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
            {saving ? (
              <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            ) : saved ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>{label('Saved!', 'تم الحفظ!')}</>
            ) : label('Save Changes', 'حفظ التغييرات')}
          </button>
        </div>
      )}
    </>
  )
}