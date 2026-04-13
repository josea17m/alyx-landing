import { motion } from 'framer-motion'
import { Monitor, Globe, Apple, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const GITHUB_RELEASE = 'https://github.com/josea17m/damaris-inventory/releases/latest/download'
const APP_URL = 'https://app.alyxcli.com'
const ease = [0.22, 1, 0.36, 1]

function WindowsLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.851"/>
    </svg>
  )
}

function AppleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

const options = [
  {
    id: 'mac-silicon',
    icon: AppleLogo,
    title: 'macOS Apple Silicon',
    subtitle: 'MacBook Air / Pro M1, M2, M3, M4',
    href: `${GITHUB_RELEASE}/Alyx_0.1.1_aarch64.dmg`,
    accent: '#a855f7',
    accentSoft: 'rgba(168,85,247,0.12)',
    accentBorder: 'rgba(168,85,247,0.25)',
    badge: null,
    isDownload: true,
  },
  {
    id: 'mac-intel',
    icon: AppleLogo,
    title: 'macOS Intel',
    subtitle: 'MacBook / iMac with Intel processor',
    href: `${GITHUB_RELEASE}/Alyx_0.1.1_x64.dmg`,
    accent: '#a855f7',
    accentSoft: 'rgba(168,85,247,0.08)',
    accentBorder: 'rgba(168,85,247,0.18)',
    badge: null,
    isDownload: true,
  },
  {
    id: 'windows',
    icon: WindowsLogo,
    title: 'Windows',
    subtitle: 'Windows 10 / 11 · 64-bit',
    href: `${GITHUB_RELEASE}/Alyx_0.1.1_x64_en-US.msi`,
    accent: '#0ea5e9',
    accentSoft: 'rgba(14,165,233,0.12)',
    accentBorder: 'rgba(14,165,233,0.25)',
    badge: null,
    isDownload: true,
  },
  {
    id: 'web',
    icon: Globe,
    title: 'Continue on Web',
    subtitle: 'No install needed · Works on any browser',
    href: APP_URL,
    accent: '#10b981',
    accentSoft: 'rgba(16,185,129,0.12)',
    accentBorder: 'rgba(16,185,129,0.25)',
    badge: 'Recommended',
    isDownload: false,
  },
]

export default function GetStarted() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ background: '#050a14' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)' }} />
      </div>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        Back
      </motion.button>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-2.5 mb-10"
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #0ea5e9, #a855f7)' }}>
          <Monitor size={18} className="text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">Alyx</span>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease, delay: 0.05 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
          How do you want to use Alyx?
        </h1>
        <p className="text-white/45 text-base max-w-sm mx-auto">
          Download the desktop app or open it in your browser — same account, everywhere.
        </p>
      </motion.div>

      {/* Options grid */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt, i) => {
          const Icon = opt.icon
          return (
            <motion.a
              key={opt.id}
              href={opt.href}
              download={opt.isDownload ? true : undefined}
              target={opt.isDownload ? '_self' : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.1 + i * 0.07 }}
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center gap-4 p-5 rounded-2xl cursor-pointer group transition-colors"
              style={{
                background: opt.accentSoft,
                border: `1px solid ${opt.accentBorder}`,
              }}
            >
              {/* Badge */}
              {opt.badge && (
                <span
                  className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: opt.accentSoft, color: opt.accent, border: `1px solid ${opt.accentBorder}` }}
                >
                  {opt.badge}
                </span>
              )}

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${opt.accent}22`, color: opt.accent }}
              >
                <Icon />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">{opt.title}</p>
                <p className="text-white/40 text-xs mt-0.5 leading-snug">{opt.subtitle}</p>
              </div>

              {/* Arrow */}
              <div
                className="ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: opt.accent }}
              >
                <ArrowLeft size={15} className="rotate-180" />
              </div>
            </motion.a>
          )
        })}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-8 text-white/25 text-xs text-center"
      >
        Already have an account?{' '}
        <a href={APP_URL} className="text-white/50 hover:text-white/80 transition-colors underline underline-offset-2">
          Sign in
        </a>
      </motion.p>
    </div>
  )
}
