'use client'
import MarketingNav from '@/components/marketing/MarketingNav'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import { useState, useEffect } from 'react'

export default function BlogClient() {
  const [scrolled, setScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = ['All', 'Sales Coaching', 'AI Tech', 'Real Estate', 'SaaS']

  const featuredPost = {
    title: 'How AI is Transforming Real Estate Sales in Dubai for 2026',
    excerpt: 'With the off-plan market booming, top agencies are turning to Revenue Intelligence to ensure no buying signal slips through the cracks. Here is how AI is giving them the edge.',
    category: 'Real Estate',
    date: 'March 28, 2026',
    readTime: '6 min read',
    imageColor: '#0071e3',
  }

  const posts = [
    {
      title: 'The Death of Manual CRM Data Entry',
      excerpt: 'Account Executives spend 30% of their week updating HubSpot and Salesforce. Learn how auto-logging is giving them their Fridays back.',
      category: 'SaaS',
      date: 'March 22, 2026',
      readTime: '4 min read',
      imageColor: '#bf5af2',
    },
    {
      title: 'Handling the "Service Charge" Objection like a Pro',
      excerpt: 'A step-by-step breakdown of how the best brokers in the UAE use value-pivots to overcome high service charge objections instantly.',
      category: 'Sales Coaching',
      date: 'March 15, 2026',
      readTime: '5 min read',
      imageColor: '#34c759',
    },
    {
      title: 'Why English-Only AI Tools Fail in the MENA Region',
      excerpt: 'From Khaleeji Arabic to mixed English-Arabic sentences (Arabish), generic AI models miss the nuance. Why localized speech-to-text matters.',
      category: 'AI Tech',
      date: 'March 08, 2026',
      readTime: '7 min read',
      imageColor: '#ff9f0a',
    },
    {
      title: 'Mastering the MEDDIC Framework on Discovery Calls',
      excerpt: 'How to gracefully uncover Metrics, Economic Buyers, and Decision Criteria without sounding like you are reading from a script.',
      category: 'Sales Coaching',
      date: 'March 02, 2026',
      readTime: '6 min read',
      imageColor: '#1d1d1f',
    },
    {
      title: 'Insurance Compliance: Let AI be your safety net',
      excerpt: 'Never miss a mandatory health disclosure again. How modern insurance brokers are using AI to bulletproof their compliance on every call.',
      category: 'Sales Coaching',
      date: 'February 24, 2026',
      readTime: '4 min read',
      imageColor: '#0071e3',
    },
    {
      title: 'DealFlow AI vs The Status Quo: A Data Study',
      excerpt: 'We analyzed 10,000 sales calls across the UAE and Saudi Arabia. Here is exactly what the top 1% of closers do differently.',
      category: 'AI Tech',
      date: 'February 18, 2026',
      readTime: '8 min read',
      imageColor: '#bf5af2',
    }
  ]

  const filteredPosts = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; color: #1d1d1f; font-family: 'DM Sans', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        button { cursor: pointer; font-family: inherit; }
        
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.7s ease both; }
        .fade-up-1 { animation: fadeUp 0.7s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s ease 0.2s both; }
        
        .desktop-nav { display: flex; align-items: center; gap: 32px; }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
        
        
        
        
        .blog-card { border-radius: 24px; overflow: hidden; border: 1px solid rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s; background: #fff; display: flex; flexDirection: column; }
        .blog-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
        .blog-image-wrap { width: 100%; height: 200px; background: #f5f5f7; position: relative; overflow: hidden; }
        .blog-content { padding: 24px; display: flex; flex-direction: column; flex: 1; }
        
        .mesh { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <MarketingNav activePage="blog" />

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 60, textAlign: 'center', paddingLeft: 48, paddingRight: 48, position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '0%', left: '20%', width: '30%', height: '60%', background: '#0071e3', opacity: 0.04 }} />
        <div className="mesh" style={{ top: '10%', right: '20%', width: '30%', height: '50%', background: '#bf5af2', opacity: 0.04 }} />
        
        <div className="fade-up" style={{ fontSize: 13, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Resources & Insights</div>
        <h1 className="fade-up-1 serif" style={{ fontSize: 'clamp(44px, 6vw, 64px)', fontWeight: 400, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 24 }}>
          The DealFlow <span style={{ fontStyle: 'italic', color: '#0071e3' }}>Journal</span>
        </h1>
        <p className="fade-up-2" style={{ fontSize: 19, color: '#6e6e73', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          Strategies, product updates, and data-backed insights on how to close more deals in the modern MENA sales landscape.
        </p>
      </section>

      {/* FEATURED POST */}
      <section style={{ padding: '40px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="fade-up-2" style={{ borderRadius: 32, border: '1px solid rgba(0,0,0,0.06)', background: '#fff', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0, boxShadow: '0 24px 60px rgba(0,0,0,0.04)', cursor: 'pointer' }}>
          {/* Featured Image Placeholder */}
          <div style={{ background: featuredPost.imageColor, width: '100%', minHeight: 300, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="mesh" style={{ width: '150%', height: '150%', background: '#fff', opacity: 0.1 }} />
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          
          <div style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: featuredPost.imageColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{featuredPost.category}</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#aeaeb2' }} />
              <span style={{ fontSize: 13, color: '#6e6e73', fontWeight: 500 }}>{featuredPost.readTime}</span>
            </div>
            <h2 className="serif" style={{ fontSize: 36, letterSpacing: '-1px', color: '#1d1d1f', marginBottom: 16, lineHeight: 1.15 }}>
              {featuredPost.title}
            </h2>
            <p style={{ fontSize: 16, color: '#6e6e73', lineHeight: 1.6, marginBottom: 32 }}>
              {featuredPost.excerpt}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1d1d1f', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>DF</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1d1d1f' }}>DealFlow Editorial</div>
                <div style={{ fontSize: 13, color: '#aeaeb2' }}>{featuredPost.date}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section style={{ padding: '40px 48px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: 24 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: '8px 20px', borderRadius: 20, border: activeCategory === cat ? 'none' : '1px solid rgba(0,0,0,0.1)', background: activeCategory === cat ? '#1d1d1f' : 'transparent', color: activeCategory === cat ? '#fff' : '#6e6e73', fontSize: 14, fontWeight: 600, transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* POSTS GRID */}
      <section style={{ padding: '20px 48px 120px', maxWidth: 1200, margin: '0 auto', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
          {filteredPosts.map((post, i) => (
            <div key={i} className="blog-card">
              <div className="blog-image-wrap" style={{ background: post.imageColor + '15' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: post.imageColor }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
                </div>
              </div>
              <div className="blog-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: post.imageColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.category}</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#aeaeb2' }} />
                  <span style={{ fontSize: 12, color: '#6e6e73', fontWeight: 500 }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#1d1d1f', marginBottom: 12, lineHeight: 1.3, letterSpacing: '-0.3px' }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: 15, color: '#6e6e73', lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: 16 }}>
                  <span style={{ fontSize: 13, color: '#aeaeb2', fontWeight: 500 }}>{post.date}</span>
                  <span style={{ fontSize: 13, color: '#1d1d1f', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>Read Article <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#6e6e73', fontSize: 16 }}>
            No articles found in this category.
          </div>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: '100px 48px', background: '#1d1d1f', position: 'relative', overflow: 'hidden' }}>
        <div className="mesh" style={{ top: '-30%', left: '-10%', width: '50%', height: '80%', background: '#0071e3', opacity: 0.15 }} />
        <div className="mesh" style={{ bottom: '-30%', right: '-10%', width: '40%', height: '70%', background: '#bf5af2', opacity: 0.12 }} />
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 className="serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.1, color: '#fff', marginBottom: 20 }}>
            Put these insights into <span style={{ fontStyle: 'italic', color: '#34c759' }}>practice.</span>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 40, lineHeight: 1.6 }}>
            Start your 14-day free trial of DealFlow AI today and give your sales team the ultimate revenue co-pilot.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => window.location.href = '/login'}
              style={{ height: 52, padding: '0 32px', borderRadius: 26, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 16, fontWeight: 600 }}>
              Start Free Trial →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <MarketingFooter />
    </>
  )
}