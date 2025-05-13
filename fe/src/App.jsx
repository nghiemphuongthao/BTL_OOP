import { Routes, Route, BrowserRouter } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Licenses from "./pages/Licenses";
import Applications from "./pages/Applications";
import LicensePackages from "./pages/LicensePackages";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import AdminUsers from "./pages/AdminUsers";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import MainLayout from "./components/layouts/MainLayout";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Routes>
      {/* Login page - no layout */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes - wrapped in ProtectedRoute and MainLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/packages" element={<LicensePackages />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/admins" element={<AdminUsers />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider> {/* renamed from ProtectedLayout for clarity */}
            <Router />
            <Toaster />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}


export default App;
