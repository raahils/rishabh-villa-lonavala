import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { villaDetails } from '../data/villaData';

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${villaDetails.whatsappNumber}?text=Hi%2C%20I%20want%20to%20inquire%20about%20Rishabh%20Villa%20Lonavala.`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}
    >
      {/* Tooltip on hover */}
      {hovered && (
        <div
          style={{
            background: '#111318',
            color: '#ffffff',
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.82rem',
            fontWeight: 600,
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap',
            border: '1px solid var(--border-gold)',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          Chat with Rishabh Villa
        </div>
      )}

      {/* Floating Circular Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(37, 211, 102, 0.45)',
          textDecoration: 'none',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
      >
        {/* Pulsing Outer Ring */}
        <div
          style={{
            position: 'absolute',
            inset: '-6px',
            borderRadius: '50%',
            border: '2px solid rgba(37, 211, 102, 0.5)',
            animation: 'pulseRing 2s infinite'
          }}
        />

        <MessageCircle size={32} />
      </a>

      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
