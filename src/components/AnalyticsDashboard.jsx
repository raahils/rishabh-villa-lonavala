import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, Lock, Users, Eye, MessageCircle, Calculator, TrendingUp, 
  Smartphone, Monitor, Tablet, RefreshCw, Settings, ShieldCheck, 
  CheckCircle, BarChart2, Activity, PhoneCall, ArrowLeft
} from 'lucide-react';
import { 
  getAnalyticsSummary, 
  updateAnalyticsSettings, 
  resetAnalyticsData,
  fetchGlobalCloudMetrics 
} from '../utils/analyticsTracker';

export default function AnalyticsDashboard({ isOpen = true, onClose, isDedicatedPage = false }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [summary, setSummary] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'activity' | 'settings'

  // Settings form states
  const [newPasscode, setNewPasscode] = useState('');
  const [gaIdInput, setGaIdInput] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');

  // Fetch summary when open or tab changes
  const refreshData = useCallback(() => {
    fetchGlobalCloudMetrics().then(() => {
      const data = getAnalyticsSummary();
      setSummary(data);
      setGaIdInput(prev => prev || data.gaMeasurementId || '');
    });
  }, []);

  useEffect(() => {
    if (isOpen || isDedicatedPage) {
      refreshData();

      // 5-second live real-time pulse interval
      const timer = setInterval(() => {
        refreshData();
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isOpen, isDedicatedPage, refreshData]);

  if (!isOpen && !isDedicatedPage) return null;

  const handleUnlock = (e) => {
    e.preventDefault();
    const currentPasscode = summary ? summary.passcode : '1234';
    if (pinInput === currentPasscode) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateAnalyticsSettings({
      passcode: newPasscode.trim() || summary.passcode,
      gaMeasurementId: gaIdInput.trim()
    });
    setSettingsSuccess('Analytics settings updated successfully!');
    setTimeout(() => setSettingsSuccess(''), 3500);
    refreshData();
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all local visitor tracking data? This action cannot be undone.')) {
      resetAnalyticsData();
      refreshData();
    }
  };

  const handleGoBack = () => {
    if (onClose) {
      onClose();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div
      style={
        isDedicatedPage
          ? {
              minHeight: '100vh',
              background: '#111318',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 16px'
            }
          : {
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(17, 19, 24, 0.82)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              animation: 'fadeIn 0.25s ease'
            }
      }
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: isDedicatedPage ? '1100px' : '960px',
          maxHeight: isDedicatedPage ? 'none' : '92vh',
          minHeight: isDedicatedPage ? '85vh' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          overflow: 'hidden',
          border: '1px solid var(--border-gold)'
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#111318',
            color: '#ffffff',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={handleGoBack}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                padding: '8px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600
              }}
              title="Return to Villa Main Website"
            >
              <ArrowLeft size={16} /> Website
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--gold-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <BarChart2 size={22} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700 }}>
                  Rishabh Villa Owner Analytics
                </div>
                <div style={{ fontSize: '0.78rem', color: '#a0a5b5', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#10b981',
                      boxShadow: '0 0 8px #10b981'
                    }}
                  />
                  Live Visitor & Conversion Tracking
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isAuthenticated && (
              <button
                onClick={refreshData}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600
                }}
              >
                <RefreshCw size={14} /> Refresh
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Passcode Protection Lock Screen */}
        {!isAuthenticated ? (
          <div
            style={{
              padding: '60px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fbfbf9'
            }}
          >
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: '#fef3c7',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}
            >
              <Lock size={32} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '8px', color: '#111318' }}>
              Villa Owner Authentication Required
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#666', maxWidth: '400px', marginBottom: '24px' }}>
              Please enter your 4-digit passcode to access live activity stats, visitor metrics, and Google Analytics.
            </p>

            <form onSubmit={handleUnlock} style={{ width: '100%', maxWidth: '320px' }}>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter Passcode (Default: 1234)"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: pinError ? '2px solid #ef4444' : '1px solid #d1d5db',
                  fontSize: '1.1rem',
                  textAlign: 'center',
                  letterSpacing: '3px',
                  marginBottom: '12px',
                  outline: 'none'
                }}
                autoFocus
              />

              {pinError && (
                <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '12px', fontWeight: 600 }}>
                  Incorrect passcode. (Default passcode is 1234)
                </div>
              )}

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'var(--gold-gradient)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(184, 134, 11, 0.3)'
                }}
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Main Dashboard Content */
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            
            {/* Tabs Navigation */}
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid #e5e7eb',
                background: '#f9fafb',
                padding: '0 28px'
              }}
            >
              <button
                onClick={() => setActiveTab('overview')}
                style={{
                  padding: '14px 20px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: 'none',
                  background: 'none',
                  color: activeTab === 'overview' ? 'var(--gold-dark)' : '#6b7280',
                  borderBottom: activeTab === 'overview' ? '3px solid var(--gold-dark)' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <TrendingUp size={16} /> Activity & Visitor Overview
              </button>

              <button
                onClick={() => setActiveTab('activity')}
                style={{
                  padding: '14px 20px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: 'none',
                  background: 'none',
                  color: activeTab === 'activity' ? 'var(--gold-dark)' : '#6b7280',
                  borderBottom: activeTab === 'activity' ? '3px solid var(--gold-dark)' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Activity size={16} /> Live Event Feed ({summary?.recentEvents?.length || 0})
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                style={{
                  padding: '14px 20px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: 'none',
                  background: 'none',
                  color: activeTab === 'settings' ? 'var(--gold-dark)' : '#6b7280',
                  borderBottom: activeTab === 'settings' ? '3px solid var(--gold-dark)' : '3px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Settings size={16} /> GA4 & Security Settings
              </button>
            </div>

            {/* Tab Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', background: '#fbfbf9' }}>
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && summary && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* KPI Cards Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                      gap: '16px'
                    }}
                  >
                    {/* Card 1: Total Unique Visitors */}
                    <div style={kpiCardStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2563eb' }}>
                        <Users size={22} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#eff6ff', padding: '2px 8px', borderRadius: '12px' }}>Total</span>
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0 2px', color: '#111318' }}>
                        {summary.totalVisitors}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Unique Visitors</div>
                    </div>

                    {/* Card 2: Today's Visitors & Views */}
                    <div style={kpiCardStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                        <Eye size={22} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#ecfdf5', padding: '2px 8px', borderRadius: '12px' }}>Today</span>
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0 2px', color: '#111318' }}>
                        {summary.todayVisitors}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Visitors ({summary.todayPageviews} Views)</div>
                    </div>

                    {/* Card 3: WhatsApp Leads */}
                    <div style={kpiCardStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#25D366' }}>
                        <MessageCircle size={22} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#f0fdf4', padding: '2px 8px', borderRadius: '12px' }}>Leads</span>
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0 2px', color: '#111318' }}>
                        {summary.whatsappClicks}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>WhatsApp Inquiries</div>
                    </div>

                    {/* Card 4: Price Calculations */}
                    <div style={kpiCardStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d97706' }}>
                        <Calculator size={22} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#fffbeb', padding: '2px 8px', borderRadius: '12px' }}>Quotes</span>
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0 2px', color: '#111318' }}>
                        {summary.priceCalculations}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Price Estimates Run</div>
                    </div>

                    {/* Card 5: Lead Conversion Rate */}
                    <div style={kpiCardStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8b5cf6' }}>
                        <TrendingUp size={22} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#f5f3ff', padding: '2px 8px', borderRadius: '12px' }}>Rate</span>
                      </div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0 2px', color: '#111318' }}>
                        {summary.conversionRate}%
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Inquiry Conversion Rate</div>
                    </div>
                  </div>

                  {/* Visual 7-Day Traffic Bar Chart */}
                  <div
                    style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      padding: '20px 24px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0, color: '#111318' }}>
                          7-Day Visitor Traffic Trends
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '2px 0 0' }}>
                          Daily unique visitors over the past week
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', fontWeight: 600 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--gold-dark)' }} /> Unique Visitors
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#e5e7eb' }} /> Pageviews
                        </span>
                      </div>
                    </div>

                    {/* SVG Bar Chart rendering */}
                    <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '10px 0 20px', borderBottom: '1px dashed #e5e7eb' }}>
                      {summary.last7Days.map((day, idx) => {
                        const maxVal = Math.max(...summary.last7Days.map(d => Math.max(d.visitors, d.pageviews, 5)));
                        const visitorHeight = Math.max(12, (day.visitors / maxVal) * 140);
                        const viewsHeight = Math.max(8, (day.pageviews / maxVal) * 140);

                        return (
                          <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '6px' }}>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '140px' }}>
                              
                              {/* Pageviews Bar */}
                              <div
                                title={`${day.date}: ${day.pageviews} pageviews`}
                                style={{
                                  width: '16px',
                                  height: `${viewsHeight}px`,
                                  background: '#e5e7eb',
                                  borderRadius: '4px 4px 0 0',
                                  transition: 'all 0.3s ease'
                                }}
                              />

                              {/* Visitors Bar */}
                              <div
                                title={`${day.date}: ${day.visitors} unique visitors`}
                                style={{
                                  width: '20px',
                                  height: `${visitorHeight}px`,
                                  background: 'var(--gold-gradient)',
                                  borderRadius: '4px 4px 0 0',
                                  boxShadow: '0 4px 8px rgba(184, 134, 11, 0.25)',
                                  transition: 'all 0.3s ease'
                                }}
                              />
                            </div>

                            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#4b5563' }}>{day.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Funnel & Device Distribution Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    
                    {/* Visitor Funnel */}
                    <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e5e7eb' }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', marginBottom: '16px', color: '#111318' }}>
                        Inquiry Conversion Funnel
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <FunnelStep title="1. Total Page Visits" count={summary.totalPageviews} color="#3b82f6" percentage={100} />
                        <FunnelStep title="2. Price Calculator Checked" count={summary.priceCalculations} color="#f59e0b" percentage={summary.totalPageviews ? Math.round((summary.priceCalculations / summary.totalPageviews) * 100) : 0} />
                        <FunnelStep title="3. WhatsApp Inquiry Initiated" count={summary.whatsappClicks} color="#10b981" percentage={summary.totalPageviews ? Math.round((summary.whatsappClicks / summary.totalPageviews) * 100) : 0} />
                      </div>
                    </div>

                    {/* Device & Engagement Breakdown */}
                    <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e5e7eb' }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', marginBottom: '16px', color: '#111318' }}>
                        Activity & Device Breakdown
                      </h4>
                      
                      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                        <DeviceBadge icon={<Smartphone size={16} />} label="Mobile" count={summary.deviceCounts.Mobile} />
                        <DeviceBadge icon={<Monitor size={16} />} label="Desktop" count={summary.deviceCounts.Desktop} />
                        <DeviceBadge icon={<Tablet size={16} />} label="Tablet" count={summary.deviceCounts.Tablet} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '6px' }}>
                          <span style={{ color: '#4b5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Eye size={14} /> Room Gallery Photos Viewed
                          </span>
                          <span style={{ fontWeight: 700, color: '#111318' }}>{summary.photoViews}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '6px' }}>
                          <span style={{ color: '#4b5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <PhoneCall size={14} /> Direct Phone Calls Initiated
                          </span>
                          <span style={{ fontWeight: 700, color: '#111318' }}>{summary.phoneCalls}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 2: LIVE ACTIVITY STREAM */}
              {activeTab === 'activity' && summary && (
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '16px', color: '#111318' }}>
                    Recent Visitor Event Log
                  </h4>

                  {summary.recentEvents.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                      No visitor actions logged yet.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {summary.recentEvents.map((evt) => (
                        <div
                          key={evt.id}
                          style={{
                            background: '#ffffff',
                            padding: '14px 18px',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <EventIcon type={evt.type} />
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111318' }}>
                                {evt.title}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                {evt.details}
                              </div>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#9ca3af' }}>
                            <div>{new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            <span style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', color: '#4b5563', fontWeight: 600 }}>
                              {evt.device || 'Web'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: GA4 & SETTINGS */}
              {activeTab === 'settings' && (
                <div style={{ maxWidth: '640px' }}>
                  
                  {settingsSuccess && (
                    <div
                      style={{
                        background: '#ecfdf5',
                        border: '1px solid #10b981',
                        color: '#065f46',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <CheckCircle size={18} /> {settingsSuccess}
                    </div>
                  )}

                  {/* Section 1: Google Analytics 4 */}
                  <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <ShieldCheck size={24} color="var(--gold-dark)" />
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0, color: '#111318' }}>
                        Google Analytics 4 (GA4) Integration
                      </h4>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.6, marginBottom: '16px' }}>
                      To automatically get cloud-based reports in Google Analytics (such as city location, real-time live visitors, and Google Search keywords), create a free Google Analytics property and enter your Measurement ID below:
                    </p>

                    <form onSubmit={handleSaveSettings}>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                          GA4 Measurement ID (e.g. G-XXXXXXXXXX)
                        </label>
                        <input
                          type="text"
                          value={gaIdInput}
                          onChange={(e) => setGaIdInput(e.target.value)}
                          placeholder="G-1234567890"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            fontSize: '0.95rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      {/* Change Passcode */}
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                          Change Owner Dashboard Passcode
                        </label>
                        <input
                          type="text"
                          value={newPasscode}
                          onChange={(e) => setNewPasscode(e.target.value)}
                          placeholder="New Passcode (Current: 1234)"
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            border: '1px solid #d1d5db',
                            fontSize: '0.95rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        style={{
                          background: 'var(--gold-gradient)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '10px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(184, 134, 11, 0.25)'
                        }}
                      >
                        Save Settings
                      </button>
                    </form>
                  </div>

                  {/* Section 2: Reset Data */}
                  <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #fee2e2' }}>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#991b1b', marginBottom: '8px' }}>
                      Reset Analytics Data
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '16px' }}>
                      Clear all local visitor counts, page view totals, and recorded event logs from this browser.
                    </p>
                    <button
                      onClick={handleResetData}
                      style={{
                        background: '#ef4444',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Reset All Tracking Data
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// Sub-components & Styles
const kpiCardStyle = {
  background: '#ffffff',
  borderRadius: '14px',
  padding: '16px 18px',
  border: '1px solid #e5e7eb',
  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
};

function FunnelStep({ title, count, color, percentage }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
        <span style={{ fontWeight: 600, color: '#374151' }}>{title}</span>
        <span style={{ fontWeight: 700, color: '#111318' }}>{count} ({percentage}%)</span>
      </div>
      <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${percentage}%`, background: color, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
}

function DeviceBadge({ icon, label, count }) {
  return (
    <div style={{ flex: 1, background: '#f9fafb', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
      <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--gold-dark)', marginBottom: '4px' }}>
        {icon}
      </div>
      <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111318' }}>{count}</div>
      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{label}</div>
    </div>
  );
}

function EventIcon({ type }) {
  let icon = <Eye size={18} color="#2563eb" />;
  let bg = '#eff6ff';

  if (type === 'whatsapp_click') {
    icon = <MessageCircle size={18} color="#25D366" />;
    bg = '#f0fdf4';
  } else if (type === 'calculate_price') {
    icon = <Calculator size={18} color="#d97706" />;
    bg = '#fffbeb';
  } else if (type === 'phone_call') {
    icon = <PhoneCall size={18} color="#8b5cf6" />;
    bg = '#f5f3ff';
  }

  return (
    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {icon}
    </div>
  );
}
