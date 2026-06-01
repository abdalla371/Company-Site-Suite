import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Jobs from "@/pages/jobs";
import JobDetail from "@/pages/job-detail";
import About from "@/pages/about";
import Internship from "@/pages/internship";
import FormInternship from "@/pages/form-internship";
import Shaqotag from "@/pages/shaqotag";
import FormShaqotag from "@/pages/form-shaqotag";
import Membership from "@/pages/membership";
import PostJob from "@/pages/post-job";
import Login from "@/pages/login";
import CreateAccount from "@/pages/create-account";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/jobs/:id" component={JobDetail} />
      <Route path="/about" component={About} />
      <Route path="/internship" component={Internship} />
      <Route path="/form-internship" component={FormInternship} />
      <Route path="/shaqotag" component={Shaqotag} />
      <Route path="/form-shaqotag" component={FormShaqotag} />
      <Route path="/membership" component={Membership} />
      <Route path="/post-job" component={PostJob} />
      <Route path="/login" component={Login} />
      <Route path="/create-account" component={CreateAccount} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
