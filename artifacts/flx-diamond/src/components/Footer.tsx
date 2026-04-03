import { Link } from "wouter";

export function Footer() {
  return (
    <footer style={{ background: "#02274A" }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* Brand column */}
        <div className="md:col-span-1 space-y-5">
          <Link href="/" className="inline-flex items-baseline gap-3" data-testid="footer-logo">
            <span className="font-serif text-3xl font-semibold tracking-[0.18em]" style={{ color: "#C9A227" }}>FLX</span>
            <span className="text-[9px] tracking-[0.35em]" style={{ color: "rgba(201,162,39,0.6)" }}>DIAMONDS</span>
          </Link>
          <div>
            <span className="gold-line mb-4" />
            <p className="text-xs tracking-[0.22em] text-white/50 uppercase mt-4">Precision. Trust. Excellence.</p>
          </div>
          <p className="text-xs text-white/35 leading-relaxed max-w-[180px]">
            B2B diamond sourcing and IF→FL conversion specialists. Geelong, Victoria.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-5">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Navigation</h4>
          <ul className="space-y-3 text-sm">
            {[
              { href: "/diamonds",   label: "Diamonds" },
              { href: "/jewellery",  label: "Jewellery" },
              { href: "/trade",      label: "Trade" },
              { href: "/investment", label: "Investment" },
              { href: "/about",      label: "About" },
              { href: "/journal",    label: "Journal" },
              { href: "/contact",    label: "Contact" },
            ].map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/55 hover:text-white transition-colors text-xs tracking-wide"
                  data-testid={`footer-link-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-5">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Contact</h4>
          <ul className="space-y-3 text-xs text-white/55 leading-relaxed">
            <li>+91 91042 90971</li>
            <li>+91 99982 17496</li>
            <li style={{ color: "rgba(201,162,39,0.75)" }}>help@flxdiamond.com</li>
            <li className="pt-1 text-white/35">Geelong, VIC, Australia</li>
          </ul>
        </div>

        {/* Partners */}
        <div className="space-y-5">
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Trusted By</h4>
          <ul className="space-y-3 text-xs text-white/55">
            <li>KGK Diamond</li>
            <li>Venus Jewellery</li>
            <li>Excell Overseas</li>
          </ul>
          <p className="text-xs text-white/30 leading-relaxed pt-2">
            All enquiries handled under strict confidentiality.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 max-w-7xl mx-auto px-6 py-7 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} FLX Diamonds. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
