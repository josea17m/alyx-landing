import { useState, useEffect, useRef, createContext, useContext } from 'react'
import {
  motion, useScroll, useTransform, useMotionValueEvent,
  AnimatePresence, useSpring, useInView
} from 'framer-motion'
import {
  Users, Package, Calendar, UserCheck,
  ArrowRight, Menu, X, Star, RefreshCw, Webhook, Check,
  CheckCircle, Layers, Shield, Zap, Bell, FileSpreadsheet
} from 'lucide-react'

const APP_URL = 'https://app.alyxcli.com'
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

// ─── Translations ─────────────────────────────────────────────────────────────
const TRANS = {
  en: {
    nav: {
      links: ['Features', 'Square', 'Pricing'],
      anchors: ['features', 'square', 'pricing'],
      signin: 'Sign in',
      cta: 'Get started',
    },
    hero: {
      badge: 'Now with Square integration',
      line1: ['Run', 'your', 'business,'],
      line2: ['not', 'spreadsheets.'],
      sub: 'Clients, payments, inventory and schedule in one dashboard. Square syncs automatically — no reconciliation, ever.',
      cta1: 'Start for free',
      cta2: 'See features',
      note: 'Free plan available · No credit card · Powered by Stripe',
    },
    features: {
      eyebrow: "What's inside",
      title: ['Everything your', 'business needs.'],
      cards: [
        { title: 'Client Management', desc: 'Full directory with payment history, billing day, contact info, and one-click reminders via WhatsApp, SMS, or email.' },
        { title: 'Inventory', desc: 'Track stock, assign items to events, and see real-time availability across your catalog.' },
        { title: 'Schedule', desc: 'Book appointments, rentals and visits. Recurring events, availability checks — visual calendar included.' },
        { title: 'Square Auto-Sync', desc: 'Connect Square once. Every payment is automatically reflected — zero manual entry.' },
      ],
      extras: [
        { label: 'Team & Roles', desc: '4 role levels' },
        { label: 'Smart Reminders', desc: 'WhatsApp · SMS · Email' },
        { label: 'Excel Import', desc: 'Bulk client upload' },
        { label: 'Secure Backups', desc: 'Automatic daily' },
      ],
    },
    square: {
      tag: 'Square Integration',
      steps: [
        {
          badge: 'Connect',
          title: 'One click to connect Square.',
          desc: 'Link your Square account in seconds with secure OAuth. No API keys, no developer setup. Just click and authorize.',
          bullets: ['Works with sandbox & production', 'No API keys to manage', 'Revoke access anytime'],
        },
        {
          badge: 'Payment received',
          title: 'Client pays through Square.',
          desc: 'Your client pays using Square — in-person, online, or via invoice. alyxCLI listens in real-time via webhooks.',
          bullets: ['In-person & online payments', 'Real-time webhook events', 'All Square payment types'],
        },
        {
          badge: 'Auto-matched',
          title: 'Matched to your client instantly.',
          desc: 'alyxCLI matches the Square payment to the right client — by Square customer ID or by amount within the billing month.',
          bullets: ['Matches by customer ID or amount', 'No duplicate payments', 'Works across 60 days'],
        },
        {
          badge: 'Done',
          title: 'Dashboard updated. Reminder skipped.',
          desc: 'Payment marked. Reminder suppressed automatically. Your team sees the update in real-time from anywhere.',
          bullets: ['No duplicate reminders', 'Team sees update instantly', 'Full audit trail'],
        },
      ],
      cta: 'Connect Square free',
    },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Pay only for what you use.',
      sub: 'Start with the base and add modules as your business grows.',
      free: {
        label: 'Free', period: 'Forever free',
        features: ['Up to 20 clients', 'Basic dashboard', 'Team with roles', 'Auto backups'],
        cta: 'Get started free',
      },
      base: {
        label: 'Base plan', required: 'Required',
        desc: 'Unlimited clients, payments, dashboard & roles',
        features: ['Unlimited clients', 'Payment tracking', 'Dashboard & reports', 'Multi-user roles', 'Auto backups', 'Square sync'],
        addonsLabel: 'Add-on modules',
        addons: [
          { label: 'Inventory', desc: 'Items, stock & categories' },
          { label: 'Schedule', desc: 'Appointments, visits & rentals' },
          { label: 'Advanced Fields', desc: 'Policies, renewals & lead status' },
        ],
        totalLabel: 'Your total', cancelNote: 'cancel anytime',
        cta: 'Get started', footnote: 'No setup fee · Secure checkout via Stripe',
      },
    },
    stats: ['Businesses managed', 'Payments tracked', 'Clients on record', 'Uptime'],
    testimonials: {
      eyebrow: 'What people say',
      title: 'Real businesses, real results.',
      items: [
        { quote: "I used to spend 2 hours a month reconciling Square with my spreadsheet. Now alyxCLI does it automatically — I don't even think about it.", name: 'Sandra M.', role: 'Event decorator, Miami FL' },
        { quote: "The schedule + inventory combo is a game changer. We know exactly what items are booked and what's available — right from the dashboard.", name: 'Roberto V.', role: 'Party rental, Dallas TX' },
        { quote: "My clients love that I send professional payment reminders. The WhatsApp integration alone is worth the subscription.", name: 'Carmen R.', role: 'Insurance agent, Houston TX' },
      ],
    },
    cta: {
      title: 'Start managing\nsmarter today.',
      sub: 'Free plan available. Connect Square in minutes.',
      btn: 'Get started free',
      note: 'alyxCLI · Built for small businesses in the USA',
    },
    footer: {
      links: ['Features', 'Square', 'Pricing'],
      anchors: ['features', 'square', 'pricing'],
      signin: 'Sign in',
    },
  },
  es: {
    nav: {
      links: ['Funciones', 'Square', 'Precios'],
      anchors: ['features', 'square', 'pricing'],
      signin: 'Iniciar sesión',
      cta: 'Comenzar',
    },
    hero: {
      badge: 'Ahora con integración Square',
      line1: ['Gestiona', 'tu', 'negocio,'],
      line2: ['no', 'planillas.'],
      sub: 'Clientes, pagos, inventario y agenda en un solo panel. Square se sincroniza automático — sin conciliaciones.',
      cta1: 'Empieza gratis',
      cta2: 'Ver funciones',
      note: 'Plan gratuito · Sin tarjeta · Powered by Stripe',
    },
    features: {
      eyebrow: 'Qué incluye',
      title: ['Todo lo que tu', 'negocio necesita.'],
      cards: [
        { title: 'Gestión de Clientes', desc: 'Directorio completo con historial de pagos, día de cobro, contacto y recordatorios con un clic por WhatsApp, SMS o email.' },
        { title: 'Inventario', desc: 'Controla tu stock, asigna artículos a eventos y ve disponibilidad en tiempo real en todo tu catálogo.' },
        { title: 'Agenda', desc: 'Citas, alquileres y visitas. Eventos recurrentes, verificación de disponibilidad — con calendario visual incluido.' },
        { title: 'Sincronización Square', desc: 'Conecta Square una vez. Cada pago se refleja automáticamente — sin entradas manuales.' },
      ],
      extras: [
        { label: 'Equipo y Roles', desc: '4 niveles de acceso' },
        { label: 'Recordatorios', desc: 'WhatsApp · SMS · Email' },
        { label: 'Importar Excel', desc: 'Carga masiva de clientes' },
        { label: 'Respaldos seguros', desc: 'Automáticos cada día' },
      ],
    },
    square: {
      tag: 'Integración Square',
      steps: [
        {
          badge: 'Conectar',
          title: 'Un clic para conectar Square.',
          desc: 'Vincula tu cuenta de Square en segundos con OAuth seguro. Sin claves de API, sin configuración técnica. Solo haz clic y autoriza.',
          bullets: ['Funciona en sandbox y producción', 'Sin claves de API', 'Revoca el acceso cuando quieras'],
        },
        {
          badge: 'Pago recibido',
          title: 'Tu cliente paga por Square.',
          desc: 'Tu cliente paga con Square — en persona, en línea o por factura. alyxCLI escucha en tiempo real mediante webhooks.',
          bullets: ['Pagos presenciales y en línea', 'Eventos webhook en tiempo real', 'Todos los tipos de pago Square'],
        },
        {
          badge: 'Auto-vinculado',
          title: 'Vinculado a tu cliente al instante.',
          desc: 'alyxCLI vincula el pago de Square al cliente correcto — por ID de cliente o por monto dentro del mes de cobro.',
          bullets: ['Vincula por ID de cliente o monto', 'Sin pagos duplicados', 'Funciona en ventana de 60 días'],
        },
        {
          badge: 'Listo',
          title: 'Panel actualizado. Recordatorio omitido.',
          desc: 'Pago marcado. Recordatorio suprimido automáticamente. Tu equipo ve la actualización en tiempo real desde cualquier lugar.',
          bullets: ['Sin recordatorios duplicados', 'El equipo lo ve al instante', 'Historial de auditoría completo'],
        },
      ],
      cta: 'Conectar Square gratis',
    },
    pricing: {
      eyebrow: 'Precios',
      title: 'Paga solo por lo que usas.',
      sub: 'Empieza con la base y agrega módulos conforme crece tu negocio.',
      free: {
        label: 'Gratis', period: 'Siempre gratis',
        features: ['Hasta 20 clientes', 'Panel básico', 'Equipo con roles', 'Respaldos automáticos'],
        cta: 'Empieza gratis',
      },
      base: {
        label: 'Plan base', required: 'Requerido',
        desc: 'Clientes ilimitados, pagos, panel y roles',
        features: ['Clientes ilimitados', 'Seguimiento de pagos', 'Panel y reportes', 'Roles multiusuario', 'Respaldos automáticos', 'Sincronización Square'],
        addonsLabel: 'Módulos adicionales',
        addons: [
          { label: 'Inventario', desc: 'Artículos, stock y categorías' },
          { label: 'Agenda', desc: 'Citas, visitas y alquileres' },
          { label: 'Campos avanzados', desc: 'Pólizas, renovaciones y leads' },
        ],
        totalLabel: 'Tu total', cancelNote: 'cancela cuando quieras',
        cta: 'Comenzar', footnote: 'Sin costo de activación · Pago seguro con Stripe',
      },
    },
    stats: ['Negocios gestionados', 'Pagos registrados', 'Clientes en el sistema', 'Disponibilidad'],
    testimonials: {
      eyebrow: 'Lo que dicen',
      title: 'Negocios reales, resultados reales.',
      items: [
        { quote: "Antes pasaba 2 horas al mes conciliando Square con mi hoja de cálculo. Ahora alyxCLI lo hace solo — ni me acuerdo de eso.", name: 'Sandra M.', role: 'Decoradora de eventos, Miami FL' },
        { quote: "La combinación agenda + inventario es increíble. Sabemos exactamente qué artículos están reservados y cuáles disponibles — directo desde el panel.", name: 'Roberto V.', role: 'Alquiler de fiestas, Dallas TX' },
        { quote: "Mis clientes adoran que les envíe recordatorios de pago profesionales. La integración con WhatsApp sola ya vale la suscripción.", name: 'Carmen R.', role: 'Agente de seguros, Houston TX' },
      ],
    },
    cta: {
      title: 'Empieza a gestionar\nmejor hoy.',
      sub: 'Plan gratuito. Conecta Square en minutos.',
      btn: 'Empieza gratis',
      note: 'alyxCLI · Hecho para negocios en EE.UU.',
    },
    footer: {
      links: ['Funciones', 'Square', 'Precios'],
      anchors: ['features', 'square', 'pricing'],
      signin: 'Iniciar sesión',
    },
  },
}

