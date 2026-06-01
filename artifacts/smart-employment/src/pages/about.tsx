import { RootLayout } from "@/components/layout/root-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Users, Building, Target, BookOpen } from "lucide-react";

export default function About() {
  return (
    <RootLayout>
      <div className="w-full flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About Smart Employment Service</h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              BARO, TIJAABI, SHAQO HEL. Bridging the gap between Somalia's talent and opportunity.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  We believe that Somalia's greatest resource is its young, dynamic workforce. Our mission is to create a professional, transparent, and efficient platform that connects ambitious job seekers with employers who value talent.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Through our core pillars of learning (Baro), experiencing (Tijaabi), and working (Shaqo Hel), we don't just list jobs—we build careers.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Empowering local talent through structured programs",
                    "Assisting employers with modern HR practices",
                    "Fostering transparency in the hiring process",
                    "Building Somalia's professional network"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-muted rounded-2xl aspect-square flex items-center justify-center border p-8">
                {/* Visual placeholder for an office/team image */}
                <div className="grid grid-cols-2 gap-4 w-full h-full">
                  <div className="bg-background rounded-xl border shadow-sm col-span-2 row-span-2 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="h-16 w-16 text-muted-foreground/30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
              <p className="text-muted-foreground text-lg">Comprehensive solutions for the modern workforce and employers.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Target,
                  title: "Job Matching",
                  desc: "A powerful platform connecting qualified candidates with active vacancies across all sectors."
                },
                {
                  icon: BookOpen,
                  title: "Internships",
                  desc: "Structured programs designed for fresh graduates to gain their first professional experience."
                },
                {
                  icon: Users,
                  title: "Shaqo-Tag",
                  desc: "Work attachment programs for students to apply their academic knowledge in real workplaces."
                },
                {
                  icon: Building,
                  title: "HR Consulting",
                  desc: "Expert guidance for companies on HR policies, structure, and talent acquisition strategies."
                }
              ].map((item, i) => (
                <div key={i} className="bg-background border rounded-xl p-6 text-center hover-elevate">
                  <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mb-10">
              Have questions about our platform or programs? Our team is ready to assist you.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-xl border bg-card">
                <div className="font-bold mb-2">Email</div>
                <div className="text-muted-foreground">info@smartemployment.so</div>
              </div>
              <div className="p-6 rounded-xl border bg-card">
                <div className="font-bold mb-2">Phone</div>
                <div className="text-muted-foreground">+252 61 XXXXXXX</div>
              </div>
              <div className="p-6 rounded-xl border bg-card">
                <div className="font-bold mb-2">Office</div>
                <div className="text-muted-foreground">Maka Al-Mukarama, Mogadishu</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </RootLayout>
  );
}
