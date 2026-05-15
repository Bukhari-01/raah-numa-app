import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// ─── Supabase Config ────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ─── Your Original Questions (EXACT COPY FROM OLD RaahNuma.jsx) ───
const QUESTIONS = [
  {
    id: "interests",
    label: "Your Interests",
    text: "What do you genuinely enjoy doing?",
    hint: "Select all that apply",
    type: "multi",
    two: true,
    options: [
      { i: "✍️", t: "Writing & content" },
      { i: "🎨", t: "Design & visuals" },
      { i: "💬", t: "Talking & selling" },
      { i: "💻", t: "Tech & computers" },
      { i: "📚", t: "Teaching & coaching" },
      { i: "📊", t: "Numbers & analysis" },
      { i: "📦", t: "Products & trading" },
      { i: "🎥", t: "Video & media" },
    ],
  },
  {
    id: "skill_desc",
    label: "Your Biggest Skill",
    text: "Describe your strongest skill or ability in your own words.",
    hint: "Be specific — even if it seems small or ordinary",
    type: "text",
    placeholder: "e.g. I'm very good at explaining things simply, I know how to negotiate prices, I can edit videos fast...",
  },
  {
    id: "english",
    label: "English Level",
    text: "How comfortable are you communicating in English?",
    type: "single",
    options: [
      { i: "🟡", t: "Basic — I understand but struggle to write" },
      { i: "🟠", t: "Conversational — I can get my point across" },
      { i: "🟢", t: "Fluent — I write and speak confidently" },
    ],
  },
  {
    id: "tried_before",
    label: "Past Attempts",
    text: "What have you tried before to earn money? What happened?",
    hint: "Be honest — failures are the most useful data",
    type: "text",
    placeholder: "e.g. I tried dropshipping but gave up after 2 months because I didn't know how to get customers. I also tried freelancing but couldn't find clients...",
  },
  {
    id: "time",
    label: "Available Time",
    text: "How many hours per day can you realistically dedicate?",
    type: "single",
    two: true,
    options: [
      { i: "⏰", t: "1–2 hours" },
      { i: "⏰", t: "3–4 hours" },
      { i: "⏰", t: "5–6 hours" },
      { i: "⏰", t: "Full time (8+ hrs)" },
    ],
  },
  {
    id: "timeline",
    label: "Income Urgency",
    text: "When do you need to start earning money?",
    type: "single",
    options: [
      { i: "🔴", t: "Urgent — within 30 days" },
      { i: "🟡", t: "Soon — within 3 months" },
      { i: "🟢", t: "Patient — within 6 months" },
      { i: "🔵", t: "Long game — 1 year+" },
    ],
  },
  {
    id: "resources",
    label: "Your Resources",
    text: "What do you have access to right now?",
    hint: "Select all that apply",
    type: "multi",
    two: true,
    options: [
      { i: "💻", t: "Laptop or PC" },
      { i: "📱", t: "Smartphone only" },
      { i: "🌐", t: "Stable internet" },
      { i: "💰", t: "Some capital (PKR 10k+)" },
      { i: "🚫", t: "Zero capital" },
      { i: "👥", t: "A network / contacts" },
    ],
  },
  {
    id: "vision",
    label: "Your Vision",
    text: "What does success look like for you exactly 1 year from now?",
    hint: "Be specific about money, lifestyle, freedom — whatever matters most to you",
    type: "text",
    placeholder: "e.g. I want to be earning PKR 150,000/month from my laptop, have my own schedule, and not depend on my family...",
  },
  {
    id: "situation",
    label: "Current Situation",
    text: "What best describes where you are right now?",
    type: "single",
    options: [
      { i: "🎓", t: "Student" },
      { i: "😔", t: "Unemployed, need income urgently" },
      { i: "💼", t: "Working a job, want extra income" },
      { i: "🏪", t: "Have a business, want to grow it" },
    ],
  },
  {
    id: "goal",
    label: "Your Core Goal",
    text: "What's the real thing you're after?",
    type: "single",
    options: [
      { i: "🔄", t: "Replace my job income fully" },
      { i: "➕", t: "Extra income on the side" },
      { i: "🚀", t: "Build a real business or brand" },
      { i: "🌍", t: "Financial freedom — work from anywhere" },
    ],
  },
];


