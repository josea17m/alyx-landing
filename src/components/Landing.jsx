import { useState, useEffect, useRef } from 'react'
import {
  motion, useScroll, useTransform, useMotionValueEvent,
  AnimatePresence, useSpring, useInView
} from 'framer-motion'
import {
  Users, CreditCard, Package, Calendar, BarChart3, UserCheck,
  ArrowRight, Menu, X, Star, RefreshCw, Webhook, Check,
  CheckCircle, Layers, Shield, Zap, Bell, FileSpreadsheet
} from 'lucide-react'

const APP_URL = 'https://damaris-inventory.vercel.app'
const ease = [0.22, 1, 0.36, 1]

// ─── Colors ───────────────────────────────────────────────────────────────────
const C = {
  sky:    { hex: '#0ea5e9', light: '#38bdf8', dark: '#0284c7', soft: 'rgba(14,165,233,0.1)',  border: 'rgba(14,165,233,0.3)'  },
  rose:   { hex: '#f43f5e', light: '#fb7185', dark: '#e11d48', soft: 'rgba(244,63,94,0.1)',   border: 'rgba(244,63,94,0.3)'   },
  amber:  { hex: '#f59e0b', light: '#fbbf24', dark: '#d97706', soft: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)'  },
  purple: { hex: '#a855f7', light: '#c084fc', dark: '#9333ea', soft: 'rgba(168,85,247,0.1)',  border: 'rgba(168,85,247,0.3)'  },
  green:  { hex: '#10b981', light: '#34d399', dark: '#059669', soft: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.3)'  },
  teal:   { hex: '#14b8a6', light: '#2dd4bf', dark: '#0d9488', soft: 'rgba(20,184,166,0.1)',  border: 'rgba(20,184,166,0.3)'  },
}

// ─── SVG Logos ────────────────────────────────────────────────────────────────
function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size * 0.96} viewBox="0 0 48 46" fill="none">
      <path fill="#0ea5e9" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" />
    </svg>
  )
}

function SquareLogo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#006AFF" />
      <rect x="7" y="7" width="10" height="10" rx="1.5" fill="white" />
    </svg>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    let t0 = null
    const animate = (ts) => {
      if (!t0) t0 = ts
      const p = Math.min(1, (ts - t0) / 2000)
      setCount(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, target])
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