// ─── Lang Context ─────────────────────────────────────────────────────────────
const LangCtx = createContext({ lang: 'en', toggle: () => {} })
const useLang = () => useContext(LangCtx)
const useT    = () => { const { lang } = useLang(); return TRANS[lang] }

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
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg,#0ea5e9,#a855f7,#f43f5e,#f59e0b,#0ea5e9)', backgroundSize: '300%' }}
    />
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const { lang, toggle } = useLang()
  const t = useT()
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
          {t.nav.links.map((l, i) => (
            <a key={l} href={`#${t.nav.anchors[i]}`}
              className="text-sm font-medium text-white/45 hover:text-white transition-colors">{l}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="text-xs font-bold text-white/40 hover:text-white border border-white/15 hover:border-white/30 rounded-lg px-2.5 py-1.5 transition-all tracking-widest">
            {lang === 'en' ? 'ES' : 'EN'}
          </motion.button>
          <a href={APP_URL} className="text-sm font-medium text-white/45 hover:text-white transition-colors">{t.nav.signin}</a>
          <motion.a href={APP_URL} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="text-sm font-semibold bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-lg transition-colors"
            style={{ boxShadow: '0 0 20px rgba(14,165,233,0.35)' }}>
            {t.nav.cta}
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
            {t.nav.links.map((l, i) => (
              <a key={l} href={`#${t.nav.anchors[i]}`} onClick={() => setOpen(false)}
                className="text-sm font-medium text-white/60">{l}</a>
            ))}
            <hr className="border-white/10" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/30">Language</span>
              <button onClick={toggle}
                className="text-xs font-bold text-white/50 border border-white/20 rounded-lg px-3 py-1.5 tracking-widest">
                {lang === 'en' ? '🇲🇽 Español' : '🇺🇸 English'}
              </button>
            </div>
            <a href={APP_URL} className="bg-[#0ea5e9] text-white font-semibold py-2.5 rounded-xl text-center text-sm">
              {t.nav.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const t = useT()
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-[5%] w-[700px] h-[700px] rounded-full bg-[#0ea5e9] opacity-[0.12] blur-[130px] animate-blob1" />
        <div className="absolute top-[15%] right-[-10%] w-[550px] h-[550px] rounded-full bg-[#a855f7] opacity-[0.09] blur-[110px] animate-blob2" />
        <div className="absolute bottom-[-15%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#f43f5e] opacity-[0.07] blur-[120px] animate-blob3" />
        <div className="absolute top-[40%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#f59e0b] opacity-[0.05] blur-[100px] animate-blob4" />
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 bg-[#0ea5e9]/10 border border-[#0ea5e9]/25 rounded-full px-4 py-1.5 mb-10 backdrop-blur-sm">
          <SquareLogo size={13} />
          <span className="text-xs text-[#7dd3fc] font-medium">{t.hero.badge}</span>
          <span className="ml-0.5 px-2 py-0.5 bg-[#006AFF]/25 text-[#5ba3ff] text-[10px] font-bold rounded-full">NEW</span>
        </motion.div>

        <motion.h1 key={t.hero.line1.join()} variants={container} initial="hidden" animate="visible"
          className="text-[clamp(3rem,9vw,6rem)] font-black text-white leading-[1.02] tracking-tight mb-2">
          {t.hero.line1.map((w, i) => (
            <motion.span key={i} variants={word} className="inline-block mr-[0.22em]">{w}</motion.span>
          ))}
          <br />
          <span className="inline-flex flex-wrap justify-center gap-[0.22em] mt-1">
            {t.hero.line2.map((w, i) => (
              <motion.span key={i} variants={word} className={`inline-block ${i === 1 ? 'gradient-text' : ''}`}>
                {w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease }}
          className="text-[clamp(1rem,2.5vw,1.2rem)] text-white/40 max-w-[520px] mx-auto mt-7 mb-10 leading-relaxed">
          {t.hero.sub}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a href={APP_URL} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold px-8 py-3.5 rounded-xl text-[15px] transition-colors"
            style={{ boxShadow: '0 0 40px rgba(14,165,233,0.45)' }}>
            {t.hero.cta1} <ArrowRight size={16} />
          </motion.a>
          <motion.a href="#features" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-semibold px-8 py-3.5 rounded-xl text-[15px] transition-all backdrop-blur-sm">
            {t.hero.cta2}
          </motion.a>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="mt-5 text-xs text-white/25">
          {t.hero.note}
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
          <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.03] border-b border-white/[0.05]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <div className="ml-4 flex-1 max-w-xs bg-white/[0.06] rounded-md px-3 py-1 text-[11px] text-white/25">
              app.alyxcli.com
            </div>
          </div>
          <div className="grid grid-cols-12 min-h-[320px]">
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
            <div className="col-span-12 sm:col-span-10 p-5 bg-[#060f1e]">
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-4">Overview · April 2026</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
                {[
                  { l: 'Clients',   v: '148',   c: '#38bdf8', bg: 'rgba(14,165,233,0.12)' },
                  { l: 'Collected', v: '$4,320', c: '#34d399', bg: 'rgba(52,211,153,0.12)' },
                  { l: 'Items',     v: '63',     c: '#c084fc', bg: 'rgba(168,85,247,0.12)' },
                  { l: 'Events',    v: '12',     c: '#fbbf24', bg: 'rgba(245,158,11,0.12)'  },
                ].map(({ l, v, c }) => (
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
  const t = useT()
  const icons    = [Users, Package, Calendar, Zap]
  const colors   = [C.sky, C.purple, C.amber, C.green]
  const minis    = [<ClientMini />, <InventoryMini />, <CalendarMini />, <SquareMini />]
  const spans    = ['md:col-span-8', 'md:col-span-4', 'md:col-span-4', 'md:col-span-8']
  const extraIcons = [UserCheck, Bell, FileSpreadsheet, Shield]
  const extraColors = [C.sky, C.rose, C.amber, C.green]

  return (
    <section id="features" className="py-28 px-5 bg-[#020b18] relative">
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
          className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-white/30 uppercase mb-4">{t.features.eyebrow}</span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-tight">
            {t.features.title[0]}<br />{t.features.title[1]}
          </h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-4">
          {t.features.cards.map(({ title, desc }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className={`col-span-12 ${spans[i]} card-glow rounded-2xl p-6 relative overflow-hidden group cursor-default transition-all duration-300`}>
              <div className="absolute inset-0 shimmer-line opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: colors[i].hex }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: colors[i].soft, border: `1px solid ${colors[i].border}` }}>
                {(() => { const Icon = icons[i]; return <Icon size={20} style={{ color: colors[i].hex }} /> })()}
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              {minis[i]}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {t.features.extras.map(({ label, desc }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease }}
              className="card-glow rounded-xl p-4 flex flex-col gap-2 group cursor-default">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: extraColors[i].soft, border: `1px solid ${extraColors[i].border}` }}>
                {(() => { const Icon = extraIcons[i]; return <Icon size={15} style={{ color: extraColors[i].hex }} /> })()}
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
const SQUARE_COLORS = ['#0ea5e9', '#a855f7', '#f43f5e', '#10b981']
const SQUARE_NUMS   = ['01', '02', '03', '04']

const SQUARE_VISUALS = [
  // Step 1: Connect
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
  </div>,
  // Step 2: Payment received
  <div className="space-y-3">
    <div className="bg-[#006AFF]/10 border border-[#006AFF]/25 rounded-2xl p-5">
      <div className="flex items-start gap-3">
        <SquareLogo size={28} />
        <div className="flex-1">
          <p className="text-xs text-[#5ba3ff] font-semibold mb-1">payment.completed</p>
          <p className="text-sm font-bold text-white">Maria Torres · $120.00</p>
          <p className="text-xs text-white/40 mt-0.5">April 12, 2026 · 2:34 PM</p>
        </div>
        <span className="text-[10px] bg-emerald-400/15 text-emerald-400 font-bold px-2 py-0.5 rounded-full">COMPLETED</span>
      </div>
    </div>
    <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl">
      <Webhook size={14} className="text-[#a855f7]" />
      <span className="text-xs text-white/50">Webhook received by alyxCLI backend</span>
      <span className="ml-auto text-[10px] text-emerald-400">200 OK</span>
    </div>
  </div>,
  // Step 3: Auto-matched
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
  </div>,
  // Step 4: Done
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
  </div>,
]

// ── Scroll-driven layer math ──────────────────────────────────────────────────
const N  = 4
const CF = 0.14
const PW = (1 - (N - 1) * CF) / N

function getStepRanges(i) {
  const peakStart = i * (PW + CF)
  const peakEnd   = peakStart + PW
  const fadeIn    = Math.max(0, peakStart - CF)
  const fadeOut   = Math.min(1, peakEnd   + CF)
  const isFirst   = i === 0
  const isLast    = i === N - 1
  if (isFirst) return { input: [0, peakEnd, fadeOut],              op: [1,1,0],    y: [0,0,-20]     }
  if (isLast)  return { input: [fadeIn, peakStart, 1],             op: [0,1,1],    y: [20,0,0]      }
  return         { input: [fadeIn, peakStart, peakEnd, fadeOut], op: [0,1,1,0], y: [20,0,0,-20] }
}

function StepLayer({ progress, index, children }) {
  const { input, op, y: yVals } = getStepRanges(index)
  const opacity = useTransform(progress, input, op)
  const y       = useTransform(progress, input, yVals)
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 pointer-events-none">
      {children}
    </motion.div>
  )
}

function StepDot({ progress, index, color }) {
  const { input, op } = getStepRanges(index)
  const width   = useTransform(progress, input, op.map(v => v > 0.5 ? 28 : 12))
  const opacity = useTransform(progress, input, op.map(v => 0.3 + v * 0.7))
  return <motion.div className="h-1 rounded-full" style={{ width, backgroundColor: color, opacity }} />
}

function SquareSection() {
  const t = useT()
  const containerRef = useRef(null)
  const { scrollYProgress: raw } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const progress = useSpring(raw, { stiffness: 200, damping: 35, mass: 0.8 })
  const [activeBg, setActiveBg] = useState(0)
  useMotionValueEvent(raw, 'change', v => setActiveBg(Math.min(N - 1, Math.floor(v * N))))

  const steps = t.square.steps.map((s, i) => ({
    ...s,
    num: SQUARE_NUMS[i],
    color: SQUARE_COLORS[i],
    visual: SQUARE_VISUALS[i],
  }))

  return (
    <>
      <div id="square" />

      {/* Mobile */}
      <section className="md:hidden py-20 px-5 bg-[#00071a]">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-2.5 mb-10">
            <SquareLogo size={18} />
            <span className="text-sm font-semibold text-[#5ba3ff]">{t.square.tag}</span>
          </div>
          <div className="space-y-5">
            {steps.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
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
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 mt-8 text-white font-semibold px-6 py-3 rounded-xl text-sm"
            style={{ background: '#006AFF', boxShadow: '0 0 24px rgba(0,106,255,0.35)' }}>
            <SquareLogo size={16} />{t.square.cta}<ArrowRight size={15} />
          </motion.a>
        </div>
      </section>

      {/* Desktop sticky */}
      <section ref={containerRef} style={{ height: '240vh' }} className="relative hidden md:block">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#00071a]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#006AFF] opacity-[0.07] blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[110px] transition-colors duration-700"
              style={{ background: SQUARE_COLORS[activeBg] }} />
          </div>

          <div className="relative max-w-6xl mx-auto h-full px-5 py-16 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-10">
              <SquareLogo size={18} />
              <span className="text-sm font-semibold text-[#5ba3ff]">{t.square.tag}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="flex items-center gap-2 mb-8">
                  {steps.map((s, i) => (
                    <StepDot key={i} progress={progress} index={i} color={s.color} />
                  ))}
                </div>

                <div className="relative overflow-hidden" style={{ minHeight: '270px' }}>
                  {steps.map((s, i) => (
                    <StepLayer key={i} progress={progress} index={i}>
                      <div>
                        <div className="flex items-center gap-2.5 mb-4">
                          <span className="text-xs font-bold text-white/25 font-mono">{s.num}</span>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                            style={{ color: s.color, background: `${s.color}18`, borderColor: `${s.color}40` }}>
                            {s.badge}
                          </span>
                        </div>
                        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-black text-white leading-tight mb-4">
                          {s.title}
                        </h2>
                        <p className="text-white/45 text-base leading-relaxed mb-6">{s.desc}</p>
                        <ul className="space-y-2.5">
                          {s.bullets.map(b => (
                            <li key={b} className="flex items-center gap-3 text-white/60 text-sm">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                style={{ background: `${s.color}25`, border: `1px solid ${s.color}40` }}>
                                <Check size={10} style={{ color: s.color }} />
                              </div>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </StepLayer>
                  ))}
                </div>

                <motion.a href={APP_URL} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 mt-6 text-white font-semibold px-6 py-3 rounded-xl text-sm"
                  style={{ background: '#006AFF', boxShadow: '0 0 30px rgba(0,106,255,0.35)' }}>
                  <SquareLogo size={16} />{t.square.cta}<ArrowRight size={15} />
                </motion.a>
              </div>

              <div className="relative overflow-hidden" style={{ minHeight: '320px' }}>
                {steps.map((s, i) => (
                  <StepLayer key={i} progress={progress} index={i}>
                    {s.visual}
                  </StepLayer>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────
const ADD_ON_ICONS   = [Package, Calendar, FileSpreadsheet]
const ADD_ON_COLORS  = [C.purple, C.amber, C.teal]
const ADD_ON_PRICES  = [12, 12, 6]
const ADD_ON_KEYS    = ['inventory', 'schedule', 'advanced']

function Pricing() {
  const t = useT()
  const [selected, setSelected] = useState({ inventory: false, schedule: false, advanced: false })
  const total = 19 + ADD_ON_KEYS.reduce((s, k, i) => s + (selected[k] ? ADD_ON_PRICES[i] : 0), 0)
  const toggle = key => setSelected(s => ({ ...s, [key]: !s[key] }))

  return (
    <section id="pricing" className="py-28 px-5 bg-[#fafaf9] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
          className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-slate-400 uppercase mb-4">{t.pricing.eyebrow}</span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-slate-900 leading-tight">
            {t.pricing.title}
          </h2>
          <p className="text-slate-500 text-lg mt-3">{t.pricing.sub}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[240px,1fr] gap-5 lg:max-w-[800px] lg:mx-auto">
          {/* Free */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col lg:sticky lg:top-24 self-start shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.pricing.free.label}</p>
            <p className="text-4xl font-black text-slate-900 leading-none mb-1">$0</p>
            <p className="text-sm text-slate-400 mb-6">{t.pricing.free.period}</p>
            <ul className="space-y-2.5 mb-6 flex-1">
              {t.pricing.free.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={13} className="text-slate-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <motion.a href={APP_URL} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="block text-center text-sm font-semibold border border-slate-200 rounded-xl py-2.5 text-slate-700 hover:bg-slate-50 transition-colors">
              {t.pricing.free.cta}
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
                    <p className="font-bold text-slate-900">{t.pricing.base.label}</p>
                    <span className="text-[10px] bg-[#0ea5e9]/10 text-[#0ea5e9] font-bold px-2 py-0.5 rounded-full">{t.pricing.base.required}</span>
                  </div>
                  <p className="text-sm text-slate-500">{t.pricing.base.desc}</p>
                </div>
                <p className="text-2xl font-black text-slate-900 shrink-0">$19<span className="text-sm font-normal text-slate-400">/mo</span></p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-y-2">
                {t.pricing.base.features.map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-slate-600">
                    <CheckCircle size={11} className="text-[#0ea5e9] shrink-0" />{f}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.pricing.base.addonsLabel}</p>
              <div className="space-y-2.5">
                {t.pricing.base.addons.map(({ label, desc }, i) => {
                  const key = ADD_ON_KEYS[i]
                  const color = ADD_ON_COLORS[i]
                  const Icon = ADD_ON_ICONS[i]
                  const price = ADD_ON_PRICES[i]
                  return (
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
                  )
                })}
              </div>
            </div>

            <div className="p-6 bg-slate-50/80">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-slate-700">{t.pricing.base.totalLabel}</p>
                <div className="text-right">
                  <motion.p key={total} initial={{ scale: 0.85 }} animate={{ scale: 1 }}
                    className="text-3xl font-black text-slate-900">
                    ${total}<span className="text-base font-normal text-slate-400">/mo</span>
                  </motion.p>
                  <p className="text-xs text-slate-400">{t.pricing.base.cancelNote}</p>
                </div>
              </div>
              <motion.a href={APP_URL} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="block text-center text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #a855f7)', boxShadow: '0 4px 20px rgba(14,165,233,0.3)' }}>
                {t.pricing.base.cta} — ${total}/mo
              </motion.a>
              <p className="text-center text-xs text-slate-400 mt-3">{t.pricing.base.footnote}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const t = useT()
  const data = [
    { target: 500,  suffix: '+',  color: C.sky,    prefix: ''  },
    { target: 2,    suffix: 'M+', color: C.green,  prefix: '$' },
    { target: 10,   suffix: 'k+', color: C.purple, prefix: ''  },
    { target: 99.9, suffix: '%',  color: C.amber,  prefix: ''  },
  ]

  return (
    <section className="py-24 px-5 bg-[#020b18] relative overflow-hidden border-y border-white/[0.05]">
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {data.map(({ target, suffix, prefix, color }, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease }}
            className="text-center">
            <p className="text-4xl md:text-5xl font-black tabular-nums" style={{ color: color.hex }}>
              <Counter target={target} suffix={suffix} prefix={prefix} />
            </p>
            <p className="text-sm text-white/35 mt-2">{t.stats[i]}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const t = useT()
  const colors = [C.sky, C.purple, C.rose]

  return (
    <section className="py-24 px-5 bg-[#020b18]">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease }}
          className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-white/25 uppercase mb-4">{t.testimonials.eyebrow}</span>
          <h2 className="text-3xl font-black text-white">{t.testimonials.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {t.testimonials.items.map(({ quote, name, role }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="card-glow rounded-2xl p-6 cursor-default relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${colors[i].hex}, transparent)` }} />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-6">"{quote}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: colors[i].soft, border: `1px solid ${colors[i].border}` }}>
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
  const t = useT()
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
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white leading-[1.05] mb-5 whitespace-pre-line">
          {t.cta.title.split('\n').map((line, i) => (
            <span key={i} className={i === 1 ? 'gradient-text' : ''}>{line}{i === 0 ? '\n' : ''}</span>
          ))}
        </h2>
        <p className="text-white/40 text-lg mb-10">{t.cta.sub}</p>
        <motion.a href={APP_URL} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 text-white font-bold px-9 py-4 rounded-2xl text-lg"
          style={{ background: 'linear-gradient(135deg, #0ea5e9, #a855f7)', boxShadow: '0 0 60px rgba(14,165,233,0.3)' }}>
          {t.cta.btn} <ArrowRight size={20} />
        </motion.a>
        <p className="mt-5 text-white/20 text-sm">{t.cta.note}</p>
      </motion.div>
    </section>
  )
}

// ─── Desktop Download ─────────────────────────────────────────────────────────
const GITHUB_RELEASE = 'https://github.com/josea17m/damaris-inventory/releases/latest/download'

function DesktopDownload() {
  const { lang } = useContext(LangCtx)
  const t = lang === 'en'
    ? {
        eyebrow: 'Desktop App',
        title: 'Also available on your computer',
        sub: 'Same account. No browser needed. Works offline for most views.',
        macSilicon: 'macOS Apple Silicon',
        macIntel: 'macOS Intel',
        windows: 'Windows',
        note: 'Free download · Sign in with your existing account',
      }
    : {
        eyebrow: 'App de escritorio',
        title: 'También disponible en tu computadora',
        sub: 'La misma cuenta. Sin navegador. Funciona sin conexión en la mayoría de las vistas.',
        macSilicon: 'macOS Apple Silicon',
        macIntel: 'macOS Intel',
        windows: 'Windows',
        note: 'Descarga gratuita · Entra con tu cuenta existente',
      }

  return (
    <section className="py-20 px-5 bg-[#020b18] border-t border-white/[0.05]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-white/25 uppercase mb-4">{t.eyebrow}</span>
          <h2 className="text-3xl font-black text-white mb-3">{t.title}</h2>
          <p className="text-white/35 text-base mb-10">{t.sub}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* macOS Apple Silicon */}
            <motion.a
              href={`${GITHUB_RELEASE}/Alyx_0.1.0_aarch64.dmg`}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.13)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <AppleLogo />
              {t.macSilicon}
            </motion.a>

            {/* macOS Intel */}
            <motion.a
              href={`${GITHUB_RELEASE}/Alyx_0.1.0_x64.dmg`}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.13)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <AppleLogo />
              {t.macIntel}
            </motion.a>

            {/* Windows */}
            <motion.a
              href={`${GITHUB_RELEASE}/Alyx_0.1.0_x64_en-US.msi`}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-colors"
              style={{ background: 'linear-gradient(135deg,rgba(14,165,233,0.2),rgba(168,85,247,0.2))', border: '1px solid rgba(14,165,233,0.25)' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <WindowsLogo />
              {t.windows}
            </motion.a>
          </div>

          <p className="mt-6 text-xs text-white/20">{t.note}</p>
        </motion.div>
      </div>
    </section>
  )
}

function AppleLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function WindowsLogo() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
    </svg>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const t = useT()
  return (
    <footer className="bg-[#010810] px-5 py-8 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <Logo size={20} />
          <span className="text-white/40 text-sm font-medium">alyxCLI</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-white/20">
          {t.footer.links.map((l, i) => (
            <a key={l} href={`#${t.footer.anchors[i]}`} className="hover:text-white/50 transition-colors">{l}</a>
          ))}
          <a href={APP_URL} className="hover:text-white/50 transition-colors">{t.footer.signin}</a>
        </div>
        <p className="text-xs text-white/15">© {new Date().getFullYear()} alyxCLI.</p>
      </div>
    </footer>
  )
}

// ─── Landing ──────────────────────────────────────────────────────────────────
export default function Landing() {
  const [lang, setLang] = useState('en')
  const toggle = () => setLang(l => l === 'en' ? 'es' : 'en')

  return (
    <LangCtx.Provider value={{ lang, toggle }}>
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
        <DesktopDownload />
        <Footer />
      </div>
    </LangCtx.Provider>
  )
}
