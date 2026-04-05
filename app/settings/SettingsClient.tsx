'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import { UserIcon, BriefcaseIcon, TargetIcon, FileIcon, AlertTriangleIcon, GlobeIcon } from '@/components/Icons'
import AppSidebar from '@/components/AppSidebar'

type Lang = 'en' | 'ar'

const industries = ['Real Estate', 'SaaS / Tech', 'Finance', 'Insurance', 'Healthcare', 'E-commerce', 'Consulting', 'Other']
const experiences = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
const objectionKeys = ['Assertive Closer', 'Consultative Guide', 'Data-Driven', 'Storyteller']
const closingKeys = ['Assumptive Close', 'Urgency Close', 'Question Close', 'Summary Close']

export default function SettingsPage() {
  const [hasMounted, setHasMounted] = useState(false)
  const [lang, setLang] = useState<Lang>('en')
  const isRTL = lang === 'ar'
  const [activeTab, setActiveTab] = useState<'profile' | 'sales' | 'targets' | 'documents' | 'danger'>('profile')
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

  useEffect(() => {
    setHasMounted(true)
    const saved = localStorage.getItem('lang') as Lang
    if (saved) setLang(saved)
  }, [])

  useEffect(() => {
    if (!hasMounted) return
    loadProfile()
  }, [hasMounted])

  const loadProfile = async () => {
    setLoading(true)
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
        // Load document names
        if (profile.document_paths?.length) {
          const files = profile.document_paths.map((path: string) => ({
            name: path.split('/').pop()?.replace(/^\d+_/, '') || path,
            path,
            size: 0,
          }))
          setUploadedFiles(files)
        }
      }
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const update = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }))

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
        experience: form.experience,
        product: form.product,
        website: form.website,
        competitors: form.competitors.filter(c => c.trim()),
        objection_style: form.objectionStyle,
        closing_style: form.closingStyle,
        monthly_target: form.monthlyTarget,
        daily_calls: form.dailyCalls,
        document_paths: uploadedFiles.map(f => f.path),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) { console.error(err) }
    setSaving(false)
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
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeFile = async (index: number) => {
    try {
      const supabase = createClient()
      await supabase.storage.from('user-documents').remove([uploadedFiles[index].path])
      const updated = uploadedFiles.filter((_, i) => i !== index)
      setUploadedFiles(updated)
      // Update profile
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
    // For now just sign out — actual deletion needs a server action
    alert('Account deletion requested. Contact support to complete this process.')
    handleSignOut()
  }

  if (!hasMounted) return null

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 14,
    border: '1px solid var(--input-border)', background: 'var(--input-bg)',
    color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit',
    outline: 'none', transition: 'border-color 0.2s',
  }

  const optionBtn = (selected: boolean): React.CSSProperties => ({
    padding: '11px 16px', borderRadius: 12, cursor: 'pointer',
    border: '1px solid ' + (selected ? 'rgba(255,255,255,0.2)' : 'var(--card-border)'),
    background: selected ? 'var(--card-hover)' : 'var(--card-bg)',
    color: selected ? 'var(--text-primary)' : 'var(--text-tertiary)',
    fontSize: 13, fontWeight: selected ? 500 : 400, transition: 'all 0.2s',
  })

  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)',
    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, display: 'block',
  }

  const tabs = [
    { id: 'profile', label: isRTL ? 'الملف الشخصي' : 'Profile', Icon: UserIcon },
    { id: 'sales', label: isRTL ? 'إعداد المبيعات' : 'Sales Setup', Icon: BriefcaseIcon },
    { id: 'targets', label: isRTL ? 'الأهداف' : 'Targets', Icon: TargetIcon },
    { id: 'documents', label: isRTL ? 'المستندات' : 'Documents', Icon: FileIcon },
    { id: 'danger', label: isRTL ? 'منطقة الخطر' : 'Danger Zone', Icon: AlertTriangleIcon },
  ]

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--bg); color: var(--text-primary); font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; -webkit-font-smoothing: antialiased; }
        input::placeholder, textarea::placeholder { color: var(--text-dim); }
        input:focus, textarea:focus { outline: none; border-color: rgba(255,255,255,0.25) !important; }
        textarea { font-family: inherit; resize: none; }
        .cs::-webkit-scrollbar { width: 4px; }
        .cs::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>

        {/* Mesh */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#0a84ff', filter: 'blur(160px)', opacity: 0.05 }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', borderRadius: '50%', background: '#bf5af2', filter: 'blur(160px)', opacity: 0.04 }} />
        </div>

        {/* Sidebar layout */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', height: '100vh', padding: 16, gap: 16 }}>
          <AppSidebar activePage="settings" />

          {/* Main content */}
          <div className="cs" style={{ flex: 1, overflowY: 'auto', paddingBottom: 24 }}>

            {/* Top bar inside content */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
                  {isRTL ? 'الإعدادات' : 'Settings'}
                </span>
              </div>
              <button onClick={() => { const next = lang === 'en' ? 'ar' : 'en'; setLang(next); localStorage.setItem('lang', next) }}
                style={{ height: 34, padding: '0 16px', borderRadius: 17, border: '1px solid var(--card-border)', background: isRTL ? 'rgba(10,132,255,0.15)' : 'transparent', color: isRTL ? '#0a84ff' : 'var(--text-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {isRTL ? 'EN' : 'AR'}
              </button>
            </div>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 12, color: 'var(--text-secondary)' }}>
            <div style={{ width: 18, height: 18, border: '2px solid var(--divider)', borderTopColor: 'var(--text-secondary)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            {isRTL ? 'جاري التحميل...' : 'Loading...'}
          </div>
        ) : (
          <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>

            {/* Profile header card */}
            <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: '28px 32px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20, animation: 'fadeUp 0.3s ease' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #0a84ff, #bf5af2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {form.fullName ? form.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : user?.email?.[0]?.toUpperCase() || '?'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.3px', marginBottom: 4 }}>{form.fullName || (isRTL ? 'لم يتم تعيين الاسم' : 'Name not set')}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{user?.email}</div>
                {form.industry && <div style={{ display: 'inline-block', marginTop: 6, padding: '3px 10px', borderRadius: 8, background: 'rgba(10,132,255,0.1)', border: '1px solid rgba(10,132,255,0.2)', fontSize: 11, fontWeight: 600, color: '#0a84ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{form.industry}</div>}
              </div>
              <button onClick={saveProfile} disabled={saving}
                style={{ height: 42, padding: '0 22px', borderRadius: 21, border: 'none', background: saved ? 'rgba(48,209,88,0.9)' : saving ? 'var(--input-bg)' : 'var(--text-primary)', color: saved ? '#000' : saving ? 'var(--text-secondary)' : 'var(--bg)', fontSize: 14, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                {saving && <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
                {saved ? (isRTL ? '✓ تم الحفظ' : '✓ Saved') : saving ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : (isRTL ? 'حفظ التغييرات' : 'Save Changes')}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>

              {/* Sidebar tabs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                    style={{ height: 44, padding: '0 16px', borderRadius: 14, border: '1px solid ' + (activeTab === tab.id ? (tab.id === 'danger' ? 'rgba(255,69,58,0.3)' : 'rgba(255,255,255,0.12)') : 'transparent'), background: activeTab === tab.id ? (tab.id === 'danger' ? 'rgba(255,69,58,0.08)' : 'var(--card-hover)') : 'transparent', color: activeTab === tab.id ? (tab.id === 'danger' ? '#ff453a' : 'var(--text-primary)') : 'var(--text-secondary)', fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s', textAlign: isRTL ? 'right' : 'left' }}>
                    <tab.Icon size={16} color={activeTab === tab.id ? (tab.id === 'danger' ? '#ff453a' : 'var(--text-primary)') : 'var(--text-tertiary)'} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div style={{ animation: 'slideIn 0.25s ease' }}>

                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                  <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 22 }}>{isRTL ? 'معلومات شخصية' : 'Personal Info'}</div>
                    <div style={{ marginBottom: 18 }}>
                      <span style={labelStyle}>{isRTL ? 'الاسم الكامل' : 'Full Name'}</span>
                      <input style={inputStyle} value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder={isRTL ? 'اسمك الكامل' : 'Your full name'} />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <span style={labelStyle}>{isRTL ? 'البريد الإلكتروني' : 'Email'}</span>
                      <input style={{ ...inputStyle, opacity: 0.5, cursor: 'not-allowed' }} value={user?.email || ''} readOnly />
                      <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>{isRTL ? 'لا يمكن تغيير البريد الإلكتروني' : 'Email cannot be changed'}</div>
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <span style={labelStyle}>{isRTL ? 'القطاع' : 'Industry'}</span>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        {industries.map(ind => (
                          <div key={ind} style={optionBtn(form.industry === ind)} onClick={() => update('industry', ind)}>{ind}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span style={labelStyle}>{isRTL ? 'مستوى الخبرة' : 'Experience Level'}</span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                        {experiences.map(exp => (
                          <div key={exp} style={{ ...optionBtn(form.experience === exp), textAlign: 'center' }} onClick={() => update('experience', exp)}>{exp}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SALES SETUP TAB */}
                {activeTab === 'sales' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 22 }}>{isRTL ? 'منتجك' : 'Your Product'}</div>
                      <div style={{ marginBottom: 16 }}>
                        <span style={labelStyle}>{isRTL ? 'ماذا تبيع؟' : 'What do you sell?'}</span>
                        <input style={inputStyle} value={form.product} onChange={e => update('product', e.target.value)} placeholder={isRTL ? 'مثال: شقق فاخرة في دبي مارينا' : 'e.g. Luxury apartments in Dubai Marina'} />
                      </div>
                      <div>
                        <span style={labelStyle}>{isRTL ? 'موقع الشركة' : 'Company Website'} <span style={{ color: 'var(--text-dim)', fontWeight: 400, fontSize: 10 }}>{isRTL ? 'اختياري' : 'optional'}</span></span>
                        <input style={inputStyle} value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://yourcompany.com" />
                      </div>
                    </div>

                    <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 22 }}>{isRTL ? 'المنافسون' : 'Competitors'}</div>
                      {form.competitors.map((comp, i) => (
                        <div key={i} style={{ marginBottom: 12 }}>
                          <span style={labelStyle}>{isRTL ? `المنافس ${i + 1}` : `Competitor ${i + 1}`} {i > 0 && <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>{isRTL ? 'اختياري' : 'optional'}</span>}</span>
                          <input style={inputStyle} value={comp} onChange={e => { const updated = [...form.competitors]; updated[i] = e.target.value; update('competitors', updated) }}
                            placeholder={['Main competitor', 'Second competitor', 'Third competitor'][i]} />
                        </div>
                      ))}
                    </div>

                    <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 22 }}>{isRTL ? 'أسلوبك' : 'Your Style'}</div>
                      <div style={{ marginBottom: 20 }}>
                        <span style={labelStyle}>{isRTL ? 'أسلوب التعامل مع الاعتراضات' : 'Objection Handling Style'}</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {objectionKeys.map(key => (
                            <div key={key} style={{ ...optionBtn(form.objectionStyle === key), display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => update('objectionStyle', key)}>
                              <span>{key}</span>
                              {form.objectionStyle === key && <span style={{ color: 'var(--text-primary)', fontSize: 14 }}>✓</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span style={labelStyle}>{isRTL ? 'أسلوب الإغلاق' : 'Closing Style'}</span>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                          {closingKeys.map(key => (
                            <div key={key} style={{ ...optionBtn(form.closingStyle === key), fontSize: 12 }} onClick={() => update('closingStyle', key)}>{key}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TARGETS TAB */}
                {activeTab === 'targets' && (
                  <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 22 }}>{isRTL ? 'أهدافك' : 'Your Targets'}</div>
                    <div style={{ marginBottom: 24 }}>
                      <span style={labelStyle}>{isRTL ? 'هدف الإيرادات الشهري' : 'Monthly Revenue Target'}</span>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', fontSize: 14 }}>AED</span>
                        <input style={{ ...inputStyle, paddingLeft: 56 }} value={form.monthlyTarget} onChange={e => update('monthlyTarget', e.target.value)} placeholder="500,000" />
                      </div>
                    </div>
                    <div>
                      <span style={labelStyle}>{isRTL ? 'هدف المكالمات اليومي' : 'Daily Calls Target'}</span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
                        {['5', '10', '15', '20', '25+'].map(n => (
                          <div key={n} style={{ ...optionBtn(form.dailyCalls === n), textAlign: 'center', padding: '14px 8px' }} onClick={() => update('dailyCalls', n)}>
                            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px' }}>{n}</div>
                            <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>{isRTL ? 'مكالمات' : 'calls'}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats summary */}
                    {(form.monthlyTarget || form.dailyCalls) && (
                      <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 16, background: 'rgba(10,132,255,0.06)', border: '1px solid rgba(10,132,255,0.12)' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#0a84ff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{isRTL ? 'ملخص الأهداف' : 'Target Summary'}</div>
                        {form.monthlyTarget && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{isRTL ? 'الهدف الشهري' : 'Monthly target'}: <strong style={{ color: '#0a84ff' }}>AED {form.monthlyTarget}</strong></div>}
                        {form.dailyCalls && <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}> {isRTL ? 'المكالمات اليومية' : 'Daily calls'}: <strong style={{ color: '#0a84ff' }}>{form.dailyCalls}</strong></div>}
                      </div>
                    )}
                  </div>
                )}

                {/* DOCUMENTS TAB */}
                {activeTab === 'documents' && (
                  <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 8 }}>{isRTL ? 'المستندات المرفوعة' : 'Uploaded Documents'}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 22 }}>{isRTL ? 'يتعلم الذكاء الاصطناعي من هذه الملفات لتخصيص تحليل المكالمات' : 'Your AI learns from these files to personalize call analysis'}</div>

                    {uploadedFiles.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                        {uploadedFiles.map((file, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 14, background: 'rgba(48,209,88,0.06)', border: '1px solid rgba(48,209,88,0.15)' }}>
                            <FileIcon size={20} color="#30d158" style={{ flexShrink: 0 }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                              <div style={{ fontSize: 11, color: '#30d158' }}>✓ {isRTL ? 'جاهز للتعلم' : 'Ready for AI learning'}</div>
                            </div>
                            <button onClick={() => removeFile(i)} style={{ background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.2)', borderRadius: 8, color: '#ff453a', cursor: 'pointer', fontSize: 12, padding: '5px 10px', fontFamily: 'inherit' }}>
                              {isRTL ? 'حذف' : 'Remove'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {uploadedFiles.length < 3 && (
                      <>
                        <div onClick={() => fileInputRef.current?.click()}
                          style={{ border: '1px dashed var(--card-border)', borderRadius: 18, padding: '28px 20px', textAlign: 'center', cursor: 'pointer', marginBottom: 12, transition: 'all 0.2s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--text-tertiary)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--input-bg)' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)'; (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}>
                          {uploading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: 14 }}>
                              <div style={{ width: 16, height: 16, border: '2px solid var(--divider)', borderTopColor: 'var(--text-secondary)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                              {isRTL ? 'جاري الرفع...' : 'Uploading...'}
                            </div>
                          ) : (
                            <>
                              <div style={{ fontSize: 28, marginBottom: 8 }}>📎</div>
                              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 4 }}>{isRTL ? 'انقر لرفع مستندات' : 'Click to upload documents'}</div>
                              <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>PDF, TXT, DOC, DOCX · Max 5MB · {3 - uploadedFiles.length} {isRTL ? 'ملفات متبقية' : 'slots remaining'}</div>
                            </>
                          )}
                        </div>
                        <input ref={fileInputRef} type="file" accept=".pdf,.txt,.doc,.docx" multiple style={{ display: 'none' }} onChange={handleFileUpload} />
                      </>
                    )}

                    {uploadError && (
                      <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,69,58,0.08)', border: '1px solid rgba(255,69,58,0.2)', fontSize: 13, color: '#ff453a' }}>⚠ {uploadError}</div>
                    )}

                    {uploadedFiles.length === 0 && !uploading && (
                      <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--text-dim)', fontSize: 13 }}>
                        {isRTL ? 'لا توجد مستندات مرفوعة بعد' : 'No documents uploaded yet'}
                      </div>
                    )}
                  </div>
                )}

                {/* DANGER ZONE TAB */}
                {activeTab === 'danger' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* Sign out */}
                    <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 16 }}>{isRTL ? 'تسجيل الخروج' : 'Sign Out'}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
                        {isRTL ? 'ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى حسابك.' : 'You will need to sign in again to access your account.'}
                      </div>
                      <button onClick={handleSignOut} style={{ height: 42, padding: '0 22px', borderRadius: 21, border: '1px solid var(--card-border)', background: 'var(--input-bg)', color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                        {isRTL ? '← تسجيل الخروج' : 'Sign Out →'}
                      </button>
                    </div>

                    {/* Re-run onboarding */}
                    <div style={{ borderRadius: 28, background: 'var(--card-bg)', border: '1px solid var(--card-border)', backdropFilter: 'blur(40px)', padding: 28 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ff9f0a', marginBottom: 16 }}>{isRTL ? 'إعادة الإعداد' : 'Re-run Setup'}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
                        {isRTL ? 'أعد تشغيل معالج الإعداد لتحديث ملفك الشخصي من الصفر.' : 'Re-run the setup wizard to reconfigure your profile from scratch.'}
                      </div>
                      <button onClick={() => window.location.href = '/onboarding'} style={{ height: 42, padding: '0 22px', borderRadius: 21, border: '1px solid rgba(255,159,10,0.3)', background: 'rgba(255,159,10,0.08)', color: '#ff9f0a', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                        {isRTL ? 'إعادة الإعداد' : 'Re-run Onboarding →'}
                      </button>
                    </div>

                    {/* Delete account */}
                    <div style={{ borderRadius: 28, background: 'rgba(255,69,58,0.04)', border: '1px solid rgba(255,69,58,0.2)', backdropFilter: 'blur(40px)', padding: 28 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ff453a', marginBottom: 16 }}>{isRTL ? 'حذف الحساب' : 'Delete Account'}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
                        {isRTL ? 'سيتم حذف جميع بياناتك بشكل دائم. هذا الإجراء لا يمكن التراجع عنه.' : 'All your data will be permanently deleted. This action cannot be undone.'}
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <span style={{ ...labelStyle, color: '#ff453a' }}>{isRTL ? 'اكتب DELETE للتأكيد' : 'Type DELETE to confirm'}</span>
                        <input style={{ ...inputStyle, borderColor: deleteConfirm === 'DELETE' ? 'rgba(255,69,58,0.5)' : 'var(--input-border)' }}
                          value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder="DELETE" />
                      </div>
                      <button onClick={handleDeleteAccount} disabled={deleteConfirm !== 'DELETE'}
                        style={{ height: 42, padding: '0 22px', borderRadius: 21, border: 'none', background: deleteConfirm === 'DELETE' ? '#ff453a' : 'var(--input-bg)', color: deleteConfirm === 'DELETE' ? '#fff' : 'var(--text-dim)', fontSize: 14, fontWeight: 600, cursor: deleteConfirm === 'DELETE' ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                        {isRTL ? 'حذف حسابي نهائياً' : 'Permanently Delete Account'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
        </div>
      </div>
    </>
  )
}