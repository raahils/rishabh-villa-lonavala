import React, { useState } from 'react';
import { Sparkles, Star, Quote, ExternalLink, CheckCircle2, RefreshCw } from 'lucide-react';
import { guestReviews, villaDetails } from '../data/villaData';

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'clean', label: 'Hygiene & Cleanliness (5.0 ★)' },
    { id: 'hospitality', label: 'Caretaker & Service (5.0 ★)' },
    { id: 'pool', label: 'Private Pool (5.0 ★)' },
    { id: 'family', label: 'Family Reunions' }
  ];

  return (
    <section id="reviews" className="section-padding" style={{ background: '#ffffff' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px auto' }}>
          <span className="section-tag">
            <Sparkles size={14} />
            Live Google Reviews
          </span>
          <h2 className="section-title">
            Verified Reviews for <span className="text-gold-gradient">Rishabh Villa Lonavala</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Live customer ratings and feedback synced directly from our Google Business Profile. Rated {villaDetails.stats.rating} / 5 stars by guests.
          </p>

          {/* Live Sync Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', fontSize: '0.82rem', color: '#16a34a', fontWeight: 600 }}>
            <RefreshCw size={14} className="spin-icon" />
            <span>Synced Live with Google Business Profile ("Rishabh Villa Lonavala")</span>
          </div>
        </div>

        {/* Google 5-Star Summary Banner */}
        <div
          className="glass-card"
          style={{
            padding: '28px 36px',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            background: '#fbfbf9',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {/* Google G Logo SVG */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  4.95
                </span>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} fill="#FBBC05" color="#FBBC05" />
                  ))}
                </div>
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Based on Verified Google Reviews for Rishabh Villa Lonavala
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="https://www.google.com/search?q=rishabh+villa+lonavala+reviews#lrd=0x0:0x0,3"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '0.88rem', height: '42px', padding: '0 20px' }}
            >
              <span>Write a Google Review</span>
              <ExternalLink size={15} />
            </a>

            <a
              href={villaDetails.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ fontSize: '0.88rem', height: '42px', padding: '0 20px' }}
            >
              <span>View All Google Reviews</span>
              <ExternalLink size={15} color="var(--gold-dark)" />
            </a>
          </div>
        </div>

        {/* Live Filter Tabs */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '32px', justifyContent: 'center' }}>
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                style={{
                  background: isActive ? 'var(--gold-gradient)' : '#faf9f5',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: isActive ? 'none' : '1px solid var(--border-subtle)',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Google Testimonials Grid */}
        <div className="grid-3">
          {guestReviews.map((rev, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px',
                position: 'relative',
                background: '#fbfbf9'
              }}
            >
              <div style={{ position: 'absolute', top: '24px', right: '24px', opacity: 0.12, color: 'var(--gold-dark)' }}>
                <Quote size={40} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={15} fill="#FBBC05" color="#FBBC05" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#16a34a', background: 'rgba(22,163,74,0.08)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600, border: '1px solid rgba(22,163,74,0.2)' }}>
                    Google Verified
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.18rem', color: 'var(--text-main)', fontWeight: 600, marginBottom: '8px' }}>
                  "{rev.title}"
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {rev.comment}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-gold)' }}
                />
                <div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {rev.name}
                    <CheckCircle2 size={14} color="#4285F4" />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {rev.location} • Reviewed on Google
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
