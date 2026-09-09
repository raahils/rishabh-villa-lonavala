import React, { useState } from 'react';
import { Sparkles, ChevronDown, HelpCircle } from 'lucide-react';
import { faqList } from '../data/villaData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-padding" style={{ background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', margin: '0 auto 50px auto' }}>
          <span className="section-tag">
            <Sparkles size={14} />
            Frequently Asked Questions
          </span>
          <h2 className="section-title">
            Clear Answers for Your <span className="text-gold-gradient">Stay</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Find answers regarding guest capacity, private swimming pool, inverter power backup, and food options.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqList.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '20px 24px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  border: isOpen ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                  background: isOpen ? '#faf9f5' : '#ffffff',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HelpCircle size={20} color="var(--gold-dark)" />
                    <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 600 }}>
                      {faq.q}
                    </h3>
                  </div>
                  <div style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', color: 'var(--gold-dark)' }}>
                    <ChevronDown size={20} />
                  </div>
                </div>

                {isOpen && (
                  <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
