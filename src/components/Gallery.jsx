import React, { useState } from 'react';
import { Sparkles, Expand } from 'lucide-react';
import { villaPhotos } from '../data/photos';
import LightboxModal from './LightboxModal';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    { id: 'all', label: `All Photos (${villaPhotos.length})` },
    { id: 'pool', label: 'Swimming Pool & Deck' },
    { id: 'bedrooms', label: '6 BHK Bedrooms' },
    { id: 'living', label: 'Living & Dining' },
    { id: 'lawn', label: 'Garden Lawn & Gazebo' },
    { id: 'ambiance', label: 'Villa Facade & Views' },
    { id: 'bathrooms', label: 'Bathrooms' }
  ];

  const filteredPhotos = activeCategory === 'all'
    ? villaPhotos
    : villaPhotos.filter(p => p.category === activeCategory);

  return (
    <section id="gallery" className="section-padding" style={{ background: '#fbfbf9' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
          <span className="section-tag">
            <Sparkles size={14} />
            Complete Photo Tour
          </span>
          <h2 className="section-title">
            Explore <span className="text-gold-gradient">Rishabh Villa Lonavala</span>
          </h2>
        </div>

        {/* Filter Category Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: isActive ? 'var(--gold-gradient)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: isActive ? 'none' : '1px solid var(--border-subtle)',
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 15px rgba(200,169,126,0.3)' : '0 2px 6px rgba(0,0,0,0.03)'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Photo Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="glass-card"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                border: '1px solid var(--border-gold)',
                transition: 'all 0.3s ease',
                background: '#ffffff'
              }}
            >
              {/* Image Container */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
                />
                
                {/* Category Badge overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(17, 19, 24, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {photo.category}
                </div>

                {/* Expand Icon */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-dark)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  <Expand size={16} />
                </div>
              </div>

              {/* Photo Description Card */}
              <div style={{ padding: '16px 20px', background: '#ffffff', borderTop: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 600, marginBottom: '4px' }}>
                  {photo.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {photo.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        photos={filteredPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
}
