'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface Contact {
  id: string
  full_name: string
  company: string
  phone: string
  email: string
  deal_stage: string
  tags: string[]
  notes: string
  created_at: string
}

const STAGES = ['lead', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost']

export default function MobileContacts() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Contact | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ full_name: '', company: '', phone: '', email: '', deal_stage: 'lead', notes: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'en' | 'ar'
    if (saved) setLang(saved)
    loadContacts()
  }, [])

  const isAr = lang === 'ar'

  const loadContacts = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('contacts').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      setContacts(data || [])
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const saveContact = async () => {
    if (!form.full_name) return
    setSaving(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      await supabase.from('contacts').insert({ ...form, user_id: user.id, tags: [] })
      await loadContacts()
      setShowAdd(false)
      setForm({ full_name: '', company: '', phone: '', email: '', deal_stage: 'lead', notes: '' })
    } catch (err) { console.error(err) }
    finally { setSaving(false) }
  }

  const stageColor: Record<string, string> = {
    lead: '#aeaeb2', qualified: '#0a84ff', proposal: '#ff9f0a',
    negotiation: '#bf5af2', closed_won: '#34c759', closed_lost: '#ff453a'
  }

  const stageLabel = (stage: string) => {
    const labels: Record<string, { en: string, ar: string }> = {
      lead: { en: 'Lead', ar: 'عميل محتمل' },
      qualified: { en: 'Qualified', ar: 'مؤهل' },
      proposal: { en: 'Proposal', ar: 'عرض' },
      negotiation: { en: 'Negotiation', ar: 'تفاوض' },
      closed_won: { en: 'Won ✓', ar: 'مغلق ✓' },
      closed_lost: { en: 'Lost', ar: 'خسارة' },
    }
    return isAr ? labels[stage]?.ar : labels[stage]?.en || stage
  }

  const filtered = contacts.filter(c =>
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.company?.toLowerCase().includes(search.toLowerCase())
  )

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 48, padding: '0 16px', borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)',
    color: '#fff', fontSize: 15, fontFamily: 'inherit', outline: 'none',
  }

  // Add contact form
  if (showAdd) return (
    <>
      <style>{`* {margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{font-family:${isAr ? "'Noto Sans Arabic'" : "'DM Sans'"}, -apple-system,sans-serif;background:#000;color:#fff;-webkit-font-smoothing:antialiased;} input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.3);} @keyframes spin{to{transform:rotate(360deg)}} .tap-btn{transition:transform 0.15s;} .tap-btn:active{transform:scale(0.97);}`}</style>
      <div style={{ padding: '56px 20px 20px', direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <button onClick={() => setShowAdd(false)} style={{ color: '#0a84ff', background: 'none', border: 'none', fontSize: 15, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>
            {isAr ? 'إلغاء' : 'Cancel'}
          </button>
          <div style={{ fontSize: 17, fontWeight: 600 }}>{isAr ? 'جهة اتصال جديدة' : 'New Contact'}</div>
          <button onClick={saveContact} disabled={saving || !form.full_name} className="tap-btn"
            style={{ color: saving || !form.full_name ? 'rgba(255,255,255,0.3)' : '#0a84ff', background: 'none', border: 'none', fontSize: 15, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
            {saving ? '...' : (isAr ? 'حفظ' : 'Save')}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input style={inputStyle} placeholder={isAr ? 'الاسم الكامل *' : 'Full Name *'} value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} />
          <input style={inputStyle} placeholder={isAr ? 'الشركة' : 'Company'} value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
          <input style={inputStyle} placeholder={isAr ? 'رقم الهاتف' : 'Phone'} type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          <input style={inputStyle} placeholder={isAr ? 'البريد الإلكتروني' : 'Email'} type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>{isAr ? 'مرحلة الصفقة' : 'Deal Stage'}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {STAGES.map(stage => (
                <button key={stage} onClick={() => setForm({...form, deal_stage: stage})}
                  style={{ height: 36, borderRadius: 10, border: `1px solid ${form.deal_stage === stage ? stageColor[stage] : 'rgba(255,255,255,0.1)'}`, background: form.deal_stage === stage ? stageColor[stage] + '20' : 'transparent', color: form.deal_stage === stage ? stageColor[stage] : 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer' }}>
                  {stageLabel(stage)}
                </button>
              ))}
            </div>
          </div>
          <textarea style={{...inputStyle, height: 100, padding: '12px 16px', resize: 'none'} as React.CSSProperties}
            placeholder={isAr ? 'ملاحظات' : 'Notes'} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
        </div>
      </div>
    </>
  )

  // Contact detail
  if (selected) return (
    <>
      <style>{`* {margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{font-family:${isAr ? "'Noto Sans Arabic'" : "'DM Sans'"}, -apple-system,sans-serif;background:#000;color:#fff;-webkit-font-smoothing:antialiased;} .tap-btn{transition:transform 0.15s;} .tap-btn:active{transform:scale(0.97);}`}</style>
      <div style={{ padding: '56px 20px 20px', direction: isAr ? 'rtl' : 'ltr' }}>
        <button onClick={() => setSelected(null)} className="tap-btn"
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#0a84ff', fontSize: 15, fontWeight: 500, fontFamily: 'inherit', marginBottom: 20, cursor: 'pointer' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">{isAr ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}</svg>
          {isAr ? 'رجوع' : 'Back'}
        </button>

        {/* Avatar + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #0a84ff, #bf5af2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, flexShrink: 0 }}>
            {selected.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{selected.full_name}</div>
            <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 10, background: stageColor[selected.deal_stage] + '15', border: `1px solid ${stageColor[selected.deal_stage]}25` }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: stageColor[selected.deal_stage] }}>{stageLabel(selected.deal_stage)}</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {selected.company && <div style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>{isAr ? 'الشركة' : 'COMPANY'}</div>
            <div style={{ fontSize: 15, color: '#fff' }}>{selected.company}</div>
          </div>}
          {selected.phone && <a href={`tel:${selected.phone}`} style={{ textDecoration: 'none', padding: '14px 16px', borderRadius: 14, background: 'rgba(52,199,89,0.08)', border: '1px solid rgba(52,199,89,0.15)', display: 'block' }}>
            <div style={{ fontSize: 11, color: '#34c759', marginBottom: 3 }}>{isAr ? 'الهاتف' : 'PHONE'}</div>
            <div style={{ fontSize: 15, color: '#34c759', fontWeight: 500 }}>{selected.phone}</div>
          </a>}
          {selected.email && <a href={`mailto:${selected.email}`} style={{ textDecoration: 'none', padding: '14px 16px', borderRadius: 14, background: 'rgba(10,132,255,0.08)', border: '1px solid rgba(10,132,255,0.15)', display: 'block' }}>
            <div style={{ fontSize: 11, color: '#0a84ff', marginBottom: 3 }}>{isAr ? 'البريد' : 'EMAIL'}</div>
            <div style={{ fontSize: 15, color: '#0a84ff', fontWeight: 500 }}>{selected.email}</div>
          </a>}
          {selected.notes && <div style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>{isAr ? 'الملاحظات' : 'NOTES'}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{selected.notes}</div>
          </div>}
        </div>

        {/* WhatsApp CTA */}
        {selected.phone && (
          <a href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20, height: 52, borderRadius: 26, background: '#25D366', color: '#fff', fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            {isAr ? 'واتساب' : 'WhatsApp'}
          </a>
        )}
      </div>
    </>
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * {margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
        body{font-family:${isAr ? "'Noto Sans Arabic'" : "'DM Sans'"}, -apple-system,sans-serif;background:#000;color:#fff;-webkit-font-smoothing:antialiased;}
        input::placeholder{color:rgba(255,255,255,0.3);}
        .tap-btn{transition:transform 0.15s;} .tap-btn:active{transform:scale(0.97);}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* Header */}
      <div style={{ padding: '56px 20px 16px', direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => window.location.href = '/'} className="tap-btn"
              style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">{isAr ? <path d="M9 18l6-6-6-6"/> : <path d="M15 18l-6-6 6-6"/>}</svg>
            </button>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{isAr ? 'جهات الاتصال' : 'Contacts'}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => { const next = isAr ? 'en' : 'ar'; localStorage.setItem('lang', next); setLang(next) }}
              style={{ height: 30, padding: '0 12px', borderRadius: 15, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
              {isAr ? 'EN' : 'AR'}
            </button>
            <button onClick={() => setShowAdd(true)} className="tap-btn"
              style={{ height: 36, padding: '0 14px', borderRadius: 18, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
              + {isAr ? 'إضافة' : 'Add'}
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" style={{ position: 'absolute', top: '50%', [isAr ? 'right' : 'left']: 14, transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={isAr ? 'بحث...' : 'Search...'}
            style={{ width: '100%', height: 44, [isAr ? 'paddingRight' : 'paddingLeft']: 40, [isAr ? 'paddingLeft' : 'paddingRight']: 16, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 15, fontFamily: 'inherit', outline: 'none' }} />
        </div>
      </div>

      {/* Contacts list */}
      <div style={{ padding: '0 20px 48px', display: 'flex', flexDirection: 'column', gap: 10, direction: isAr ? 'rtl' : 'ltr' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ width: 24, height: 24, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#0a84ff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto' }} />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>{isAr ? 'لا توجد جهات اتصال' : 'No contacts'}</div>
            <button onClick={() => setShowAdd(true)} className="tap-btn"
              style={{ height: 44, padding: '0 24px', borderRadius: 22, border: 'none', background: '#0a84ff', color: '#fff', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', marginTop: 12 }}>
              + {isAr ? 'أضف جهة اتصال' : 'Add Contact'}
            </button>
          </div>
        ) : filtered.map((contact, i) => (
          <div key={i} className="tap-btn" onClick={() => setSelected(contact)}
            style={{ padding: '16px 18px', borderRadius: 18, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0a84ff40, #bf5af240)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>
              {contact.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{contact.full_name}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{contact.company || ''}</div>
            </div>
            <div style={{ padding: '3px 8px', borderRadius: 8, background: stageColor[contact.deal_stage] + '15', flexShrink: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: stageColor[contact.deal_stage] }}>{stageLabel(contact.deal_stage)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}