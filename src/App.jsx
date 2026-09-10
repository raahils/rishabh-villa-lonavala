import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Overview from './components/Overview';
import RoomShowcase from './components/RoomShowcase';
import Amenities from './components/Amenities';
import BookingCalculator from './components/BookingCalculator';
import LonavalaGuide from './components/LonavalaGuide';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { initAnalytics } from './utils/analyticsTracker';

function isOwnerUrl() {
  if (typeof window === 'undefined') return false;
  const href = window.location.href.toLowerCase();
  return href.includes('owner');
}

export default function App() {
  const [singlePhotoModal, setSinglePhotoModal] = useState(null);
  const [isOwnerRoute, setIsOwnerRoute] = useState(isOwnerUrl);

  useEffect(() => {
    // Initialize session & pageview analytics tracking
    initAnalytics();

    const checkRoute = () => {
      setIsOwnerRoute(isOwnerUrl());
    };

    checkRoute();

    // Listen for all URL changes
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    
    // Keyboard shortcut listener: Press Shift + O anywhere to toggle Owner Analytics
    const handleKeyDown = (e) => {
      if (e.shiftKey && (e.key === 'O' || e.key === 'o')) {
        setIsOwnerRoute(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // If URL contains owner (e.g. /owner, /#owner, /?owner), or Shift+O is pressed, show passcode-protected Owner Analytics page
  if (isOwnerRoute) {
    return (
      <div style={{ minHeight: '100vh', background: '#111318' }}>
        <AnalyticsDashboard
          isDedicatedPage={true}
          onClose={() => {
            if (window.location.hash) window.location.hash = '';
            window.history.pushState({}, '', window.location.origin + window.location.pathname.replace(/owner\/?/gi, ''));
            setIsOwnerRoute(false);
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fbfbf9', color: '#111318' }}>
      
      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main>
        <Hero />
        <Overview />
        <RoomShowcase />
        <Amenities />
        <BookingCalculator />
        <LonavalaGuide />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Permanent Floating WhatsApp FAB */}
      <FloatingWhatsApp />

      {/* Fullscreen Photo Lightbox Modal from Room Showcase */}
      {singlePhotoModal && (
        <LightboxModal
          photos={[{ id: 999, src: singlePhotoModal, title: 'Rishabh Villa View', category: '6 BHK Bedroom' }]}
          currentIndex={0}
          onClose={() => setSinglePhotoModal(null)}
          onSelectIndex={() => {}}
        />
      )}
    </div>
  );
}
