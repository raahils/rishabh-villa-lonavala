/**
 * Rishabh Villa Lonavala - Real-Time Global Analytics & Visitor Tracking Engine
 * Manages local telemetry, session tracking, daily traffic metrics, GA4,
 * and global real-time cloud database sync across all user devices.
 */

const STORAGE_KEY = 'rv_villa_analytics_v1';
const VISITOR_KEY = 'rv_visitor_uuid';
const GLOBAL_CLOUD_NAMESPACE = 'rishabh_villa_lonavala_analytics';

// Public zero-config serverless cloud telemetry endpoint for real-time global multi-device sync
const CLOUD_SYNC_ENDPOINT = 'https://api.counterapi.dev/v1';

// Helper to detect device type
function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

// Get or create unique persistent visitor ID
function getVisitorId() {
  let vId = localStorage.getItem(VISITOR_KEY);
  if (!vId) {
    vId = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    localStorage.setItem(VISITOR_KEY, vId);
  }
  return vId;
}

// Load current analytics state from localStorage
export function getAnalyticsState() {
  const defaultState = {
    passcode: '1234',
    gaMeasurementId: '',
    firstTrackedDate: new Date().toISOString().split('T')[0],
    visitorsList: [], // array of unique visitorIds
    dailyPageviews: {}, // { 'YYYY-MM-DD': count }
    dailyVisitors: {},  // { 'YYYY-MM-DD': Set/Array of visitorIds }
    events: [], // Array of recent events { id, timestamp, type, title, details, device }
    counters: {
      totalPageviews: 0,
      whatsappClicks: 0,
      priceCalculations: 0,
      photoViews: 0,
      phoneCalls: 0,
    },
    cloudTotals: {
      globalPageviews: 0,
      globalWhatsappClicks: 0,
      globalPriceCalculations: 0
    }
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      ...defaultState,
      ...parsed,
      counters: { ...defaultState.counters, ...(parsed.counters || {}) },
      cloudTotals: { ...defaultState.cloudTotals, ...(parsed.cloudTotals || {}) },
      dailyPageviews: parsed.dailyPageviews || {},
      dailyVisitors: parsed.dailyVisitors || {},
      events: parsed.events || [],
      visitorsList: parsed.visitorsList || []
    };
  } catch (e) {
    console.error('Failed to parse analytics state', e);
    return defaultState;
  }
}

// Save state to localStorage
function saveAnalyticsState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save analytics state', e);
  }
}

/**
 * Send real-time counter increment to global cloud serverless database
 */
async function sendGlobalCloudEvent(metricName) {
  try {
    const url = `${CLOUD_SYNC_ENDPOINT}/${GLOBAL_CLOUD_NAMESPACE}/${metricName}/up`;
    fetch(url, { method: 'GET', mode: 'cors' }).catch(() => {});
  } catch (err) {
    // Ignore offline or network block
  }
}

/**
 * Fetch global cloud metrics across all devices worldwide
 */
export async function fetchGlobalCloudMetrics() {
  const metrics = ['pageviews', 'whatsapp_clicks', 'price_calculations'];
  const results = {};

  await Promise.all(
    metrics.map(async (m) => {
      try {
        const res = await fetch(`${CLOUD_SYNC_ENDPOINT}/${GLOBAL_CLOUD_NAMESPACE}/${m}`, { mode: 'cors' });
        if (res.ok) {
          const data = await res.json();
          results[m] = data.count || 0;
        }
      } catch (e) {
        // Fallback silently if offline
      }
    })
  );

  if (Object.keys(results).length > 0) {
    const state = getAnalyticsState();
    state.cloudTotals = {
      globalPageviews: Math.max(results.pageviews || 0, state.counters.totalPageviews || 0),
      globalWhatsappClicks: Math.max(results.whatsapp_clicks || 0, state.counters.whatsappClicks || 0),
      globalPriceCalculations: Math.max(results.price_calculations || 0, state.counters.priceCalculations || 0)
    };
    saveAnalyticsState(state);
  }
}

/**
 * Initialize session tracking on app mount
 */
export function initAnalytics() {
  const visitorId = getVisitorId();
  const today = new Date().toISOString().split('T')[0];
  const sessionKey = `rv_session_${today}`;
  const isNewSessionToday = !sessionStorage.getItem(sessionKey);

  const state = getAnalyticsState();

  // Update total pageviews
  state.counters.totalPageviews = (state.counters.totalPageviews || 0) + 1;
  state.dailyPageviews[today] = (state.dailyPageviews[today] || 0) + 1;

  // Track unique visitor globally & daily
  if (!state.visitorsList.includes(visitorId)) {
    state.visitorsList.push(visitorId);
  }

  if (!state.dailyVisitors[today]) {
    state.dailyVisitors[today] = [];
  }
  if (!state.dailyVisitors[today].includes(visitorId)) {
    state.dailyVisitors[today].push(visitorId);
  }

  // Log pageview event if new session today
  if (isNewSessionToday) {
    sessionStorage.setItem(sessionKey, 'active');
    const newEvent = {
      id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toISOString(),
      type: 'page_view',
      title: 'Website Visit',
      details: `New ${getDeviceType()} session started`,
      device: getDeviceType()
    };
    state.events = [newEvent, ...state.events].slice(0, 100);
  }

  saveAnalyticsState(state);

  // Send real-time cloud pageview ping
  sendGlobalCloudEvent('pageviews');

  // Async fetch global cloud totals
  fetchGlobalCloudMetrics();

  // Initialize GA4 if ID is stored
  if (state.gaMeasurementId && typeof window !== 'undefined') {
    injectGA4Script(state.gaMeasurementId);
  }
}

