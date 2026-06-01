import { Company } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Building, MapPin, Briefcase } from "lucide-react";
import { Link } from "wouter";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Card className="hover-elevate transition-all duration-300 border-border group text-center">
      <CardContent className="pt-6 pb-6 flex flex-col items-center gap-4">
        <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center border border-border overflow-hidden mb-2 group-hover:scale-110 transition-transform duration-300">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="h-full w-full object-cover" />
          ) : (
            <Building className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {company.name}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground flex-wrap">
            {company.industry && (
              <span className="flex items-center">
                <Briefcase className="h-3 w-3 mr-1" />
                {company.industry}
              </span>
            )}
            {company.location && (
              <span className="flex items-center">
                <span className="w-1 h-1 rounded-full bg-border mx-2 hidden sm:inline-block"></span>
                <MapPin className="h-3 w-3 mr-1" />
                {company.location}
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t w-full">
          <Link href={`/jobs?search=${encodeURIComponent(company.name)}`} className="text-sm font-medium text-primary hover:text-secondary transition-colors flex items-center justify-center">
            {company.openPositions} Open Position{company.openPositions !== 1 ? 's' : ''}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
