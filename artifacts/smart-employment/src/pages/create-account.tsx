import { RootLayout } from "@/components/layout/root-layout";
import { useRegister, UserRegistrationRole } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLocation, Link } from "wouter";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Briefcase, User } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  role: z.enum([UserRegistrationRole.job_seeker, UserRegistrationRole.employer])
});

export default function CreateAccount() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const register = useRegister();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      role: UserRegistrationRole.job_seeker,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    register.mutate(
      { data: values },
      {
        onSuccess: () => {
          window.location.href = "/"; // Hard redirect to force re-fetch of user
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Registration Failed",
            description: "Email might be already in use or input is invalid.",
          });
        },
      }
    );
  }

  return (
    <RootLayout>
      <div className="w-full flex-1 flex items-center justify-center bg-muted/30 py-12 px-4">
        <Card className="w-full max-w-xl shadow-lg border-border">
          <CardHeader className="text-center pb-6 pt-8 border-b">
            <CardTitle className="text-3xl font-bold tracking-tight mb-2">Create an Account</CardTitle>
            <CardDescription className="text-base">
              Join Smart Employment Service today
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Role Selection */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold">I want to...</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <FormItem className="relative">
                            <FormControl>
                              <RadioGroupItem value={UserRegistrationRole.job_seeker} className="peer sr-only" />
                            </FormControl>
                            <FormLabel className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all">
                              <User className="mb-3 h-8 w-8 text-primary" />
                              <span className="font-semibold text-lg">Find a Job</span>
                              <span className="text-xs text-muted-foreground text-center mt-1">I'm a candidate looking for opportunities</span>
                            </FormLabel>
                          </FormItem>
                          <FormItem className="relative">
                            <FormControl>
                              <RadioGroupItem value={UserRegistrationRole.employer} className="peer sr-only" />
                            </FormControl>
                            <FormLabel className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-all">
                              <Briefcase className="mb-3 h-8 w-8 text-primary" />
                              <span className="font-semibold text-lg">Hire Talent</span>
                              <span className="text-xs text-muted-foreground text-center mt-1">I'm an employer looking to post jobs</span>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Full Name / Company Name</FormLabel>
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
                          <Input type="email" placeholder="you@example.com" {...field} />
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
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+252 61..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base" 
                  disabled={register.isPending}
                >
                  {register.isPending ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-6 bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </RootLayout>
  );
}
