import { RootLayout } from "@/components/layout/root-layout";
import { useCreateShaqotagApplication } from "@workspace/api-client-react";
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
  occupation: z.string().min(2, "Current occupation is required"),
  experience: z.string().min(2, "Experience details are required"),
  skills: z.string().optional(),
  preferredSector: z.string().optional(),
  cvUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  coverLetter: z.string().optional(),
});

export default function FormShaqotag() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const createApplication = useCreateShaqotagApplication();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      occupation: "",
      experience: "",
      skills: "",
      preferredSector: "",
      cvUrl: "",
      coverLetter: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createApplication.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({
            title: "Application Submitted",
            description: "Your Shaqo-Tag application has been successfully submitted.",
          });
          setLocation("/shaqotag");
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
              <CardTitle className="text-3xl font-bold">Shaqo-Tag Application</CardTitle>
              <CardDescription className="text-primary-foreground/80 text-base mt-2">
                Apply for our work attachment program.
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
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Occupation/Studies</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 3rd Year Business Student" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferredSector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Sector</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Banking, Telecom" {...field} />
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
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relevant Experience or Academic Projects</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe relevant coursework or past projects..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Skills</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Data Analysis, React, Writing" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why do you want to join this program? (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your motivation..." 
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
