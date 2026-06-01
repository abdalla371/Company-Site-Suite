import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight">
                Smart<span className="text-secondary">Employment</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/70 max-w-xs">
              BARO, TIJAABI, SHAQO HEL. Connecting Somalia's growing workforce with meaningful opportunities.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-secondary">Candidates</h3>
            <ul className="space-y-3">
              <li><Link href="/jobs" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">Find a Job</Link></li>
              <li><Link href="/internship" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">Internship Program</Link></li>
              <li><Link href="/shaqotag" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">Shaqo-Tag</Link></li>
              <li><Link href="/membership" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">Membership</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-secondary">Employers</h3>
            <ul className="space-y-3">
              <li><Link href="/post-job" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link href="/membership" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">HR Policy Consulting</Link></li>
              <li><Link href="/create-account" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">Create Employer Account</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-secondary">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/about#contact" className="text-sm text-primary-foreground/70 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Smart Employment Service. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
