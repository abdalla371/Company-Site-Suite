import { RootLayout } from "@/components/layout/root-layout";
import { useCreateInternshipApplication } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  university: z.string().min(2, "University is required"),
  fieldOfStudy: z.string().min(2, "Field of study is required"),
  yearOfStudy: z.string().optional(),
  cvUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  coverLetter: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
});

export default function FormInternship() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const createApplication = useCreateInternshipApplication();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      university: "",
      fieldOfStudy: "",
      yearOfStudy: "",
      cvUrl: "",
      coverLetter: "",
      startDate: new Date().toISOString().split("T")[0],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createApplication.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({
            title: "Application Submitted",
            description: "Your internship application has been successfully submitted.",
          });
          setLocation("/internship");
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to submit application. Please try again.",
          });
        },
      }
    );
  }

  return (
    <RootLayout>
      <div className="w-full flex-1 bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Card className="border-border shadow-md">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-xl pb-8 pt-10 px-8 text-center">
              <CardTitle className="text-3xl font-bold">Internship Application</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-base mt-2">
                Provide your details below to apply for the internship program.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+252 61..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="university"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>University</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Mogadishu University" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fieldOfStudy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Field of Study</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Computer Science" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="yearOfStudy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year of Study</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 4th Year, Graduate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CV URL (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Link to your CV/Resume" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Letter (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us why you're a good fit..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4 border-t">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={createApplication.isPending}
                    >
                      {createApplication.isPending ? "Submitting..." : "Submit Application"}
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
