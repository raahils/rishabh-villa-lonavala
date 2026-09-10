import React, { useState } from 'react';
import { Sparkles, Star, Phone, MessageCircle, ShieldCheck, CheckCircle2, Calculator, ExternalLink, Users, Calendar } from 'lucide-react';
import { villaDetails } from '../data/villaData';
import { trackEvent } from '../utils/analyticsTracker';

export default function BookingCalculator() {
  const [guests, setGuests] = useState(12);
  const [nights, setNights] = useState(1);
  const [isWeekend, setIsWeekend] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);

  // Approximate base pricing calculation logic for reference
  const baseRatePerNight = isWeekend ? 18000 : 14000;
  const extraGuestFee = guests > 15 ? (guests - 15) * 1000 : 0;
  const totalEstimate = (baseRatePerNight + extraGuestFee) * nights;

  const handleCalculate = () => {
    setShowEstimate(true);
    trackEvent('calculate_price', 'Price Estimation Calculated', {
      guests,
      nights,
      isWeekend,
      estimatedPrice: totalEstimate
    });
  };

  const whatsappInquiryUrl = `https://wa.me/${villaDetails.whatsappNumber}?text=${encodeURIComponent(
    `Hi Rishabh Villa! I would like to inquire for a stay of ${guests} guests for ${nights} night(s) (${isWeekend ? 'Weekend' : 'Weekday'}). Estimated quote: ₹${totalEstimate.toLocaleString('en-IN')}.`
  )}`;

  return (
    <section id="contact" className="section-padding" style={{ background: '#faf9f5' }}>
      <div className="container" style={{ maxWidth: '1060px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', margin: '0 auto 50px auto' }}>
          <span className="section-tag">
            <Sparkles size={14} />
            Direct Owner Contact & Estimator
          </span>
          <h2 className="section-title">
            Connect with <span className="text-gold-gradient">Rishabh Villa</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Calculate an instant stay estimate and book directly with the property owner with zero middleman fees.
          </p>
        </div>

        <div
          className="glass-card booking-card-grid"
          style={{
            background: '#ffffff',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 45px rgba(0,0,0,0.05)',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Direct Contact Info & Instant Estimator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold-dark)', fontWeight: 700, marginBottom: '4px' }}>
                Exclusive 6 BHK Property
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-main)', fontWeight: 600 }}>
                Rishabh Villa Lonavala
              </h3>
            </div>

            {/* Interactive Price Estimator Box */}
            <div
              style={{
                background: '#fcfbf7',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(200, 169, 126, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                <Calculator size={18} color="var(--gold-dark)" />
                <span>Instant Stay Rate Estimator</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <Users size={12} inline style={{ marginRight: '4px' }} /> Total Guests ({guests})
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    value={guests}
                    onChange={(e) => {
                      setGuests(Number(e.target.value));
                      setShowEstimate(false);
                    }}
                    style={{ width: '100%', accentColor: 'var(--gold-dark)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <Calendar size={12} inline style={{ marginRight: '4px' }} /> Nights ({nights})
                  </label>
                  <select
                    value={nights}
                    onChange={(e) => {
                      setNights(Number(e.target.value));
                      setShowEstimate(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.85rem'
                    }}
                  >
                    {[1, 2, 3, 4, 5, 7].map(n => (
                      <option key={n} value={n}>{n} Night{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  id="weekendCheck"
                  checked={isWeekend}
                  onChange={(e) => {
                    setIsWeekend(e.target.checked);
                    setShowEstimate(false);
                  }}
                  style={{ accentColor: 'var(--gold-dark)', cursor: 'pointer' }}
                />
                <label htmlFor="weekendCheck" style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  Includes Weekend (Fri - Sun)
                </label>
              </div>

              <button
                onClick={handleCalculate}
                className="btn-outline"
                style={{
                  width: '100%',
                  height: '40px',
                  fontSize: '0.88rem',
                  justifyContent: 'center',
                  fontWeight: 700
                }}
              >
                Calculate Stay Estimate
              </button>

              {showEstimate && (
                <div
                  style={{
                    background: '#ffffff',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-gold)',
                    textAlign: 'center',
                    animation: 'fadeIn 0.25s ease'
                  }}
                >
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                    Estimated Total for {guests} Guests ({nights} Night{nights > 1 ? 's' : ''})
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold-dark)', margin: '4px 0' }}>
                    ₹{totalEstimate.toLocaleString('en-IN')}*
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#888' }}>*Final rates vary by exact dates & seasonality. Direct owner price guarantee.</div>
                </div>
              )}
            </div>

            {/* Direct Contact Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href={`tel:${villaDetails.contactPhone}`}
                onClick={() => trackEvent('phone_call', 'Contact Section Call')}
                className="btn-primary"
                style={{ flex: 1, height: '46px', padding: '0 20px', fontSize: '0.92rem' }}
              >
                <Phone size={18} />
                <span>Call Owner</span>
              </a>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', 'Contact Section WhatsApp Chat')}
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
                <span>WhatsApp Quote</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Reviews & Guarantees */}
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
                Location & Accessibility
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: 600 }}>
                Lonavala, Maharashtra
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.5 }}>
                Conveniently accessible via the Mumbai-Pune Expressway in Lonavala.
              </p>
            </div>

            <a
              href={villaDetails.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('guide_click', 'Google Reviews Clicked')}
              className="btn-outline"
              style={{ width: '100%', height: '44px', padding: '0 16px', fontSize: '0.88rem', justifyContent: 'center' }}
            >
              <Star size={16} fill="#FBBC05" color="#FBBC05" />
              <span>Read Google Reviews</span>
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

      <style>{`
        .booking-card-grid {
          padding: 44px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 36px;
        }
        @media (max-width: 840px) {
          .booking-card-grid {
            grid-template-columns: 1fr !important;
            padding: 22px !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
