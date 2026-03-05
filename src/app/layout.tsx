import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Background from '@/components/Background';

export const metadata: Metadata = {
  title: 'Model Radar — Real-time AI Intelligence Hub',
  description: 'Track the latest AI models, pricing, benchmarks, and releases across every major AI lab. Updated automatically every 6 hours.',
  openGraph: {
    title: 'Model Radar',
    description: 'Real-time AI model tracking — pricing, benchmarks, releases.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Background />
        <NavBar />
        <main style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
