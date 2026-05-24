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
  {
    id: "anything_else",
    label: "Anything Else?",
    text: "Is there anything else you'd like to share that might help us give you better direction?",
    hint: "Optional — but the more you share, the more personalized your report",
    type: "text",
    placeholder: "e.g. I have a disability that limits me, I live in a small city with no opportunities, my family doesn't support me, I've tried X and it didn't work because...",
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
function PremiumUpsell({ answers, result }) {
  const [state, setState] = useState('idle'); // idle | paying | verifying | done
  const [txnId, setTxnId] = useState('');
  const [plan, setPlan] = useState(null);
  const [err, setErr] = useState('');

  async function handlePaySubmit() {
    if (txnId.trim().length < 5) {
      setErr('Sahi Transaction ID daalo!');
      return;
    }
    setErr('');
    setState('verifying');
    try {
      const res = await fetch('/api/extended-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, result, txnId }),
      });
      const data = await res.json();
      setPlan(data.plan);
      setState('done');
    } catch {
      setState('paying');
      setErr('Kuch gadbad ho gayi, dobara try karo!');
    }
  }

  // ── Plan show karo ──
  if (state === 'done' && plan) {
    return (
      <div style={{ ...s.sec, border: '2px solid #c9a84c', background: '#fef9ee', marginTop: 12 }}>
        <div style={s.secLabel}>📅 Tera 30-Day Plan</div>
        {plan.weeks.map((week, wi) => (
          <div key={wi} style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>
              Week {wi + 1}: {week.title}
            </div>
            {week.days.map((day, di) => (
              <div key={di} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px solid #f0ede8', fontSize: 13, color: '#333' }}>
                <span style={{ minWidth: 22, height: 22, background: '#1a1a2e', color: '#c9a84c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                  {day.day}
                </span>
                {day.task}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // ── Payment form ──
  if (state === 'paying') {
    return (
      <div style={{ ...s.sec, border: '2px solid #c9a84c', background: '#fef9ee', marginTop: 12 }}>
        <div style={s.secLabel}>💳 Payment Karo — PKR 299</div>

        {/* Payment details */}
        <div style={{ background: '#fff', border: '1px solid #c9a84c', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#555', marginBottom: 4, fontWeight: 600 }}>EasyPaisa / JazzCash bhejo:</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a1a2e', letterSpacing: 1 }}>0306-0776033</div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Amount: PKR 299 · Name: Syed Hashir Ali</div>
        </div>

        {/* TXN input */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a2e', marginBottom: 8 }}>Transaction ID daalo:</div>
          <input
            type="text"
            placeholder="e.g. TXN1234567890"
            value={txnId}
            onChange={e => { setTxnId(e.target.value); setErr(''); }}
            style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e0dbd4', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', background: '#f8f6f2', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {err && <div style={{ color: 'red', fontSize: 13, marginBottom: 10 }}>{err}</div>}

        <button
          onClick={handlePaySubmit}
          style={{ background: '#c9a84c', color: '#fff', border: 'none', padding: '13px 28px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', width: '100%', fontSize: 15 }}
        >
          Plan Generate Karo →
        </button>

        <button
          onClick={() => setState('idle')}
          style={{ background: 'none', border: 'none', color: '#aaa', fontSize: 13, cursor: 'pointer', marginTop: 10, width: '100%' }}
        >
          ← Wapas jao
        </button>
      </div>
    );
  }

  // ── Verifying ──
  if (state === 'verifying') {
    return (
      <div style={{ ...s.sec, border: '2px solid #c9a84c', background: '#fef9ee', marginTop: 12, textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: 8 }}>⏳</div>
        <div style={{ fontWeight: 700, color: '#1a1a2e' }}>Plan ban raha hai...</div>
        <div style={{ fontSize: 13, color: '#888', marginTop: 6 }}>Bas 10-15 seconds!</div>
      </div>
    );
  }

  // ── Default button ──
  return (
    <div style={{ ...s.sec, border: '2px solid #c9a84c', background: '#fef9ee', marginTop: 12 }}>
      <div style={s.secLabel}>💎 Get the Full 30‑Day Game Plan</div>
      <p style={{ fontSize: 14, color: '#555', margin: '8px 0 14px' }}>
        Step‑by‑step daily blueprint — sirf tere liye banaya jayega. Personalized plan!
      </p>
      <button
        onClick={() => setState('paying')}
        style={{ background: '#c9a84c', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 15 }}
      >
        Get Extended Plan — PKR 299
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
// Gate state
const [gateMode, setGateMode] = useState(null); // null | 'share' | 'pay'
const [adTimer, setAdTimer]   = useState(0);
const [payRef,  setPayRef]    = useState('');
const [payDone, setPayDone]   = useState(false);

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
useEffect(() => {
  if (gateMode === 'share' && adTimer > 0) {
    const t = setTimeout(() => setAdTimer(a => a - 1), 1000);
    return () => clearTimeout(t);
  }
}, [gateMode, adTimer]);

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
    if (q.type === 'text') return q.id === 'anything_else' ? true : typeof a === 'string' && a.trim().length > 10;
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
      setScreen('gate');
      loadPastReports(session.user.id);
    } catch (e) {
      setScreen('quiz');
      setError('Report generation failed. ' + e.message);
    }
  }

  function restart() {
    setCur(0); setAnswers({}); setTextVal(''); setResult(null); setError(''); setScreen('welcome');
  }
function handleShare() {
  setGateMode('share');
  setAdTimer(10);
  const text = `🧭 RaahNuma just gave me my income direction for Pakistan!\n\nGet yours free: https://raah-numa-app.vercel.app`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
}

function handlePaySubmit() {
  if (payRef.trim().length < 5) { setError('Please enter a valid transaction ID.'); return; }
  setPayDone(true);
  setError('');
}

function unlockResult() {
  setScreen('result');
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
// ── SCREEN: Gate ──────────────────────────────────────
if (screen === 'gate') return (
  <div style={s.app}>
    <div style={s.wrap}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span style={s.badge}>🧭 RaahNuma AI</span>
      </div>

      {/* Blurred preview */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <div style={{ filter: 'blur(7px)', pointerEvents: 'none', userSelect: 'none', ...s.card }}>
          <div style={{ background: '#1a1a2e', borderRadius: 12, padding: '16px 20px', marginBottom: 12, textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#c9a84c' }}>{result?.primaryDirection}</div>
          </div>
          <div style={s.sec}><div style={s.secLabel}>🎯 Why This Fits You</div><div style={s.secText}>{result?.whyItFitsYou}</div></div>
          <div style={s.sec}><div style={s.secLabel}>💰 Income Timeline</div><div style={s.secText}>{typeof result?.incomeTimeline === 'string' ? result.incomeTimeline : ''}</div></div>
        </div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(247,245,241,0.75)', borderRadius: 18 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🔒</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e', marginBottom: 4 }}>Your Report is Ready!</div>
          <div style={{ color: '#888', fontSize: 13 }}>Unlock it below — takes 10 seconds</div>
        </div>
      </div>

      {/* Gate options */}
      {!gateMode && (
        <div style={s.card}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e', marginBottom: 4 }}>Choose How to Unlock</div>
            <div style={{ color: '#888', fontSize: 13 }}>One of these two options</div>
          </div>

          {/* Share option */}
          <div
            style={{ background: '#f0f7ff', border: '2px solid #b0d4f5', borderRadius: 14, padding: '20px', marginBottom: 12, cursor: 'pointer' }}
            onClick={handleShare}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 32 }}>📲</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1a2e', marginBottom: 2 }}>Share on WhatsApp — Free</div>
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>Share RaahNuma with your contacts. Unlocks in 10 seconds.</div>
              </div>
            </div>
          </div>

          {/* Pay option */}
          <div
            style={{ background: '#fef9ee', border: '2px solid #c9a84c', borderRadius: 14, padding: '20px', cursor: 'pointer' }}
            onClick={() => setGateMode('pay')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 32 }}>💳</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#8a6200', marginBottom: 2 }}>Pay PKR 100 — Instant Unlock</div>
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>EasyPaisa or JazzCash. Enter your transaction ID.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share countdown */}
      {gateMode === 'share' && (
        <div style={{ ...s.card, textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📲</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e', marginBottom: 8 }}>WhatsApp should have opened!</div>
          <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            {adTimer > 0 ? `Send the message to at least one contact. Unlocking in ${adTimer}s...` : 'Done! Your report is ready.'}
          </p>
          {adTimer > 0 ? (
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f0ede8', border: '3px solid #c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, color: '#c9a84c', margin: '0 auto 16px' }}>
              {adTimer}
            </div>
          ) : (
            <button onClick={unlockResult} style={{ background: '#c9a84c', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 12, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
              🎉 Show My Direction Report →
            </button>
          )}
          <button onClick={handleShare} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: 13, cursor: 'pointer', marginTop: 12 }}>
            Didn't open? Tap to share again
          </button>
        </div>
      )}

      {/* Pay flow */}
      {gateMode === 'pay' && (
        <div style={s.card}>
          {!payDone ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>💳</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e' }}>Send PKR 100</div>
              </div>
              <div style={{ background: '#fef9ee', border: '1px solid #c9a84c', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#555', marginBottom: 6, fontWeight: 600 }}>EasyPaisa / JazzCash:</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', letterSpacing: 1 }}>0306-0776033</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Amount: PKR 100 · Name: RaahNuma</div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a2e', marginBottom: 8 }}>Enter your Transaction ID:</div>
                <input
                  type="text"
                  placeholder="e.g. TXN1234567890"
                  value={payRef}
                  onChange={e => { setPayRef(e.target.value); setError(''); }}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #e0dbd4', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', background: '#f8f6f2', color: '#1a1a2e', outline: 'none' }}
                />
              </div>
              {error && <div style={s.err}>{error}</div>}
              <button onClick={handlePaySubmit} style={{ background: '#c9a84c', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 12, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
                Submit Payment →
              </button>
              <button onClick={() => setGateMode(null)} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: 13, cursor: 'pointer', marginTop: 12, width: '100%', textAlign: 'center' }}>
                ← Go back
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>✅</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e', marginBottom: 8 }}>Payment Submitted!</div>
              <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                We are verifying your PKR 100 payment. Takes just a few minutes.<br /><br />
                <strong>Once verified, tap below to see your report.</strong>
              </p>
              <button onClick={unlockResult} style={{ background: '#1a1a2e', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 12, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
                I've Paid — Show My Report →
              </button>
            </div>
          )}
        </div>
      )}
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
        <PremiumUpsell answers={answers} result={result} />

        <button style={s.btnAgain} onClick={restart}>↩ Start Over</button>
      </div>
    </div>
  );

  return null;
}