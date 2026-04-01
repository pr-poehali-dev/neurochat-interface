import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const features = [
  {
    icon: "MessageCircle",
    title: "Умный чат",
    desc: "Общайтесь с нейросетью — она понимает контекст и даёт точные ответы",
    color: "#4f8ef7",
    bg: "rgba(79,142,247,0.1)",
    border: "rgba(79,142,247,0.2)",
  },
  {
    icon: "Mic",
    title: "Голосовой ввод",
    desc: "Просто говорите — ИИ мгновенно распознаёт речь на русском языке",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.2)",
  },
  {
    icon: "Volume2",
    title: "Озвучивание",
    desc: "Ответы зачитываются вслух натуральным голосом",
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.2)",
  },
  {
    icon: "Layers",
    title: "История чатов",
    desc: "Все разговоры сохраняются — легко найти нужный с поиском",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.2)",
  },
];

const stats = [
  { val: "∞", label: "Вопросов", suffix: "" },
  { val: "< 2", label: "Секунды", suffix: "с" },
  { val: "24", label: "Часа в сутки", suffix: "/7" },
];

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [mounted, setMounted] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto">
      {/* ===== HERO ===== */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-6 py-16 overflow-hidden"
        style={{ minHeight: "62vh" }}
      >
        {/* Radial glow bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 35%, rgba(37,99,235,0.14) 0%, rgba(99,102,241,0.06) 50%, transparent 75%)",
          }}
        />
        {/* Grid lines decorative */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(79,142,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Orb */}
        <div
          className="relative mb-10"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Outer ring */}
          <div
            className="absolute rounded-full animate-pulse-ring"
            style={{
              inset: "-20px",
              border: "1px solid rgba(79,142,247,0.15)",
              borderRadius: "50%",
            }}
          />
          {/* Middle ring */}
          <div
            className="absolute rounded-full animate-pulse-ring"
            style={{
              inset: "-10px",
              border: "1px solid rgba(79,142,247,0.22)",
              borderRadius: "50%",
              animationDelay: "0.5s",
            }}
          />
          {/* Core */}
          <div
            className="relative flex items-center justify-center rounded-full animate-float"
            style={{
              width: 92,
              height: 92,
              background: "linear-gradient(135deg, #1d4ed8 0%, #4f8ef7 60%, #7ab3ff 100%)",
              boxShadow: "0 0 50px rgba(37,99,235,0.55), 0 0 100px rgba(37,99,235,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <Icon name="Sparkles" size={38} style={{ color: "white" }} />
          </div>
          {/* Orbit dot */}
          <div
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{ marginTop: "-4px", marginLeft: "-4px" }}
          >
            <div
              className="w-2 h-2 rounded-full animate-orbit"
              style={{
                background: "#7ab3ff",
                boxShadow: "0 0 8px #7ab3ff",
              }}
            />
          </div>
        </div>

        {/* Badge */}
        <div
          className="mb-5"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono-ibm"
            style={{
              background: "rgba(79,142,247,0.1)",
              border: "1px solid rgba(79,142,247,0.25)",
              color: "#7ab3ff",
              letterSpacing: "0.04em",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
            />
            GPT-4 · Онлайн
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-unbounded font-bold mb-5"
          style={{
            fontSize: "clamp(1.7rem, 4.5vw, 3rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            background: "linear-gradient(135deg, #ffffff 0%, #c7deff 45%, #7ab3ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Нейросеть в&nbsp;вашем
          <br />
          кармане
        </h1>

        {/* Subtitle */}
        <p
          className="text-base max-w-sm mb-10 font-golos"
          style={{
            color: "hsl(215, 20%, 52%)",
            lineHeight: 1.75,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.22s",
          }}
        >
          Задавайте вопросы голосом или текстом — ИИ-ассистент всегда готов помочь
          и&nbsp;поддержать разговор
        </p>

        {/* CTA Buttons */}
        <div
          className="flex items-center gap-3"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          <button
            onClick={() => onNavigate("chat")}
            className="btn-primary flex items-center gap-2.5 text-sm"
          >
            <Icon name="MessageCircle" size={17} />
            Начать чат
          </button>
          <button
            onClick={() => onNavigate("history")}
            className="flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "hsl(210,40%,75%)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <Icon name="Clock" size={16} />
            История
          </button>
        </div>
      </div>

      {/* ===== STATS BAR ===== */}
      <div
        className="mx-6 mb-10 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(99,102,241,0.06))",
          border: "1px solid rgba(79,142,247,0.18)",
        }}
      >
        <div className="flex items-stretch divide-x" style={{ borderColor: "rgba(79,142,247,0.12)" }}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex-1 text-center py-5 px-4"
              style={{ borderColor: "rgba(79,142,247,0.12)" }}
            >
              <p
                className="font-unbounded font-bold mb-1 text-glow-sm"
                style={{ fontSize: "1.5rem", color: "#7ab3ff" }}
              >
                {s.val}
                <span style={{ fontSize: "1rem", color: "#4f8ef7" }}>{s.suffix}</span>
              </p>
              <p className="text-xs font-medium" style={{ color: "hsl(215, 20%, 45%)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== FEATURES ===== */}
      <div className="px-6 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px" style={{ background: "rgba(79,142,247,0.1)" }} />
          <p
            className="text-xs font-semibold uppercase tracking-widest font-mono-ibm"
            style={{ color: "hsl(215, 20%, 38%)" }}
          >
            Возможности
          </p>
          <div className="flex-1 h-px" style={{ background: "rgba(79,142,247,0.1)" }} />
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
          {features.map((f, i) => (
            <div
              key={f.icon}
              className="animate-fade-in rounded-2xl p-5 cursor-default transition-all duration-250"
              style={{
                background: hoveredFeature === i ? "hsl(222, 36%, 10%)" : "hsl(222, 38%, 8%)",
                border: `1px solid ${hoveredFeature === i ? f.border : "hsl(222, 30%, 13%)"}`,
                animationDelay: `${0.05 + i * 0.07}s`,
                boxShadow: hoveredFeature === i ? `0 4px 24px ${f.bg}` : "none",
                transform: hoveredFeature === i ? "translateY(-2px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className="flex items-center justify-center rounded-xl mb-4"
                style={{
                  width: 44,
                  height: 44,
                  background: f.bg,
                  border: `1px solid ${f.border}`,
                }}
              >
                <Icon name={f.icon} size={20} style={{ color: f.color }} />
              </div>
              <p
                className="font-semibold text-sm mb-1.5"
                style={{ color: "hsl(210,40%,93%)" }}
              >
                {f.title}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "hsl(215, 20%, 48%)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CTA BOTTOM ===== */}
      <div className="mx-6 mb-16">
        <div
          className="rounded-2xl p-8 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(99,102,241,0.1) 100%)",
            border: "1px solid rgba(79,142,247,0.25)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(79,142,247,0.08) 0%, transparent 70%)",
            }}
          />
          <p
            className="font-unbounded font-bold text-lg mb-2"
            style={{
              background: "linear-gradient(135deg, #fff 0%, #b4d0ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Попробуйте прямо сейчас
          </p>
          <p className="text-sm mb-6" style={{ color: "hsl(215, 20%, 50%)" }}>
            Задайте первый вопрос — это бесплатно и без регистрации
          </p>
          <button
            onClick={() => onNavigate("chat")}
            className="btn-primary inline-flex items-center gap-2.5 text-sm"
          >
            <Icon name="Zap" size={16} />
            Открыть чат
          </button>
        </div>
      </div>
    </div>
  );
}
