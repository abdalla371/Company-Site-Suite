import { RootLayout } from "@/components/layout/root-layout";
import { useListJobs, getListJobsQueryKey } from "@workspace/api-client-react";
import { JobCard } from "@/components/job-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  
  const [activeFilters, setActiveFilters] = useState({
    search: "",
    type: "",
    category: "",
    location: ""
  });

  const { data: jobs, isLoading } = useListJobs({
    search: activeFilters.search || undefined,
    type: activeFilters.type || undefined,
    category: activeFilters.category || undefined,
    location: activeFilters.location || undefined,
  }, {
    query: {
      queryKey: getListJobsQueryKey({
        search: activeFilters.search || undefined,
        type: activeFilters.type || undefined,
        category: activeFilters.category || undefined,
        location: activeFilters.location || undefined,
      })
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveFilters({
      search,
      type: type === "all" ? "" : type,
      category: category === "all" ? "" : category,
      location: location === "all" ? "" : location
    });
  };

  const categories = [
    "Technology", "Healthcare", "Finance", "Education", "Engineering", "Marketing", "Sales", "Management", "Operations", "Design"
  ];
  
  const locations = [
    "Mogadishu", "Hargeisa", "Garowe", "Bosaso", "Kismayo", "Baidoa", "Beledweyne", "Remote"
  ];

  return (
    <RootLayout>
      <div className="w-full flex-1 bg-muted/10 pb-20">
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Find Your Next Opportunity</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Browse thousands of job openings from top companies in Somalia.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-background rounded-xl p-2 shadow-lg flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Job title, keyword, or company" 
                  className="pl-10 border-0 shadow-none focus-visible:ring-0 h-12 text-foreground"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="w-[1px] bg-border hidden md:block my-2"></div>
              <Button type="submit" size="lg" className="md:w-32 h-12 rounded-lg">
                Search
              </Button>
            </form>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full lg:w-64 shrink-0 space-y-6">
              <div className="bg-background rounded-xl border p-5">
                <div className="flex items-center gap-2 font-semibold text-lg mb-6 pb-4 border-b">
                  <SlidersHorizontal className="h-5 w-5" /> Filters
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Job Type</label>
                    <Select value={type} onValueChange={(val) => { setType(val); }}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="full_time">Full-time / Waqti Buuxa</SelectItem>
                        <SelectItem value="part_time">Part-time / Waqti Dhiman</SelectItem>
                        <SelectItem value="contract">Contract / Heshiis</SelectItem>
                        <SelectItem value="internship">Internship / Tababar</SelectItem>
                        <SelectItem value="remote">Remote / Fogaan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={category} onValueChange={(val) => { setCategory(val); }}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Location</label>
                    <Select value={location} onValueChange={(val) => { setLocation(val); }}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map(loc => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={(e) => handleSearch(e as any)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {isLoading ? "Loading..." : `${jobs?.length || 0} Jobs Found`}
                </h2>
              </div>
              
              <div className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-48 bg-background border rounded-xl p-4 flex flex-col gap-4">
                      <div className="flex gap-4">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-6 w-1/3" />
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                      </div>
                      <Skeleton className="h-16 w-full mt-auto" />
                    </div>
                  ))
                ) : jobs && jobs.length > 0 ? (
                  jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                  ))
                ) : (
                  <div className="bg-background border rounded-xl p-12 text-center">
                    <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">No jobs found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      We couldn't find any jobs matching your current filters. Try adjusting your search criteria.
                    </p>
                    <Button variant="outline" onClick={() => {
                      setSearch("");
                      setType("all");
                      setCategory("all");
                      setLocation("all");
                      setActiveFilters({ search: "", type: "", category: "", location: "" });
                    }}>
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
