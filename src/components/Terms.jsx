export default function Terms() {
  return (
    <div style={{ background: '#050a14', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 24px' }}>

        <a href="/" style={link}>← Back to Alyx</a>

        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#fff', marginTop: '24px', marginBottom: '8px' }}>
          Terms of Service
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '40px' }}>
          Last updated: April 19, 2026
        </p>

        <Section title="1. Acceptance of terms">
          <p>
            By creating an account or using Alyx ("the Service"), you agree to these Terms of
            Service. If you do not agree, do not use the Service. These terms apply to all users,
            including workspace owners, administrators, employees, and read-only members.
          </p>
        </Section>

        <Section title="2. Description of service">
          <p>
            Alyx is a business management platform that helps small businesses manage clients,
            inventory, events, schedules, and payments. The Service is provided by Alyx
            ("we", "us", "our") and is accessible at{' '}
            <a href="https://app.alyxcli.com" style={link}>app.alyxcli.com</a>.
          </p>
        </Section>

        <Section title="3. Account registration">
          <ul style={ul}>
            <li>You must provide accurate and complete information when creating an account.</li>
            <li>You are responsible for maintaining the security of your account credentials.</li>
            <li>You must notify us immediately of any unauthorized access to your account.</li>
            <li>You must be at least 18 years old to use the Service.</li>
            <li>One person or legal entity may not maintain more than one free account.</li>
          </ul>
        </Section>

        <Section title="4. Subscription and billing">
          <p>
            Alyx offers a free plan and paid plans. Paid plans are billed monthly or annually
            through Stripe. By subscribing to a paid plan, you authorize us to charge your
            payment method on a recurring basis.
          </p>
          <ul style={ul}>
            <li>Prices are listed in USD and may change with 30 days' notice.</li>
            <li>Subscriptions renew automatically unless cancelled before the renewal date.</li>
            <li>Refunds are handled on a case-by-case basis — contact us at{' '}
              <a href="mailto:support@alyxcli.com" style={link}>support@alyxcli.com</a>.
            </li>
            <li>Downgrading your plan takes effect at the end of the current billing cycle.</li>
          </ul>
        </Section>

        <Section title="5. Acceptable use">
          <p>You agree not to use the Service to:</p>
          <ul style={ul}>
            <li>Violate any applicable law or regulation.</li>
            <li>Store, share, or transmit any data that is illegal, harmful, or fraudulent.</li>
            <li>Attempt to gain unauthorized access to any part of the Service or its infrastructure.</li>
            <li>Reverse-engineer, decompile, or otherwise attempt to derive the source code.</li>
            <li>Use the Service to send spam or unsolicited communications.</li>
            <li>Resell or sublicense access to the Service without prior written consent.</li>
          </ul>
        </Section>

        <Section title="6. Your data">
          <p>
            You retain full ownership of all data you input into the Service ("Your Data").
            By using Alyx, you grant us a limited license to store and process Your Data solely
            to provide and improve the Service.
          </p>
          <p>
            We do not sell, rent, or share Your Data with third parties for marketing purposes.
            See our <a href="/privacy" style={link}>Privacy Policy</a> for full details.
          </p>
        </Section>

        <Section title="7. Team members and permissions">
          <p>
            Workspace owners may invite team members with different roles (admin, employee,
            read-only). The workspace owner is responsible for all activity that occurs under
            their workspace, including actions taken by invited members.
          </p>
        </Section>

        <Section title="8. Third-party integrations">
          <p>
            The Service integrates with third-party providers including Stripe, Square, Supabase,
            and Twilio. Your use of these integrations is also governed by their respective terms
            of service and privacy policies. We are not liable for the acts or omissions of
            third-party providers.
          </p>
        </Section>

        <Section title="9. SMS communications">
          <p>
            If you enable SMS reminders, messages will be sent via Twilio on your behalf to your
            clients. You are responsible for obtaining proper consent from your clients before
            sending SMS messages through the Service. See our{' '}
            <a href="/sms-consent" style={link}>SMS Consent</a> page for details.
          </p>
        </Section>

        <Section title="10. Intellectual property">
          <p>
            All software, designs, logos, and content that make up the Service are owned by Alyx
            or its licensors. Nothing in these terms grants you ownership of any intellectual
            property rights in the Service.
          </p>
        </Section>

        <Section title="11. Limitation of liability">
          <p>
            To the maximum extent permitted by law, Alyx shall not be liable for any indirect,
            incidental, special, or consequential damages arising from your use of the Service,
            including but not limited to loss of data, revenue, or profits.
          </p>
          <p>
            Our total liability for any claim arising out of these terms shall not exceed the
            amount you paid us in the 12 months preceding the claim.
          </p>
        </Section>

        <Section title="12. Disclaimer of warranties">
          <p>
            The Service is provided "as is" and "as available" without warranties of any kind,
            express or implied. We do not warrant that the Service will be uninterrupted,
            error-free, or free of harmful components.
          </p>
        </Section>

        <Section title="13. Termination">
          <p>
            We reserve the right to suspend or terminate your account at any time if you violate
            these terms or engage in conduct harmful to other users or the Service. You may
            cancel your account at any time from Settings → Delete Account.
          </p>
          <p>
            Upon termination, your data will be permanently deleted within 30 days.
          </p>
        </Section>

        <Section title="14. Changes to these terms">
          <p>
            We may update these terms from time to time. We will notify you of significant
            changes via email at least 14 days before they take effect. Continued use of the
            Service after changes take effect constitutes your acceptance of the new terms.
          </p>
        </Section>

        <Section title="15. Governing law">
          <p>
            These terms are governed by the laws of the United States. Any disputes shall be
            resolved through binding arbitration, except where prohibited by law.
          </p>
        </Section>

        <Section title="16. Contact">
          <p>
            Questions about these terms? Contact us at:{' '}
            <a href="mailto:support@alyxcli.com" style={link}>support@alyxcli.com</a>
          </p>
        </Section>

        <p style={{ marginTop: '48px', color: '#334155', fontSize: '13px' }}>
          See also:{' '}
          <a href="/privacy" style={link}>Privacy Policy</a>
          {' · '}
          <a href="/sms-consent" style={link}>SMS Consent</a>
        </p>

      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '36px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#f1f5f9', marginBottom: '12px' }}>
        {title}
      </h2>
      <div style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '15px' }}>
        {children}
      </div>
    </div>
  );
}

const link = { color: '#0ea5e9', textDecoration: 'none' };
const ul   = { paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' };
