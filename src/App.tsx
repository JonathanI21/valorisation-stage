import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Home from "./pages/Home";
import CreateExperience from "./pages/CreateExperience";
import Chat from "./pages/Chat";
import ExperienceDetail from "./pages/ExperienceDetail";
import NotFound from "./pages/NotFound";
import Conventions from "./pages/Conventions";
import Badges from "./pages/Badges";
import Proximity from "./pages/Proximity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gray-50">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-16 border-b bg-white flex items-center px-6 shadow-sm">
                <SidebarTrigger />
                <div className="ml-4">
                  <h1 className="text-xl font-semibold text-gray-900">MesStages</h1>
                  <p className="text-sm text-gray-500">Journal de stages pour collégiens et lycéens</p>
                </div>
              </header>
              <main className="flex-1 p-6 overflow-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/create" element={<CreateExperience />} />
                  <Route path="/conventions" element={<Conventions />} />
                  <Route path="/badges" element={<Badges />} />
                  <Route path="/proximity" element={<Proximity />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/experience/:id" element={<ExperienceDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
