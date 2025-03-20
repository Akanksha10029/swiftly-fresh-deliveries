
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AssistantButton } from "./components/navigation/AssistantButton";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Cart from "./components/cart/Cart"; 

const queryClient = new QueryClient();

const App = () => {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:category" element={<Products />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Cart />
            <AssistantButton 
              showAssistant={showAssistant} 
              onToggleAssistant={() => setShowAssistant(!showAssistant)} 
            />
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
