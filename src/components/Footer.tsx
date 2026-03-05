const GITHUB_URL = 'https://github.com/saifrahmn/model-radar';

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const CONTRIBUTE_LINKS = [
  { label: '🐛 Report a bug', href: `${GITHUB_URL}/issues/new?template=bug_report.md` },
  { label: '✨ Request a feature', href: `${GITHUB_URL}/issues/new?template=feature_request.md` },
  { label: '➕ Add a model', href: `${GITHUB_URL}/blob/main/CONTRIBUTING.md#adding-models` },
  { label: '📖 Improve docs', href: `${GITHUB_URL}/blob/main/CONTRIBUTING.md` },
  { label: '🔀 Submit a PR', href: `${GITHUB_URL}/pulls` },
];

const RESOURCE_LINKS = [
  { label: '📄 Documentation', href: `${GITHUB_URL}#readme` },
  { label: '🗄️ Database schema', href: `${GITHUB_URL}/blob/main/schema.sql` },
  { label: '🚀 Deploy guide', href: `${GITHUB_URL}#deploy-to-vercel` },
  { label: '🔌 API reference', href: `${GITHUB_URL}#api-routes` },
  { label: '📜 Changelog', href: `${GITHUB_URL}/releases` },
];

export default function Footer() {
  return (
    <>
      {/* Inline CSS for footer link hover — avoids needing 'use client' */}
      <style>{`
        .footer-link {
          display: block;
          font-size: 13px;
          color: var(--muted);
          text-decoration: none;
          margin-bottom: 8px;
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--accent); }
        .footer-gh-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border2);
          border-radius: 8px;
          color: var(--text);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s;
        }
        .footer-gh-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: var(--accent);
        }
      `}</style>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 24px 32px', marginTop: 60, position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Top row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginBottom: 40 }} className="grid-3">

            {/* Brand */}
            <div>
              <div className="display gradient-text" style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Model Radar</div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16 }}>
                Open-source, community-driven AI model intelligence hub. Track pricing, benchmarks, and releases across every major AI lab.
              </p>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="footer-gh-btn">
                <GitHubIcon />
                View on GitHub
              </a>
            </div>

            {/* Contribute */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>Contribute</div>
              {CONTRIBUTE_LINKS.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="footer-link">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Resources */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>Resources</div>
              {RESOURCE_LINKS.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="footer-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Open source callout */}
          <div style={{
            background: 'rgba(124,106,247,0.06)',
            border: '1px solid rgba(124,106,247,0.15)',
            borderRadius: 12,
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 32,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>🌟</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Model Radar is open source</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  Built by the community, for the community. MIT licensed — fork it, self-host it, improve it.
                </div>
              </div>
            </div>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: 'none', whiteSpace: 'nowrap', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <GitHubIcon />
              Star the repo
            </a>
          </div>

          {/* Bottom bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              MIT License · {new Date().getFullYear()} Model Radar contributors
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              Data from OpenAI · Anthropic · Google AI · HuggingFace · GitHub · RSS feeds
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
