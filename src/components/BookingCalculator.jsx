import React from 'react';
import { Sparkles, MapPin, Phone, MessageCircle, ShieldCheck, CheckCircle2, Navigation, ExternalLink } from 'lucide-react';
import { villaDetails } from '../data/villaData';

export default function BookingCalculator() {
  return (
    <section id="contact" className="section-padding" style={{ background: '#faf9f5' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', margin: '0 auto 50px auto' }}>
          <span className="section-tag">
            <Sparkles size={14} />
            Direct Contact
          </span>
          <h2 className="section-title">
            Connect with <span className="text-gold-gradient">Rishabh Villa</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Book directly with the property owner for zero middleman fees and instant confirmation.
          </p>
        </div>

        <div
          className="glass-card"
          style={{
            padding: '44px',
            background: '#ffffff',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 45px rgba(0,0,0,0.05)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '36px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Direct Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold-dark)', fontWeight: 700, marginBottom: '4px' }}>
                Exclusive 6 BHK Property
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-main)', fontWeight: 600 }}>
                Rishabh Villa Lonavala
              </h3>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Villa No. 7, Ekaant Society, Next to Viola Beacon Resort, Waksai, Lonavala, Maharashtra 410403.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 600 }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(200,169,126,0.12)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--gold-dark)' }}>
                  <Phone size={18} />
                </div>
                <span>{villaDetails.contactPhone}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 600 }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(37,211,102,0.12)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#25D366' }}>
                  <MessageCircle size={18} />
                </div>
                <span>WhatsApp Available 24/7</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '10px' }}>
              <a
                href={`tel:${villaDetails.contactPhone}`}
                className="btn-primary"
                style={{ flex: 1, height: '46px', padding: '0 20px', fontSize: '0.92rem' }}
              >
                <Phone size={18} />
                <span>Call Us</span>
              </a>

              <a
                href={`https://wa.me/${villaDetails.whatsappNumber}?text=Hi%2C%20I%20want%20to%20inquire%20about%20Rishabh%20Villa%20Lonavala.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#25D366',
                  color: '#ffffff',
                  padding: '0 20px',
                  height: '46px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
                }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps & Guarantees */}
          <div
            style={{
              background: '#fbfbf9',
              padding: '30px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gold-dark)', fontWeight: 700, marginBottom: '6px' }}>
                Location Landmark
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: 600 }}>
                Next to Viola Beacon Resort
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.5 }}>
                Ekaant Society, Waksai, Lonavala. Easily accessible via expressway.
              </p>
            </div>

            <a
              href={villaDetails.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ width: '100%', height: '44px', padding: '0 16px', fontSize: '0.88rem', justifyContent: 'center' }}
            >
              <MapPin size={16} color="var(--gold-dark)" />
              <span>Open in Google Maps</span>
              <ExternalLink size={14} />
            </a>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--gold-dark)" />
                <span>Direct Villa Booking</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--gold-dark)" />
                <span>Zero Middleman Commissions</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
