'use client'
import MobileNav from '@/components/marketing/MobileNav'
import MobileFooter from '@/components/marketing/MobileFooter'

const posts = [
  { tag: 'Sales Tips', color: '#0071e3', title: 'How to sell to Arabic-speaking clients in UAE', desc: 'The cultural nuances, language preferences, and trust signals that close deals in the Gulf market.', date: 'Mar 28, 2026', read: '5 min' },
  { tag: 'AI in Sales', color: '#34c759', title: 'Why your sales calls need AI in 2026', desc: 'Manual note-taking is costing you deals. Here\'s what AI-powered sales calls look like today.', date: 'Mar 22, 2026', read: '4 min' },
  { tag: 'Real Estate', color: '#ff9f0a', title: 'Top 5 buying signals in property sales', desc: 'Learn to spot the exact phrases and questions that signal a prospect is ready to buy.', date: 'Mar 15, 2026', read: '6 min' },
  { tag: 'Product', color: '#bf5af2', title: 'Introducing Google Meet integration', desc: 'DealFlow AI now captures both sides of your Google Meet calls automatically.', date: 'Mar 10, 2026', read: '2 min' },
  { tag: 'Arabic Sales', color: '#ff453a', title: 'أفضل تقنيات الإقناع في مبيعات العقارات', desc: 'تعلم كيف تستخدم الذكاء الاصطناعي لتحسين مهاراتك البيعية مع العملاء العرب.', date: 'Mar 5, 2026', read: '4 min' },
]

const categories = ['All', 'Sales Tips', 'AI in Sales', 'Arabic Sales', 'Real Estate', 'Product']

export default function MobileBlog() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap'); *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;} body{font-family:'DM Sans',sans-serif;background:#fff;color:#1d1d1f;-webkit-font-smoothing:antialiased;} .serif{font-family:'DM Serif Display',serif;} .tap-btn{transition:transform 0.15s;} .tap-btn:active{transform:scale(0.98);}`}</style>
      <MobileNav activePage="blog" />

      <section style={{ padding: '40px 24px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Blog</div>
        <h1 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 12 }}>
          Sales insights &<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>product updates</span>
        </h1>
      </section>

      {/* Category scroll */}
      <section style={{ padding: '0 0 20px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, padding: '0 20px', paddingBottom: 4 }}>
          {categories.map((cat, i) => (
            <button key={i} style={{ height: 34, padding: '0 16px', borderRadius: 17, border: '1px solid rgba(0,0,0,0.1)', background: i === 0 ? '#1d1d1f' : 'transparent', color: i === 0 ? '#fff' : '#6e6e73', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section style={{ padding: '0 20px 48px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {posts.map((post, i) => (
          <div key={i} className="tap-btn" style={{ borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', padding: '20px', cursor: 'pointer', background: '#fff' }}
            onClick={() => {}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ padding: '3px 10px', borderRadius: 10, background: post.color + '12', color: post.color, fontSize: 11, fontWeight: 700 }}>{post.tag}</span>
              <span style={{ fontSize: 12, color: '#aeaeb2' }}>{post.date} · {post.read} read</span>
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 600, color: '#1d1d1f', lineHeight: 1.3, marginBottom: 8 }}>{post.title}</h3>
            <p style={{ fontSize: 14, color: '#6e6e73', lineHeight: 1.5 }}>{post.desc}</p>
            <div style={{ marginTop: 12, fontSize: 13, fontWeight: 600, color: post.color }}>Read more →</div>
          </div>
        ))}
      </section>

      {/* Newsletter */}
      <section style={{ padding: '40px 20px', background: '#f5f5f7' }}>
        <div style={{ borderRadius: 24, background: '#1d1d1f', padding: '28px 20px', textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: 26, fontWeight: 400, color: '#fff', letterSpacing: '-0.5px', marginBottom: 8 }}>Get sales tips<br /><span style={{ fontStyle: 'italic', color: '#0071e3' }}>in your inbox</span></h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Weekly insights for MENA sales teams.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input placeholder="your@email.com" style={{ height: 48, borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 15, padding: '0 20px', fontFamily: 'inherit', outline: 'none' }} />
            <button style={{ height: 48, borderRadius: 24, border: 'none', background: '#fff', color: '#1d1d1f', fontSize: 15, fontWeight: 600, fontFamily: 'inherit' }}>Subscribe →</button>
          </div>
        </div>
      </section>

      <MobileFooter />
    </>
  )
}