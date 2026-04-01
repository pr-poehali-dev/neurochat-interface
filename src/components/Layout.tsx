import { useState } from "react";
import Icon from "@/components/ui/icon";

const navItems = [
  { id: "home", label: "Главная", icon: "Home", path: "home" },
  { id: "chat", label: "Чат", icon: "MessageCircle", path: "chat" },
  { id: "history", label: "История", icon: "Clock", path: "history" },
  { id: "settings", label: "Настройки", icon: "Settings", path: "settings" },
  { id: "profile", label: "Профиль", icon: "User", path: "profile" },
  { id: "faq", label: "FAQ", icon: "HelpCircle", path: "faq" },
];

interface LayoutProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
}

export default function Layout({ currentPage, onNavigate, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-grid" style={{ background: "hsl(220, 35%, 3%)" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col transition-all duration-300 ease-in-out"
        style={{
          width: sidebarOpen ? "240px" : "68px",
          background: "hsl(220, 30%, 5%)",
          borderRight: "1px solid hsl(220, 25%, 10%)",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: "1px solid hsl(220, 25%, 10%)" }}>
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              boxShadow: "0 0 20px rgba(37,99,235,0.4)",
            }}
          >
            <Icon name="Cpu" size={18} />
          </div>
          {sidebarOpen && (
            <span
              className="font-montserrat font-800 text-sm text-glow"
              style={{ color: "#60a5fa", letterSpacing: "0.05em", fontWeight: 800 }}
            >
              NeuralChat
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto transition-all duration-200"
            style={{ color: "hsl(215, 20%, 40%)" }}
          >
            <Icon name={sidebarOpen ? "ChevronLeft" : "ChevronRight"} size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.path)}
              className={`nav-item w-full text-left ${currentPage === item.path ? "active" : ""}`}
              style={{ justifyContent: sidebarOpen ? "flex-start" : "center" }}
              title={!sidebarOpen ? item.label : undefined}
            >
              <Icon name={item.icon} size={18} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* New Chat button */}
        <div className="px-2 pb-4">
          <button
            onClick={() => onNavigate("chat")}
            className="w-full flex items-center gap-2 rounded-xl py-2.5 transition-all duration-200 font-semibold text-sm"
            style={{
              background: "linear-gradient(135deg, #2563eb22, #1d4ed811)",
              border: "1px solid rgba(59,130,246,0.25)",
              color: "#60a5fa",
              justifyContent: sidebarOpen ? "flex-start" : "center",
              paddingLeft: sidebarOpen ? "12px" : undefined,
            }}
          >
            <Icon name="Plus" size={16} />
            {sidebarOpen && <span>Новый чат</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {children}
      </main>
    </div>
  );
}
