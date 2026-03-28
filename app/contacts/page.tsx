'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface Contact {
  id: string
  full_name: string
  company: string
  phone: string
  email: string
  industry: string
  notes: string
  tags: string[]
  deal_stage: string
  deal_value: number
  last_call_at: string
  total_calls: number
  avg_deal_health: number
  created_at: string
}

const DEAL_STAGES = ['lead', 'prospect', 'negotiation', 'closed', 'lost']

const stageColors: Record<string, { color: string, bg: string, border: string }> = {
  lead:        { color: '#0a84ff', bg: 'rgba(10,132,255,0.1)',  border: 'rgba(10,132,255,0.2)' },
  prospect:    { color: '#ff9f0a', bg: 'rgba(255,159,10,0.1)',  border: 'rgba(255,159,10,0.2)' },
  negotiation: { color: '#bf5af2', bg: 'rgba(191,90,242,0.1)', border: 'rgba(191,90,242,0.2)' },
  closed:      { color: '#30d158', bg: 'rgba(48,209,88,0.1)',   border: 'rgba(48,209,88,0.2)' },
  lost:        { color: '#ff453a', bg: 'rgba(255,69,58,0.1)',   border: 'rgba(255,69,58,0.2)' },
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Contact | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [filterStage, setFilterStage] = useState('all')
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    full_name: '', company: '', phone: '', email: '',
    industry: '', notes: '', deal_stage: 'lead', deal_value: '',
    tags: '',
  })

  useEffect(() => { fetchContacts() }, [])

  const fetchContacts = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setContacts(data)
    setLoading(false)
  }

  const saveContact = async () => {
    setSaving(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const payload = {
        user_id: user.id,
        full_name: form.full_name,
        company: form.company,
        phone: form.phone,
        email: form.email,
        industry: form.industry,
        notes: form.notes,
        deal_stage: form.deal_stage,
        deal_value: form.deal_value ? parseFloat(form.deal_value) : null,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      }
      if (selected) {
        await supabase.from('contacts').update(payload).eq('id', selected.id)
      } else {
        await supabase.from('contacts').insert(payload)
      }
      await fetchContacts()
      setShowForm(false)
      setSelected(null)
      resetForm()
    } catch (err) { console.error(err) }
    setSaving(false)
  }

  const deleteContact = async (id: string) => {
    const supabase = createClient()
    await supabase.from('contacts').delete().eq('id', id)
    setContacts(prev => prev.filter(c => c.id !== id))
    setSelected(null)
  }

  const resetForm = () => setForm({ full_name: '', company: '', phone: '', email: '', industry: '', notes: '', deal_stage: 'lead', deal_value: '', tags: '' })

  const openEdit = (contact: Contact) => {
    setSelected(contact)
    setForm({
      full_name: contact.full_name || '',
      company: contact.company || '',
      phone: contact.phone || '',
      email: contact.email || '',
      industry: contact.industry || '',
      notes: contact.notes || '',
      deal_stage: contact.deal_stage || 'lead',
      deal_value: contact.deal_value?.toString() || '',
      tags: contact.tags?.join(', ') || '',
    })
    setShowForm(true)
  }

  const filtered = contacts.filter(c => {
    const matchSearch = search === '' ||
      c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.company?.toLowerCase().includes(search.toLowerCase())
    const matchStage = filterStage === 'all' || c.deal_stage === filterStage
    return matchSearch && matchStage
  })

  const formatDate = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'
  const formatValue = (v: number) => v ? 'AED ' + v.toLocaleString() : '—'

  const initials = (name: string) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)', color: '#fff',
    fontSize: 14, outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
    display: 'block', marginBottom: 8,
  }

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #000; color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; -webkit-font-smoothing: antialiased; }
        .cs::-webkit-scrollbar { width: 4px; }
        .cs::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        input:focus, textarea:focus { border-color: rgba(255,255,255,0.2) !important; outline: none; }
        textarea { font-family: inherit; resize: vertical; }
        .card { border-radius: 24px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(40px); transition: all 0.2s; }
        .card:hover { background: rgba(255,255,255,0.04); }
        .card-active { background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.15) !important; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#000' }}>

        {/* Mesh */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: '#0a84ff', filter: 'blur(160px)', opacity: 0.04, mixBlendMode: 'screen' }} />
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', borderRadius: '50%', background: '#bf5af2', filter: 'blur(160px)', opacity: 0.04, mixBlendMode: 'screen' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', height: '100vh', padding: 16, gap: 16 }}>

          {/* Sidebar */}
          <aside style={{ width: 80, borderRadius: 32, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(40px)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: 8, flexShrink: 0 }}>
            <div onClick={() => window.location.href = '/'} style={{ width: 48, height: 48, borderRadius: 16, background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, cursor: 'pointer' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            {[
              { icon: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z', active: false, href: '/' },
              { icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', active: false, href: '/history' },
              { icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', active: true, href: '/contacts' },
              { icon: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', active: false, href: '/' },
            ].map((item, i) => (
              <div key={i} onClick={() => window.location.href = item.href} style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: item.active ? 'rgba(255,255,255,0.1)' : 'transparent', color: item.active ? '#fff' : 'rgba(255,255,255,0.3)', border: item.active ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent', transition: 'all 0.2s' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
              </div>
            ))}
          </aside>

          {/* Main */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

            {/* Header */}
            <header style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.5px', color: 'rgba(255,255,255,0.9)' }}>DealFlow AI</span>
                <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Contacts</span>
              </div>
              <button onClick={() => { resetForm(); setSelected(null); setShowForm(true) }} style={{ height: 38, padding: '0 20px', borderRadius: 19, border: 'none', background: 'rgba(255,255,255,0.9)', color: '#000', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                + Add Contact
              </button>
            </header>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', gap: 16, padding: '0 8px 16px' }}>

              {/* Left: list */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

                {/* Search + filters */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexShrink: 0 }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input
                      placeholder="Search contacts..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      style={{ width: '100%', height: 40, paddingLeft: 40, paddingRight: 16, borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['all', ...DEAL_STAGES].map(stage => (
                      <button key={stage} onClick={() => setFilterStage(stage)} style={{ height: 40, padding: '0 14px', borderRadius: 20, border: '1px solid ' + (filterStage === stage ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'), background: filterStage === stage ? 'rgba(255,255,255,0.08)' : 'transparent', color: filterStage === stage ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize', transition: 'all 0.2s' }}>
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16, flexShrink: 0 }}>
                  {[
                    { label: 'Total', value: contacts.length, color: 'rgba(255,255,255,0.7)' },
                    { label: 'Leads', value: contacts.filter(c => c.deal_stage === 'lead').length, color: '#0a84ff' },
                    { label: 'Prospects', value: contacts.filter(c => c.deal_stage === 'prospect').length, color: '#ff9f0a' },
                    { label: 'Closed', value: contacts.filter(c => c.deal_stage === 'closed').length, color: '#30d158' },
                  ].map((s, i) => (
                    <div key={i} style={{ borderRadius: 18, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '14px 18px', backdropFilter: 'blur(40px)' }}>
                      <div style={{ fontSize: 24, fontWeight: 600, color: s.color, letterSpacing: '-0.5px', marginBottom: 2 }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Contact list */}
                <div className="cs" style={{ flex: 1, overflowY: 'auto' }}>
                  {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, gap: 12, color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
                      <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                      Loading contacts...
                    </div>
                  ) : filtered.length === 0 ? (
                    <div className="card" style={{ padding: '60px 40px', textAlign: 'center' }}>
                      <div style={{ fontSize: 48, marginBottom: 16 }}>👤</div>
                      <div style={{ fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 8 }}>No contacts yet</div>
                      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>Add your first contact to get started</div>
                      <button onClick={() => { resetForm(); setSelected(null); setShowForm(true) }} style={{ height: 44, padding: '0 28px', borderRadius: 22, border: 'none', background: 'rgba(255,255,255,0.9)', color: '#000', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                        Add Contact
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {filtered.map((contact, idx) => {
                        const stage = stageColors[contact.deal_stage] || stageColors.lead
                        const isActive = selected?.id === contact.id
                        return (
                          <div key={contact.id} className={isActive ? 'card card-active' : 'card'} onClick={() => setSelected(isActive ? null : contact)}
                            style={{ padding: '16px 20px', cursor: 'pointer', animation: 'fadeUp 0.3s ease both', animationDelay: (idx * 40) + 'ms' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                              {/* Avatar */}
                              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)', flexShrink: 0 }}>
                                {initials(contact.full_name)}
                              </div>
                              {/* Info */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 3, letterSpacing: '-0.2px' }}>
                                  {contact.full_name}
                                  {contact.company && <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}> · {contact.company}</span>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                  {contact.phone && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{contact.phone}</span>}
                                  {contact.email && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{contact.email}</span>}
                                </div>
                              </div>
                              {/* Right */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
                                {contact.deal_value > 0 && (
                                  <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: '#30d158', letterSpacing: '-0.3px' }}>{formatValue(contact.deal_value)}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Deal Value</div>
                                  </div>
                                )}
                                {contact.total_calls > 0 && (
                                  <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: '#ff9f0a' }}>{contact.total_calls}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Calls</div>
                                  </div>
                                )}
                                <span style={{ padding: '4px 12px', borderRadius: 10, fontSize: 11, fontWeight: 600, background: stage.bg, color: stage.color, border: '1px solid ' + stage.border, textTransform: 'capitalize' }}>
                                  {contact.deal_stage}
                                </span>
                              </div>
                            </div>
                            {/* Tags */}
                            {contact.tags?.length > 0 && (
                              <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                                {contact.tags.map((tag, i) => (
                                  <span key={i} style={{ padding: '2px 10px', borderRadius: 8, fontSize: 11, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.08)' }}>{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: detail panel */}
              {selected && !showForm && (
                <div className="cs" style={{ width: 340, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, animation: 'slideIn 0.25s ease', flexShrink: 0 }}>
                  {/* Contact header */}
                  <div style={{ borderRadius: 28, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(40px)', padding: 24, position: 'relative' }}>
                    <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 16, right: 16, width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>✕</button>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 14 }}>
                      {initials(selected.full_name)}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.3px', marginBottom: 4, paddingRight: 36, color: 'rgba(255,255,255,0.92)' }}>{selected.full_name}</div>
                    {selected.company && <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>{selected.company}</div>}
                    {(() => {
                      const stage = stageColors[selected.deal_stage] || stageColors.lead
                      return <span style={{ padding: '5px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600, background: stage.bg, color: stage.color, border: '1px solid ' + stage.border, textTransform: 'capitalize', display: 'inline-block' }}>{selected.deal_stage}</span>
                    })()}
                  </div>

                  {/* Contact details */}
                  <div style={{ borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 20 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Contact Info</div>
                    {[
                      { label: 'Phone', value: selected.phone, icon: '📞' },
                      { label: 'Email', value: selected.email, icon: '✉️' },
                      { label: 'Industry', value: selected.industry, icon: '🏢' },
                      { label: 'Deal Value', value: formatValue(selected.deal_value), icon: '💰' },
                      { label: 'Total Calls', value: selected.total_calls > 0 ? selected.total_calls + ' calls' : null, icon: '🎙' },
                      { label: 'Last Call', value: selected.last_call_at ? formatDate(selected.last_call_at) : null, icon: '📅' },
                    ].filter(item => item.value && item.value !== '—').map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 1 }}>{item.label}</div>
                          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Notes */}
                  {selected.notes && (
                    <div style={{ borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 20 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Notes</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{selected.notes}</div>
                    </div>
                  )}

                  {/* Tags */}
                  {selected.tags?.length > 0 && (
                    <div style={{ borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(40px)', padding: 20 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Tags</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {selected.tags.map((tag, i) => (
                          <span key={i} style={{ padding: '4px 12px', borderRadius: 10, fontSize: 12, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => openEdit(selected)} style={{ flex: 1, height: 44, borderRadius: 22, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Edit
                    </button>
                    <button onClick={() => window.location.href = '/'} style={{ flex: 1, height: 44, borderRadius: 22, border: 'none', background: 'rgba(255,255,255,0.9)', color: '#000', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Start Call
                    </button>
                  </div>
                  <button onClick={() => deleteContact(selected.id)} style={{ width: '100%', height: 40, borderRadius: 20, border: '1px solid rgba(255,69,58,0.2)', background: 'rgba(255,69,58,0.06)', color: '#ff453a', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                    Delete Contact
                  </button>
                </div>
              )}

              {/* Add/Edit form */}
              {showForm && (
                <div className="cs" style={{ width: 360, overflowY: 'auto', animation: 'slideIn 0.25s ease', flexShrink: 0 }}>
                  <div style={{ borderRadius: 28, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(40px)', padding: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                      <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.3px', color: 'rgba(255,255,255,0.9)' }}>
                        {selected ? 'Edit Contact' : 'New Contact'}
                      </div>
                      <button onClick={() => { setShowForm(false); setSelected(null); resetForm() }} style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>✕</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div>
                        <span style={labelStyle}>Full Name *</span>
                        <input style={inputStyle} placeholder="Ali Salameh" value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} />
                      </div>
                      <div>
                        <span style={labelStyle}>Company</span>
                        <input style={inputStyle} placeholder="ApexNile" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div>
                          <span style={labelStyle}>Phone</span>
                          <input style={inputStyle} placeholder="+971 50 000 0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                        </div>
                        <div>
                          <span style={labelStyle}>Email</span>
                          <input style={inputStyle} placeholder="email@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                        </div>
                      </div>
                      <div>
                        <span style={labelStyle}>Industry</span>
                        <input style={inputStyle} placeholder="Real Estate" value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div>
                          <span style={labelStyle}>Deal Stage</span>
                          <select value={form.deal_stage} onChange={e => setForm(f => ({ ...f, deal_stage: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                            {DEAL_STAGES.map(s => <option key={s} value={s} style={{ background: '#111' }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                          </select>
                        </div>
                        <div>
                          <span style={labelStyle}>Deal Value (AED)</span>
                          <input style={inputStyle} placeholder="500000" type="number" value={form.deal_value} onChange={e => setForm(f => ({ ...f, deal_value: e.target.value }))} />
                        </div>
                      </div>
                      <div>
                        <span style={labelStyle}>Tags <span style={{ color: 'rgba(255,255,255,0.2)', textTransform: 'none', letterSpacing: 0 }}>(comma separated)</span></span>
                        <input style={inputStyle} placeholder="VIP, follow-up, hot-lead" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
                      </div>
                      <div>
                        <span style={labelStyle}>Notes</span>
                        <textarea style={{ ...inputStyle, minHeight: 90, paddingTop: 12 }} placeholder="Any notes about this contact..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                      </div>

                      <button onClick={saveContact} disabled={saving || !form.full_name.trim()} style={{ width: '100%', height: 48, borderRadius: 24, border: 'none', background: saving || !form.full_name.trim() ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)', color: saving || !form.full_name.trim() ? 'rgba(255,255,255,0.3)' : '#000', fontSize: 15, fontWeight: 600, cursor: saving || !form.full_name.trim() ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8 }}>
                        {saving && <div style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
                        {saving ? 'Saving...' : selected ? 'Save Changes' : 'Add Contact'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}