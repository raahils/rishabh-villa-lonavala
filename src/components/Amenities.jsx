import React from 'react';
import { Sparkles, Waves, Trees, Utensils, Tv, Zap, ShieldCheck, Check } from 'lucide-react';
import { luxuryAmenities } from '../data/villaData';

export default function Amenities() {
  const iconMap = {
    Waves: Waves,
    Trees: Trees,
    Utensils: Utensils,
    Tv: Tv,
    Zap: Zap,
    ShieldCheck: ShieldCheck
  };

  return (
    <section id="amenities" className="section-padding" style={{ background: '#ffffff' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px auto' }}>
          <span className="section-tag">
            <Sparkles size={14} />
            Villa Amenities & Services
          </span>
          <h2 className="section-title">
            Equipped for <span className="text-gold-gradient">Seamless Group Stays</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Enjoy exclusive access to the private pool, green lawn, resident caretaker assistance, inverter backup, and spacious indoor lounge areas.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid-3">
          {luxuryAmenities.map((cat, idx) => {
            const IconComponent = iconMap[cat.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative',
                  background: '#faf9f5'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: 'var(--gold-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff'
                    }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    {cat.category}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cat.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.92rem',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: 'rgba(197,160,89,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--gold-dark)',
                          flexShrink: 0
                        }}
                      >
                        <Check size={12} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
