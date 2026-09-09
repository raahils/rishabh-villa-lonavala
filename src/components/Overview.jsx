import React from 'react';
import { Sparkles, Home, Waves, Trees, Utensils, Zap, Users } from 'lucide-react';
import { villaDetails } from '../data/villaData';

export default function Overview() {
  const highlights = [
    { icon: Home, title: "6 BHK Luxury Property", desc: "6 private air-conditioned bedrooms featuring extra plush beds, clean linens, and attached bathrooms." },
    { icon: Waves, title: "Private Swimming Pool", desc: "Clean private swimming pool with attached sun deck and comfortable loungers for family relaxation." },
    { icon: Trees, title: "Spacious Private Garden", desc: "Manicured green garden lawn equipped with a outdoor gazebo seating and open sky patio." },
    { icon: Utensils, title: "Cook & Caretaker Service", desc: "Resident caretaker for assistance and in-house cook available on request for home-style food." },
    { icon: Zap, title: "Inverter Power Backup", desc: "Inverter backup system ensuring continuous power for essential lighting, fans, and TV." },
    { icon: Users, title: "Group & Family Stays", desc: "Ideal for groups of 15 to 25 guests, friend getaways, birthday celebrations, youth group retreats, and family gatherings." }
  ];

  return (
    <section id="overview" className="section-padding" style={{ background: '#faf9f5' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px auto' }}>
          <span className="section-tag">
            <Sparkles size={14} />
            Estate Overview
          </span>
          <h2 className="section-title">
            Designed for <span className="text-gold-gradient">Comfort & Celebrations</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Situated in Lonavala, Rishabh Villa is a spacious 6 BHK private residence designed for family reunions, friend gatherings, birthday celebrations, and young group get-togethers. Enjoy peace, privacy, and full access to private swimming pool and garden lawn.
          </p>
        </div>

        {/* Stats Strip */}
        <div
          className="glass-card"
          style={{
            padding: '30px 40px',
            marginBottom: '60px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '30px',
            textAlign: 'center',
            background: '#ffffff',
            border: '1px solid var(--border-gold)'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold-dark)' }}>
              6 BHK
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Ensuite Bedrooms
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-subtle)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold-dark)' }}>
              15 - 25
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Guest Capacity
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-subtle)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold-dark)' }}>
              Private Pool
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Exclusive Deck
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-subtle)' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold-dark)' }}>
              4.95 ★
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
              Guest Satisfaction
            </div>
          </div>
        </div>

        {/* Highlight Grid */}
        <div className="grid-3">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'rgba(197,160,89,0.1)',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-dark)'
                  }}
                >
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
