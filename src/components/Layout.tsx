import { useState } from "react";
import Icon from "@/components/ui/icon";

const navItems = [
  { id: "home", label: "Главная", icon: "Home", path: "home" },
  { id: "chat", label: "Чат", icon: "MessageCircle", path: "chat" },
  { id: "history", label: "История", icon: "Clock", path: "history" },
  { id: "settings", label: "Настройки", icon: "Settings2", path: "settings" },
  { id: "profile", label: "Профиль", icon: "UserCircle", path: "profile" },
  { id: "faq", label: "FAQ", icon: "LifeBuoy", path: "faq" },
];

interface LayoutProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
}

export default function Layout({ currentPage, onNavigate, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className="flex h-screen overflow-hidden bg-grid"
      style={{ background: "hsl(222, 47%, 4%)" }}
    >
      {/* Ambient background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 50%, rgba(37,99,235,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 85% 20%, rgba(99,102,241,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Sidebar */}
      <aside
        className="relative z-10 flex flex-col transition-all duration-300 ease-in-out"
        style={{
          width: sidebarOpen ? "228px" : "64px",
          background: "rgba(10, 14, 28, 0.95)",
          borderRight: "1px solid rgba(79, 142, 247, 0.08)",
          flexShrink: 0,
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-3 py-4"
          style={{ borderBottom: "1px solid rgba(79, 142, 247, 0.07)" }}
        >
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0 glow-blue-xs"
            style={{
              width: 38,
              height: 38,
              background: "linear-gradient(135deg, #1d4ed8, #4f8ef7)",
              boxShadow: "0 0 20px rgba(79,142,247,0.35)",
            }}
          >
            <Icon name="Sparkles" size={17} style={{ color: "white" }} />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <span
                className="font-unbounded font-bold text-xs tracking-wide gradient-text-blue block"
                style={{ letterSpacing: "0.04em" }}
              >
                Neural
              </span>
              <span
                className="font-unbounded font-light text-xs block"
                style={{ color: "hsl(215, 20%, 45%)", letterSpacing: "0.08em" }}
              >
                CHAT
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto p-1.5 rounded-lg transition-all duration-200"
            style={{
              color: "hsl(215, 20%, 35%)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(79,142,247,0.08)";
              (e.currentTarget as HTMLElement).style.color = "#4f8ef7";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "hsl(215, 20%, 35%)";
            }}
          >
            <Icon name={sidebarOpen ? "PanelLeftClose" : "PanelLeftOpen"} size={15} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-2 pt-4 pb-2">
          <button
            onClick={() => onNavigate("chat")}
            className="w-full flex items-center gap-2.5 rounded-xl py-2.5 transition-all duration-200 font-semibold text-sm"
            style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(79,142,247,0.1))",
              border: "1px solid rgba(79, 142, 247, 0.22)",
              color: "#7ab3ff",
              justifyContent: sidebarOpen ? "flex-start" : "center",
              paddingLeft: sidebarOpen ? "12px" : undefined,
              boxShadow: "0 2px 12px rgba(37,99,235,0.12)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(37,99,235,0.28), rgba(79,142,247,0.18))";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(37,99,235,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(79,142,247,0.1))";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(37,99,235,0.12)";
            }}
            title={!sidebarOpen ? "Новый чат" : undefined}
          >
            <Icon name="Plus" size={16} />
            {sidebarOpen && <span>Новый чат</span>}
          </button>
        </div>

        {/* Divider */}
        {sidebarOpen && (
          <div className="px-4 py-2">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(215, 20%, 28%)" }}>
              Меню
            </p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-2 py-1 flex flex-col gap-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.path)}
              className={`nav-item w-full text-left ${currentPage === item.path ? "active" : ""}`}
              style={{ justifyContent: sidebarOpen ? "flex-start" : "center" }}
              title={!sidebarOpen ? item.label : undefined}
            >
              <Icon name={item.icon} size={17} />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="px-3 py-4"
          style={{ borderTop: "1px solid rgba(79, 142, 247, 0.07)" }}
        >
          {sidebarOpen ? (
            <div
              className="rounded-xl p-3 flex items-center gap-3"
              style={{
                background: "rgba(79, 142, 247, 0.06)",
                border: "1px solid rgba(79, 142, 247, 0.1)",
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #2563eb, #6366f1)" }}
              >
                <Icon name="User" size={13} style={{ color: "white" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: "hsl(210,40%,88%)" }}>
                  Пользователь
                </p>
                <p className="text-xs truncate" style={{ color: "hsl(215, 20%, 42%)" }}>
                  Pro план
                </p>
              </div>
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2563eb, #6366f1)" }}
              >
                <Icon name="User" size={14} style={{ color: "white" }} />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="relative z-10 flex-1 overflow-hidden flex flex-col">{children}</main>
    </div>
  );
}
