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

// ─── SVG Logos ────────────────────────────────────────────────────────────────
function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size * 0.96} viewBox="0 0 48 46" fill="none">
      <path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" />
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
function Counter({ target, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const duration = 2000
    let startTime = null
    const animate = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min(1, (ts - startTime) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(target * eased))
      if (p < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─── Scroll progress bar ──────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return (
    <motion.div
      style={{ scaleX, background: 'linear-gradient(90deg,#863bff,#47bfff,#863bff)', backgroundSize: '200%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
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

  const links = ['Features', 'Square', 'Pricing']

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#06000f]/85 backdrop-blur-2xl border-b border-white/[0.06]' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <motion.div whileHover={{ rotate: -5, scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>
            <Logo size={26} />
          </motion.div>
          <span className="font-bold text-[17px] text-white tracking-tight">alyxCLI</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-sm font-medium text-white/45 hover:text-white transition-colors duration-200">
              {l}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={APP_URL} className="text-sm font-medium text-white/45 hover:text-white transition-colors">Sign in</a>
          <motion.a href={APP_URL} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="text-sm font-semibold bg-white text-[#06000f] hover:bg-white/90 px-4 py-2 rounded-lg transition-colors">
            Get started
          </motion.a>
        </div>

        <button onClick={() => setOpen(o => !o)} className="md:hidden text-white/50 hover:text-white p-2 transition-colors">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-[#06000f]/95 backdrop-blur-2xl border-b border-white/[0.06] px-5 py-5 flex flex-col gap-4">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors">{l}</a>
            ))}
            <hr className="border-white/10" />
            <a href={APP_URL} className="bg-white text-[#06000f] font-semibold py-2.5 rounded-xl text-center text-sm">
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
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
  }
  const wordVariants = {
    hidden: { opacity: 0, y: 48, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease } }
  }

  const line1 = ['Run', 'your', 'business,']
  const line2 = ['not', 'spreadsheets.']

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#06000f] px-5 pt-24 pb-16">
      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-[5%] w-[700px] h-[700px] rounded-full bg-[#863bff] opacity-[0.11] blur-[130px] animate-blob1" />
        <div className="absolute top-[10%] right-[-15%] w-[600px] h-[600px] rounded-full bg-[#47bfff] opacity-[0.07] blur-[110px] animate-blob2" />
        <div className="absolute bottom-[-15%] left-[25%] w-[500px] h-[500px] rounded-full bg-[#c084fc] opacity-[0.06] blur-[120px] animate-blob3" />
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.12] rounded-full px-4 py-1.5 mb-10 backdrop-blur-sm">
          <SquareLogo size={13} />
          <span className="text-xs text-white/60 font-medium">Now with Square integration</span>
          <span className="ml-0.5 px-2 py-0.5 bg-[#006AFF]/25 text-[#5ba3ff] text-[10px] font-bold rounded-full tracking-wide">NEW</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={containerVariants} initial="hidden" animate="visible"
          className="text-[clamp(3rem,9vw,6rem)] font-black text-white leading-[1.02] tracking-tight mb-2">
          {line1.map((w, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.22em] last:mr-0">{w}</motion.span>
          ))}
          <br />
          <span className="inline-flex flex-wrap justify-center gap-[0.22em] mt-1">
            {line2.map((w, i) => (
              <motion.span key={i} variants={wordVariants}
                className={`inline-block ${i === 1 ? 'gradient-text' : ''}`}>
                {w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease }}
          className="text-[clamp(1rem,2.5vw,1.2rem)] text-white/40 max-w-[520px] mx-auto mt-7 mb-10 leading-relaxed">
          Clients, payments, inventory and schedule in one dashboard.
          Square syncs automatically — no reconciliation, ever.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a href={APP_URL} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#863bff] hover:bg-[#7229e8] text-white font-semibold px-8 py-3.5 rounded-xl text-[15px] transition-colors"
            style={{ boxShadow: '0 0 40px rgba(134,59,255,0.45)' }}>
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

        <div className="rounded-2xl border border-white/[0.09] bg-[#0c0818] overflow-hidden"
          style={{ boxShadow: '0 50px 120px rgba(134,59,255,0.18), 0 20px 40px rgba(0,0,0,0.6)' }}>
          {/* Browser bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.03] border-b border-white/[0.05]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <div className="ml-4 flex-1 max-w-xs bg-white/[0.06] rounded-md px-3 py-1 text-[11px] text-white/25">
              damaris-inventory.vercel.app
            </div>
          </div>
          {/* Dashboard */}
          <div className="grid grid-cols-12 min-h-[320px]">
            {/* Sidebar */}
            <div className="col-span-2 bg-[#080514] border-r border-white/[0.05] p-3 hidden sm:flex flex-col gap-0.5">
              <div className="flex items-center gap-2 px-2 py-2.5 mb-3">
                <Logo size={16} />
                <span className="text-[10px] font-bold text-white/60">alyx</span>
              </div>
              {[['Dashboard', true], ['Clients', false], ['Inventory', false], ['Schedule', false], ['Settings', false]].map(([item, active]) => (
                <div key={item} className={`px-2.5 py-2 rounded-lg text-[11px] font-medium ${active ? 'bg-[#863bff]/20 text-[#c899ff]' : 'text-white/25'}`}>
                  {item}
                </div>
              ))}
            </div>
            {/* Content */}
            <div className="col-span-12 sm:col-span-10 p-5 bg-[#0c0818]">
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-4">Overview · April 2026</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
                {[
                  { l: 'Clients', v: '148', c: 'text-[#c084fc]' },
                  { l: 'Collected', v: '$4,320', c: 'text-emerald-400' },
                  { l: 'Items', v: '63', c: 'text-sky-400' },
                  { l: 'Events', v: '12', c: 'text-orange-400' },
                ].map(({ l, v, c }) => (
                  <div key={l} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3">
                    <p className={`text-xl font-black ${c}`}>{v}</p>
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
                  { n: 'Maria Torres', a: '$120', paid: true, sq: true },
                  { n: 'Carlos Mendez', a: '$95', paid: true, sq: true },
                  { n: 'Ana Reyes', a: '$200', paid: false, sq: false },
                ].map(({ n, a, paid, sq }) => (
                  <div key={n} className="flex items-center gap-3 px-3.5 py-2 border-b border-white/[0.04] last:border-0">
                    <div className="w-6 h-6 rounded-full bg-[#863bff]/20 flex items-center justify-center text-[9px] font-bold text-[#c899ff] shrink-0">{n[0]}</div>
                    <span className="text-[11px] text-white/50 flex-1">{n}</span>
                    {sq && <SquareLogo size={10} />}
                    <span className="text-[11px] text-white/35">{a}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${paid ? 'bg-emerald-400/10 text-emerald-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
                      {paid ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Glow under mockup */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-[#863bff] opacity-[0.18] blur-3xl rounded-full pointer-events-none" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
        <span className="text-[10px] text-white/20 tracking-widest uppercase">scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent animate-bounce-down" />
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
          <div className="w-6 h-6 rounded-full bg-[#863bff]/25 flex items-center justify-center text-[9px] font-bold text-[#c899ff]">{n[0]}</div>
          <span className="text-xs text-white/60 flex-1">{n}</span>
          <span className="text-xs text-white/30">{a}</span>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${paid ? 'bg-emerald-400/12 text-emerald-400' : 'bg-yellow-400/12 text-yellow-400'}`}>
            {paid ? 'Paid' : 'Due'}
          </span>
        </div>
      ))}
    </div>
  )
}

function InventoryMini() {
  return (
    <div className="mt-5 space-y-3">
      {[['Tables', 24, 30], ['Chairs', 38, 50], ['Linens', 40, 40]].map(([name, stock, max]) => (
        <div key={name}>
          <div className="flex justify-between text-[10px] text-white/35 mb-1">
            <span>{name}</span>
            <span>{stock}/{max}</span>
          </div>
          <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#863bff] to-[#47bfff] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${(stock / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function CalendarMini() {
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  const data = [0, 1, 2, 0, 1, 1, 0]
  return (
    <div className="mt-5">
      <div className="grid grid-cols-7 gap-1">
        {days.map(d => <p key={d} className="text-[9px] text-white/25 text-center">{d}</p>)}
        {Array.from({ length: 35 }, (_, i) => {
          const day = i - 3
          const hasEvent = [5, 8, 12, 14, 19, 22, 26].includes(day)
          const isToday = day === 11
          return (
            <div key={i} className={`aspect-square rounded-md flex items-center justify-center text-[9px] font-medium
              ${day < 1 || day > 30 ? 'opacity-0' : ''}
              ${isToday ? 'bg-[#863bff] text-white' : hasEvent ? 'bg-white/[0.08] text-white/60' : 'text-white/20'}`}>
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
      span: 'md:col-span-8', icon: Users, color: '#863bff',
      title: 'Client Management',
      desc: 'Full directory with payment history, billing day, contact info, and one-click payment reminders via WhatsApp, SMS, or email.',
      mini: <ClientMini />,
    },
    {
      span: 'md:col-span-4', icon: Package, color: '#47bfff',
      title: 'Inventory',
      desc: 'Track stock, assign items to events, and see real-time availability across your catalog.',
      mini: <InventoryMini />,
    },
    {
      span: 'md:col-span-4', icon: Calendar, color: '#f97316',
      title: 'Schedule',
      desc: 'Book appointments, rentals and visits. Recurring events, availability checks — all in a visual calendar.',
      mini: <CalendarMini />,
    },
    {
      span: 'md:col-span-8', icon: BarChart3, color: '#22c55e',
      title: 'Square Auto-Sync',
      desc: 'Connect Square once. Every payment your clients make is automatically reflected in alyxCLI — zero manual entry.',
      mini: <SquareMini />,
    },
  ]

  return (
    <section id="features" className="py-28 px-5 bg-[#06000f] relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-60" />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-white/30 uppercase mb-4">What's inside</span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-tight">
            Everything your<br />business needs.
          </h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-4">
          {cards.map(({ span, icon: Icon, color, title, desc, mini }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              whileHover={{ y: -4, transition: { duration: 0.3, ease } }}
              className={`col-span-12 ${span} card-glow rounded-2xl p-6 relative overflow-hidden group cursor-default transition-all duration-300`}>
              {/* Shimmer on hover */}
              <div className="absolute inset-0 shimmer-line opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Icon glow */}
              <div className="absolute top-4 right-4 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                style={{ background: color }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 relative"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon size={20} style={{ color }} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              {mini}
            </motion.div>
          ))}
        </div>

        {/* Additional features row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { icon: UserCheck, label: 'Team & Roles', desc: '4 role levels' },
            { icon: Bell, label: 'Smart Reminders', desc: 'WhatsApp · SMS · Email' },
            { icon: FileSpreadsheet, label: 'Excel Import', desc: 'Bulk client upload' },
            { icon: Shield, label: 'Secure Backups', desc: 'Automatic daily' },
          ].map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease }}
              className="card-glow rounded-xl p-4 flex flex-col gap-2">
              <Icon size={16} className="text-white/40" />
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
    desc: 'Link your Square account in seconds using secure OAuth. No API keys, no developer setup. Just click "Connect Square" and authorize.',
    bullets: ['Works with sandbox & production', 'No API keys to manage', 'Revoke access anytime'],
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
          <p className="text-xs text-white/30 mb-3">Square authorization</p>
          <div className="space-y-2">
            {['PAYMENTS_READ', 'CUSTOMERS_READ', 'MERCHANT_PROFILE_READ'].map(scope => (
              <div key={scope} className="flex items-center gap-2">
                <Check size={12} className="text-emerald-400" />
                <span className="text-xs text-white/50 font-mono">{scope}</span>
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
    desc: 'Your client pays you using Square — in-person, online, or via invoice. alyxCLI listens in real-time via webhooks.',
    bullets: ['In-person & online payments', 'Real-time webhook events', 'All Square payment types'],
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
          <Webhook size={14} className="text-[#863bff]" />
          <span className="text-xs text-white/50">Webhook received by alyxCLI backend</span>
          <span className="ml-auto text-[10px] text-emerald-400">200 OK</span>
        </div>
      </div>
    )
  },
  {
    num: '03', badge: 'Auto-matched',
    title: 'Matched to your client instantly.',
    desc: 'alyxCLI matches the Square payment to the right client — by Square customer ID or by amount within the billing month. No manual lookup.',
    bullets: ['Matches by customer ID or amount', 'No duplicate payment marking', 'Works across 60 days of history'],
    visual: (
      <div className="space-y-3">
        {[
          { n: 'Maria Torres', a: '$120', matched: true, method: 'Customer ID' },
          { n: 'Carlos Mendez', a: '$95', matched: true, method: 'Amount match' },
          { n: 'Ana Reyes', a: '$200', matched: false, method: null },
        ].map(({ n, a, matched, method }) => (
          <div key={n} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${matched ? 'bg-emerald-400/[0.06] border-emerald-400/20' : 'bg-white/[0.04] border-white/[0.06]'}`}>
            <div className="w-8 h-8 rounded-full bg-[#863bff]/20 flex items-center justify-center text-[11px] font-bold text-[#c899ff]">{n[0]}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white/80">{n}</p>
              {method && <p className="text-[10px] text-white/35">via {method}</p>}
            </div>
            <span className="text-sm text-white/40">{a}</span>
            {matched
              ? <CheckCircle size={15} className="text-emerald-400 shrink-0" />
              : <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />}
          </div>
        ))}
      </div>
    )
  },
  {
    num: '04', badge: 'Done',
    title: 'Dashboard updated. Reminder skipped.',
    desc: 'The payment is marked. Reminder suppressed automatically. Your team sees the update in real-time — even if they\'re in a different time zone.',
    bullets: ['No duplicate reminders sent', 'Team sees update instantly', 'Full audit trail'],
    visual: (
      <div className="space-y-3">
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]">
            <p className="text-xs font-semibold text-white/40">April 2026</p>
            <div className="text-[10px] text-emerald-400 font-semibold">$3,840 collected</div>
          </div>
          {[
            { n: 'Maria Torres', a: '$120', sq: true },
            { n: 'Carlos Mendez', a: '$95', sq: true },
          ].map(({ n, a, sq }) => (
            <div key={n} className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.04]">
              <div className="w-6 h-6 rounded-full bg-[#863bff]/20 flex items-center justify-center text-[9px] text-[#c899ff]">{n[0]}</div>
              <span className="text-xs text-white/60 flex-1">{n}</span>
              {sq && <SquareLogo size={11} />}
              <span className="text-xs text-white/35">{a}</span>
              <span className="text-[9px] bg-emerald-400/10 text-emerald-400 font-bold px-1.5 py-0.5 rounded-full">Paid</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 px-4 py-3 bg-yellow-400/[0.06] border border-yellow-400/15 rounded-xl">
          <Bell size={14} className="text-yellow-400/60 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-white/60">Reminder skipped</p>
            <p className="text-[10px] text-white/30">Maria already paid via Square</p>
          </div>
          <span className="ml-auto text-[9px] text-yellow-400/60 bg-yellow-400/10 px-1.5 py-0.5 rounded-full">AUTO</span>
        </div>
      </div>
    )
  },
]

function SquareSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [activeStep, setActiveStep] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', v => {
    setActiveStep(Math.min(SQUARE_STEPS.length - 1, Math.floor(v * SQUARE_STEPS.length)))
  })

  const step = SQUARE_STEPS[activeStep]

  return (
    <section id="square" ref={containerRef}
      style={{ height: `${(SQUARE_STEPS.length + 1) * 100}vh` }}
      className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#00071a]">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#006AFF] opacity-[0.07] blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#863bff] opacity-[0.06] blur-[100px]" />
        </div>

        <div className="relative max-w-6xl mx-auto h-full flex flex-col justify-center px-5 py-20">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2.5 mb-12">
            <SquareLogo size={18} />
            <span className="text-sm font-semibold text-[#5ba3ff]">Square Integration</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div>
              {/* Step counter */}
              <div className="flex items-center gap-3 mb-6">
                {SQUARE_STEPS.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === activeStep ? 'bg-[#006AFF] w-8' : i < activeStep ? 'bg-[#006AFF]/40 w-4' : 'bg-white/10 w-4'}`} />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={activeStep}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease }}>
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="text-xs font-bold text-[#5ba3ff]/60 font-mono">{step.num}</span>
                    <span className="text-xs font-semibold text-[#5ba3ff] bg-[#006AFF]/15 border border-[#006AFF]/20 px-2.5 py-1 rounded-full">{step.badge}</span>
                  </div>
                  <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-white leading-tight mb-5">
                    {step.title}
                  </h2>
                  <p className="text-white/45 text-lg leading-relaxed mb-7">
                    {step.desc}
                  </p>
                  <ul className="space-y-3">
                    {step.bullets.map(b => (
                      <li key={b} className="flex items-center gap-3 text-white/60 text-sm">
                        <div className="w-5 h-5 rounded-full bg-[#006AFF]/20 flex items-center justify-center shrink-0">
                          <Check size={11} className="text-[#5ba3ff]" />
                        </div>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <motion.a href={APP_URL} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 mt-10 bg-[#006AFF] hover:bg-[#0052cc] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                <SquareLogo size={16} />
                Connect Square free
                <ArrowRight size={15} />
              </motion.a>
            </div>

            {/* Right — visual */}
            <AnimatePresence mode="wait">
              <motion.div key={activeStep}
                initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease }}>
                {step.visual}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
const ADD_ONS = [
  { key: 'inventory', icon: Package, label: 'Inventory', desc: 'Items, stock & categories', price: 12, color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.3)' },
  { key: 'schedule', icon: Calendar, label: 'Schedule', desc: 'Appointments, visits & rentals', price: 12, color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.3)' },
  { key: 'advanced', icon: FileSpreadsheet, label: 'Advanced Fields', desc: 'Policies, renewals & lead status', price: 6, color: '#14b8a6', bg: 'rgba(20,184,166,0.08)', border: 'rgba(20,184,166,0.3)' },
]

function Pricing() {
  const [selected, setSelected] = useState({ inventory: false, schedule: false, advanced: false })
  const addOnTotal = ADD_ONS.reduce((s, a) => s + (selected[a.key] ? a.price : 0), 0)
  const total = 19 + addOnTotal
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
          {/* Free card */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col lg:sticky lg:top-24 self-start shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Free</p>
            <p className="text-4xl font-black text-slate-900 leading-none mb-1">$0</p>
            <p className="text-sm text-slate-400 mb-6">Forever free</p>
            <ul className="space-y-2.5 mb-6 flex-1">
              {['Up to 20 clients', 'Basic dashboard', 'Team with roles', 'Auto backups'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={13} className="text-slate-400 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <motion.a href={APP_URL} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="block text-center text-sm font-semibold border border-slate-200 rounded-xl py-2.5 text-slate-700 hover:bg-slate-50 transition-colors">
              Get started free
            </motion.a>
          </motion.div>

          {/* Modular builder */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
            style={{ border: '2px solid #863bff' }}>
            {/* Base */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Layers size={15} className="text-[#863bff]" />
                    <p className="font-bold text-slate-900">Base plan</p>
                    <span className="text-[10px] bg-[#863bff]/10 text-[#863bff] font-bold px-2 py-0.5 rounded-full">Required</span>
                  </div>
                  <p className="text-sm text-slate-500">Unlimited clients, payments, dashboard & roles</p>
                </div>
                <p className="text-2xl font-black text-slate-900 shrink-0">$19<span className="text-sm font-normal text-slate-400">/mo</span></p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-y-2">
                {['Unlimited clients', 'Payment tracking', 'Dashboard & reports', 'Multi-user roles', 'Auto backups', 'Square sync'].map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-slate-600">
                    <CheckCircle size={11} className="text-[#863bff] shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="p-6 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Add-on modules</p>
              <div className="space-y-2.5">
                {ADD_ONS.map(({ key, icon: Icon, label, desc, price, color, bg, border }) => (
                  <motion.button key={key} onClick={() => toggle(key)}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-200"
                    style={{
                      border: `2px solid ${selected[key] ? border : '#e2e8f0'}`,
                      background: selected[key] ? bg : 'white',
                    }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                      style={{ background: selected[key] ? bg : '#f8fafc', border: `1px solid ${selected[key] ? border : '#e2e8f0'}` }}>
                      <Icon size={17} style={{ color: selected[key] ? color : '#94a3b8' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${selected[key] ? 'text-slate-900' : 'text-slate-600'}`}>{label}</p>
                      <p className="text-xs text-slate-400 truncate">{desc}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-600 shrink-0">+${price}/mo</p>
                    <motion.div animate={{ scale: selected[key] ? 1 : 0.9 }}
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors"
                      style={{ background: selected[key] ? '#863bff' : 'transparent', border: `2px solid ${selected[key] ? '#863bff' : '#cbd5e1'}` }}>
                      {selected[key] && <Check size={10} className="text-white" />}
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Total + CTA */}
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
                className="block text-center bg-[#863bff] hover:bg-[#7229e8] text-white font-semibold py-3.5 rounded-xl text-sm transition-colors">
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
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { target: 500, suffix: '+', label: 'Businesses managed' },
    { target: 2, suffix: 'M+', prefix: '$', label: 'Payments tracked' },
    { target: 10, suffix: 'k+', label: 'Clients on record' },
    { target: 99.9, suffix: '%', label: 'Uptime' },
  ]

  return (
    <section ref={ref} className="py-24 px-5 bg-[#06000f] relative overflow-hidden border-y border-white/[0.05]">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="relative max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map(({ target, suffix, prefix, label }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease }}
            className="text-center">
            <p className="text-4xl md:text-5xl font-black text-white tabular-nums">
              {prefix}{inView ? <Counter target={target} suffix={suffix} /> : `0${suffix}`}
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
  const testimonials = [
    {
      quote: "I used to spend 2 hours a month reconciling Square with my spreadsheet. Now alyxCLI does it automatically. I don't even think about it.",
      name: 'Sandra M.', role: 'Event decorator, Miami FL',
    },
    {
      quote: "The schedule + inventory combo is a game changer. We know exactly what items are booked and what's available — right from the dashboard.",
      name: 'Roberto V.', role: 'Party rental, Dallas TX',
    },
    {
      quote: "My clients love that I send professional payment reminders. The WhatsApp integration alone is worth the subscription.",
      name: 'Carmen R.', role: 'Insurance agent, Houston TX',
    },
  ]

  return (
    <section className="py-24 px-5 bg-[#06000f] relative">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease }}
          className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-white/25 uppercase mb-4">What people say</span>
          <h2 className="text-3xl font-black text-white">Real businesses, real results.</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map(({ quote, name, role }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="card-glow rounded-2xl p-6 cursor-default">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-6">"{quote}"</p>
              <div>
                <p className="font-semibold text-white text-sm">{name}</p>
                <p className="text-white/30 text-xs">{role}</p>
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
    <section className="py-32 px-5 relative overflow-hidden bg-[#06000f]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#863bff] opacity-[0.1] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-[#47bfff] opacity-[0.06] blur-[80px]" />
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
          Start managing<br />smarter today.
        </h2>
        <p className="text-white/40 text-lg mb-10">Free plan available. Connect Square in minutes.</p>
        <motion.a href={APP_URL} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 bg-white text-[#06000f] font-bold px-9 py-4 rounded-2xl text-lg transition-colors hover:bg-white/90"
          style={{ boxShadow: '0 0 60px rgba(255,255,255,0.15)' }}>
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
    <footer className="bg-[#030009] px-5 py-8 border-t border-white/[0.04]">
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
        <p className="text-xs text-white/15">© {new Date().getFullYear()} alyxCLI. All rights reserved.</p>
      </div>
    </footer>
  )
}

// ─── Landing ──────────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen bg-[#06000f]">
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
