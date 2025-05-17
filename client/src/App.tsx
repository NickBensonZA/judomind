import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import Affirmations from "@/pages/affirmations";
import Breathing from "@/pages/breathing";
import Sessions from "@/pages/sessions";
import Profile from "@/pages/profile";
import Login from "@/pages/login";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

function ProtectedRoute({ component: Component, ...rest }: { component: React.ComponentType<any> }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return isAuthenticated ? <Component {...rest} /> : null;
}

function App() {
  return (
    <TooltipProvider>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/affirmations" component={Affirmations} />
          <Route path="/breathing" component={Breathing} />
          <Route path="/login" component={Login} />
          <Route path="/sessions">
            <ProtectedRoute component={Sessions} />
          </Route>
          <Route path="/profile">
            <ProtectedRoute component={Profile} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Layout>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
