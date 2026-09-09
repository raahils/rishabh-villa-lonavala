import React, { useState } from 'react';
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

export default function App() {
  const [singlePhotoModal, setSinglePhotoModal] = useState(null);

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
