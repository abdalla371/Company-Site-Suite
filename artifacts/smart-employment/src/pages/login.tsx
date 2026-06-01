import { RootLayout } from "@/components/layout/root-layout";
import { useLogin } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLocation, Link } from "wouter";
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
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const login = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login.mutate(
      { data: values },
      {
        onSuccess: () => {
          window.location.href = "/"; // Hard redirect to force re-fetch of user
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Invalid email or password. Please try again.",
          });
        },
      }
    );
  }

  return (
    <RootLayout>
      <div className="w-full flex-1 flex items-center justify-center bg-muted/30 py-12 px-4">
        <Card className="w-full max-w-md shadow-lg border-border">
          <CardHeader className="text-center pb-8 pt-8">
            <CardTitle className="text-3xl font-bold tracking-tight mb-2">Welcome Back</CardTitle>
            <CardDescription className="text-base">
              Sign in to your Smart Employment account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Password</FormLabel>
                        <Link href="#" className="text-sm font-medium text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base" 
                  disabled={login.isPending}
                >
                  {login.isPending ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-6 bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/create-account" className="font-semibold text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </RootLayout>
  );
}
