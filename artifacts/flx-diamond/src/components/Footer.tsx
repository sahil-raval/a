import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl font-bold tracking-widest text-white">FLX</span>
          </Link>
          <p className="text-sm text-white/70 tracking-widest uppercase">Precision. Trust. Excellence.</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-serif text-lg text-white">Navigation</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/diamonds" className="hover:text-accent transition-colors">Diamonds</Link></li>
            <li><Link href="/jewellery" className="hover:text-accent transition-colors">Jewellery</Link></li>
            <li><Link href="/trade" className="hover:text-accent transition-colors">Trade</Link></li>
            <li><Link href="/investment" className="hover:text-accent transition-colors">Investment</Link></li>
            <li><Link href="/journal" className="hover:text-accent transition-colors">Journal</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-serif text-lg text-white">Contact</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>+91 91042 90971</li>
            <li>+91 99982 17496</li>
            <li>help@flxdiamond.com</li>
            <li>Surat, India</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-serif text-lg text-white">Partners</h4>
          <p className="text-sm text-white/70 leading-relaxed">
            Trusted by industry leaders including KGK Diamond, Venus Jewellery, and Excell Overseas.
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/50">
        <p>&copy; {new Date().getFullYear()} FLX Diamonds. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
