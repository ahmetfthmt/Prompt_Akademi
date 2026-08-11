/**
 * Design philosophy: Araştırma Laboratuvarı — navigation doubles as a learning map.
 */
import { Link, useLocation } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, ChevronRight, FlaskConical, Menu, ShieldCheck, Sparkles, X } from "lucide-react";
import { getCompleted, totalLessons } from "@/lib/courseData";

const nav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/dersler", label: "Ders Rotası" },
  { href: "/laboratuvar", label: "Laboratuvar" },
  { href: "/ornek-kutuphanesi", label: "Örnekler" },
  { href: "/model-karsilastirma", label: "Modeller" },
  { href: "/testler", label: "Testler" },
  { href: "/guvenlik", label: "Güvenlik" },
];

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const [location] = useLocation();
  const active = href === "/" ? location === "/" : location.startsWith(href);
  return (
    <Link href={href} onClick={onClick} className={`nav-link ${active ? "active" : ""}`}>
      {label}
    </Link>
  );
}

export function ProgressMini() {
  const [completed, setCompletedState] = useState(0);
  useEffect(() => {
    const refresh = () => setCompletedState(getCompleted().length);
    refresh();
    window.addEventListener("pma-progress", refresh);
    return () => window.removeEventListener("pma-progress", refresh);
  }, []);
  const percent = useMemo(() => Math.round((completed / totalLessons) * 100), [completed]);
  return (
    <div className="progress-mini" aria-label={`İlerleme: yüzde ${percent}`}>
      <span className="progress-mini__rail"><span style={{ width: `${percent}%` }} /></span>
      <strong>{percent}%</strong>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="Prompt Mühendisliği Akademisi ana sayfa">
            <img src="/manus-storage/pma-signal-mark_3169c499.png" alt="" className="brand-mark" />
            <span>
              <span className="brand-top">PROMPT</span>
              <span className="brand-bottom">Mühendisliği Akademisi</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Ana gezinme">
            {nav.map((item) => <NavLink {...item} key={item.href} />)}
          </nav>
          <div className="header-actions">
            <ProgressMini />
            <Link href="/laboratuvar" className="lab-button"><FlaskConical size={16} /> Laboratuvar</Link>
            <button className="mobile-toggle" aria-label="Menüyü aç" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
          </div>
        </div>
        {open && (
          <div className="mobile-nav" role="dialog" aria-label="Mobil menü">
            {nav.map((item) => <NavLink {...item} key={item.href} onClick={() => setOpen(false)} />)}
            <Link href="/kaynaklar" onClick={() => setOpen(false)} className="nav-link">Kaynaklar <ChevronRight size={15} /></Link>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand"><Sparkles size={17} /> Prompt Mühendisliği Akademisi</div>
            <p>Türkçe, uygulamalı ve ölçülebilir prompt tasarımı için açık öğrenme laboratuvarı.</p>
          </div>
          <div className="footer-links">
            <Link href="/dersler"><BookOpen size={15} /> Ders Rotası</Link>
            <Link href="/laboratuvar"><FlaskConical size={15} /> Prompt Laboratuvarı</Link>
            <Link href="/guvenlik"><ShieldCheck size={15} /> Güvenli Uygulama</Link>
            <Link href="/kaynaklar">Kaynaklar <ChevronRight size={15} /></Link>
          </div>
          <p className="footer-note">Bu platformdaki model çıktı panelleri öğrenme amaçlı temsilî örneklerdir. Gerçek kullanımda güncel dokümantasyonu ve sonuçları ayrıca doğrulayın.</p>
        </div>
      </footer>
    </div>
  );
}