// ─── Styles (EXACT COPY FROM OLD RaahNuma.jsx) ──────────────────
const s = {
    app: { background: "#f7f5f1", minHeight: "100vh", padding: "32px 20px 80px", fontFamily: "'Inter', -apple-system, sans-serif", color: "#1a1a2e" },
    wrap: { maxWidth: 620, margin: "0 auto" },
    badge: { display: "inline-block", background: "#1a1a2e", color: "#c9a84c", padding: "6px 18px", borderRadius: 100, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 16 },
    h1: { fontSize: "clamp(1.9rem,5vw,2.5rem)", fontWeight: 900, textAlign: "center", color: "#1a1a2e", marginBottom: 10, lineHeight: 1.15 },
    sub: { textAlign: "center", color: "#666", fontSize: 15, lineHeight: 1.6, marginBottom: 32 },
    card: { background: "#fff", border: "1px solid #e8e4de", borderRadius: 18, padding: 32, boxShadow: "0 2px 20px rgba(0,0,0,0.06)" },
    pill: { background: "#f0ede8", border: "1px solid #ddd8d0", borderRadius: 100, padding: "6px 14px", fontSize: 13, color: "#555", display: "inline-block" },
    btnStart: { display: "block", width: "100%", maxWidth: 280, margin: "0 auto", background: "#1a1a2e", color: "#fff", border: "none", padding: "16px 28px", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer" },
    progRow: { display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 8 },
    progTrack: { height: 4, background: "#e8e4de", borderRadius: 10, marginBottom: 28, overflow: "hidden" },
    progFill: (w) => ({ height: "100%", background: "linear-gradient(90deg,#4a3f7a,#c9a84c)", borderRadius: 10, width: w + "%", transition: "width 0.4s ease" }),
    qLabel: { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#c9a84c", fontWeight: 700, marginBottom: 8 },
    qText: { fontSize: "clamp(1rem,2.5vw,1.2rem)", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.4, marginBottom: 4 },
    qHint: { fontSize: 13, color: "#888", marginBottom: 20 },
    optsGrid: (two) => ({ display: "grid", gridTemplateColumns: two ? "1fr 1fr" : "1fr", gap: 9 }),
    opt: (sel) => ({ background: sel ? "#fef9ee" : "#f8f6f2", border: `1.5px solid ${sel ? "#c9a84c" : "#e0dbd4"}`, borderRadius: 11, padding: "12px 16px", color: sel ? "#8a6200" : "#1a1a2e", fontFamily: "inherit", fontSize: 14, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10, lineHeight: 1.3, fontWeight: sel ? 500 : 400, width: "100%" }),
    textarea: { width: "100%", minHeight: 110, background: "#f8f6f2", border: "1.5px solid #e0dbd4", borderRadius: 11, padding: "14px 16px", fontSize: 14, fontFamily: "inherit", color: "#1a1a2e", lineHeight: 1.6, resize: "vertical", outline: "none" },
    nav: { display: "flex", gap: 10, marginTop: 22 },
    btnBack: { background: "transparent", border: "1.5px solid #e0dbd4", color: "#888", padding: "11px 18px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 14 },
    btnNext: (gold) => ({ flex: 1, background: gold ? "#c9a84c" : "#1a1a2e", border: "none", color: "#fff", padding: "13px 20px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 600 }),
    err: { background: "#fff5f5", border: "1px solid #fcc", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#c00", marginTop: 12, textAlign: "center" },
    // result
    secLabel: { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#c9a84c", fontWeight: 700, marginBottom: 10 },
    sec: { background: "#f8f6f2", border: "1px solid #e8e4de", borderRadius: 13, padding: "18px 20px", marginBottom: 12 },
    secText: { color: "#333", fontSize: 14, lineHeight: 1.7 },
    npill: (hot) => ({ background: hot ? "#fef9ee" : "#eee9e0", border: `1px solid ${hot ? "#c9a84c" : "#ddd8d0"}`, borderRadius: 100, padding: "5px 13px", fontSize: 13, color: hot ? "#8a6200" : "#555", display: "inline-block", margin: "0 6px 6px 0" }),
    warnBox: { background: "#fff8f0", border: "1px solid #f5d5b0", borderRadius: 10, padding: "14px 16px", fontSize: 13, color: "#8a4000", display: "flex", gap: 10, marginBottom: 12, lineHeight: 1.6 },
    hiddenBox: { background: "#f0f7ff", border: "1px solid #b0d4f5", borderRadius: 10, padding: "14px 16px", fontSize: 13, color: "#1a4a7a", display: "flex", gap: 10, marginBottom: 12, lineHeight: 1.6 },
    motive: { background: "#1a1a2e", borderRadius: 12, padding: 20, fontSize: 14, fontStyle: "italic", color: "#c9a84c", textAlign: "center", lineHeight: 1.7, marginBottom: 12 },
    btnAgain: { width: "100%", background: "transparent", border: "1.5px solid #e0dbd4", color: "#888", padding: 12, borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 14, marginTop: 4 },
  };

// ─── Loading messages ────────────────────────────────────────
const LOAD_MSGS = [
  'Reading your interests & story...',
  'Scanning hot niches for 2025–2026...',
  'Matching to Pakistan\'s real market...',
  'Calculating your income timeline...',
  'Building your personal action plan...',
];

// ─── PREMIUM UPSELL (monetization) ──────────────────────────
function PremiumUpsell() {
  return (
    <div style={{
      ...s.sec, 
      border: '2px solid #c9a84c', 
      background: '#fef9ee',
      marginTop: 12
    }}>
      <div style={s.secLabel}>💎 Get the Full 30‑Day Game Plan</div>
      <p style={{ fontSize: 14, color: '#555', margin: '8px 0 14px' }}>
        Step‑by‑step blueprint, exact gig titles, outreach scripts. <br/>Get the PDF instantly.
      </p>
      <button
        onClick={() => alert('Purchase link coming soon! We\'ll email you.')}
        style={{
          background: '#c9a84c',
          color: '#fff',
          border: 'none',
          padding: '12px 28px',
          borderRadius: 8,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Get Extended Plan — PKR 499
      </button>
    </div>
  );
}

// ─── AFFILIATE TOOLS (replace links with your own) ───────────
const AFFILIATE_LINKS = {
  'Canva Pro': 'https://partner.canva.com/YOUR-AFF-ID',
  'Hostinger': 'https://hostinger.com?REF=YOUR-ID',
  'Fiverr': 'https://fiverr.com?affiliate=YOUR-ID',
  'Semrush': 'https://semrush.com/partner/YOUR-ID',
};

function ToolPill({ tool }) {
  const link = AFFILIATE_LINKS[tool];
  const style = { ...s.npill(false), cursor: link ? 'pointer' : 'default' };
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <span style={style}>{tool}</span>
      </a>
    );
  }
  return <span style={style}>{tool}</span>;
}

// ─── MAIN COMPONENT ──────────────────────────────────────────
export default function RaahNuma() {
  // Screen: welcome | login | quiz | loading | result
  const [screen, setScreen] = useState('welcome');
  const [session, setSession] = useState(null);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Quiz states
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState({});
  const [textVal, setTextVal] = useState('');
  const [error, setError] = useState('');
  // Result & history
  const [result, setResult] = useState(null);
  const [loadStep, setLoadStep] = useState(0);
  const [pastReports, setPastReports] = useState([]);

  const q = QUESTIONS[cur];
  const isLast = cur === QUESTIONS.length - 1;

  // ── Check for existing session on load ─────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        loadPastReports(session.user.id);
      }
    });
  }, []);

  async function loadPastReports(userId) {
    const { data } = await supabase
      .from('user_reports')
      .select('report, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (data) setPastReports(data);
  }

  // ── Auth handlers ──────────────────────────────────────
  async function handleAuth() {
    setAuthError('');
    if (authMode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setAuthError(error.message);
      else setAuthError('Account created! You can now log in.');
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthError(error.message);
      else {
        setSession(data.session);
        loadPastReports(data.session.user.id);
      }
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    setPastReports([]);
    setScreen('welcome');
  }

  // ── Quiz helpers ───────────────────────────────────────
  function getAns(id) {
    return answers[id] ?? (QUESTIONS.find(q => q.id === id)?.type === 'multi' ? [] : '');
  }

  function toggleMulti(id, val) {
    const cur = getAns(id);
    const next = cur.includes(val) ? cur.filter(x => x !== val) : [...cur, val];
    setAnswers(a => ({ ...a, [id]: next }));
  }

  function setSingle(id, val) {
    setAnswers(a => ({ ...a, [id]: val }));
  }

  function canProceed() {
    const a = getAns(q.id);
    if (q.type === 'multi') return Array.isArray(a) && a.length > 0;
    if (q.type === 'single') return !!a;
    if (q.type === 'text') return typeof a === 'string' && a.trim().length > 10;
    return false;
  }

  function handleTextChange(val) {
    setTextVal(val);
    setAnswers(a => ({ ...a, [q.id]: val }));
    setError('');
  }

  function goNext() {
    if (!canProceed()) { setError('Please answer this question to continue.'); return; }
    setError('');
    if (!isLast) { setCur(c => c + 1); setTextVal(answers[QUESTIONS[cur + 1]?.id] || ''); }
    else runAnalysis();
  }

  function goPrev() {
    if (cur > 0) { setCur(c => c - 1); setTextVal(answers[QUESTIONS[cur - 1]?.id] || ''); setError(''); }
  }

  function buildSummary() {
    return QUESTIONS.map(q => {
      const a = answers[q.id];
      if (!a || (Array.isArray(a) && !a.length)) return `${q.label}: (skipped)`;
      if (Array.isArray(a)) return `${q.label}: ${a.join(', ')}`;
      return `${q.label}: ${a}`;
    }).join('\n');
  }

  async function runAnalysis() {
    if (!session) {
      setError('You must be logged in to run the analysis.');
      return;
    }
    setScreen('loading');
    setLoadStep(0);
    const steps = [0, 1, 2, 3, 4];
    steps.forEach((_, i) => setTimeout(() => setLoadStep(i + 1), i * 900));

    try {
      const answersPayload = {};
      QUESTIONS.forEach(q => { answersPayload[q.id] = answers[q.id]; });

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          answers: answersPayload
        })
      });

      if (!res.ok) throw new Error('Server error');
      const parsed = await res.json();
      if (parsed.error) throw new Error(parsed.error);

      setResult(parsed);
      setScreen('result');
      loadPastReports(session.user.id);
    } catch (e) {
      setScreen('quiz');
      setError('Report generation failed. ' + e.message);
    }
  }

  function restart() {
    setCur(0); setAnswers({}); setTextVal(''); setResult(null); setError(''); setScreen('welcome');
  }

  // ── Render helpers ─────────────────────────────────────
  const pct = Math.round((cur + 1) / QUESTIONS.length * 100);

  // ── SCREEN: Welcome / Login ───────────────────────────
  if (screen === 'welcome' || screen === 'login') {
    return (
      <div style={s.app}>
        <div style={s.wrap}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <span style={s.badge}>🧭 RaahNuma AI</span>
            <h1 style={s.h1}>Find Your <span style={{ color: '#c9a84c' }}>Direction</span></h1>
            <p style={s.sub}>10 questions — your story in your own words. <br/>Personalized income roadmap for Pakistan 2025.</p>
          </div>

          {session ? (
            // LOGGED IN VIEW
            <div style={s.card}>
              <p style={{ fontSize: 14, marginBottom: 8 }}>Welcome, <strong>{session.user.email}</strong></p>
              <button style={{ ...s.btnStart, marginBottom: 16 }} onClick={() => setScreen('quiz')}>
                Start My Assessment →
              </button>
              <button style={{ background: 'transparent', border: '1px solid #ccc', padding: '8px 16px', borderRadius: 8, cursor: 'pointer' }} onClick={handleLogout}>
                Log Out
              </button>

              {/* Past Reports */}
              {pastReports.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <h3 style={{ fontSize: 16, marginBottom: 10 }}>📋 Your Past Reports</h3>
                  {pastReports.map((r, i) => (
                    <div key={i}
                      style={{ borderBottom: '1px solid #f0ede8', padding: '10px 0', fontSize: 14, cursor: 'pointer' }}
                      onClick={() => { console.log(r); setResult(r.report); setScreen('result'); }}
                    >
                      {r.report?.primaryDirection || 'Report'} — {new Date(r.created_at).toLocaleDateString()}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // NOT LOGGED IN – show login/signup form
            <div style={s.card}>
              <h2 style={{ fontSize: 20, marginBottom: 16, textAlign: 'center' }}>
                {authMode === 'login' ? 'Log In' : 'Create Account'}
              </h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: 10, borderRadius: 6, border: '1px solid #ccc' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: 10, borderRadius: 6, border: '1px solid #ccc' }}
              />
              <button style={{ ...s.btnStart, marginBottom: 8 }} onClick={handleAuth}>
                {authMode === 'login' ? 'Log In' : 'Sign Up'}
              </button>
              {authError && <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{authError}</div>}
              <p style={{ fontSize: 13, textAlign: 'center' }}>
                {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); }}
                  style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontWeight: 600 }}
                >
                  {authMode === 'login' ? 'Sign Up' : 'Log In'}
                </button>
              </p>
              <p style={{ fontSize: 11, color: '#888', textAlign: 'center', marginTop: 12 }}>
                Your data is private and secure. We never share your email.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── SCREEN: Quiz ──────────────────────────────────────
  if (screen === 'quiz') {
    return (
      <div style={s.app}>
        <div style={s.wrap}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}><span style={s.badge}>🧭 RaahNuma AI</span></div>
          <div style={s.progRow}><span>Question {cur + 1} of {QUESTIONS.length}</span><span>{pct}%</span></div>
          <div style={s.progTrack}><div style={s.progFill(pct)} /></div>
          <div style={s.card}>
            <div style={s.qLabel}>{q.label}</div>
            <div style={s.qText}>{q.text}</div>
            {q.hint && <div style={s.qHint}>{q.hint}</div>}

            {q.type === 'text' && (
              <textarea
                style={s.textarea}
                placeholder={q.placeholder}
                value={textVal}
                onChange={e => handleTextChange(e.target.value)}
                rows={4}
              />
            )}

            {(q.type === 'multi' || q.type === 'single') && (
              <div style={s.optsGrid(q.two)}>
                {q.options.map(o => {
                  const a = getAns(q.id);
                  const sel = q.type === 'multi' ? a.includes(o.t) : a === o.t;
                  return (
                    <button key={o.t} style={s.opt(sel)}
                      onClick={() => q.type === 'multi' ? toggleMulti(q.id, o.t) : setSingle(q.id, o.t)}>
                      <span style={{ fontSize: 18 }}>{o.i}</span>
                      <span>{o.t}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {error && <div style={s.err}>{error}</div>}

            <div style={s.nav}>
              <button style={{ ...s.btnBack, visibility: cur === 0 ? 'hidden' : 'visible' }} onClick={goPrev}>← Back</button>
              <button style={s.btnNext(isLast)} onClick={goNext}>
                {isLast ? '✨ Get My Direction' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SCREEN: Loading ───────────────────────────────────
  if (screen === 'loading') return (
    <div style={s.app}>
      <div style={{ ...s.wrap, textAlign: 'center', paddingTop: 60 }}>
        <div style={{ width: 52, height: 52, border: '3px solid #e8e4de', borderTopColor: '#c9a84c', borderRadius: '50%', margin: '0 auto 28px', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{ fontFamily: 'Georgia,serif', fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>Analyzing Your Profile...</div>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Reading your story and matching to Pakistan's market</p>
        <div style={{ ...s.card, maxWidth: 340, margin: '0 auto', textAlign: 'left' }}>
          {LOAD_MSGS.map((msg, i) => (
            <div key={i} style={{ padding: '8px 0', fontSize: 13, color: loadStep > i ? (loadStep === i + 1 ? '#c9a84c' : '#2a9d2a') : '#bbb', borderBottom: i < LOAD_MSGS.length - 1 ? '1px solid #f0ede8' : 'none', fontWeight: loadStep === i + 1 ? 600 : 400 }}>
              {loadStep > i + 1 ? '✅' : loadStep === i + 1 ? '⏳' : '○'} {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── SCREEN: Result ────────────────────────────────────
  if (screen === 'result' && result) return (
    <div style={s.app}>
      <div style={s.wrap}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={s.badge}>🧭 RaahNuma AI — Your Report</span>
          <button onClick={handleLogout} style={{ marginLeft: 10, background: 'transparent', border: '1px solid #aaa', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}>Log out</button>
        </div>

        <div style={{ ...s.card, textAlign: 'center', marginBottom: 12 }}>
          <div style={{ background: '#1a1a2e', borderRadius: 12, padding: '20px 24px', marginBottom: 12, display: 'inline-block' }}>
            <div style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(1.4rem,4vw,1.9rem)', fontWeight: 900, color: '#c9a84c', lineHeight: 1.2 }}>{result.primaryDirection}</div>
          </div>
          <p style={{ color: '#666', fontSize: 14 }}>{result.tagline}</p>
        </div>

        <div style={s.sec}><div style={s.secLabel}>🎯 Why This Fits You Specifically</div><div style={s.secText}>{result.whyItFitsYou}</div></div>
        <div style={s.sec}>
          <div style={s.secLabel}>🔥 Hot Niches Right Now</div>
          <div>{result.hotNiches?.map(n => <span key={n.label} style={s.npill(n.hot)}>{n.hot ? '🔥 ' : ''}{n.label}</span>)}</div>
        </div>
        <div style={s.sec}><div style={s.secLabel}>💰 Realistic Income Timeline (PKR + USD)</div>
	<div style={s.sec}>
  <div style={s.secLabel}>💰 Realistic Income Timeline (PKR + USD)</div>
  <div style={s.secText}>
    {(() => {
      const timeline = result.incomeTimeline;
      if (!timeline) return null;
      if (typeof timeline === 'string') return timeline;
      if (typeof timeline === 'object' && !Array.isArray(timeline)) {
        return Object.entries(timeline).map(([key, value]) => (
          <div key={key} style={{ marginBottom: 8 }}>
            <strong>{key}:</strong> {typeof value === 'string' ? value : JSON.stringify(value)}
          </div>
        ));
      }
      // Fallback for array or unexpected type
      return JSON.stringify(timeline);
    })()}
  </div>
</div>
	</div>
        <div style={s.sec}>
          <div style={s.secLabel}>⚡ Your First 3 Steps (Start Tomorrow)</div>
          <ol style={{ listStyle: 'none', counterReset: 's' }}>
            {result.firstThreeSteps?.map((step, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 2 ? '1px solid #f0ede8' : 'none', fontSize: 14, color: '#333', lineHeight: 1.5 }}>
                <span style={{ minWidth: 24, height: 24, background: '#1a1a2e', color: '#c9a84c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div style={s.sec}>
          <div style={s.secLabel}>🛠️ Tools You Need</div>
          <div>
            {result.toolsNeeded?.map((t, i) => {
  const toolName = typeof t === 'string' ? t : t.name || t.tool || JSON.stringify(t);
  return <ToolPill key={toolName + i} tool={toolName} />;
})}
          </div>
        </div>

        <div style={s.hiddenBox}><span>💡</span><span><strong>Hidden Strength:</strong> {result.hiddenStrength}</span></div>
        <div style={s.warnBox}><span>⚠️</span><span><strong>Avoid This:</strong> {result.avoidMistake}</span></div>
        <div style={s.motive}>"{result.motivationalNote}"</div>

        {/* MONETISATION */}
        <PremiumUpsell />

        <button style={s.btnAgain} onClick={restart}>↩ Start Over</button>
      </div>
    </div>
  );

  return null;
}