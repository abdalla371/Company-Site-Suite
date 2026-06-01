import { Job } from "@workspace/api-client-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Building } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function JobCard({ job }: { job: Job }) {
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

  return (
    <Card className="hover-elevate transition-all duration-300 border-border group overflow-hidden flex flex-col h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center border border-border shrink-0 overflow-hidden">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.companyName} className="h-full w-full object-cover" />
              ) : (
                <Building className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <p className="text-muted-foreground text-sm flex items-center gap-1">
                {job.companyName}
              </p>
            </div>
          </div>
          {job.isFeatured && (
            <Badge variant="secondary" className="shrink-0">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-4 flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-background font-normal text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" /> {job.location}
          </Badge>
          <Badge variant="outline" className="bg-background font-normal text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" /> {formatJobType(job.type)}
          </Badge>
          {job.salary && (
            <Badge variant="outline" className="bg-background font-normal text-muted-foreground">
              <DollarSign className="h-3 w-3 mr-1" /> {job.salary}
            </Badge>
          )}
        </div>
        <p className="text-sm text-foreground/80 line-clamp-2">
          {job.description}
        </p>
      </CardContent>
      <CardFooter className="pt-0 mt-auto border-t border-border/50 bg-muted/20 p-4">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-muted-foreground">
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </span>
          <Button asChild variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Link href={`/jobs/${job.id}`}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
