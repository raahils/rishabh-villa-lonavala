import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Camera, MessageCircle, ArrowUp, ExternalLink } from 'lucide-react';
import { villaDetails } from '../data/villaData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#f5f3eb', borderTop: '1px solid var(--border-subtle)', paddingTop: '70px', paddingBottom: '36px', color: 'var(--text-muted)' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          
          {/* Col 1: Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--gold-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-serif)'
                }}
              >
                R
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>
                RISHABH VILLA
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              A modern minimalist 6 BHK private villa in Lonavala featuring private swimming pool, garden lawn, and caretaker assistance.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
              <a
                href={`https://wa.me/${villaDetails.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#25D366'
                }}
              >
                <MessageCircle size={18} />
              </a>

              <a
                href={villaDetails.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-dark)'
                }}
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '16px' }}>
              Quick Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <a href="#overview" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Overview & Stats</a>
              <a href="#suites" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>6 BHK Bedrooms</a>
              <a href="#gallery" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>39-Photo Tour Gallery</a>
              <a href="#amenities" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Swimming Pool & Amenities</a>
              <a href="#contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Direct Inquiry & Directions</a>
            </div>
          </div>

          {/* Col 3: Contact & Location */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '16px' }}>
              Contact & Location
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} color="var(--gold-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{villaDetails.location}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} color="var(--gold-dark)" style={{ flexShrink: 0 }} />
                <span>{villaDetails.contactPhone}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Mail size={18} color="var(--gold-dark)" style={{ flexShrink: 0 }} />
                <span>{villaDetails.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <div>
            © {new Date().getFullYear()} Rishabh Villa Lonavala. All rights reserved. 6 BHK Luxury Private Villa.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: '#ffffff',
              border: '1px solid var(--border-gold)',
              color: 'var(--gold-dark)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
}
