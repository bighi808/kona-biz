import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 flex items-center justify-between transition-all duration-400 ${
        scrolled
          ? "bg-background/92 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <Link
        to="/"
        className="display-font text-2xl tracking-[0.12em] text-gold no-underline"
      >
        KONA.BIZ
      </Link>

      <span className="hidden md:inline text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
        Personal Injury Law Firm Marketing
      </span>

      <Link
        to="/states"
        className="text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/40 px-4 py-2 hover:bg-gold hover:text-background transition-colors no-underline"
      >
        Check Your State
      </Link>
    </nav>
  );
}
