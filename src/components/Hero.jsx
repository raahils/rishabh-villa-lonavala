import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Sun } from 'lucide-react';
import { villaPhotos } from '../data/photos';
import { villaDetails } from '../data/villaData';

export default function Hero() {
  const heroPhotos = villaPhotos.filter(p => p.isHero || p.category === 'pool' || p.category === 'ambiance').slice(0, 5);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroPhotos.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroPhotos.length]);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '130px',
        paddingBottom: '60px',
        overflow: 'hidden',
        background: '#111318'
      }}
    >
      {/* Background Photo Slider */}
      {heroPhotos.map((photo, index) => (
        <div
          key={photo.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
            zIndex: 1
          }}
        >
          <img
            src={photo.src}
            alt={photo.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: index === currentSlide ? 'scale(1.05)' : 'scale(1.0)',
              transition: 'transform 7s ease-out'
            }}
          />
          {/* Ambient Dark Gradient Overlay to ensure crisp contrast over any photo */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(17,19,24,0.65) 0%, rgba(17,19,24,0.45) 50%, rgba(17,19,24,0.75) 100%)'
            }}
          />
        </div>
      ))}

      {/* Main Content Overlay - Visibly directly over the photos (No box container) */}
      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          
          {/* Top Badges Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                height: '34px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(200, 169, 126, 0.5)',
                padding: '0 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                color: '#ffffff',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                lineHeight: 1
              }}
            >
              <Sparkles size={14} color="var(--gold-light)" />
              <span>6 BHK Private Villa</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                height: '34px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '0 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                color: '#ffffff',
                fontWeight: 600,
                lineHeight: 1
              }}
            >
              <Sun size={14} color="var(--gold-light)" />
              <span>Waksai, Lonavala</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                height: '34px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '0 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                color: '#ffffff',
                fontWeight: 700,
                lineHeight: 1
              }}
            >
              <Star size={14} fill="#FBBC05" color="#FBBC05" />
              <span>{villaDetails.stats.rating} Verified Rating</span>
            </div>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5.2vw, 4.4rem)',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
              marginBottom: '20px',
              textShadow: '0 4px 20px rgba(0,0,0,0.4)'
            }}
          >
            Experience Unrivaled Comfort at <span className="text-gold-gradient">Rishabh Villa</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.6,
              maxWidth: '780px',
              margin: '0 auto 36px auto',
              fontWeight: 400,
              textShadow: '0 2px 10px rgba(0,0,0,0.4)'
            }}
          >
            6 BHK Luxury Residence • Private Swimming Pool • Garden Lawn • Caretaker & Cook on Request
          </p>

          {/* Slideshow Indicator Dots */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
            {heroPhotos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: idx === currentSlide ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: idx === currentSlide ? 'var(--gold-primary)' : 'rgba(255,255,255,0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease'
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
