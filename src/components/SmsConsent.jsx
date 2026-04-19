export default function SmsConsent() {
  return (
    <div style={{ background: '#050a14', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px' }}>

        <a href="/" style={{ color: '#0ea5e9', fontSize: '14px', textDecoration: 'none' }}>← Back to Alyx</a>

        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#fff', marginTop: '24px', marginBottom: '8px' }}>
          SMS Consent
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '40px' }}>
          Last updated: April 19, 2026
        </p>

        <Section title="How we use SMS">
          <p>
            By providing your phone number, you agree to receive transactional SMS messages
            related to your account, including payment reminders, event notifications, and
            policy renewal reminders.
          </p>
        </Section>

        <Section title="Message frequency">
          <p>Message frequency varies. Message and data rates may apply.</p>
        </Section>

        <Section title="How to opt out">
          <p>
            Reply <strong style={{ color: '#fff' }}>STOP</strong> to unsubscribe at any time.
            Reply <strong style={{ color: '#fff' }}>HELP</strong> for help.
          </p>
        </Section>

        <Section title="No marketing messages">
          <p>We do not send marketing or promotional messages.</p>
        </Section>

        <Section title="Contact">
          <p>
            For questions about SMS communications, contact us at{' '}
            <a href="mailto:support@alyxcli.com" style={link}>support@alyxcli.com</a>.
          </p>
        </Section>

        <p style={{ marginTop: '48px', color: '#334155', fontSize: '13px' }}>
          See also:{' '}
          <a href="/privacy" style={link}>Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
        {title}
      </h2>
      <div style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.7' }}>
        {children}
      </div>
    </div>
  );
}

const link = { color: '#0ea5e9', textDecoration: 'none' };
