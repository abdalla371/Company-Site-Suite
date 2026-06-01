import { RootLayout } from "@/components/layout/root-layout";
import { useGetJob, getGetJobQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Clock, DollarSign, Building, ArrowLeft, Calendar, Briefcase, Share2 } from "lucide-react";
import { format } from "date-fns";

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const jobId = parseInt(id || "0", 10);
  
  const { data: job, isLoading } = useGetJob(jobId, {
    query: {
      enabled: !!jobId,
      queryKey: getGetJobQueryKey(jobId)
    }
  });

  const formatJobType = (type: string) => {
    const types: Record<string, string> = {
      full_time: "Full-time / Waqti Buuxa",
      part_time: "Part-time / Waqti Dhiman",
      contract: "Contract / Heshiis",
      internship: "Internship / Tababar",
      remote: "Remote / Fogaan",
    };
    return types[type] || type;
  };

  if (isLoading) {
    return (
      <RootLayout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-24 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-96 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </RootLayout>
    );
  }

  if (!job) {
    return (
      <RootLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground mb-8">The job posting you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/jobs">Browse all jobs</Link>
          </Button>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="bg-muted/30 pb-20 flex-1">
        {/* Header */}
        <div className="bg-background border-b pt-8 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-foreground">
              <Link href="/jobs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to jobs</Link>
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="h-20 w-20 rounded-xl bg-muted flex items-center justify-center border border-border overflow-hidden shrink-0">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.companyName} className="h-full w-full object-cover" />
                  ) : (
                    <Building className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
                    {job.isFeatured && <Badge variant="secondary">Featured</Badge>}
                  </div>
                  <div className="text-xl text-muted-foreground font-medium mb-4">
                    {job.companyName}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center"><MapPin className="mr-1.5 h-4 w-4" /> {job.location}</span>
                    <span className="flex items-center"><Clock className="mr-1.5 h-4 w-4" /> {formatJobType(job.type)}</span>
                    <span className="flex items-center"><Briefcase className="mr-1.5 h-4 w-4" /> {job.category}</span>
                    {job.salary && <span className="flex items-center"><DollarSign className="mr-1.5 h-4 w-4" /> {job.salary}</span>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 md:min-w-[200px] shrink-0">
                <Button size="lg" className="w-full text-base h-12">Apply Now</Button>
                <Button variant="outline" className="w-full"><Share2 className="mr-2 h-4 w-4" /> Share Job</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-background rounded-xl border p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <div className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground whitespace-pre-wrap">
                  {job.description}
                </div>
              </div>
              
              {job.requirements && (
                <div className="bg-background rounded-xl border p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-4">Requirements</h2>
                  <div className="prose prose-slate max-w-none prose-p:text-muted-foreground whitespace-pre-wrap">
                    {job.requirements}
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="bg-background rounded-xl border p-6">
                <h3 className="font-bold text-lg mb-4">Job Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Posted Date</div>
                      <div className="text-sm text-muted-foreground">{format(new Date(job.createdAt), "MMM d, yyyy")}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Location</div>
                      <div className="text-sm text-muted-foreground">{job.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Job Type</div>
                      <div className="text-sm text-muted-foreground">{formatJobType(job.type)}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Category</div>
                      <div className="text-sm text-muted-foreground">{job.category}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary text-primary-foreground rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">About {job.companyName}</h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  Interested in joining this team? Apply now to take the next step in your career.
                </p>
                <Button variant="secondary" className="w-full">View Company Profile</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