/**
 * Log custom visitor activity events and sync globally in real-time
 */
export function trackEvent(eventType, title, details = {}) {
  const state = getAnalyticsState();
  const device = getDeviceType();
  const timestamp = new Date().toISOString();

  // Increment specific counters locally & in real-time cloud
  if (eventType === 'whatsapp_click') {
    state.counters.whatsappClicks = (state.counters.whatsappClicks || 0) + 1;
    sendGlobalCloudEvent('whatsapp_clicks');
  } else if (eventType === 'calculate_price') {
    state.counters.priceCalculations = (state.counters.priceCalculations || 0) + 1;
    sendGlobalCloudEvent('price_calculations');
  } else if (eventType === 'photo_view') {
    state.counters.photoViews = (state.counters.photoViews || 0) + 1;
  } else if (eventType === 'phone_call') {
    state.counters.phoneCalls = (state.counters.phoneCalls || 0) + 1;
  }

  const detailsString = typeof details === 'string' ? details : JSON.stringify(details);

  const newEvent = {
    id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    timestamp,
    type: eventType,
    title,
    details: detailsString,
    device
  };

  state.events = [newEvent, ...(state.events || [])].slice(0, 100);
  saveAnalyticsState(state);

  // Dispatch to Google Analytics Realtime API if available
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', eventType, {
        event_category: 'Villa Interactions',
        event_label: title,
        value: 1
      });
    } catch (err) {
      console.warn('GA4 dispatch failed', err);
    }
  }
}

/**
 * Returns formatted summary for Owner Dashboard with cloud totals
 */
export function getAnalyticsSummary() {
  const state = getAnalyticsState();
  const today = new Date().toISOString().split('T')[0];

  const totalVisitors = Math.max(state.visitorsList ? state.visitorsList.length : 0, Math.ceil((state.cloudTotals.globalPageviews || 0) * 0.75));
  const todayVisitors = (state.dailyVisitors[today] || []).length || Math.ceil((state.dailyPageviews[today] || 0) * 0.8);
  const todayPageviews = state.dailyPageviews[today] || 0;
  const totalPageviews = Math.max(state.counters.totalPageviews || 0, state.cloudTotals.globalPageviews || 0);
  const whatsappClicks = Math.max(state.counters.whatsappClicks || 0, state.cloudTotals.globalWhatsappClicks || 0);
  const priceCalculations = Math.max(state.counters.priceCalculations || 0, state.cloudTotals.globalPriceCalculations || 0);
  const photoViews = state.counters.photoViews || 0;
  const phoneCalls = state.counters.phoneCalls || 0;

  // Calculate overall conversion rate (WhatsApp clicks / Total Visitors)
  const conversionRate = totalVisitors > 0 ? ((whatsappClicks / totalVisitors) * 100).toFixed(1) : 0;

  // Generate 7-day trend series for charts
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const visits = (state.dailyVisitors[dateStr] || []).length;
    const views = state.dailyPageviews[dateStr] || 0;
    last7Days.push({ date: dateStr, label: dayLabel, visitors: visits, pageviews: views });
  }

  // Device breakdown estimation from events
  const deviceCounts = { Mobile: 0, Desktop: 0, Tablet: 0 };
  (state.events || []).forEach(evt => {
    if (evt.device && deviceCounts[evt.device] !== undefined) {
      deviceCounts[evt.device]++;
    }
  });

  return {
    totalVisitors,
    todayVisitors,
    totalPageviews,
    todayPageviews,
    whatsappClicks,
    priceCalculations,
    photoViews,
    phoneCalls,
    conversionRate,
    last7Days,
    deviceCounts,
    recentEvents: state.events || [],
    passcode: state.passcode || '1234',
    gaMeasurementId: state.gaMeasurementId || ''
  };
}

/**
 * Update Analytics Settings (Passcode / GA Measurement ID)
 */
export function updateAnalyticsSettings({ passcode, gaMeasurementId }) {
  const state = getAnalyticsState();
  if (passcode !== undefined) state.passcode = passcode;
  if (gaMeasurementId !== undefined) {
    state.gaMeasurementId = gaMeasurementId.trim();
    if (state.gaMeasurementId && typeof window !== 'undefined') {
      injectGA4Script(state.gaMeasurementId);
    }
  }
  saveAnalyticsState(state);
}

/**
 * Reset Analytics Data
 */
export function resetAnalyticsData() {
  const passcode = getAnalyticsState().passcode;
  const gaMeasurementId = getAnalyticsState().gaMeasurementId;
  const resetState = {
    passcode,
    gaMeasurementId,
    firstTrackedDate: new Date().toISOString().split('T')[0],
    visitorsList: [],
    dailyPageviews: {},
    dailyVisitors: {},
    events: [],
    counters: {
      totalPageviews: 0,
      whatsappClicks: 0,
      priceCalculations: 0,
      photoViews: 0,
      phoneCalls: 0,
    },
    cloudTotals: {
      globalPageviews: 0,
      globalWhatsappClicks: 0,
      globalPriceCalculations: 0
    }
  };
  saveAnalyticsState(resetState);
}

/**
 * Dynamic script tag injection for GA4
 */
function injectGA4Script(measurementId) {
  if (!measurementId || document.getElementById('ga4-script')) return;

  const script1 = document.createElement('script');
  script1.id = 'ga4-script';
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.id = 'ga4-config';
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(script2);
}
