import { useState, useEffect, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Check, Menu, X, Package, Calendar, Bell,
  Star, ChevronRight, CreditCard, Inbox, ShieldCheck
} from 'lucide-react'

const APP_URL = 'https://app.alyxflow.com'
const STARTED_URL = '/get-started'
const ease = [0.22, 1, 0.36, 1]

// ─── Lang context (standalone for this page) ──────────────────────────────────
const LangCtx = createContext({ lang: 'en', toggle: () => {} })
const useLang = () => useContext(LangCtx)

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  en: {
    nav: { signin: 'Sign in', cta: 'Get started free' },
    badge: 'Built for event & rental businesses',
    headline1: 'The system for',
    headline2: 'event rental businesses.',
    sub: 'Online catalog, integrated billing, booking calendar, and automatic payment reminders — all in one place.',
    cta1: 'Start for free',
    cta2: 'See how it works',
    note: 'Free plan · No credit card · Powered by Stripe & Square',
    how_eyebrow: 'How it works',
    how_title: 'Three steps to run your rental business.',
    steps: [
      {
        num: '01',
        title: 'Publish your catalog',
        desc: 'Add your items with photos, prices, and availability. Your clients get a shareable link to browse and request.',
        items: ['Tables, chairs, linens, sound, lighting', 'Photos per item', 'Real-time availability'],
      },
      {
        num: '02',
        title: 'Receive requests online',
        desc: 'Clients submit event details and item requests directly from your catalog page. No back-and-forth messages.',
        items: ['Event date, location, headcount', 'Automatic email notification to you', 'Reply via SMS or email from the dashboard'],
      },
      {
        num: '03',
        title: 'Bill and manage',
        desc: 'Track deposits, send payment reminders, and sync with Square automatically.',
        items: ['Square invoices in one click', 'Automatic reminders for deposits & final payment', 'Payment recorded instantly — no spreadsheets'],
      },
    ],
    features_eyebrow: 'Everything included',
    features_title: 'Built specifically for rentals.',
    features: [
      { title: 'Photo Catalog', desc: 'Publish items with photos, descriptions, and per-unit pricing. Clients see exactly what they\'re renting.' },
      { title: 'Online Requests', desc: 'Clients submit rental requests from your public link. All requests land in your dashboard.' },
      { title: 'Booking Calendar', desc: 'See all your events at a glance. Avoid double-booking with real-time availability tracking.' },
      { title: 'Deposit Reminders', desc: 'Send automatic SMS and email reminders for deposits and final payments. Never chase clients again.' },
      { title: 'Square Billing', desc: 'Create and send Square invoices directly from Alyx. Payments sync automatically to your client record.' },
      { title: 'Team Access', desc: 'Add employees with limited access. They see and manage what they need — nothing more.' },
    ],
    testimonials_eyebrow: 'From rental businesses like yours',
    testimonials_title: 'Real results.',
    testimonials: [
      { quote: "I used to manage everything in WhatsApp and a spreadsheet. Now my catalog is online, clients request items directly, and Square payments sync automatically.", name: 'Sandra M.', role: 'Table & chair rental, Miami FL' },
      { quote: "The deposit reminder alone saved me from losing a $800 booking. The client forgot, got the SMS, and paid that same day.", name: 'Roberto V.', role: 'Event rental, Dallas TX' },
      { quote: "Having the catalog online made me look way more professional. Clients take me more seriously and I get fewer 'what do you have available?' questions.", name: 'Carmen R.', role: 'Linen & decor rentals, Houston TX' },
    ],
    pricing_eyebrow: 'Simple pricing',
    pricing_title: 'Start free. Scale when ready.',
    pricing_free_label: 'Free',
    pricing_free_period: 'Forever free',
    pricing_free_features: ['Up to 20 clients', 'Basic catalog', 'Manual payment tracking'],
    pricing_free_cta: 'Get started free',
    pricing_base_label: 'Base + Inventory + Schedule',
    pricing_base_price: '$43',
    pricing_base_period: '/month',
    pricing_base_note: 'cancel anytime',
    pricing_base_features: [
      'Unlimited clients & catalog items',
      'Online catalog with public link',
      'Booking calendar',
      'Automatic reminders (SMS + email)',
      'Square integration',
      'Team roles',
      'Excel import/export',
    ],
    pricing_base_cta: 'Get started',
    pricing_footnote: 'No setup fee · Secure checkout via Stripe',
    cta_title: 'Ready to stop managing rentals\nfrom WhatsApp?',
    cta_sub: 'Free plan available. Set up your catalog in minutes.',
    cta_btn: 'Get started free',
    cta_note: 'AlyxFlow · Built for rental businesses in the USA',
    footer_links: ['How it works', 'Features', 'Pricing'],
    footer_anchors: ['how', 'features', 'pricing'],
    footer_signin: 'Sign in',
  },
  es: {
    nav: { signin: 'Iniciar sesión', cta: 'Comenzar gratis' },
    badge: 'Hecho para negocios de renta de eventos',
    headline1: 'El sistema para',
    headline2: 'negocios de renta de eventos.',
    sub: 'Catálogo online, cobros integrados, calendario de reservas y recordatorios automáticos de pago — todo en un solo lugar.',
    cta1: 'Empieza gratis',
    cta2: 'Ver cómo funciona',
    note: 'Plan gratuito · Sin tarjeta · Powered by Stripe & Square',
    how_eyebrow: 'Cómo funciona',
    how_title: 'Tres pasos para gestionar tu negocio de renta.',
    steps: [
      {
        num: '01',
        title: 'Publica tu catálogo',
        desc: 'Agrega tus artículos con fotos, precios y disponibilidad. Tus clientes tienen un link para ver y solicitar.',
        items: ['Mesas, sillas, manteles, sonido, iluminación', 'Fotos por artículo', 'Disponibilidad en tiempo real'],
      },
      {
        num: '02',
        title: 'Recibe solicitudes online',
        desc: 'Los clientes envían los detalles del evento y solicitan artículos directamente desde tu página de catálogo.',
        items: ['Fecha, lugar y número de personas', 'Notificación automática por email', 'Responde por SMS o email desde el panel'],
      },
      {
        num: '03',
        title: 'Cobra y gestiona',
        desc: 'Controla depósitos, envía recordatorios de pago y sincroniza con Square automáticamente.',
        items: ['Facturas de Square en un clic', 'Recordatorios automáticos de depósito y pago final', 'Pago registrado al instante — sin planillas'],
      },
    ],
    features_eyebrow: 'Todo incluido',
    features_title: 'Diseñado específicamente para rentas.',
    features: [
      { title: 'Catálogo con fotos', desc: 'Publica artículos con fotos, descripción y precio por unidad. Los clientes ven exactamente lo que rentan.' },
      { title: 'Solicitudes online', desc: 'Los clientes hacen solicitudes desde tu link público. Todas llegan a tu panel de control.' },
      { title: 'Calendario de reservas', desc: 'Ve todos tus eventos de un vistazo. Evita el double-booking con disponibilidad en tiempo real.' },
      { title: 'Recordatorios de depósito', desc: 'Envía recordatorios automáticos por SMS y email para depósitos y pagos finales. Sin perseguir clientes.' },
      { title: 'Cobros con Square', desc: 'Crea y envía facturas de Square directamente desde Alyx. Los pagos se sincronizan automáticamente.' },
      { title: 'Acceso para empleados', desc: 'Agrega empleados con acceso limitado. Ven y gestionan lo que necesitan — nada más.' },
    ],
    testimonials_eyebrow: 'De negocios de renta como el tuyo',
    testimonials_title: 'Resultados reales.',
    testimonials: [
      { quote: "Antes manejaba todo por WhatsApp y una hoja de cálculo. Ahora mi catálogo está en línea, los clientes solicitan directo y los pagos de Square se sincronizan solos.", name: 'Sandra M.', role: 'Renta de mesas y sillas, Miami FL' },
      { quote: "El recordatorio de depósito solo me salvó de perder una reserva de $800. El cliente se olvidó, recibió el SMS y pagó ese mismo día.", name: 'Roberto V.', role: 'Renta de eventos, Dallas TX' },
      { quote: "Tener el catálogo en línea me hizo ver mucho más profesional. Los clientes me toman más en serio y ya no me preguntan '¿qué tienes disponible?'", name: 'Carmen R.', role: 'Renta de manteles y decoración, Houston TX' },
    ],
    pricing_eyebrow: 'Precios simples',
    pricing_title: 'Empieza gratis. Escala cuando estés listo.',
    pricing_free_label: 'Gratis',
    pricing_free_period: 'Siempre gratis',
    pricing_free_features: ['Hasta 20 clientes', 'Catálogo básico', 'Seguimiento manual de pagos'],
    pricing_free_cta: 'Empieza gratis',
    pricing_base_label: 'Base + Inventario + Agenda',
    pricing_base_price: '$43',
    pricing_base_period: '/mes',
    pricing_base_note: 'cancela cuando quieras',
    pricing_base_features: [
      'Clientes y artículos de catálogo ilimitados',
      'Catálogo online con link público',
      'Calendario de reservas',
      'Recordatorios automáticos (SMS + email)',
      'Integración con Square',
      'Roles de equipo',
      'Importar/exportar Excel',
    ],
    pricing_base_cta: 'Comenzar',
    pricing_footnote: 'Sin costo de activación · Pago seguro con Stripe',
    cta_title: '¿Listo para dejar de gestionar\nrentas por WhatsApp?',
    cta_sub: 'Plan gratuito. Configura tu catálogo en minutos.',
    cta_btn: 'Empieza gratis',
    cta_note: 'AlyxFlow · Hecho para negocios de renta en EE.UU.',
    footer_links: ['Cómo funciona', 'Funciones', 'Precios'],
    footer_anchors: ['how', 'features', 'pricing'],
    footer_signin: 'Iniciar sesión',
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size * 0.96} viewBox="0 0 48 46" fill="none">
      <path fill="#0ea5e9" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" />
    </svg>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const { lang, toggle } = useLang()
  const t = T[lang]
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
        <a href="/" className="flex items-center gap-2.5">
          <Logo size={24} />
          <span className="font-bold text-[16px] text-white tracking-tight">Alyx<span style={{ color: '#38bdf8' }}>Flow</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {t.footer_links.map((l, i) => (
            <a key={l} href={`#${t.footer_anchors[i]}`}
              className="text-sm font-medium text-white/45 hover:text-white transition-colors">{l}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <motion.button onClick={toggle} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="text-xs font-bold text-white/40 hover:text-white border border-white/15 hover:border-white/30 rounded-lg px-2.5 py-1.5 transition-all tracking-widest">
            {lang === 'en' ? 'ES' : 'EN'}
          </motion.button>
          <a href={APP_URL} className="text-sm font-medium text-white/45 hover:text-white transition-colors">{t.nav.signin}</a>
          <motion.a href={STARTED_URL} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
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
            {t.footer_links.map((l, i) => (
              <a key={l} href={`#${t.footer_anchors[i]}`} onClick={() => setOpen(false)}
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
            <a href={STARTED_URL} className="bg-[#0ea5e9] text-white font-semibold py-2.5 rounded-xl text-center text-sm">
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
  const { lang } = useLang()
  const t = T[lang]
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020b18] px-5 pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-[5%] w-[700px] h-[700px] rounded-full bg-[#0ea5e9] opacity-[0.10] blur-[130px]" />
        <div className="absolute top-[15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#10b981] opacity-[0.08] blur-[110px]" />
        <div className="absolute bottom-[-15%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#a855f7] opacity-[0.06] blur-[120px]" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 bg-[#10b981]/10 border border-[#10b981]/25 rounded-full px-4 py-1.5 mb-10">
          <Package size={13} className="text-[#34d399]" />
          <span className="text-xs text-[#34d399] font-medium">{t.badge}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="text-[clamp(2.8rem,8vw,5.5rem)] font-black text-white leading-[1.03] tracking-tight mb-6">
          {t.headline1}<br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #0ea5e9, #10b981)' }}>
            {t.headline2}
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="text-[clamp(1rem,2.5vw,1.2rem)] text-white/40 max-w-[540px] mx-auto mb-10 leading-relaxed">
          {t.sub}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a href={STARTED_URL} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold px-8 py-3.5 rounded-xl text-[15px] transition-colors"
            style={{ boxShadow: '0 0 40px rgba(14,165,233,0.4)' }}>
            {t.cta1} <ArrowRight size={16} />
          </motion.a>
          <motion.a href="#how" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-semibold px-8 py-3.5 rounded-xl text-[15px] transition-all">
            {t.cta2}
          </motion.a>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="mt-5 text-xs text-white/25">{t.note}</motion.p>
      </div>

      {/* Visual mockup */}
      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease }}
        className="relative max-w-3xl w-full mx-auto mt-20 z-10">
        <div className="rounded-2xl border border-white/[0.08] bg-[#060f1e] overflow-hidden"
          style={{ boxShadow: '0 40px 100px rgba(14,165,233,0.12), 0 20px 40px rgba(0,0,0,0.6)' }}>
          <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.03] border-b border-white/[0.05]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <div className="ml-4 flex-1 max-w-xs bg-white/[0.06] rounded-md px-3 py-1 text-[11px] text-white/25">
              app.alyxflow.com/catalogo/mi-empresa
            </div>
          </div>
          <div className="p-5">
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-4">Catalog · Event Rentals Co.</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Round Table', price: '$15', stock: '24 avail', color: '#0ea5e9' },
                { name: 'Chiavari Chair', price: '$4', stock: '120 avail', color: '#10b981' },
                { name: 'LED Centerpiece', price: '$25', stock: '8 avail', color: '#a855f7' },
              ].map(({ name, price, stock, color }) => (
                <div key={name} className="bg-white/[0.04] border border-white/[0.06] rounded-xl overflow-hidden">
                  <div className="aspect-video flex items-center justify-center"
                    style={{ background: `${color}18` }}>
                    <Package size={24} style={{ color }} />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-semibold text-white/80 truncate">{name}</p>
                    <p className="text-xs font-bold mt-0.5" style={{ color }}>{price}/unit</p>
                    <p className="text-[10px] text-white/25 mt-0.5">{stock}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 rounded-xl px-4 py-3">
              <Inbox size={16} className="text-[#38bdf8] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white/70">New request — Boda García · May 18</p>
                <p className="text-[10px] text-white/35">40 tables, 320 chairs · Needs quote</p>
              </div>
              <ChevronRight size={14} className="text-white/25 ml-auto shrink-0" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1/2 h-12 bg-[#0ea5e9] opacity-[0.12] blur-3xl rounded-full pointer-events-none" />
      </motion.div>
    </section>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const { lang } = useLang()
  const t = T[lang]
  const icons = [Package, Inbox, CreditCard]
  const colors = ['#0ea5e9', '#10b981', '#a855f7']

  return (
    <section id="how" className="py-28 px-5 bg-[#020b18] relative">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
          className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-white/30 uppercase mb-4">{t.how_eyebrow}</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-white">{t.how_title}</h2>
        </motion.div>
        <div className="space-y-5">
          {t.steps.map((step, i) => {
            const Icon = icons[i]
            return (
              <motion.div key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                <div className="flex items-center gap-4 md:flex-col md:items-center md:w-20 shrink-0">
                  <span className="text-4xl font-black tabular-nums" style={{ color: `${colors[i]}40` }}>{step.num}</span>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${colors[i]}18`, border: `1px solid ${colors[i]}35` }}>
                    <Icon size={22} style={{ color: colors[i] }} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-white mb-2">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-4">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.items.map(item => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-white/55">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: `${colors[i]}20`, border: `1px solid ${colors[i]}35` }}>
                          <Check size={10} style={{ color: colors[i] }} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const { lang } = useLang()
  const t = T[lang]
  const icons = [Package, Inbox, Calendar, Bell, CreditCard, ShieldCheck]
  const colors = ['#0ea5e9', '#10b981', '#a855f7', '#f59e0b', '#006AFF', '#f43f5e']

  return (
    <section id="features" className="py-28 px-5 bg-[#00071a]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
          className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-white/30 uppercase mb-4">{t.features_eyebrow}</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-white">{t.features_title}</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.features.map(({ title, desc }, i) => {
            const Icon = icons[i]
            return (
              <motion.div key={title}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 cursor-default">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${colors[i]}18`, border: `1px solid ${colors[i]}30` }}>
                  <Icon size={18} style={{ color: colors[i] }} />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const { lang } = useLang()
  const t = T[lang]
  const colors = ['#0ea5e9', '#10b981', '#a855f7']

  return (
    <section className="py-24 px-5 bg-[#020b18]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease }}
          className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-white/25 uppercase mb-4">{t.testimonials_eyebrow}</span>
          <h2 className="text-3xl font-black text-white">{t.testimonials_title}</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {t.testimonials.map(({ quote, name, role }, i) => (
            <motion.div key={name}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${colors[i]}, transparent)` }} />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} size={12} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-5">"{quote}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: `${colors[i]}25`, border: `1px solid ${colors[i]}40` }}>
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

// ─── Pricing ──────────────────────────────────────────────────────────────────
function Pricing() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <section id="pricing" className="py-28 px-5 bg-[#fafaf9]">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease }}
          className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-[0.15em] text-slate-400 uppercase mb-4">{t.pricing_eyebrow}</span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-slate-900">{t.pricing_title}</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {/* Free */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.pricing_free_label}</p>
            <p className="text-4xl font-black text-slate-900 leading-none mb-1">$0</p>
            <p className="text-sm text-slate-400 mb-6">{t.pricing_free_period}</p>
            <ul className="space-y-2.5 mb-6">
              {t.pricing_free_features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={13} className="text-slate-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <a href={STARTED_URL}
              className="block text-center text-sm font-semibold border border-slate-200 rounded-xl py-2.5 text-slate-700 hover:bg-slate-50 transition-colors">
              {t.pricing_free_cta}
            </a>
          </motion.div>
          {/* Recommended */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
            style={{ border: '2px solid #0ea5e9', boxShadow: '0 0 40px rgba(14,165,233,0.12)' }}>
            <div className="p-6 border-b border-slate-100">
              <p className="text-xs font-bold text-[#0ea5e9] uppercase tracking-wider mb-1">{t.pricing_base_label}</p>
              <div className="flex items-end gap-1 mb-1">
                <p className="text-4xl font-black text-slate-900 leading-none">{t.pricing_base_price}</p>
                <p className="text-slate-400 text-sm mb-1">{t.pricing_base_period}</p>
              </div>
              <p className="text-xs text-slate-400 mb-5">{t.pricing_base_note}</p>
              <ul className="space-y-2">
                {t.pricing_base_features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check size={13} className="text-[#0ea5e9] shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-slate-50/80">
              <a href={STARTED_URL}
                className="block text-center text-white font-semibold py-3.5 rounded-xl text-sm"
                style={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)', boxShadow: '0 4px 20px rgba(14,165,233,0.3)' }}>
                {t.pricing_base_cta}
              </a>
              <p className="text-center text-xs text-slate-400 mt-3">{t.pricing_footnote}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const { lang } = useLang()
  const t = T[lang]
  return (
    <section className="py-28 px-5 bg-[#020b18] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-[#0ea5e9] opacity-[0.09] blur-[100px]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-[#10b981] opacity-[0.07] blur-[80px]" />
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.9, ease }}
        className="relative max-w-2xl mx-auto text-center">
        <Logo size={44} />
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.05] mt-6 mb-5 whitespace-pre-line">
          {t.cta_title}
        </h2>
        <p className="text-white/40 text-lg mb-10">{t.cta_sub}</p>
        <motion.a href={STARTED_URL} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 text-white font-bold px-9 py-4 rounded-2xl text-lg"
          style={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)', boxShadow: '0 0 60px rgba(14,165,233,0.3)' }}>
          {t.cta_btn} <ArrowRight size={20} />
        </motion.a>
        <p className="mt-5 text-white/20 text-sm">{t.cta_note}</p>
      </motion.div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { lang } = useLang()
  const t = T[lang]
  return (
    <footer className="bg-[#010810] px-5 py-8 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <Logo size={18} />
          <span className="text-white/40 text-sm font-medium">Alyx<span style={{ color: '#38bdf8', opacity: 0.6 }}>Flow</span></span>
        </div>
        <div className="flex items-center gap-5 text-xs text-white/20">
          {t.footer_links.map((l, i) => (
            <a key={l} href={`#${t.footer_anchors[i]}`} className="hover:text-white/50 transition-colors">{l}</a>
          ))}
          <a href="/" className="hover:text-white/50 transition-colors">Home</a>
          <a href={APP_URL} className="hover:text-white/50 transition-colors">{t.footer_signin}</a>
        </div>
        <p className="text-xs text-white/15">© {new Date().getFullYear()} Alyx<span style={{ color: '#38bdf8', opacity: 0.5 }}>Flow</span>.</p>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EventRentals() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('alyx_lang')
    if (saved) return saved
    return navigator.language?.startsWith('es') ? 'es' : 'en'
  })
  const toggle = () => setLang(l => {
    const next = l === 'en' ? 'es' : 'en'
    localStorage.setItem('alyx_lang', next)
    return next
  })

  useEffect(() => {
    document.title = lang === 'en'
      ? 'Event Rental Business Software — AlyxFlow'
      : 'Software para Negocios de Renta de Eventos — AlyxFlow'
  }, [lang])

  return (
    <LangCtx.Provider value={{ lang, toggle }}>
      <div className="min-h-screen bg-[#020b18]">
        <Navbar />
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <FinalCTA />
        <Footer />
      </div>
    </LangCtx.Provider>
  )
}
