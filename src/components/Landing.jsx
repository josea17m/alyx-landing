import { useState, useEffect } from 'react'
import {
  Users, CreditCard, Package, Calendar, Zap, CheckCircle,
  ArrowRight, Menu, X, Star, Shield, BarChart3, Bell,
  FileSpreadsheet, UserCheck, RefreshCw, Webhook, ChevronDown,
  Check, Layers
} from 'lucide-react'

const APP_URL = 'https://damaris-inventory.vercel.app'

// ─── Logo ────────────────────────────────────────────────────────────────────
function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size * 0.96} viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>
    </svg>
  )
}

// ─── Square Logo ─────────────────────────────────────────────────────────────
function SquareLogo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#006AFF"/>
      <rect x="7" y="7" width="10" height="10" rx="1.5" fill="white"/>
    </svg>
  )
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Square', href: '#square' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <Logo size={28} />
          <span className="font-bold text-lg text-slate-900 tracking-tight">alyxCLI</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={APP_URL} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Sign in</a>
          <a href={APP_URL} className="text-sm font-semibold bg-[#863bff] hover:bg-[#6d22e8] text-white px-4 py-2 rounded-lg transition-colors">
            Get started free
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-600">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-5 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700">
              {l.label}
            </a>
          ))}
          <hr className="border-slate-100" />
          <a href={APP_URL} className="text-sm font-medium text-slate-600">Sign in</a>
          <a href={APP_URL} className="text-sm font-semibold bg-[#863bff] text-white px-4 py-2.5 rounded-lg text-center">
            Get started free
          </a>
        </div>
      )}
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-[#0b0514] overflow-hidden pt-32 pb-24 px-5">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#863bff] opacity-[0.15] rounded-full blur-[120px]" />
        <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-[#006AFF] opacity-[0.08] rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <SquareLogo size={16} />
          <span className="text-sm text-white/80 font-medium">Now with Square integration</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
          Run your business,<br />
          <span className="text-[#a76bff]">not spreadsheets.</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          alyxCLI brings clients, payments, inventory, and scheduling into one clean dashboard —
          with real-time Square sync so you never chase down a payment again.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={APP_URL}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#863bff] hover:bg-[#6d22e8] text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-colors shadow-lg shadow-purple-900/40"
          >
            Start for free <ArrowRight size={18} />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-colors"
          >
            See features <ChevronDown size={18} />
          </a>
        </div>

        <p className="mt-5 text-sm text-white/40">Free plan available · No credit card required · Cancel anytime</p>
      </div>

      {/* Dashboard mockup */}
      <div className="relative max-w-5xl mx-auto mt-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden shadow-2xl">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-green-400/60" />
            <div className="ml-3 flex-1 bg-white/10 rounded-md px-3 py-1 text-xs text-white/40">damaris-inventory.vercel.app</div>
          </div>
          {/* Fake dashboard UI */}
          <div className="grid grid-cols-12 min-h-[340px]">
            {/* Sidebar */}
            <div className="col-span-2 bg-[#0f172a] border-r border-white/5 p-3 hidden sm:flex flex-col gap-1">
              <div className="flex items-center gap-2 px-2 py-2 mb-3">
                <Logo size={20} />
                <span className="text-xs font-bold text-white/80">alyxCLI</span>
              </div>
              {['Dashboard', 'Clients', 'Inventory', 'Schedule', 'Settings'].map((item, i) => (
                <div key={item} className={`px-2 py-1.5 rounded-md text-xs font-medium ${i === 0 ? 'bg-[#863bff]/30 text-[#c899ff]' : 'text-white/40'}`}>
                  {item}
                </div>
              ))}
            </div>
            {/* Content */}
            <div className="col-span-12 sm:col-span-10 p-5 bg-[#0f172a]/60">
              <p className="text-xs font-semibold text-white/40 mb-4 uppercase tracking-wider">Dashboard</p>
              {/* Stat cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {[
                  { label: 'Total Clients', value: '148', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                  { label: 'Collected', value: '$4,320', icon: CreditCard, color: 'text-green-400', bg: 'bg-green-400/10' },
                  { label: 'Inventory', value: '63 items', icon: Package, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                  { label: 'This week', value: '8 events', icon: Calendar, color: 'text-orange-400', bg: 'bg-orange-400/10' },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className={`w-7 h-7 ${bg} rounded-lg flex items-center justify-center mb-2`}>
                      <Icon size={14} className={color} />
                    </div>
                    <p className="text-white font-bold text-base leading-none">{value}</p>
                    <p className="text-white/40 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
              {/* Payment rows */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
                  <p className="text-xs font-semibold text-white/60">Recent payments</p>
                  <div className="flex items-center gap-1.5 bg-[#006AFF]/20 border border-[#006AFF]/30 rounded-full px-2 py-0.5">
                    <SquareLogo size={10} />
                    <span className="text-[10px] text-[#5ba3ff] font-semibold">Square synced</span>
                  </div>
                </div>
                {[
                  { name: 'Maria Torres', amount: '$120', status: 'Paid', source: 'Square' },
                  { name: 'Carlos Mendez', amount: '$95', status: 'Paid', source: 'Square' },
                  { name: 'Ana Reyes', amount: '$200', status: 'Pending', source: 'Manual' },
                ].map(({ name, amount, status, source }) => (
                  <div key={name} className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#863bff]/30 flex items-center justify-center text-[10px] font-bold text-[#c899ff]">
                        {name[0]}
                      </div>
                      <span className="text-xs text-white/70">{name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {source === 'Square' && <SquareLogo size={12} />}
                      <span className="text-xs text-white/50">{amount}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${status === 'Paid' ? 'bg-green-400/15 text-green-400' : 'bg-yellow-400/15 text-yellow-400'}`}>
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Glow under mockup */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-[#863bff] opacity-20 blur-2xl rounded-full" />
      </div>
    </section>
  )
}

// ─── Trusted by strip ─────────────────────────────────────────────────────────
function TrustBar() {
  return (
    <div className="bg-slate-50 border-y border-slate-200 py-4 px-5">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-slate-400 text-sm font-medium">
        <span>Payments via</span>
        <div className="flex items-center gap-2 text-slate-600 font-semibold">
          <SquareLogo size={18} />
          Square
        </div>
        <span className="text-slate-300">·</span>
        <div className="flex items-center gap-2 text-slate-600 font-semibold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#635BFF"/><path d="M11.198 8.667c0-.656.54-.91 1.432-.91 1.28 0 2.895.387 4.175 1.078V5.264A11.09 11.09 0 0 0 12.63 4.5c-3.734 0-6.213 1.951-6.213 5.207 0 5.077 6.993 4.265 6.993 6.453 0 .775-.676 1.027-1.617 1.027-1.396 0-3.186-.572-4.597-1.343v3.627c1.57.677 3.154 1.029 4.597 1.029 3.8 0 6.413-1.875 6.413-5.178-.016-5.48-7.008-4.507-7.008-6.655z" fill="white"/></svg>
          Stripe
        </div>
        <span className="text-slate-300">·</span>
        <div className="flex items-center gap-2 text-slate-600 font-semibold">
          <Shield size={16} className="text-green-500" />
          SSL Secured
        </div>
        <span className="text-slate-300">·</span>
        <div className="flex items-center gap-2 text-slate-600 font-semibold">
          <Zap size={16} className="text-[#863bff]" />
          Real-time sync
        </div>
      </div>
    </div>
  )
}

// ─── Features ────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    {
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      title: 'Client Management',
      desc: 'Full client directory with contact info, payment methods, billing day, and a complete payment history calendar. Never lose track of who owes what.',
      bullets: ['Monthly payment tracking', 'WhatsApp & SMS reminders', 'PDF payment reports', 'Collection alerts'],
    },
    {
      icon: CreditCard,
      color: 'bg-green-50 text-green-600',
      title: 'Payments & Billing',
      desc: 'Mark payments, track what\'s collected vs pending, and send automated reminders. Integrates with Square for zero-effort reconciliation.',
      bullets: ['One-click payment marking', 'Overdue alerts', 'Monthly cash flow reports', 'Square auto-sync'],
    },
    {
      icon: Package,
      color: 'bg-purple-50 text-purple-600',
      title: 'Inventory',
      desc: 'Catalog every item, track stock levels, assign to events, and know exactly what\'s available at any time — with Excel import for easy setup.',
      bullets: ['Stock level tracking', 'Event item assignment', 'Availability checker', 'Excel import/export'],
    },
    {
      icon: Calendar,
      color: 'bg-orange-50 text-orange-600',
      title: 'Schedule & Events',
      desc: 'Book appointments, visits, and rentals in a visual calendar. Recurring events, status tracking, and automatic availability checking built in.',
      bullets: ['Visual calendar view', 'Recurring events', 'Inventory availability', 'Event status workflow'],
    },
    {
      icon: BarChart3,
      color: 'bg-rose-50 text-rose-600',
      title: 'Dashboard & Reports',
      desc: 'At a glance: revenue, active clients, upcoming schedule, and inventory usage. All your KPIs without building a single spreadsheet.',
      bullets: ['Revenue metrics', 'Top items ranking', 'Collection rate', 'Upcoming events preview'],
    },
    {
      icon: UserCheck,
      color: 'bg-teal-50 text-teal-600',
      title: 'Team & Roles',
      desc: 'Add employees with granular roles — Owner, Admin, Employee, or Read-only. Everyone sees exactly what they need.',
      bullets: ['4 role levels', 'Module visibility control', 'Activity audit log', 'Multi-workspace ready'],
    },
  ]

  return (
    <section id="features" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#863bff]/10 text-[#863bff] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Features</span>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Everything your business needs</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            One subscription, every tool. No more jumping between apps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, color, title, desc, bullets }) => (
            <div key={title} className="border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition-all group">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color} mb-4`}>
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
              <ul className="space-y-1.5">
                {bullets.map(b => (
                  <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check size={14} className="text-[#863bff] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Square section ───────────────────────────────────────────────────────────
function SquareSection() {
  const benefits = [
    {
      icon: RefreshCw,
      title: 'Auto-sync payments',
      desc: 'When a client pays through Square, alyxCLI marks them as paid instantly. No manual entry, no reconciliation at end of month.',
    },
    {
      icon: Webhook,
      title: 'Real-time webhooks',
      desc: 'Webhooks fire the moment a Square payment completes — your dashboard updates in seconds, not hours.',
    },
    {
      icon: Users,
      title: 'Client matching',
      desc: 'alyxCLI matches Square payments to your clients automatically — by Square customer ID or by amount. Either way, it just works.',
    },
    {
      icon: Bell,
      title: 'No duplicate reminders',
      desc: 'Already paid via Square? alyxCLI skips the reminder. Only truly unpaid clients get a nudge.',
    },
  ]

  return (
    <section id="square" className="py-24 px-5 bg-[#001a4d] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#006AFF] opacity-[0.12] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#863bff] opacity-[0.08] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2.5 bg-[#006AFF]/20 border border-[#006AFF]/30 rounded-full px-4 py-2 mb-8">
              <SquareLogo size={18} />
              <span className="text-sm text-[#5ba3ff] font-semibold">Square Integration</span>
            </div>

            <h2 className="text-4xl font-black text-white mb-5 leading-tight">
              Already using Square?<br />
              <span className="text-[#5ba3ff]">You're going to love this.</span>
            </h2>

            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Connect your Square account in one click. From that moment on, every payment your clients make through Square is automatically reflected in alyxCLI — no double entry, no guesswork.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="w-9 h-9 bg-[#006AFF]/20 border border-[#006AFF]/20 rounded-lg flex items-center justify-center mb-3">
                    <Icon size={16} className="text-[#5ba3ff]" />
                  </div>
                  <p className="font-semibold text-white text-sm mb-1">{title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <a href={APP_URL} className="inline-flex items-center gap-2 bg-[#006AFF] hover:bg-[#0052cc] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              <SquareLogo size={18} />
              Connect Square free
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right — visual */}
          <div className="flex flex-col gap-4">
            {/* Step 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 bg-[#006AFF] rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <p className="text-white font-semibold text-sm">Client pays via Square</p>
              </div>
              <div className="bg-[#006AFF]/10 border border-[#006AFF]/20 rounded-xl p-3 flex items-center gap-3">
                <SquareLogo size={28} />
                <div>
                  <p className="text-xs font-semibold text-white/80">Square payment completed</p>
                  <p className="text-xs text-white/40">Maria Torres · $120.00 · Just now</p>
                </div>
                <span className="ml-auto text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">COMPLETED</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <ArrowRight size={14} className="text-white/40 rotate-90" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 bg-[#863bff] rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <p className="text-white font-semibold text-sm">alyxCLI updates instantly</p>
              </div>
              <div className="space-y-2">
                {['Maria Torres', 'Carlos Mendez', 'Ana Reyes'].map((name, i) => (
                  <div key={name} className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2">
                    <div className="w-6 h-6 rounded-full bg-[#863bff]/30 flex items-center justify-center text-[10px] font-bold text-[#c899ff]">{name[0]}</div>
                    <span className="text-xs text-white/70 flex-1">{name}</span>
                    {i === 0 && <SquareLogo size={12} />}
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${i < 2 ? 'bg-green-400/15 text-green-400' : 'bg-yellow-400/15 text-yellow-400'}`}>
                      {i < 2 ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Reminder automatically skipped</p>
                  <p className="text-xs text-white/40">Maria already paid — no notification sent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
const ADD_ONS = [
  { key: 'inventory', icon: Package, label: 'Inventory', desc: 'Items, stock & categories', price: 12, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  { key: 'schedule', icon: Calendar, label: 'Schedule', desc: 'Appointments, visits & rentals', price: 12, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  { key: 'advanced', icon: FileSpreadsheet, label: 'Advanced Fields', desc: 'Policies, renewals & lead status', price: 6, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' },
]

function Pricing() {
  const [selected, setSelected] = useState({ inventory: false, schedule: false, advanced: false })
  const total = 19 + ADD_ONS.reduce((sum, a) => sum + (selected[a.key] ? a.price : 0), 0)

  const toggle = key => setSelected(s => ({ ...s, [key]: !s[key] }))

  return (
    <section id="pricing" className="py-24 px-5 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#863bff]/10 text-[#863bff] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Pricing</span>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Pay only for what you use</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Start with the base and add modules as your business grows.</p>
        </div>

        <div className="grid lg:grid-cols-[260px,1fr] gap-6 lg:max-w-[820px] lg:mx-auto">
          {/* Free card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col lg:sticky lg:top-24 self-start">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Free</p>
            <p className="text-4xl font-black text-slate-900 mb-1">$0</p>
            <p className="text-sm text-slate-400 mb-5">Forever free</p>
            <ul className="space-y-2.5 mb-6 flex-1">
              {['Up to 20 clients', 'Basic dashboard', 'Team with roles', 'Automatic backups'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={14} className="text-slate-400 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <a href={APP_URL} className="block text-center text-sm font-semibold border border-slate-200 rounded-xl py-2.5 text-slate-700 hover:bg-slate-50 transition-colors">
              Get started free
            </a>
          </div>

          {/* Modular builder */}
          <div className="bg-white border-2 border-[#863bff] rounded-2xl overflow-hidden">
            {/* Base */}
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Layers size={16} className="text-[#863bff]" />
                    <p className="font-bold text-slate-900">Base plan</p>
                    <span className="text-xs bg-[#863bff]/10 text-[#863bff] font-semibold px-2 py-0.5 rounded-full">Required</span>
                  </div>
                  <p className="text-sm text-slate-500">Unlimited clients, payments, dashboard & multi-user roles</p>
                </div>
                <p className="text-2xl font-black text-slate-900 shrink-0">$19<span className="text-sm font-normal text-slate-400">/mo</span></p>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4">
                {['Unlimited clients', 'Payment tracking', 'Dashboard & reports', 'Multi-user roles', 'Backups', 'Square sync'].map(f => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-slate-600">
                    <CheckCircle size={12} className="text-[#863bff] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add-ons */}
            <div className="p-6 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Add-on modules</p>
              <div className="space-y-3">
                {ADD_ONS.map(({ key, icon: Icon, label, desc, price, color, bg, border }) => (
                  <button
                    key={key}
                    onClick={() => toggle(key)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${selected[key] ? `${border} ${bg}` : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                  >
                    <div className={`w-9 h-9 ${selected[key] ? bg : 'bg-slate-100'} rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon size={18} className={selected[key] ? color : 'text-slate-400'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${selected[key] ? 'text-slate-900' : 'text-slate-600'}`}>{label}</p>
                      <p className="text-xs text-slate-400 truncate">{desc}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-700 shrink-0">+${price}/mo</p>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected[key] ? 'bg-[#863bff] border-[#863bff]' : 'border-slate-300'}`}>
                      {selected[key] && <Check size={11} className="text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Total + CTA */}
            <div className="p-6 bg-slate-50">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-slate-700">Your total</p>
                <div className="text-right">
                  <p className="text-3xl font-black text-slate-900">${total}<span className="text-base font-normal text-slate-400">/mo</span></p>
                  <p className="text-xs text-slate-400">billed monthly · cancel anytime</p>
                </div>
              </div>
              <a href={APP_URL} className="block text-center bg-[#863bff] hover:bg-[#6d22e8] text-white font-semibold py-3 rounded-xl text-sm transition-colors">
                Get started — ${total}/mo
              </a>
              <p className="text-center text-xs text-slate-400 mt-3">No setup fee · Powered by Stripe · Secure checkout</p>
            </div>
          </div>
        </div>

        {/* Feature comparison note */}
        <p className="text-center text-sm text-slate-400 mt-8">
          All paid plans include Square integration, unlimited data, and priority support.
        </p>
      </div>
    </section>
  )
}

// ─── Social proof ─────────────────────────────────────────────────────────────
function SocialProof() {
  const stats = [
    { value: '500+', label: 'Businesses managed' },
    { value: '$2M+', label: 'Payments tracked' },
    { value: '10k+', label: 'Clients on record' },
    { value: '99.9%', label: 'Uptime' },
  ]

  const testimonials = [
    {
      quote: "I used to spend 2 hours a month reconciling Square with my spreadsheet. Now alyxCLI does it automatically. I don't even think about it.",
      name: 'Sandra M.',
      role: 'Event decorator, Miami FL',
    },
    {
      quote: "The schedule + inventory combo is a game changer for our rental business. We know exactly what items are booked and what's available.",
      name: 'Roberto V.',
      role: 'Party rental, Dallas TX',
    },
    {
      quote: "My clients love that I send professional reminders. The WhatsApp integration alone is worth it.",
      name: 'Carmen R.',
      role: 'Insurance agent, Houston TX',
    },
  ]

  return (
    <section className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-4xl font-black text-slate-900 mb-1">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role }) => (
            <div key={name} className="border border-slate-200 rounded-2xl p-6">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-5">"{quote}"</p>
              <div>
                <p className="font-semibold text-slate-900 text-sm">{name}</p>
                <p className="text-slate-400 text-xs">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-24 px-5 bg-[#0b0514] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#863bff] opacity-[0.12] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        <Logo size={48} />
        <h2 className="text-4xl md:text-5xl font-black text-white mt-6 mb-4">
          Start managing smarter today.
        </h2>
        <p className="text-white/50 text-lg mb-10">
          Free plan available. No credit card. Connect Square in minutes.
        </p>
        <a
          href={APP_URL}
          className="inline-flex items-center gap-2 bg-[#863bff] hover:bg-[#6d22e8] text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg shadow-purple-900/40"
        >
          Get started free <ArrowRight size={20} />
        </a>
        <p className="mt-5 text-white/30 text-sm">alyxCLI · Built for small businesses in the USA</p>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#050209] px-5 py-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <Logo size={22} />
          <span className="text-white/60 text-sm font-medium">alyxCLI</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-white/30">
          <a href="#features" className="hover:text-white/60 transition-colors">Features</a>
          <a href="#square" className="hover:text-white/60 transition-colors">Square</a>
          <a href="#pricing" className="hover:text-white/60 transition-colors">Pricing</a>
          <a href={APP_URL} className="hover:text-white/60 transition-colors">Sign in</a>
        </div>
        <p className="text-xs text-white/20">© {new Date().getFullYear()} alyxCLI. All rights reserved.</p>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustBar />
      <Features />
      <SquareSection />
      <Pricing />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  )
}
