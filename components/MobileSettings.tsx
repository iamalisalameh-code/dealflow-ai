'use client'
import React, { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'

type Lang = 'en' | 'ar'
type Tab = 'profile' | 'sales' | 'targets' | 'documents' | 'danger'

const industries = ['Real Estate', 'SaaS / Tech', 'Finance', 'Insurance', 'Healthcare', 'E-commerce', 'Consulting', 'Other']
const experiences = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
const objectionKeys = ['Assertive Closer', 'Consultative Guide', 'Data-Driven', 'Storyteller']
const closingKeys = ['Assumptive Close', 'Urgency Close', 'Question Close', 'Summary Close']

export default function MobileSettings() {
  const [mounted, setMounted] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string, path: string, size: number }[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    fullName: '', industry: '', experience: 'Intermediate',
    product: '', website: '', competitors: ['', '', ''],
    objectionStyle: '', closingStyle: '', monthlyTarget: '', dailyCalls: '',
  })

  useEffect(() => {
  setMounted(true)
  const savedLang = localStorage.getItem('lang') as Lang
  if (savedLang) setLang(savedLang)
  loadProfile()
}, [])

  const isAr = lang === 'ar'
  const l = (en: string, ar: string) => isAr ? ar : en
  const update = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }))

  const loadProfile = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      setUser(user)
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (profile) {
        setForm({
          fullName: profile.full_name || '',
          industry: profile.industry || '',
          experience: profile.experience || 'Intermediate',
          product: profile.product || '',
          website: profile.website || '',
          competitors: profile.competitors?.length ? [...profile.competitors, ...Array(3).fill('')].slice(0, 3) : ['', '', ''],
          objectionStyle: profile.objection_style || '',
          closingStyle: profile.closing_style || '',
          monthlyTarget: profile.monthly_target || '',
          dailyCalls: profile.daily_calls || '',
        })
        if (profile.document_paths?.length) {
          setUploadedFiles(profile.document_paths.map((path: string) => ({
            name: path.split('/').pop()?.replace(/^\d+_/, '') || path,
            path, size: 0,
          })))
        }
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
        full_name: form.fullName, industry: form.industry, experience: form.experience,
        product: form.product, website: form.website,
        competitors: form.competitors.filter(c => c.trim()),
        objection_style: form.objectionStyle, closing_style: form.closingStyle,
        monthly_target: form.monthlyTarget, daily_calls: form.dailyCalls,
        document_paths: uploadedFiles.map(f => f.path),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

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
    } catch (err: any) { setUploadError(err.message || 'Upload failed') }
    finally { setUploading(false) }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeFile = async (index: number) => {
    try {
      const supabase = createClient()
      await supabase.storage.from('user-documents').remove([uploadedFiles[index].path])
      const updated = uploadedFiles.filter((_, i) => i !== index)
      setUploadedFiles(updated)
      const { data: { user } } = await supabase.auth.getUser()
      if (user) await supabase.from('profiles').update({ document_paths: updated.map(f => f.path) }).eq('id', user.id)
    } catch (err) { console.error(err) }
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') return
    alert('Account deletion requested. Contact support to complete this process.')
    handleSignOut()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 48, padding: '0 16px', borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)',
    color: '#fff', fontSize: 15, fontFamily: 'inherit', outline: 'none',
  }

  const optBtn = (selected: boolean, danger = false): React.CSSProperties => ({
    padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
    border: `1px solid ${selected ? (danger ? 'rgba(255,69,58,0.4)' : 'rgba(255,255,255,0.2)') : 'rgba(255,255,255,0.08)'}`,
    background: selected ? (danger ? 'rgba(255,69,58,0.1)' : 'rgba(255,255,255,0.1)') : 'rgba(255,255,255,0.04)',
    color: selected ? (danger ? '#ff453a' : '#fff') : 'rgba(255,255,255,0.45)',
    fontSize: 13, fontWeight: selected ? 500 : 400,
  })

  const sLabel = (text: string) => (
    <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 10 }}>{text}</div>
  )

  const tabs: { id: Tab, label: string, labelAr: string }[] = [
    { id: 'profile', label: 'Profile', labelAr: 'الملف الشخصي' },
    { id: 'sales', label: 'Sales Setup', labelAr: 'إعداد المبيعات' },
    { id: 'targets', label: 'Targets', labelAr: 'الأهداف' },
    { id: 'documents', label: 'Documents', labelAr: 'المستندات' },
    { id: 'danger', label: 'Danger Zone', labelAr: 'منطقة الخطر' },
  ]

  return (
    <>
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
  * { margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent; }
  body { background:#000;color:#fff;-webkit-font-smoothing:antialiased; }
  input::placeholder,textarea::placeholder { color:rgba(255,255,255,0.25); }
  input:focus,textarea:focus { outline:none; border-color:rgba(255,255,255,0.25) !important; }
  textarea { font-family:inherit; resize:none; }
  select option { background:#1c1c1e;color:#fff; }
  .tap-btn { transition:transform 0.15s; } .tap-btn:active { transform:scale(0.97); }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
`}</style>

      <div style={{ direction: isAr ? 'rtl' : 'ltr', paddingBottom: 100 }}>
        

        {/* Header */}
        <div style={{ padding: '52px 20px 16px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => window.location.href = '/'} className="tap-btn"
                style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">{isAr ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}</svg>
              </button>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{l('Settings', 'الإعدادات')}</div>
            </div>
            <button onClick={() => { const next = isAr ? 'en' : 'ar'; localStorage.setItem('lang', next); setLang(next) }}
              style={{ height: 30, padding: '0 12px', borderRadius: 15, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
              {isAr ? 'EN' : 'AR'}
            </button>
          </div>

          {/* Tabs scroll */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ height: 34, padding: '0 14px', borderRadius: 17, border: `1px solid ${activeTab === tab.id ? (tab.id === 'danger' ? 'rgba(255,69,58,0.4)' : 'rgba(255,255,255,0.2)') : 'rgba(255,255,255,0.08)'}`, background: activeTab === tab.id ? (tab.id === 'danger' ? 'rgba(255,69,58,0.1)' : 'rgba(255,255,255,0.1)') : 'transparent', color: activeTab === tab.id ? (tab.id === 'danger' ? '#ff453a' : '#fff') : 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400, fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer' }}>
                {isAr ? tab.labelAr : tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 10, color: 'rgba(255,255,255,0.4)' }}>
            <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            {l('Loading...', 'جاري التحميل...')}
          </div>
        ) : (
          <div style={{ padding: '16px 20px' }}>

            {/* Profile header card */}
            <div style={{ borderRadius: 24, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, #0a84ff, #bf5af2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, flexShrink: 0 }}>
                {form.fullName ? form.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : user?.email?.[0]?.toUpperCase() || '?'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{form.fullName || l('Name not set', 'لم يتم تعيين الاسم')}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
                {form.industry && <div style={{ display: 'inline-block', marginTop: 4, padding: '2px 8px', borderRadius: 6, background: 'rgba(10,132,255,0.15)', border: '1px solid rgba(10,132,255,0.2)', fontSize: 10, fontWeight: 700, color: '#0a84ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{form.industry}</div>}
              </div>
            </div>

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px' }}>
                  {sLabel(l('Personal Info', 'معلومات شخصية'))}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{l('Full Name', 'الاسم الكامل')}</div>
                    <input style={inputStyle} value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder={l('Your full name', 'اسمك الكامل')} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{l('Email', 'البريد الإلكتروني')}</div>
                    <input style={{...inputStyle, opacity: 0.4, cursor: 'not-allowed'}} value={user?.email || ''} readOnly />
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>{l('Email cannot be changed', 'لا يمكن تغيير البريد الإلكتروني')}</div>
                  </div>
                </div>

                <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px' }}>
                  {sLabel(l('Industry', 'القطاع'))}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {industries.map(ind => (
                      <div key={ind} style={optBtn(form.industry === ind)} onClick={() => update('industry', ind)}>{ind}</div>
                    ))}
                  </div>
                </div>

                <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px' }}>
                  {sLabel(l('Experience Level', 'مستوى الخبرة'))}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {experiences.map(exp => (
                      <div key={exp} style={{...optBtn(form.experience === exp), textAlign: 'center'}} onClick={() => update('experience', exp)}>{exp}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SALES SETUP TAB */}
            {activeTab === 'sales' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px' }}>
                  {sLabel(l('Your Product', 'منتجك'))}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{l('What do you sell?', 'ماذا تبيع؟')}</div>
                    <input style={inputStyle} value={form.product} onChange={e => update('product', e.target.value)} placeholder={l('e.g. Luxury apartments in Dubai Marina', 'مثال: شقق فاخرة في دبي مارينا')} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{l('Company Website', 'موقع الشركة')} <span style={{ color: 'rgba(255,255,255,0.25)' }}>{l('(optional)', '(اختياري)')}</span></div>
                    <input style={inputStyle} value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://yourcompany.com" />
                  </div>
                </div>

                <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px' }}>
                  {sLabel(l('Competitors', 'المنافسون'))}
                  {form.competitors.map((comp, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{l(`Competitor ${i+1}`, `المنافس ${i+1}`)} {i > 0 && <span style={{ color: 'rgba(255,255,255,0.25)' }}>{l('(optional)', '(اختياري)')}</span>}</div>
                      <input style={inputStyle} value={comp} onChange={e => { const updated = [...form.competitors]; updated[i] = e.target.value; update('competitors', updated) }}
                        placeholder={['Main competitor', 'Second competitor', 'Third competitor'][i]} />
                    </div>
                  ))}
                </div>

                <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px' }}>
                  {sLabel(l('Your Style', 'أسلوبك'))}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{l('Objection Handling Style', 'أسلوب التعامل مع الاعتراضات')}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {objectionKeys.map(key => (
                        <div key={key} style={{ ...optBtn(form.objectionStyle === key), display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => update('objectionStyle', key)}>
                          <span>{key}</span>
                          {form.objectionStyle === key && <span>✓</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{l('Closing Style', 'أسلوب الإغلاق')}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {closingKeys.map(key => (
                        <div key={key} style={{ ...optBtn(form.closingStyle === key), fontSize: 12 }} onClick={() => update('closingStyle', key)}>{key}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TARGETS TAB */}
            {activeTab === 'targets' && (
              <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px' }}>
                {sLabel(l('Your Targets', 'أهدافك'))}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{l('Monthly Revenue Target', 'هدف الإيرادات الشهري')}</div>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', [isAr ? 'right' : 'left']: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>AED</span>
                    <input style={{ ...inputStyle, [isAr ? 'paddingRight' : 'paddingLeft']: 52 }} value={form.monthlyTarget} onChange={e => update('monthlyTarget', e.target.value)} placeholder="500,000" />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{l('Daily Calls Target', 'هدف المكالمات اليومي')}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
                    {['5', '10', '15', '20', '25+'].map(n => (
                      <div key={n} style={{ ...optBtn(form.dailyCalls === n), textAlign: 'center', padding: '14px 8px' }} onClick={() => update('dailyCalls', n)}>
                        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.5px' }}>{n}</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{l('calls', 'مكالمات')}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {(form.monthlyTarget || form.dailyCalls) && (
                  <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 14, background: 'rgba(10,132,255,0.06)', border: '1px solid rgba(10,132,255,0.12)' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#0a84ff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{l('Summary', 'ملخص')}</div>
                    {form.monthlyTarget && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{l('Monthly target', 'الهدف الشهري')}: <strong style={{ color: '#0a84ff' }}>AED {form.monthlyTarget}</strong></div>}
                    {form.dailyCalls && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{l('Daily calls', 'المكالمات اليومية')}: <strong style={{ color: '#0a84ff' }}>{form.dailyCalls}</strong></div>}
                  </div>
                )}
              </div>
            )}

            {/* DOCUMENTS TAB */}
            {activeTab === 'documents' && (
              <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px' }}>
                {sLabel(l('Uploaded Documents', 'المستندات المرفوعة'))}
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 16, lineHeight: 1.5 }}>
                  {l('Your AI learns from these files to personalize call analysis', 'يتعلم الذكاء الاصطناعي من هذه الملفات لتخصيص تحليل المكالمات')}
                </div>

                {uploadedFiles.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                    {uploadedFiles.map((file, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, background: 'rgba(52,199,89,0.06)', border: '1px solid rgba(52,199,89,0.15)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                          <div style={{ fontSize: 11, color: '#34c759' }}>✓ {l('Ready for AI learning', 'جاهز للتعلم')}</div>
                        </div>
                        <button onClick={() => removeFile(i)}
                          style={{ background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.2)', borderRadius: 8, color: '#ff453a', cursor: 'pointer', fontSize: 12, padding: '5px 10px', fontFamily: 'inherit' }}>
                          {l('Remove', 'حذف')}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {uploadedFiles.length < 3 && (
                  <>
                    <div onClick={() => fileInputRef.current?.click()}
                      style={{ border: '1px dashed rgba(255,255,255,0.12)', borderRadius: 16, padding: '24px 16px', textAlign: 'center', cursor: 'pointer', marginBottom: 10 }}>
                      {uploading ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
                          <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                          {l('Uploading...', 'جاري الرفع...')}
                        </div>
                      ) : (
                        <>
                          <div style={{ fontSize: 28, marginBottom: 8 }}>📎</div>
                          <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{l('Tap to upload', 'انقر للرفع')}</div>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>PDF, TXT, DOC · Max 5MB · {3 - uploadedFiles.length} {l('slots left', 'ملفات متبقية')}</div>
                        </>
                      )}
                    </div>
                    <input ref={fileInputRef} type="file" accept=".pdf,.txt,.doc,.docx" multiple style={{ display: 'none' }} onChange={handleFileUpload} />
                  </>
                )}

                {uploadError && (
                  <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,69,58,0.08)', border: '1px solid rgba(255,69,58,0.2)', fontSize: 13, color: '#ff453a', marginTop: 8 }}>⚠ {uploadError}</div>
                )}
              </div>
            )}

            {/* DANGER ZONE TAB */}
            {activeTab === 'danger' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Sign out */}
                <div style={{ borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px' }}>
                  {sLabel(l('Sign Out', 'تسجيل الخروج'))}
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 14, lineHeight: 1.5 }}>
                    {l('You will need to sign in again to access your account.', 'ستحتاج إلى تسجيل الدخول مرة أخرى.')}
                  </div>
                  <button onClick={handleSignOut} className="tap-btn"
                    style={{ height: 44, padding: '0 20px', borderRadius: 22, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 14, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>
                    {l('Sign Out →', '← تسجيل الخروج')}
                  </button>
                </div>

                {/* Re-run onboarding */}
                <div style={{ borderRadius: 20, background: 'rgba(255,159,10,0.04)', border: '1px solid rgba(255,159,10,0.15)', padding: '20px' }}>
                  {sLabel(l('Re-run Setup', 'إعادة الإعداد'))}
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 14, lineHeight: 1.5 }}>
                    {l('Re-run the setup wizard to reconfigure your profile.', 'أعد تشغيل معالج الإعداد لتحديث ملفك الشخصي.')}
                  </div>
                  <button onClick={() => window.location.href = '/onboarding'} className="tap-btn"
                    style={{ height: 44, padding: '0 20px', borderRadius: 22, border: '1px solid rgba(255,159,10,0.3)', background: 'rgba(255,159,10,0.08)', color: '#ff9f0a', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
                    {l('Re-run Onboarding →', '← إعادة الإعداد')}
                  </button>
                </div>

                {/* Delete account */}
                <div style={{ borderRadius: 20, background: 'rgba(255,69,58,0.04)', border: '1px solid rgba(255,69,58,0.2)', padding: '20px' }}>
                  {sLabel(l('Delete Account', 'حذف الحساب'))}
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 14, lineHeight: 1.5 }}>
                    {l('All your data will be permanently deleted. This action cannot be undone.', 'سيتم حذف جميع بياناتك بشكل دائم. هذا الإجراء لا يمكن التراجع عنه.')}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,69,58,0.8)', marginBottom: 8 }}>{l('Type DELETE to confirm', 'اكتب DELETE للتأكيد')}</div>
                  <input style={{ ...inputStyle, borderColor: deleteConfirm === 'DELETE' ? 'rgba(255,69,58,0.5)' : 'rgba(255,255,255,0.1)', marginBottom: 10 }}
                    value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder="DELETE" />
                  <button onClick={handleDeleteAccount} disabled={deleteConfirm !== 'DELETE'} className="tap-btn"
                    style={{ width: '100%', height: 48, borderRadius: 24, border: 'none', background: deleteConfirm === 'DELETE' ? '#ff453a' : 'rgba(255,69,58,0.1)', color: deleteConfirm === 'DELETE' ? '#fff' : 'rgba(255,69,58,0.3)', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
                    {l('Permanently Delete Account', 'حذف حسابي نهائياً')}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fixed save button */}
      {activeTab !== 'danger' && activeTab !== 'documents' && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px 20px 32px', background: 'linear-gradient(transparent, #000 40%)', direction: isAr ? 'rtl' : 'ltr', zIndex: 100 }}>
          <button onClick={saveProfile} disabled={saving} className="tap-btn"
            style={{ width: '100%', height: 52, borderRadius: 26, border: 'none', background: saved ? '#34c759' : '#0a84ff', color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
            {saving ? (
              <><div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />{l('Saving...', 'جاري الحفظ...')}</>
            ) : saved ? (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>{l('Saved!', 'تم الحفظ!')}</>
            ) : l('Save Changes', 'حفظ التغييرات')}
          </button>
        </div>
      )}
    </>
  )
}