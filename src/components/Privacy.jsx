export default function Privacy() {
  return (
    <div style={{ background: '#050a14', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px' }}>

        {/* Header */}
        <a href="/" style={{ color: '#0ea5e9', fontSize: '14px', textDecoration: 'none' }}>← Back to Alyx</a>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#fff', marginTop: '24px', marginBottom: '8px' }}>
          Privacy Policy
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '40px' }}>
          Last updated: April 13, 2026
        </p>

        <Section title="1. Who we are">
          <p>Alyx ("we", "our", "us") is a business management platform available at <a href="https://app.alyxcli.com" style={link}>app.alyxcli.com</a> and as a mobile/desktop application. We help small businesses manage clients, inventory, schedules, and payments.</p>
        </Section>

        <Section title="2. Information we collect">
          <p>We collect only what is necessary to provide the service:</p>
          <ul style={ul}>
            <li><strong>Account information:</strong> name, email address, and password (hashed) when you register.</li>
            <li><strong>Business data:</strong> clients, inventory items, events, and payment records you create inside the app.</li>
            <li><strong>Usage data:</strong> pages visited, features used, and error logs to improve the product.</li>
            <li><strong>Device information:</strong> browser type, operating system, and app version for troubleshooting.</li>
          </ul>
          <p>We do <strong>not</strong> collect payment card numbers. Payments are processed by Stripe and Square, each with their own privacy policies.</p>
        </Section>

        <Section title="3. How we use your information">
          <ul style={ul}>
            <li>To provide and operate the Alyx service.</li>
            <li>To send transactional emails (password resets, billing receipts).</li>
            <li>To send product updates — you can unsubscribe at any time.</li>
            <li>To detect and prevent fraud or abuse.</li>
            <li>To improve the product based on aggregated, anonymized usage data.</li>
          </ul>
          <p>We do <strong>not</strong> sell your data to third parties.</p>
        </Section>

        <Section title="4. Data storage and security">
          <p>Your data is stored on secure servers provided by Supabase (PostgreSQL) hosted in the United States. We use industry-standard encryption (TLS/HTTPS) for all data in transit and at rest.</p>
          <p>Access to production data is restricted to authorized team members only.</p>
        </Section>

        <Section title="5. Data sharing">
          <p>We share your data only with the following trusted service providers, and only as necessary:</p>
          <ul style={ul}>
            <li><strong>Supabase</strong> — database and authentication</li>
            <li><strong>Vercel</strong> — web hosting</li>
            <li><strong>Stripe</strong> — subscription billing</li>
            <li><strong>Square</strong> — payment processing (if connected)</li>
            <li><strong>Resend</strong> — transactional email delivery</li>
            <li><strong>Sentry</strong> — error monitoring (anonymized)</li>
          </ul>
        </Section>

        <Section title="6. Your rights">
          <p>You have the right to:</p>
          <ul style={ul}>
            <li><strong>Access</strong> all personal data we hold about you.</li>
            <li><strong>Correct</strong> inaccurate data.</li>
            <li><strong>Delete</strong> your account and all associated data.</li>
            <li><strong>Export</strong> your data (available in Settings → Export).</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:privacy@alyxcli.com" style={link}>privacy@alyxcli.com</a>.</p>
        </Section>

        <Section title="7. Data retention">
          <p>We retain your data for as long as your account is active. When you delete your account, all personal data is permanently removed within 30 days.</p>
        </Section>

        <Section title="8. Children">
          <p>Alyx is not intended for users under the age of 18. We do not knowingly collect personal information from children.</p>
        </Section>

        <Section title="9. Changes to this policy">
          <p>We may update this policy from time to time. When we do, we will update the date at the top and notify you via email if the changes are significant.</p>
        </Section>

        <Section title="10. Contact">
          <p>Questions about this policy? Contact us at:</p>
          <p><a href="mailto:privacy@alyxcli.com" style={link}>privacy@alyxcli.com</a></p>
        </Section>

      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '36px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#f1f5f9', marginBottom: '12px' }}>{title}</h2>
      <div style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '15px' }}>{children}</div>
    </div>
  )
}

const link = { color: '#0ea5e9', textDecoration: 'none' }
const ul = { paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }
