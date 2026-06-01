import { RootLayout } from "@/components/layout/root-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Briefcase, BookOpen, User, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Shaqotag() {
  return (
    <RootLayout>
      <div className="w-full flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20 md:py-28 relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-secondary text-primary mb-8">
              <Briefcase className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Shaqo-Tag Program</h1>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Work attachment opportunities for students. Apply classroom knowledge in a real professional environment.
            </p>
            <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-lg">
              <Link href="/form-shaqotag">Apply for Shaqo-Tag</Link>
            </Button>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Bridging Theory and Practice</h2>
              <p className="text-muted-foreground text-lg">Designed for active students who want a head start.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Academic Credit",
                  desc: "Fulfill university requirements while gaining practical insights into your chosen field.",
                  icon: BookOpen
                },
                {
                  title: "Professional Network",
                  desc: "Start building your contact base before you even graduate.",
                  icon: User
                },
                {
                  title: "Skill Translation",
                  desc: "Learn how academic theories apply to everyday business operations and problem solving.",
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

        {/* Who Qualifies */}
        <section className="py-24 bg-muted/50 border-y">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Who Qualifies?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  The Shaqo-Tag program requires dedication and a willingness to learn in a fast-paced environment.
                </p>
                <ul className="space-y-4">
                  {[
                    "Currently enrolled university students",
                    "Requires a university recommendation letter",
                    "Available for minimum 15 hours per week",
                    "Relevant coursework completed",
                    "High motivation and adaptability"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-3xl font-bold mb-4">Ready to start?</h3>
                <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
                  Take the first step towards your professional future. Submit your application today.
                </p>
                <Button asChild variant="secondary" size="lg" className="h-14 px-8 w-full sm:w-auto">
                  <Link href="/form-shaqotag">Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </RootLayout>
  );
}
