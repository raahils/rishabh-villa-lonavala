import React from 'react';
import { Sparkles, Navigation, MapPin, ExternalLink } from 'lucide-react';
import { lonavalaAttractions, villaDetails } from '../data/villaData';

export default function LonavalaGuide() {
  return (
    <section id="lonavala" className="section-padding" style={{ background: '#faf9f5' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
          <span className="section-tag">
            <Sparkles size={14} />
            Villa Location & Directions
          </span>
          <h2 className="section-title">
            Situated in <span className="text-gold-gradient">Lonavala</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Rishabh Villa is conveniently accessible via the Mumbai-Pune Expressway exit in Lonavala.
          </p>

          <div style={{ marginTop: '20px' }}>
            <a
              href={villaDetails.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.9rem' }}
            >
              <MapPin size={16} />
              <span>Open Rishabh Villa in Google Maps</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Driving Distance Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          <div
            className="glass-card"
            style={{
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              borderLeft: '4px solid var(--gold-primary)',
              background: '#ffffff'
            }}
          >
            <Navigation size={28} color="var(--gold-dark)" />
            <div>
              <div style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '1.1rem' }}>
                Driving from Mumbai
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                82 km • ~1.5 to 2 Hours via Mumbai-Pune Expressway
              </div>
            </div>
          </div>

          <div
            className="glass-card"
            style={{
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              borderLeft: '4px solid var(--gold-primary)',
              background: '#ffffff'
            }}
          >
            <Navigation size={28} color="var(--gold-dark)" />
            <div>
              <div style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '1.1rem' }}>
                Driving from Pune
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                62 km • ~1.2 Hours via Old Mumbai-Pune Highway
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Landmarks & Attractions */}
        <div className="grid-3">
          {lonavalaAttractions.map((place, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                background: '#ffffff'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gold-dark)', fontWeight: 700, letterSpacing: '1px' }}>
                  {place.category}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-dark)', background: 'rgba(200,169,126,0.12)', padding: '2px 10px', borderRadius: '10px', fontWeight: 600 }}>
                  {place.distance}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-main)' }}>
                {place.name}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {place.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
