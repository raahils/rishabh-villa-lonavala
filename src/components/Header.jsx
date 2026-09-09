import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { villaDetails } from '../data/villaData';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Photo Gallery', href: '#gallery' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Location', href: '#lonavala' },
    { name: 'Contact', href: '#contact' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: 'rgba(255, 255, 255, 0.97)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        padding: scrolled ? '12px 0' : '16px 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--gold-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.2rem',
              fontFamily: 'var(--font-serif)',
              boxShadow: '0 4px 15px rgba(200, 169, 126, 0.35)'
            }}
          >
            R
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#111318', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
              RISHABH VILLA
            </div>
            <div className="header-subtitle" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold-dark)', marginTop: '-2px', fontWeight: 700, whiteSpace: 'nowrap' }}>
              6 BHK Private Villa • Lonavala
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links - Single-Line, No Wrapping */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: '#111318',
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: 600,
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
                letterSpacing: '0.3px'
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--gold-dark)')}
              onMouseLeave={(e) => (e.target.style.color = '#111318')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action: Call Us Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <a
            href={`tel:${villaDetails.contactPhone}`}
            className="btn-primary call-btn"
            style={{
              height: '40px',
              padding: '0 18px',
              fontSize: '0.85rem'
            }}
          >
            <Phone size={15} />
            <span className="call-btn-text">Call Us</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'none',
              border: 'none',
              color: '#111318',
              cursor: 'pointer',
              display: 'none',
              padding: '6px'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#ffffff',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#111318',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '6px 0'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (max-width: 480px) {
          .header-subtitle { display: none !important; }
          .call-btn-text { display: none !important; }
          .btn-primary.call-btn {
            width: 38px !important;
            height: 38px !important;
            padding: 0 !important;
            border-radius: 50% !important;
          }
        }
      `}</style>
    </header>
  );
}
