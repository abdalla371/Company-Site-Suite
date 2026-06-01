import { RootLayout } from "@/components/layout/root-layout";
import { 
  useListMembershipPlans, 
  getListMembershipPlansQueryKey,
  useCreateMembership
} from "@workspace/api-client-react";
import { Check, Link, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone is required"),
  planId: z.number()
});

export default function Membership() {
  const { toast } = useToast();
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  
  const { data: plans, isLoading } = useListMembershipPlans({
    query: { queryKey: getListMembershipPlansQueryKey() }
  });

  const createMembership = useCreateMembership();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      planId: 0
    },
  });

  const handleOpenDialog = (planId: number) => {
    setSelectedPlanId(planId);
    form.setValue("planId", planId);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createMembership.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Membership request submitted successfully. Our team will contact you shortly.",
          });
          setSelectedPlanId(null);
          form.reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to submit request. Please try again.",
          });
        }
      }
    );
  };

  return (
    <RootLayout>
      <div className="w-full flex-1 pb-24">
        {/* Header */}
        <div className="bg-primary text-primary-foreground py-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Employer Solutions & Membership</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Choose the right plan to scale your team, streamline HR, and find the perfect fit.
          </p>
        </div>

        {/* Plans */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-[-3rem] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-background rounded-2xl border p-8 shadow-sm h-96">
                  <Skeleton className="h-8 w-1/2 mb-4" />
                  <Skeleton className="h-10 w-1/3 mb-6" />
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              ))
            ) : plans && plans.length > 0 ? (
              plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`bg-background rounded-2xl border flex flex-col p-8 ${
                    plan.isPopular 
                      ? "ring-2 ring-primary shadow-xl scale-105 relative bg-card" 
                      : "shadow-sm hover:shadow-md transition-shadow"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="h-3 w-3" fill="currentColor" /> MOST POPULAR
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.duration}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 flex-1 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-secondary shrink-0" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.isPopular ? "default" : "outline"}
                    className="w-full mt-auto h-12"
                    onClick={() => handleOpenDialog(plan.id)}
                  >
                    Get Started
                  </Button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground border rounded-xl">
                No membership plans available currently.
              </div>
            )}
          </div>
        </div>

        {/* Additional Services */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="bg-muted rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need HR Policy Consulting?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Our experts provide tailored HR frameworks, compliance checks, and organizational structuring specifically for the Somali market.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/about#contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={selectedPlanId !== null} onOpenChange={(open) => !open && setSelectedPlanId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Request</DialogTitle>
            <DialogDescription>
              We'll contact you to set up your membership plan and get you onboarded.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company / Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Corp" {...field} />
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
                    <FormLabel>Work Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@acme.com" {...field} />
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
              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setSelectedPlanId(null)}>Cancel</Button>
                <Button type="submit" disabled={createMembership.isPending}>
                  {createMembership.isPending ? "Submitting..." : "Request Membership"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </RootLayout>
  );
}
