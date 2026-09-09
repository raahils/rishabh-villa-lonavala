import React, { useState } from 'react';
import { Sparkles, BedDouble, Waves, Utensils, Trees, Camera, Bath, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import { villaPhotos } from '../data/photos';
import LightboxModal from './LightboxModal';

export default function RoomShowcase() {
  const [activeCategory, setActiveCategory] = useState('bedrooms');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    { id: 'bedrooms', label: '6 BHK Bedrooms', icon: BedDouble },
    { id: 'pool', label: 'Private Pool & Deck', icon: Waves },
    { id: 'living', label: 'Living & Dining', icon: Utensils },
    { id: 'lawn', label: 'Garden & Lawn', icon: Trees },
    { id: 'ambiance', label: 'Villa Facade & Views', icon: Camera },
    { id: 'bathrooms', label: 'Bathrooms', icon: Bath }
  ];

  const categoryFeatures = {
    bedrooms: [
      "6 Private Air-Conditioned Bedrooms",
      "Extra Plush King Bedding & Clean Linens",
      "Attached En-suite Bathrooms in All Rooms",
      "Private Balcony & Scenic Hill Views"
    ],
    pool: [
      "Clean Private Swimming Pool",
      "Attached Outdoor Sun Deck & Loungers",
      "Ambient Underwater Evening Lighting",
      "Cascading Water Fountain Feature"
    ],
    living: [
      "Double-Height Teak Living Pavilion",
      "Professional Pool Table Lounge",
      "Fully Equipped Modular Kitchen & Dining",
      "Smart TV & Indoor Games Area"
    ],
    lawn: [
      "Spacious Manicured Green Lawn",
      "Shaded Outdoor Gazebo Pavilion",
      "Ideal for Morning Tea & Open-Air Lounging",
      "Surrounded by Lush Greenery"
    ],
    ambiance: [
      "Panoramic Aerial View of Western Ghats",
      "Architectural Elevation & Night Lighting",
      "Private Gated Society Setting",
      "Serene & Foggy Lonavala Climate"
    ],
    bathrooms: [
      "Modern Marble & Geometric Tiling",
      "Rainfall Showers & Back-Lit Mirrors",
      "24/7 Hot Water Geysers",
      "Fresh Towels & Premium Bath Amenities"
    ]
  };

  const currentCategoryPhotos = villaPhotos.filter(p => p.category === activeCategory);
  const activePhoto = currentCategoryPhotos[selectedPhotoIndex] || currentCategoryPhotos[0];

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSelectedPhotoIndex(0);
  };

  return (
    <section id="gallery" className="section-padding gallery-responsive-section" style={{ background: '#ffffff' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 32px auto' }}>
          <span className="section-tag" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} />
            Categorized Photo Gallery
          </span>
          <h2 className="section-title" style={{ margin: '0 0 14px 0' }}>
            Explore <span className="text-gold-gradient">Rishabh Villa Spaces</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto 16px auto', maxWidth: '800px', fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            100% Pure Vegetarian Villa • Pure Jain Food Available by In-House Cook • Strictly No Non-Veg Allowed • Pets Not Allowed
          </p>

          {/* Quick Policy Badges */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 700, background: 'rgba(22, 163, 74, 0.08)', color: '#16a34a', border: '1px solid rgba(22, 163, 74, 0.25)', padding: '5px 12px', borderRadius: 'var(--radius-full)' }}>
              🌱 100% Pure Veg (No Non-Veg)
            </span>
            <span style={{ fontSize: '0.76rem', fontWeight: 700, background: 'rgba(200, 169, 126, 0.12)', color: 'var(--gold-dark)', border: '1px solid var(--border-gold)', padding: '5px 12px', borderRadius: 'var(--radius-full)' }}>
              👨‍🍳 Pure Jain Food by In-House Cook
            </span>
            <span style={{ fontSize: '0.76rem', fontWeight: 700, background: 'rgba(220, 38, 38, 0.08)', color: '#dc2626', border: '1px solid rgba(220, 38, 38, 0.2)', padding: '5px 12px', borderRadius: 'var(--radius-full)' }}>
              🚫 Pets Not Allowed
            </span>
          </div>
        </div>

        {/* Category Filter Tabs - Single Line Layout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '40px',
            flexWrap: 'nowrap',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            WebkitOverflowScrolling: 'touch'
          }}
          className="hide-scrollbar mobile-tabs-container"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '42px',
                  background: isActive ? 'var(--gold-gradient)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--text-main)',
                  border: isActive ? 'none' : '1px solid rgba(200, 169, 126, 0.35)',
                  padding: '0 18px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 6px 20px rgba(200, 169, 126, 0.35)' : '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <Icon size={16} color={isActive ? '#ffffff' : 'var(--gold-dark)'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Refined Interactive Featured Showcase Card */}
        {activePhoto && (
          <div
            className="glass-card showcase-card-grid"
            style={{
              padding: '32px',
              display: 'grid',
              gridTemplateColumns: '1.25fr 1fr',
              gap: '36px',
              alignItems: 'center',
              background: '#faf9f5',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-gold)',
              boxShadow: '0 15px 45px rgba(0,0,0,0.04)',
              marginBottom: '44px',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
          >
            {/* Left Column: Seamless Photo Viewer + Thumbnail Strip */}
            <div style={{ minWidth: 0, width: '100%', maxWidth: '100%' }}>
              <div
                className="showcase-photo-frame"
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  marginBottom: '14px',
                  background: '#111318',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                  width: '100%',
                  maxWidth: '100%'
                }}
              >
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
                <button
                  onClick={() => setLightboxIndex(selectedPhotoIndex)}
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    background: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    color: '#111318',
                    border: '1px solid var(--border-gold)',
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.18)'
                  }}
                >
                  <Eye size={15} color="var(--gold-dark)" />
                  <span>View Fullscreen</span>
                </button>
              </div>

              {/* Thumbnails Carousel */}
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  overflowX: 'auto',
                  paddingBottom: '6px',
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box'
                }}
                className="hide-scrollbar"
              >
                {currentCategoryPhotos.map((photo, idx) => (
                  <button
                    key={photo.id}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    style={{
                      width: '74px',
                      height: '52px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: selectedPhotoIndex === idx ? '2px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                      padding: 0,
                      cursor: 'pointer',
                      opacity: selectedPhotoIndex === idx ? 1 : 0.5,
                      flexShrink: 0,
                      transition: 'all 0.25s ease',
                      boxShadow: selectedPhotoIndex === idx ? '0 4px 12px rgba(200,169,126,0.3)' : 'none'
                    }}
                  >
                    <img src={photo.src} alt={photo.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Photo Details & Category Specs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', minWidth: 0, width: '100%', maxWidth: '100%' }}>
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.73rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1.8px',
                    color: 'var(--gold-dark)',
                    fontWeight: 700,
                    marginBottom: '8px',
                    background: 'rgba(200, 169, 126, 0.12)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    flexWrap: 'wrap'
                  }}
                >
                  <Sparkles size={12} color="var(--gold-dark)" />
                  <span>{activePhoto.category} • PHOTO {selectedPhotoIndex + 1} OF {currentCategoryPhotos.length}</span>
                </div>

                <h3 className="showcase-title" style={{ fontFamily: 'var(--font-serif)', color: '#111318', fontWeight: 600, lineHeight: 1.25, marginTop: '4px', wordBreak: 'break-word' }}>
                  {activePhoto.title}
                </h3>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, wordBreak: 'break-word' }}>
                {activePhoto.description}
              </p>

              {/* Category Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                {(categoryFeatures[activeCategory] || categoryFeatures.bedrooms).map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(200,169,126,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <CheckCircle2 size={13} color="var(--gold-dark)" />
                    </div>
                    <span style={{ flex: 1, wordBreak: 'break-word' }}>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Lightbox CTA Button */}
              <div style={{ paddingTop: '4px', width: '100%', maxWidth: '100%' }}>
                <button
                  onClick={() => setLightboxIndex(selectedPhotoIndex)}
                  className="btn-primary showcase-cta-btn"
                  style={{ height: '44px', padding: '0 20px', fontSize: '0.88rem', width: '100%', justifyContent: 'center', whiteSpace: 'normal', boxSizing: 'border-box' }}
                >
                  <span style={{ textAlign: 'center' }}>Explore All {currentCategoryPhotos.length} Photos</span>
                  <ArrowRight size={16} style={{ flexShrink: 0 }} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Complete Photo Grid for Active Category */}
        <div className="category-photo-grid" style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
          {currentCategoryPhotos.map((photo, index) => (
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
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                background: '#ffffff',
                width: '100%',
                minWidth: 0,
                boxSizing: 'border-box'
              }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#111318', width: '100%' }}>
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
                
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(17, 19, 24, 0.78)',
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
              </div>

              <div style={{ padding: '16px 18px', background: '#ffffff', borderTop: '1px solid var(--border-subtle)', width: '100%', boxSizing: 'border-box' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#111318', fontWeight: 600, marginBottom: '4px' }}>
                  {photo.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Fullscreen Photo Viewing */}
      <LightboxModal
        photos={currentCategoryPhotos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(newIdx) => setLightboxIndex(newIdx)}
      />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mobile-tabs-container {
          justify-content: center;
        }
        .showcase-photo-frame {
          height: 420px;
        }
        .showcase-title {
          font-size: 2.1rem;
        }
        .category-photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (min-width: 961px) {
          .mobile-tabs-container {
            justify-content: center !important;
          }
        }

        @media (max-width: 960px) {
          .showcase-card-grid {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
            gap: 24px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .showcase-photo-frame {
            height: clamp(220px, 52vw, 320px) !important;
          }
          .showcase-title {
            font-size: 1.6rem !important;
          }
          .category-photo-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 18px !important;
          }
          .mobile-tabs-container {
            justify-content: flex-start !important;
            padding-left: 2px !important;
            padding-right: 16px !important;
          }
          .showcase-cta-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 640px) {
          .gallery-responsive-section {
            padding: 36px 0 !important;
          }
          .showcase-card-grid {
            padding: 16px !important;
            border-radius: var(--radius-md) !important;
          }
          .showcase-photo-frame {
            height: 220px !important;
          }
          .showcase-title {
            font-size: 1.35rem !important;
          }
          .category-photo-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
