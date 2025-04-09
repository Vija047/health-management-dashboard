
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Wards from "./pages/Wards";
import Records from "./pages/Records";
import Billing from "./pages/Billing";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout><Index /></MainLayout>} />
            <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/patients" element={<MainLayout><Patients /></MainLayout>} />
            <Route path="/doctors" element={<MainLayout><Doctors /></MainLayout>} />
            <Route path="/appointments" element={<MainLayout><Appointments /></MainLayout>} />
            <Route path="/wards" element={<MainLayout><Wards /></MainLayout>} />
            <Route path="/records" element={<MainLayout><Records /></MainLayout>} />
            <Route path="/billing" element={<MainLayout><Billing /></MainLayout>} />
            <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
