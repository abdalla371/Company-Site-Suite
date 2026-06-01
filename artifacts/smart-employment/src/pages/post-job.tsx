import { RootLayout } from "@/components/layout/root-layout";
import { useCreateJob, useGetMe, JobInputType } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(5, "Job title must be at least 5 characters"),
  companyName: z.string().min(2, "Company name is required"),
  companyLogo: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  location: z.string().min(2, "Location is required"),
  type: z.enum([
    JobInputType.full_time, 
    JobInputType.part_time, 
    JobInputType.contract, 
    JobInputType.internship, 
    JobInputType.remote
  ]),
  salary: z.string().optional(),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().optional(),
  isFeatured: z.boolean().default(false)
});

export default function PostJob() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const createJob = useCreateJob();
  const { data: user, isLoading: isUserLoading } = useGetMe({ query: { retry: false }});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      companyName: "",
      companyLogo: "",
      location: "",
      type: JobInputType.full_time,
      salary: "",
      category: "",
      description: "",
      requirements: "",
      isFeatured: false
    },
  });

  // Redirect if not employer (only check when load is done)
  useEffect(() => {
    if (!isUserLoading && (!user || user.role !== "employer")) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You must be logged in as an employer to post jobs.",
      });
      setLocation("/login");
    }
  }, [user, isUserLoading, setLocation, toast]);

  if (isUserLoading || !user || user.role !== "employer") {
    return (
      <RootLayout>
        <div className="flex-1 flex items-center justify-center">Loading...</div>
      </RootLayout>
    );
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    createJob.mutate(
      { data: values },
      {
        onSuccess: (data) => {
          toast({
            title: "Job Posted",
            description: "Your job has been successfully created.",
          });
          setLocation(`/jobs/${data.id}`);
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to post job. Please try again.",
          });
        },
      }
    );
  }

  const categories = [
    "Technology", "Healthcare", "Finance", "Education", "Engineering", "Marketing", "Sales", "Management", "Operations", "Design"
  ];

  return (
    <RootLayout>
      <div className="w-full flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
              <Building className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Post a New Job</h1>
              <p className="text-muted-foreground">Reach thousands of job seekers in Somalia</p>
            </div>
          </div>

          <Card className="border-border shadow-md overflow-hidden">
            <CardContent className="p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="divide-y divide-border">
                  
                  {/* Basic Info */}
                  <div className="p-8 space-y-6 bg-background">
                    <h2 className="text-xl font-bold">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="col-span-1 md:col-span-2">
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Corp" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Mogadishu, Remote" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={JobInputType.full_time}>Full-time</SelectItem>
                                <SelectItem value={JobInputType.part_time}>Part-time</SelectItem>
                                <SelectItem value={JobInputType.contract}>Contract</SelectItem>
                                <SelectItem value={JobInputType.internship}>Internship</SelectItem>
                                <SelectItem value={JobInputType.remote}>Remote</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Salary (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. $1000 - $1500 / month" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companyLogo"
                        render={({ field }) => (
                          <FormItem className="col-span-1 md:col-span-2">
                            <FormLabel>Company Logo URL (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/logo.png" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-8 space-y-6 bg-background">
                    <h2 className="text-xl font-bold">Job Details</h2>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the role, responsibilities, and benefits..." 
                              className="min-h-[200px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="requirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Requirements (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List skills, education, and experience needed..." 
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Promotion */}
                  <div className="p-8 bg-muted/20">
                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-base font-semibold">
                              Feature this job
                            </FormLabel>
                            <FormDescription>
                              Highlight this job on the homepage and at the top of search results. Premium members get this free.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Actions */}
                  <div className="p-8 bg-background flex justify-end gap-4">
                    <Button variant="outline" type="button" onClick={() => setLocation("/")}>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={createJob.isPending}
                    >
                      {createJob.isPending ? "Posting..." : "Post Job"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </RootLayout>
  );
}
