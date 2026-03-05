'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LiveBadge from './LiveBadge';

const GITHUB_URL = 'https://github.com/saifrahmn/model-radar';

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { href: '/',          label: '🏠 Home' },
  { href: '/models',   label: '🔍 Models' },
  { href: '/pricing',  label: '💰 Pricing' },
  { href: '/compare',  label: '⚡ Compare' },
  { href: '/news',     label: '📡 News' },
  { href: '/timeline', label: '📅 Timeline' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        .nav-gh-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--muted);
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .nav-gh-btn:hover {
          border-color: var(--border2);
          color: var(--text);
          background: rgba(255,255,255,0.08);
        }
      `}</style>

      <nav
        className="glass"
        style={{
          position: 'sticky', top: 0, zIndex: 100,
          borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0,
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 56, gap: 8 }}>
          <Link href="/" style={{ textDecoration: 'none', marginRight: 8 }}>
            <span className="display" style={{ fontSize: 18, fontWeight: 800 }}>
              <span className="gradient-text">Model</span>
              <span style={{ color: 'var(--text)' }}>Radar</span>
            </span>
          </Link>

          <div className="hide-mobile" style={{ display: 'flex', gap: 2 }}>
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <button className={`nav-item${pathname === item.href ? ' active' : ''}`}>
                  {item.label}
                </button>
              </Link>
            ))}
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <LiveBadge />
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="nav-gh-btn">
              <GitHubIcon />
              <span className="hide-mobile">Star on GitHub</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
