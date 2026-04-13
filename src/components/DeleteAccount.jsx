export default function DeleteAccount() {
  return (
    <div style={{ background: '#050a14', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 24px' }}>

        <a href="/" style={{ color: '#0ea5e9', fontSize: '14px', textDecoration: 'none' }}>← Back to Alyx</a>

        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', marginTop: '24px', marginBottom: '8px' }}>
          Delete your account
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '40px' }}>
          We're sorry to see you go.
        </p>

        {/* Option 1 — In-app */}
        <div style={card}>
          <h2 style={h2}>Option 1 — From the app (fastest)</h2>
          <p style={body}>
            Sign in to <a href="https://app.alyxcli.com" style={link}>app.alyxcli.com</a> →
            go to <strong style={{ color: '#f1f5f9' }}>Settings → Account → Delete account</strong>.
          </p>
          <p style={body}>
            Your account and all associated data will be permanently deleted within <strong style={{ color: '#f1f5f9' }}>30 days</strong>.
          </p>
        </div>

        {/* Option 2 — Email */}
        <div style={card}>
          <h2 style={h2}>Option 2 — Email us</h2>
          <p style={body}>
            Send an email to{' '}
            <a href="mailto:privacy@alyxcli.com?subject=Account deletion request" style={link}>
              privacy@alyxcli.com
            </a>{' '}
            with the subject <strong style={{ color: '#f1f5f9' }}>"Account deletion request"</strong> from the email address associated with your account.
          </p>
          <p style={body}>
            We will confirm deletion and remove all your data within <strong style={{ color: '#f1f5f9' }}>30 days</strong>.
          </p>
        </div>

        {/* What gets deleted */}
        <div style={{ marginTop: '32px' }}>
          <h2 style={h2}>What gets deleted</h2>
          <ul style={{ color: '#94a3b8', lineHeight: '1.8', paddingLeft: '20px', fontSize: '15px' }}>
            <li>Your profile (name, email, password)</li>
            <li>All clients, inventory items, events, and records you created</li>
            <li>Payment history and billing information</li>
            <li>All workspace settings and preferences</li>
          </ul>
          <p style={{ ...body, marginTop: '12px' }}>
            Some anonymized, aggregated usage data (no personal identifiers) may be retained for product analytics.
          </p>
        </div>

      </div>
    </div>
  )
}

const card = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '16px',
}
const h2 = { fontSize: '16px', fontWeight: '600', color: '#f1f5f9', marginBottom: '10px', marginTop: 0 }
const body = { color: '#94a3b8', lineHeight: '1.7', fontSize: '15px', margin: '0 0 8px 0' }
const link = { color: '#0ea5e9', textDecoration: 'none' }
