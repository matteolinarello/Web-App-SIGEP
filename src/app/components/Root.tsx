import { Outlet, Link, useLocation } from "react-router";
import { Users, Building2, BarChart3, Menu, X, Bot } from "lucide-react";
import { useState } from "react";
// import logo from "figma:asset/040f1bf4edf272b5239c3ddd65f70999fb9e5347.png";
import ChatBot from "@/app/components/ChatBot";

export default function Root() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatBotOpen, setChatBotOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: null },
    { name: "Visitatore", href: "/visitor", icon: Users },
    { name: "Espositore", href: "/exhibitor", icon: Building2 },
    { name: "IEG Expo Dashboard", href: "/ieg", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://www.gelatoworldcup.com/wp-content/uploads/2023/10/logo-sigep-world-positivo.png"
                alt="SIGEP World"
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                      }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden rounded-lg p-2 hover:bg-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden border-t py-4 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                      }`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Floating AI Chatbot Button */}
      <button
        onClick={() => setChatBotOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
        aria-label="Assistente AI"
      >
        <Bot className="h-6 w-6 group-hover:animate-pulse" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
        </span>
      </button>

      {/* ChatBot Popup */}
      {chatBotOpen && <ChatBot onClose={() => setChatBotOpen(false)} />}

      {/* Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2026 SIGEP World. Tutti i diritti riservati.</p>
            <p className="mt-1">La fiera leader mondiale nel settore del Dolce</p>
          </div>
        </div>
      </footer>
    </div>
  );
}