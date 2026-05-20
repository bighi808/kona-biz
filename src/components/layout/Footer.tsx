import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-wrap items-start justify-between gap-8">
        <div>
          <p className="display-font text-2xl tracking-[0.1em] text-muted-foreground">PLAINTIFF GROWTH</p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-3 leading-relaxed">
            Personal Injury Marketing Specialists
            <br />
            One Client Per State &nbsp;&bull;&nbsp; Kona, Hawaii
            <br />
            &copy; 2026 Plaintiff Growth. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          <Link to="/about" className="hover:text-gold transition-colors">About</Link>
          <Link to="/services" className="hover:text-gold transition-colors">Services</Link>
          <Link to="/states" className="hover:text-gold transition-colors">States</Link>
          <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
          <Link to="/sitemap" className="hover:text-gold transition-colors">Sitemap</Link>
          <Link to="/privacy-policy" className="hover:text-gold transition-colors">Privacy</Link>
          <Link to="/terms-and-conditions" className="hover:text-gold transition-colors">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
