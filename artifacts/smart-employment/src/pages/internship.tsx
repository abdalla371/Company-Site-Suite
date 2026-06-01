import { RootLayout } from "@/components/layout/root-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GraduationCap, BookOpen, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Internship() {
  return (
    <RootLayout>
      <div className="w-full flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20 md:py-28 relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-secondary text-primary mb-8">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Start Your Career with a Purpose</h1>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              The Smart Employment Internship Program connects fresh graduates with leading Somali companies for structured, meaningful professional experience.
            </p>
            <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-lg">
              <Link href="/form-internship">Apply for Internship</Link>
            </Button>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Why Join Our Program?</h2>
              <p className="text-muted-foreground text-lg">We don't just find you an office; we find you a launchpad.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Real World Experience",
                  desc: "Work on actual projects that matter. No coffee runs, just hands-on professional development.",
                  icon: Briefcase
                },
                {
                  title: "Mentorship",
                  desc: "Get paired with industry professionals who will guide you through your first steps in the corporate world.",
                  icon: BookOpen
                },
                {
                  title: "Career Pathway",
                  desc: "Many of our interns receive full-time offers after successfully completing their 3-6 month placement.",
                  icon: ChevronRight
                }
              ].map((item, i) => (
                <div key={i} className="bg-muted/30 border rounded-2xl p-8 hover-elevate">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 bg-muted/50 border-y">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">How It Works</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our application process is simple but thorough. We want to understand your skills and aspirations to match you with the right employer.
                </p>
                
                <div className="space-y-6">
                  {[
                    { step: "01", title: "Submit Application", desc: "Fill out the online form with your academic background and CV." },
                    { step: "02", title: "Assessment", desc: "Our team reviews your application against partner requirements." },
                    { step: "03", title: "Interview", desc: "Meet with potential employers who are interested in your profile." },
                    { step: "04", title: "Placement", desc: "Begin your internship journey with a clear learning plan." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="font-mono text-xl font-bold text-primary/30 mt-1">{item.step}</div>
                      <div>
                        <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-background border rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-6">Eligibility Criteria</h3>
                <ul className="space-y-4">
                  {[
                    "Recent graduate (within the last 2 years) or final year student",
                    "Strong academic record in a relevant field",
                    "Excellent communication skills",
                    "Commitment to completing the full internship duration",
                    "Right to work in Somalia"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-8 border-t">
                  <Button asChild className="w-full h-12 text-base">
                    <Link href="/form-internship">Apply Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </RootLayout>
  );
}
