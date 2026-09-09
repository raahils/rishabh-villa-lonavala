import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function LightboxModal({ photos, currentIndex, onClose, onSelectIndex }) {
  const isOpen = currentIndex !== null && currentIndex !== undefined && photos && photos.length > 0;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
      if (e.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % photos.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos, onClose, onSelectIndex]);

  if (!isOpen) return null;

  const currentPhoto = photos[currentIndex];

  const handlePrev = (e) => {
    e?.stopPropagation();
    onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    onSelectIndex((currentIndex + 1) % photos.length);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(5, 6, 8, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px'
      }}
    >
      {/* Top Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--accent-cream)',
          padding: '10px 20px',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles size={16} color="var(--gold-primary)" />
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600 }}>
            {currentPhoto?.title}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', background: 'rgba(212,175,55,0.15)', padding: '2px 10px', borderRadius: '12px', border: '1px solid var(--border-gold)', fontWeight: 600 }}>
            {currentPhoto?.category?.toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {currentIndex + 1} of {photos.length}
          </span>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '10px 0'
        }}
      >
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(18, 20, 26, 0.85)',
            border: '1px solid var(--border-gold)',
            color: 'var(--gold-light)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 20
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <img
          src={currentPhoto?.src}
          alt={currentPhoto?.title}
          style={{
            maxHeight: '70vh',
            maxWidth: '90vw',
            objectFit: 'contain',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
          }}
        />

        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(18, 20, 26, 0.85)',
            border: '1px solid var(--border-gold)',
            color: 'var(--gold-light)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 20
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* Photo Caption Bar */}
        <div
          style={{
            marginTop: '16px',
            maxWidth: '750px',
            width: '90%',
            background: 'rgba(17, 19, 24, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 24px',
            color: '#ffffff',
            textAlign: 'center'
          }}
        >
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#ffffff', fontWeight: 600, marginBottom: '4px' }}>
            {currentPhoto?.title}
          </h4>
          <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.4 }}>
            {currentPhoto?.description}
          </p>
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          padding: '6px 0',
          justifyContent: 'center',
          maxWidth: '1000px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {photos.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => onSelectIndex(idx)}
            style={{
              width: '64px',
              height: '46px',
              borderRadius: '6px',
              overflow: 'hidden',
              border: idx === currentIndex ? '2px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.1)',
              padding: 0,
              cursor: 'pointer',
              opacity: idx === currentIndex ? 1 : 0.4,
              flexShrink: 0
            }}
          >
            <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </button>
        ))}
      </div>
    </div>
  );
}
