import "./globals.css";
import Link from 'next/link';

export const metadata = {
  title: "BookMyDSLR Admin",
  description: "NextJS Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <aside className="sidebar glass-panel">
            <h2 style={{ marginBottom: '2.5rem', background: 'var(--accent)', WebkitBackgroundClip: 'text', color: 'transparent' }}>BookMyDSLR</h2>
            <nav className="nav-menu">
              <Link href="/" className="nav-link">Overview</Link>
              <Link href="/products" className="nav-link">Products</Link>
              <Link href="/categories" className="nav-link">Categories</Link>
              <Link href="/brands" className="nav-link">Brands</Link>
            </nav>
          </aside>
          <div className="content-area">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
