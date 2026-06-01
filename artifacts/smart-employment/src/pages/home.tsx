import { RootLayout } from "@/components/layout/root-layout";
import { 
  useGetSiteSummary, 
  useListFeaturedJobs, 
  useListCompanies,
  getGetSiteSummaryQueryKey,
  getListFeaturedJobsQueryKey,
  getListCompaniesQueryKey
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { JobCard } from "@/components/job-card";
import { CompanyCard } from "@/components/company-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Briefcase, Users, Building, GraduationCap, ChevronRight } from "lucide-react";

export default function Home() {
  const { data: siteSummary, isLoading: isSummaryLoading } = useGetSiteSummary({
    query: { queryKey: getGetSiteSummaryQueryKey() }
  });
  
  const { data: featuredJobs, isLoading: isJobsLoading } = useListFeaturedJobs({
    query: { queryKey: getListFeaturedJobsQueryKey() }
  });
  
  const { data: topCompanies, isLoading: isCompaniesLoading } = useListCompanies({
    query: { queryKey: getListCompaniesQueryKey() }
  });

  return (
    <RootLayout>
      <div className="w-full flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Somalia's Premier <span className="text-secondary">Employment</span> Platform
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 font-medium max-w-2xl">
                BARO, TIJAABI, SHAQO HEL. We connect ambitious talent with top companies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-lg">
                  <Link href="/jobs">
                    <Search className="mr-2 h-5 w-5" /> Find a Job
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground hover:text-primary-foreground">
                  <Link href="/post-job">Post a Job</Link>
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-6 text-sm text-primary-foreground/60 font-medium">
                <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-secondary" /> Direct Employer Access</span>
                <span className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-secondary" /> Student Opportunities</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50 text-center">
              {isSummaryLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))
              ) : (
                <>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-primary mb-2">{siteSummary?.totalJobs || 0}+</span>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Jobs</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-primary mb-2">{siteSummary?.totalCompanies || 0}+</span>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Companies</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-primary mb-2">{siteSummary?.totalMembers || 0}+</span>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Members</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-primary mb-2">{siteSummary?.totalApplications || 0}+</span>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Applications</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Opportunities</h2>
                <p className="text-muted-foreground text-lg">Hand-picked roles from top employers</p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex group">
                <Link href="/jobs">
                  View all jobs <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isJobsLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-64 border rounded-xl p-4 flex flex-col gap-4">
                    <div className="flex gap-4">
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                    <Skeleton className="h-16 w-full mt-auto" />
                  </div>
                ))
              ) : featuredJobs && featuredJobs.length > 0 ? (
                featuredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed rounded-xl">
                  No featured jobs available at the moment.
                </div>
              )}
            </div>
            
            <Button asChild variant="outline" className="w-full mt-8 sm:hidden">
              <Link href="/jobs">View all jobs</Link>
            </Button>
          </div>
        </section>

        {/* Programs Overview */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">More Than Just Jobs</h2>
              <p className="text-primary-foreground/80 text-lg">
                We offer dedicated programs to help you learn, experience, and land your dream role.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
                <div className="h-14 w-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Internship Program</h3>
                <p className="text-primary-foreground/70 mb-6 leading-relaxed">
                  Start your career with structured internships at leading Somali companies. Perfect for recent graduates.
                </p>
                <Link href="/internship" className="font-semibold text-secondary flex items-center group-hover:underline">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
                <div className="h-14 w-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Shaqo-Tag</h3>
                <p className="text-primary-foreground/70 mb-6 leading-relaxed">
                  Work attachment program designed to give you practical, hands-on experience in your specific field of study.
                </p>
                <Link href="/shaqotag" className="font-semibold text-secondary flex items-center group-hover:underline">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
                <div className="h-14 w-14 rounded-xl bg-secondary flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Membership Plans</h3>
                <p className="text-primary-foreground/70 mb-6 leading-relaxed">
                  For employers: Premium plans with HR policy consulting, dedicated account management, and featured listings.
                </p>
                <Link href="/membership" className="font-semibold text-secondary flex items-center group-hover:underline">
                  View plans <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Top Companies */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Top Hiring Companies</h2>
              <p className="text-muted-foreground text-lg">Join the best teams in Somalia</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {isCompaniesLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 rounded-xl" />
                ))
              ) : topCompanies && topCompanies.length > 0 ? (
                topCompanies.map(company => (
                  <CompanyCard key={company.id} company={company} />
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-muted-foreground border border-dashed rounded-xl">
                  Company data unavailable.
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-24 border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to take the next step?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Whether you're looking for your dream job or searching for the perfect candidate, Smart Employment Service is here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/create-account">Create an Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </RootLayout>
  );
}