// ─── Scroll progress bar ──────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return (
    <motion.div style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg,#0ea5e9,#a855f7,#f43f5e,#f59e0b,#0ea5e9)', backgroundSize: '300%' }}
    />
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#020b18]/90 backdrop-blur-2xl border-b border-white/[0.06]' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <motion.div whileHover={{ rotate: -6, scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Logo size={26} />
          </motion.div>
          <span className="font-bold text-[17px] text-white tracking-tight">alyxCLI</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {['Features', 'Square', 'Pricing'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-sm font-medium text-white/45 hover:text-white transition-colors">{l}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={APP_URL} className="text-sm font-medium text-white/45 hover:text-white transition-colors">Sign in</a>
          <motion.a href={APP_URL} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="text-sm font-semibold bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-lg transition-colors"
            style={{ boxShadow: '0 0 20px rgba(14,165,233,0.35)' }}>
            Get started
          </motion.a>
        </div>

        <button onClick={() => setOpen(o => !o)} className="md:hidden text-white/50 hover:text-white p-2">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-[#020b18]/95 backdrop-blur-2xl border-b border-white/[0.06] px-5 py-5 flex flex-col gap-4">
            {['Features', 'Square', 'Pricing'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                className="text-sm font-medium text-white/60">{l}</a>
            ))}
            <hr className="border-white/10" />
            <a href={APP_URL} className="bg-[#0ea5e9] text-white font-semibold py-2.5 rounded-xl text-center text-sm">
              Get started free
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const line1 = ['Run', 'your', 'business,']
  const line2 = ['not', 'spreadsheets.']
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
  }
  const word = {
    hidden: { opacity: 0, y: 48, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease } }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020b18] px-5 pt-24 pb-16">
      {/* Colorful animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-[5%] w-[700px] h-[700px] rounded-full bg-[#0ea5e9] opacity-[0.12] blur-[130px] animate-blob1" />
        <div className="absolute top-[15%] right-[-10%] w-[550px] h-[550px] rounded-full bg-[#a855f7] opacity-[0.09] blur-[110px] animate-blob2" />
        <div className="absolute bottom-[-15%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#f43f5e] opacity-[0.07] blur-[120px] animate-blob3" />
        <div className="absolute top-[40%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#f59e0b] opacity-[0.05] blur-[100px] animate-blob4" />
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 bg-[#0ea5e9]/10 border border-[#0ea5e9]/25 rounded-full px-4 py-1.5 mb-10 backdrop-blur-sm">
          <SquareLogo size={13} />
          <span className="text-xs text-[#7dd3fc] font-medium">Now with Square integration</span>
          <span className="ml-0.5 px-2 py-0.5 bg-[#006AFF]/25 text-[#5ba3ff] text-[10px] font-bold rounded-full">NEW</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={container} initial="hidden" animate="visible"
          className="text-[clamp(3rem,9vw,6rem)] font-black text-white leading-[1.02] tracking-tight mb-2">
          {line1.map((w, i) => (
            <motion.span key={i} variants={word} className="inline-block mr-[0.22em]">{w}</motion.span>
          ))}
          <br />
          <span className="inline-flex flex-wrap justify-center gap-[0.22em] mt-1">
            {line2.map((w, i) => (
              <motion.span key={i} variants={word} className={`inline-block ${i === 1 ? 'gradient-text' : ''}`}>
                {w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease }}
          className="text-[clamp(1rem,2.5vw,1.2rem)] text-white/40 max-w-[520px] mx-auto mt-7 mb-10 leading-relaxed">
          Clients, payments, inventory and schedule in one dashboard.
          Square syncs automatically — no reconciliation, ever.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a href={APP_URL} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold px-8 py-3.5 rounded-xl text-[15px] transition-colors"
            style={{ boxShadow: '0 0 40px rgba(14,165,233,0.45)' }}>
            Start for free <ArrowRight size={16} />
          </motion.a>
          <motion.a href="#features" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-semibold px-8 py-3.5 rounded-xl text-[15px] transition-all backdrop-blur-sm">
            See features
          </motion.a>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="mt-5 text-xs text-white/25">
          Free plan available · No credit card · Powered by Stripe
        </motion.p>
      </div>

      {/* Dashboard mockup */}
      <motion.div
        initial={{ opacity: 0, y: 90, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.5, delay: 1.0, ease }}
        className="relative max-w-5xl w-full mx-auto mt-20 animate-float z-10"
        style={{ perspective: 1400 }}>
        <div className="rounded-2xl border border-white/[0.08] bg-[#060f1e] overflow-hidden"
          style={{ boxShadow: '0 50px 120px rgba(14,165,233,0.15), 0 20px 40px rgba(0,0,0,0.7)' }}>
          {/* Browser bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.03] border-b border-white/[0.05]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <div className="ml-4 flex-1 max-w-xs bg-white/[0.06] rounded-md px-3 py-1 text-[11px] text-white/25">
              damaris-inventory.vercel.app
            </div>
          </div>
          <div className="grid grid-cols-12 min-h-[320px]">
            {/* Sidebar */}
            <div className="col-span-2 bg-[#040d1a] border-r border-white/[0.05] p-3 hidden sm:flex flex-col gap-0.5">
              <div className="flex items-center gap-2 px-2 py-2.5 mb-3">
                <Logo size={16} />
                <span className="text-[10px] font-bold text-white/60">alyx</span>
              </div>
              {[['Dashboard', true], ['Clients', false], ['Inventory', false], ['Schedule', false], ['Settings', false]].map(([item, active]) => (
                <div key={item} className={`px-2.5 py-2 rounded-lg text-[11px] font-medium ${active ? 'bg-[#0ea5e9]/20 text-[#7dd3fc]' : 'text-white/25'}`}>
                  {item}
                </div>
              ))}
            </div>
            {/* Content */}
            <div className="col-span-12 sm:col-span-10 p-5 bg-[#060f1e]">
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-4">Overview · April 2026</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
                {[
                  { l: 'Clients',   v: '148',   c: '#38bdf8', bg: 'rgba(14,165,233,0.12)' },
                  { l: 'Collected', v: '$4,320', c: '#34d399', bg: 'rgba(52,211,153,0.12)' },
                  { l: 'Items',     v: '63',     c: '#c084fc', bg: 'rgba(168,85,247,0.12)' },
                  { l: 'Events',    v: '12',     c: '#fbbf24', bg: 'rgba(245,158,11,0.12)'  },
                ].map(({ l, v, c, bg }) => (
                  <div key={l} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3">
                    <p className="text-xl font-black" style={{ color: c }}>{v}</p>
                    <p className="text-[10px] text-white/25 mt-0.5">{l}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/[0.05]">
                  <p className="text-[11px] font-semibold text-white/40">Recent payments</p>
                  <div className="flex items-center gap-1.5 bg-[#006AFF]/12 border border-[#006AFF]/20 rounded-full px-2 py-0.5">
                    <SquareLogo size={9} />
                    <span className="text-[9px] text-[#5ba3ff] font-bold">Square synced</span>
                  </div>
                </div>
                {[
                  { n: 'Maria Torres',  a: '$120', paid: true,  sq: true  },
                  { n: 'Carlos Mendez', a: '$95',  paid: true,  sq: true  },
                  { n: 'Ana Reyes',     a: '$200', paid: false, sq: false },
                ].map(({ n, a, paid, sq }) => (
                  <div key={n} className="flex items-center gap-3 px-3.5 py-2 border-b border-white/[0.04] last:border-0">
                    <div className="w-6 h-6 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center text-[9px] font-bold text-[#7dd3fc] shrink-0">{n[0]}</div>
                    <span className="text-[11px] text-white/50 flex-1">{n}</span>
                    {sq && <SquareLogo size={10} />}
                    <span className="text-[11px] text-white/35">{a}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${paid ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'}`}>
                      {paid ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-[#0ea5e9] opacity-[0.15] blur-3xl rounded-full pointer-events-none" />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
        <span className="text-[10px] text-white/20 tracking-widest uppercase">scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#0ea5e9]/40 to-transparent animate-bounce-down" />
      </motion.div>
    </section>
  )
}

// ─── Feature Bento ────────────────────────────────────────────────────────────
function ClientMini() {
  return (
    <div className="mt-5 space-y-2">
      {[['Maria T.', '$120', true], ['Carlos M.', '$95', true], ['Ana R.', '$200', false]].map(([n, a, paid]) => (
        <div key={n} className="flex items-center gap-2.5 bg-white/[0.04] rounded-lg px-3 py-2">
          <div className="w-6 h-6 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center text-[9px] font-bold text-[#7dd3fc]">{n[0]}</div>
          <span className="text-xs text-white/60 flex-1">{n}</span>
          <span className="text-xs text-white/30">{a}</span>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${paid ? 'bg-emerald-400/12 text-emerald-400' : 'bg-amber-400/12 text-amber-400'}`}>
            {paid ? 'Paid' : 'Due'}
          </span>
        </div>
      ))}
    </div>
  )
}

function InventoryMini() {
  const colors = ['#0ea5e9', '#a855f7', '#f43f5e']
  return (
    <div className="mt-5 space-y-3">
      {[['Tables', 24, 30], ['Chairs', 38, 50], ['Linens', 40, 40]].map(([name, stock, max], i) => (
        <div key={name}>
          <div className="flex justify-between text-[10px] text-white/35 mb-1">
            <span>{name}</span><span>{stock}/{max}</span>
          </div>
          <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: colors[i] }}
              initial={{ width: 0 }}
              whileInView={{ width: `${(stock / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 + i * 0.1, ease }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function CalendarMini() {
  return (
    <div className="mt-5">
      <div className="grid grid-cols-7 gap-1">
        {['Mo','Tu','We','Th','Fr','Sa','Su'].map(d => (
          <p key={d} className="text-[9px] text-white/25 text-center">{d}</p>
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const day = i - 3
          const events = [5, 8, 12, 14, 19, 22, 26]
          const colors = { 5: '#0ea5e9', 8: '#a855f7', 12: '#f43f5e', 14: '#f59e0b', 19: '#10b981', 22: '#0ea5e9', 26: '#a855f7' }
          const hasEvent = events.includes(day)
          const isToday = day === 11
          return (
            <div key={i} className={`aspect-square rounded-md flex items-center justify-center text-[9px] font-medium
              ${day < 1 || day > 30 ? 'opacity-0' : ''}
              ${isToday ? 'text-white' : hasEvent ? 'text-white/70' : 'text-white/20'}`}
              style={isToday ? { background: '#0ea5e9' } : hasEvent ? { background: `${colors[day]}25`, border: `1px solid ${colors[day]}40` } : {}}>
              {day > 0 && day <= 30 ? day : ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SquareMini() {
  return (
    <div className="mt-5 space-y-3">
      <div className="flex items-center gap-3 bg-[#006AFF]/10 border border-[#006AFF]/20 rounded-xl p-3">
        <SquareLogo size={24} />
        <div>
          <p className="text-xs font-semibold text-white/80">Square connected</p>
          <p className="text-[10px] text-white/35">Merchant: josea17m</p>
        </div>
        <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
      </div>
      <div className="flex items-center gap-2 text-[10px] text-white/40">
        <RefreshCw size={10} className="text-[#5ba3ff]" />
        Last synced: just now · 3 payments matched
      </div>
    </div>
  )
}

function FeatureBento() {
  const cards = [
    {
      span: 'md:col-span-8', icon: Users, color: C.sky,
      title: 'Client Management',
      desc: 'Full directory with payment history, billing day, contact info, and one-click reminders via WhatsApp, SMS, or email.',
      mini: <ClientMini />,
    },
    {
      span: 'md:col-span-4', icon: Package, color: C.purple,
      title: 'Inventory',
      desc: 'Track stock, assign items to events, and see real-time availability across your catalog.',
      mini: <InventoryMini />,
    },
    {
      span: 'md:col-span-4', icon: Calendar, color: C.amber,
      title: 'Schedule',
      desc: 'Book appointments, rentals and visits. Recurring events, availability checks — visual calendar included.',
      mini: <CalendarMini />,
    },
    {
      span: 'md:col-span-8', icon: Zap, color: C.green,
      title: 'Square Auto-Sync',
      desc: 'Connect Square once. Every payment is automatically reflected — zero manual entry.',
      mini: <SquareMini />,
    },
  ]

  return (
    <section id="features" className="py-28 px-5 bg-[#020b18] relative">
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
          className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-white/30 uppercase mb-4">What's inside</span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-tight">
            Everything your<br />business needs.
          </h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-4">
          {cards.map(({ span, icon: Icon, color, title, desc, mini }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className={`col-span-12 ${span} card-glow rounded-2xl p-6 relative overflow-hidden group cursor-default transition-all duration-300`}>
              <div className="absolute inset-0 shimmer-line opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: color.hex }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: color.soft, border: `1px solid ${color.border}` }}>
                <Icon size={20} style={{ color: color.hex }} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              {mini}
            </motion.div>
          ))}
        </div>

        {/* Extra mini features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { icon: UserCheck, label: 'Team & Roles',     desc: '4 role levels',          color: C.sky    },
            { icon: Bell,      label: 'Smart Reminders',  desc: 'WhatsApp · SMS · Email',  color: C.rose   },
            { icon: FileSpreadsheet, label: 'Excel Import', desc: 'Bulk client upload',    color: C.amber  },
            { icon: Shield,    label: 'Secure Backups',   desc: 'Automatic daily',         color: C.green  },
          ].map(({ icon: Icon, label, desc, color }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease }}
              className="card-glow rounded-xl p-4 flex flex-col gap-2 group cursor-default">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: color.soft, border: `1px solid ${color.border}` }}>
                <Icon size={15} style={{ color: color.hex }} />
              </div>
              <p className="text-sm font-semibold text-white/70">{label}</p>
              <p className="text-xs text-white/30">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Square Sticky Section ────────────────────────────────────────────────────
const SQUARE_STEPS = [
  {
    num: '01', badge: 'Connect',
    title: 'One click to connect Square.',
    desc: 'Link your Square account in seconds with secure OAuth. No API keys, no developer setup. Just click and authorize.',
    bullets: ['Works with sandbox & production', 'No API keys to manage', 'Revoke access anytime'],
    color: '#0ea5e9',
    visual: (
      <div className="space-y-4">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
          <p className="text-xs text-white/40 mb-4">Settings → Integrations</p>
          <div className="flex items-center gap-4 p-4 bg-[#006AFF]/10 border border-[#006AFF]/25 rounded-xl">
            <SquareLogo size={36} />
            <div>
              <p className="font-semibold text-white">Connect Square</p>
              <p className="text-xs text-white/40">Auto-sync payments with your clients</p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="ml-auto bg-[#006AFF] text-white text-xs font-bold px-4 py-2 rounded-lg">
              Connect
            </motion.button>
          </div>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4">
          <p className="text-xs text-white/30 mb-3">Scopes requested</p>
          <div className="space-y-2">
            {['PAYMENTS_READ', 'CUSTOMERS_READ', 'MERCHANT_PROFILE_READ'].map(s => (
              <div key={s} className="flex items-center gap-2">
                <Check size={12} className="text-emerald-400" />
                <span className="text-xs text-white/50 font-mono">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    num: '02', badge: 'Payment received',
    title: 'Client pays through Square.',
    desc: 'Your client pays using Square — in-person, online, or via invoice. alyxCLI listens in real-time via webhooks.',
    bullets: ['In-person & online payments', 'Real-time webhook events', 'All Square payment types'],
    color: '#a855f7',
    visual: (
      <div className="space-y-3">
        <div className="bg-[#006AFF]/10 border border-[#006AFF]/25 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <SquareLogo size={28} />
            <div className="flex-1">
              <p className="text-xs text-[#5ba3ff] font-semibold mb-1">payment.completed</p>
              <p className="text-sm font-bold text-white">Maria Torres · $120.00</p>
              <p className="text-xs text-white/40 mt-0.5">April 11, 2026 · 2:34 PM</p>
            </div>
            <span className="text-[10px] bg-emerald-400/15 text-emerald-400 font-bold px-2 py-0.5 rounded-full">COMPLETED</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl">
          <Webhook size={14} className="text-[#a855f7]" />
          <span className="text-xs text-white/50">Webhook received by alyxCLI backend</span>
          <span className="ml-auto text-[10px] text-emerald-400">200 OK</span>
        </div>
      </div>
    )
  },
  {
    num: '03', badge: 'Auto-matched',
    title: 'Matched to your client instantly.',
    desc: 'alyxCLI matches the Square payment to the right client — by Square customer ID or by amount within the billing month.',
    bullets: ['Matches by customer ID or amount', 'No duplicate payments', 'Works across 60 days'],
    color: '#f43f5e',
    visual: (
      <div className="space-y-3">
        {[
          { n: 'Maria Torres',  a: '$120', matched: true,  method: 'Customer ID'  },
          { n: 'Carlos Mendez', a: '$95',  matched: true,  method: 'Amount match' },
          { n: 'Ana Reyes',     a: '$200', matched: false, method: null           },
        ].map(({ n, a, matched, method }) => (
          <div key={n} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${matched ? 'bg-emerald-400/[0.06] border-emerald-400/20' : 'bg-white/[0.04] border-white/[0.06]'}`}>
            <div className="w-8 h-8 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center text-[11px] font-bold text-[#7dd3fc]">{n[0]}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white/80">{n}</p>
              {method && <p className="text-[10px] text-white/35">via {method}</p>}
            </div>
            <span className="text-sm text-white/40">{a}</span>
            {matched ? <CheckCircle size={15} className="text-emerald-400 shrink-0" /> : <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />}
          </div>
        ))}
      </div>
    )
  },
  {
    num: '04', badge: 'Done',
    title: 'Dashboard updated. Reminder skipped.',
    desc: 'Payment marked. Reminder suppressed automatically. Your team sees the update in real-time from anywhere.',
    bullets: ['No duplicate reminders', 'Team sees update instantly', 'Full audit trail'],
    color: '#10b981',
    visual: (
      <div className="space-y-3">
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]">
            <p className="text-xs font-semibold text-white/40">April 2026</p>
            <div className="text-[10px] text-emerald-400 font-semibold">$3,840 collected</div>
          </div>
          {[{ n: 'Maria Torres', a: '$120', sq: true }, { n: 'Carlos Mendez', a: '$95', sq: true }].map(({ n, a, sq }) => (
            <div key={n} className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.04]">
              <div className="w-6 h-6 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center text-[9px] text-[#7dd3fc]">{n[0]}</div>
              <span className="text-xs text-white/60 flex-1">{n}</span>
              {sq && <SquareLogo size={11} />}
              <span className="text-xs text-white/35">{a}</span>
              <span className="text-[9px] bg-emerald-400/10 text-emerald-400 font-bold px-1.5 py-0.5 rounded-full">Paid</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 px-4 py-3 bg-amber-400/[0.06] border border-amber-400/15 rounded-xl">
          <Bell size={14} className="text-amber-400/60 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-white/60">Reminder skipped</p>
            <p className="text-[10px] text-white/30">Maria already paid via Square</p>
          </div>
          <span className="ml-auto text-[9px] text-amber-400/60 bg-amber-400/10 px-1.5 py-0.5 rounded-full">AUTO</span>
        </div>
      </div>
    )
  },
]

function SquareSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [activeStep, setActiveStep] = useState(0)

  // Snap steps at even quarter-points — each step occupies exactly 25% of scroll
  useMotionValueEvent(scrollYProgress, 'change', v => {
    const next = Math.min(SQUARE_STEPS.length - 1, Math.floor(v * SQUARE_STEPS.length))
    setActiveStep(next)
  })

  const step = SQUARE_STEPS[activeStep]

  // ── Mobile: just stacked cards, no sticky ─────────────────────────
  const MobileLayout = () => (
    <section id="square" className="py-20 px-5 bg-[#00071a]">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-2.5 mb-10">
          <SquareLogo size={18} />
          <span className="text-sm font-semibold text-[#5ba3ff]">Square Integration</span>
        </div>
        <div className="space-y-6">
          {SQUARE_STEPS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-[10px] font-bold text-white/25 font-mono">{s.num}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full border"
                  style={{ color: s.color, background: `${s.color}18`, borderColor: `${s.color}40` }}>
                  {s.badge}
                </span>
              </div>
              <h3 className="text-xl font-black text-white mb-2">{s.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-2">
                {s.bullets.map(b => (
                  <li key={b} className="flex items-center gap-2 text-white/55 text-sm">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${s.color}25`, border: `1px solid ${s.color}40` }}>
                      <Check size={9} style={{ color: s.color }} />
                    </div>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.a href={APP_URL} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="inline-flex items-center gap-2 mt-8 text-white font-semibold px-6 py-3 rounded-xl text-sm"
          style={{ background: '#006AFF', boxShadow: '0 0 24px rgba(0,106,255,0.35)' }}>
          <SquareLogo size={16} />Connect Square free<ArrowRight size={15} />
        </motion.a>
      </div>
    </section>
  )

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden"><MobileLayout /></div>

      {/* Desktop sticky — 260vh = 160vh scrollable / 4 steps = 40vh per step */}
      <section ref={containerRef} style={{ height: '260vh' }} className="relative hidden md:block">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#00071a]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#006AFF] opacity-[0.07] blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[100px] transition-all duration-500"
              style={{ background: step.color }} />
          </div>

          <div className="relative max-w-6xl mx-auto h-full flex flex-col justify-center px-5 py-16">
            <div className="flex items-center gap-2.5 mb-10">
              <SquareLogo size={18} />
              <span className="text-sm font-semibold text-[#5ba3ff]">Square Integration</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left */}
              <div>
                {/* Step pills */}
                <div className="flex items-center gap-2 mb-8">
                  {SQUARE_STEPS.map((s, i) => (
                    <div key={i} className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: i === activeStep ? '2rem' : '0.75rem',
                        background: i === activeStep ? s.color : i < activeStep ? `${s.color}60` : 'rgba(255,255,255,0.1)'
                      }} />
                  ))}
                </div>

                <AnimatePresence mode="popLayout">
                  <motion.div key={activeStep}
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}>
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="text-xs font-bold text-white/25 font-mono">{step.num}</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                        style={{ color: step.color, background: `${step.color}18`, borderColor: `${step.color}40` }}>
                        {step.badge}
                      </span>
                    </div>
                    <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black text-white leading-tight mb-4">
                      {step.title}
                    </h2>
                    <p className="text-white/45 text-base leading-relaxed mb-6">{step.desc}</p>
                    <ul className="space-y-2.5">
                      {step.bullets.map(b => (
                        <li key={b} className="flex items-center gap-3 text-white/60 text-sm">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: `${step.color}25`, border: `1px solid ${step.color}40` }}>
                            <Check size={10} style={{ color: step.color }} />
                          </div>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>

                <motion.a href={APP_URL} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 mt-8 text-white font-semibold px-6 py-3 rounded-xl text-sm"
                  style={{ background: '#006AFF', boxShadow: '0 0 30px rgba(0,106,255,0.35)' }}>
                  <SquareLogo size={16} />Connect Square free<ArrowRight size={15} />
                </motion.a>
              </div>

              {/* Right */}
              <AnimatePresence mode="popLayout">
                <motion.div key={activeStep}
                  initial={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}>
                  {step.visual}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
const ADD_ONS = [
  { key: 'inventory', icon: Package,         label: 'Inventory',       desc: 'Items, stock & categories',      price: 12, color: C.purple },
  { key: 'schedule',  icon: Calendar,        label: 'Schedule',        desc: 'Appointments, visits & rentals', price: 12, color: C.amber  },
  { key: 'advanced',  icon: FileSpreadsheet, label: 'Advanced Fields', desc: 'Policies, renewals & lead status', price: 6, color: C.teal  },
]

function Pricing() {
  const [selected, setSelected] = useState({ inventory: false, schedule: false, advanced: false })
  const total = 19 + ADD_ONS.reduce((s, a) => s + (selected[a.key] ? a.price : 0), 0)
  const toggle = key => setSelected(s => ({ ...s, [key]: !s[key] }))

  return (
    <section id="pricing" className="py-28 px-5 bg-[#fafaf9] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
          className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-slate-400 uppercase mb-4">Pricing</span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-slate-900 leading-tight">
            Pay only for what you use.
          </h2>
          <p className="text-slate-500 text-lg mt-3">Start with the base and add modules as your business grows.</p>
        </motion.div>

        <div className="grid lg:grid-cols-[240px,1fr] gap-5 lg:max-w-[800px] lg:mx-auto">
          {/* Free */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col lg:sticky lg:top-24 self-start shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Free</p>
            <p className="text-4xl font-black text-slate-900 leading-none mb-1">$0</p>
            <p className="text-sm text-slate-400 mb-6">Forever free</p>
            <ul className="space-y-2.5 mb-6 flex-1">
              {['Up to 20 clients', 'Basic dashboard', 'Team with roles', 'Auto backups'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={13} className="text-slate-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <motion.a href={APP_URL} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="block text-center text-sm font-semibold border border-slate-200 rounded-xl py-2.5 text-slate-700 hover:bg-slate-50 transition-colors">
              Get started free
            </motion.a>
          </motion.div>

          {/* Modular */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
            style={{ border: '2px solid #0ea5e9', boxShadow: '0 0 40px rgba(14,165,233,0.12)' }}>
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Layers size={15} className="text-[#0ea5e9]" />
                    <p className="font-bold text-slate-900">Base plan</p>
                    <span className="text-[10px] bg-[#0ea5e9]/10 text-[#0ea5e9] font-bold px-2 py-0.5 rounded-full">Required</span>
                  </div>
                  <p className="text-sm text-slate-500">Unlimited clients, payments, dashboard & roles</p>
                </div>
                <p className="text-2xl font-black text-slate-900 shrink-0">$19<span className="text-sm font-normal text-slate-400">/mo</span></p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-y-2">
                {['Unlimited clients', 'Payment tracking', 'Dashboard & reports', 'Multi-user roles', 'Auto backups', 'Square sync'].map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-slate-600">
                    <CheckCircle size={11} className="text-[#0ea5e9] shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Add-on modules</p>
              <div className="space-y-2.5">
                {ADD_ONS.map(({ key, icon: Icon, label, desc, price, color }) => (
                  <motion.button key={key} onClick={() => toggle(key)} whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-200"
                    style={{ border: `2px solid ${selected[key] ? color.border : '#e2e8f0'}`, background: selected[key] ? color.soft : 'white' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                      style={{ background: selected[key] ? color.soft : '#f8fafc', border: `1px solid ${selected[key] ? color.border : '#e2e8f0'}` }}>
                      <Icon size={17} style={{ color: selected[key] ? color.hex : '#94a3b8' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${selected[key] ? 'text-slate-900' : 'text-slate-600'}`}>{label}</p>
                      <p className="text-xs text-slate-400 truncate">{desc}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-600 shrink-0">+${price}/mo</p>
                    <motion.div animate={{ scale: selected[key] ? 1 : 0.9 }}
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors"
                      style={{ background: selected[key] ? color.hex : 'transparent', border: `2px solid ${selected[key] ? color.hex : '#cbd5e1'}` }}>
                      {selected[key] && <Check size={10} className="text-white" />}
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-50/80">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-slate-700">Your total</p>
                <div className="text-right">
                  <motion.p key={total} initial={{ scale: 0.85 }} animate={{ scale: 1 }}
                    className="text-3xl font-black text-slate-900">
                    ${total}<span className="text-base font-normal text-slate-400">/mo</span>
                  </motion.p>
                  <p className="text-xs text-slate-400">cancel anytime</p>
                </div>
              </div>
              <motion.a href={APP_URL} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="block text-center text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #a855f7)', boxShadow: '0 4px 20px rgba(14,165,233,0.3)' }}>
                Get started — ${total}/mo
              </motion.a>
              <p className="text-center text-xs text-slate-400 mt-3">No setup fee · Secure checkout via Stripe</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { target: 500,  suffix: '+',  label: 'Businesses managed', color: C.sky    },
    { target: 2,    suffix: 'M+', label: 'Payments tracked',   color: C.green, prefix: '$' },
    { target: 10,   suffix: 'k+', label: 'Clients on record',  color: C.purple },
    { target: 99.9, suffix: '%',  label: 'Uptime',             color: C.amber  },
  ]

  return (
    <section className="py-24 px-5 bg-[#020b18] relative overflow-hidden border-y border-white/[0.05]">
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map(({ target, suffix, prefix, label, color }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease }}
            className="text-center">
            <p className="text-4xl md:text-5xl font-black tabular-nums" style={{ color: color.hex }}>
              <Counter target={target} suffix={suffix} prefix={prefix ?? ''} />
            </p>
            <p className="text-sm text-white/35 mt-2">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const items = [
    { quote: "I used to spend 2 hours a month reconciling Square with my spreadsheet. Now alyxCLI does it automatically — I don't even think about it.", name: 'Sandra M.', role: 'Event decorator, Miami FL', color: C.sky },
    { quote: "The schedule + inventory combo is a game changer. We know exactly what items are booked and what's available — right from the dashboard.", name: 'Roberto V.', role: 'Party rental, Dallas TX', color: C.purple },
    { quote: "My clients love that I send professional payment reminders. The WhatsApp integration alone is worth the subscription.", name: 'Carmen R.', role: 'Insurance agent, Houston TX', color: C.rose },
  ]

  return (
    <section className="py-24 px-5 bg-[#020b18]">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease }}
          className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-white/25 uppercase mb-4">What people say</span>
          <h2 className="text-3xl font-black text-white">Real businesses, real results.</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map(({ quote, name, role, color }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="card-glow rounded-2xl p-6 cursor-default relative overflow-hidden group">
              {/* Color accent top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${color.hex}, transparent)` }} />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-6">"{quote}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: color.soft, border: `1px solid ${color.border}` }}>
                  {name[0]}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{name}</p>
                  <p className="text-white/30 text-xs">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-32 px-5 relative overflow-hidden bg-[#020b18]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#0ea5e9] opacity-[0.1] blur-[100px]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#a855f7] opacity-[0.07] blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#f43f5e] opacity-[0.06] blur-[80px]" />
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease }}
        className="relative max-w-2xl mx-auto text-center">
        <motion.div whileHover={{ rotate: -8, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}
          className="inline-block mb-8">
          <Logo size={52} />
        </motion.div>
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white leading-[1.05] mb-5">
          Start managing<br />
          <span className="gradient-text">smarter today.</span>
        </h2>
        <p className="text-white/40 text-lg mb-10">Free plan available. Connect Square in minutes.</p>
        <motion.a href={APP_URL} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 text-white font-bold px-9 py-4 rounded-2xl text-lg"
          style={{ background: 'linear-gradient(135deg, #0ea5e9, #a855f7)', boxShadow: '0 0 60px rgba(14,165,233,0.3)' }}>
          Get started free <ArrowRight size={20} />
        </motion.a>
        <p className="mt-5 text-white/20 text-sm">alyxCLI · Built for small businesses in the USA</p>
      </motion.div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#010810] px-5 py-8 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <Logo size={20} />
          <span className="text-white/40 text-sm font-medium">alyxCLI</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-white/20">
          {['Features', 'Square', 'Pricing'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white/50 transition-colors">{l}</a>
          ))}
          <a href={APP_URL} className="hover:text-white/50 transition-colors">Sign in</a>
        </div>
        <p className="text-xs text-white/15">© {new Date().getFullYear()} alyxCLI.</p>
      </div>
    </footer>
  )
}

// ─── Landing ──────────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen bg-[#020b18]">
      <ScrollProgressBar />
      <Navbar />
      <Hero />
      <FeatureBento />
      <SquareSection />
      <Pricing />
      <Stats />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  )
}
