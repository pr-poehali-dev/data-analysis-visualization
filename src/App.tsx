import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface User {
  id: number;
  name: string;
  phone: string;
  avatar: string;
  color: string;
}

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/auth"
              element={
                currentUser
                  ? <Navigate to="/" replace />
                  : <Auth onAuth={(user) => setCurrentUser(user)} />
              }
            />
            <Route
              path="/"
              element={
                currentUser
                  ? <Index currentUser={currentUser} />
                  : <Navigate to="/auth" replace />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;