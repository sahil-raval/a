import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Diamonds from "@/pages/Diamonds";
import Jewellery from "@/pages/Jewellery";
import Trade from "@/pages/Trade";
import Investment from "@/pages/Investment";
import Journal from "@/pages/Journal";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Services from "@/pages/Services";
import FAQ from "@/pages/FAQ";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/diamonds" component={Diamonds} />
        <Route path="/jewellery" component={Jewellery} />
        <Route path="/trade" component={Trade} />
        <Route path="/investment" component={Investment} />
        <Route path="/services" component={Services} />
        <Route path="/faq" component={FAQ} />
        <Route path="/about" component={About} />
        <Route path="/journal" component={Journal} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
