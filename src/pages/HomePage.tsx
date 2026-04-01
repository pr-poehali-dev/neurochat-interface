import Icon from "@/components/ui/icon";

const features = [
  { icon: "MessageCircle", title: "Умный чат", desc: "Общайтесь с нейросетью на естественном языке" },
  { icon: "Mic", title: "Голосовой ввод", desc: "Говорите — ИИ вас слышит и понимает" },
  { icon: "Volume2", title: "Озвучивание", desc: "Ответы зачитываются вслух красивым голосом" },
  { icon: "Clock", title: "История чатов", desc: "Все ваши разговоры сохраняются и доступны" },
];

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden"
        style={{ minHeight: "60vh" }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }}
        />

        {/* AI orb */}
        <div className="relative mb-8 animate-slide-up">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 96,
              height: 96,
              background: "linear-gradient(135deg, #1e40af, #2563eb)",
              boxShadow: "0 0 60px rgba(37,99,235,0.5), 0 0 120px rgba(37,99,235,0.2)",
            }}
          >
            <Icon name="Brain" size={44} />
          </div>
          <div
            className="absolute inset-0 rounded-full animate-ripple"
            style={{ border: "1px solid rgba(59,130,246,0.4)" }}
          />
        </div>

        <h1
          className="font-montserrat font-black mb-4 animate-fade-in"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            background: "linear-gradient(135deg, #fff 0%, #93c5fd 50%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
          }}
        >
          Нейросеть в&nbsp;вашем кармане
        </h1>
        <p
          className="text-base max-w-md mb-10 animate-fade-in"
          style={{ color: "hsl(215, 20%, 55%)", animationDelay: "0.1s", lineHeight: 1.7 }}
        >
          Задавайте вопросы голосом или текстом — ИИ-ассистент всегда готов помочь,
          объяснить и поддержать разговор
        </p>

        <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <button
            onClick={() => onNavigate("chat")}
            className="btn-primary flex items-center gap-2"
          >
            <Icon name="MessageCircle" size={18} />
            Начать чат
          </button>
          <button
            onClick={() => onNavigate("history")}
            className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200"
            style={{
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.25)",
              color: "#60a5fa",
            }}
          >
            <Icon name="Clock" size={16} />
            История
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 pb-16">
        <p
          className="text-center text-xs font-semibold mb-8 uppercase tracking-widest"
          style={{ color: "hsl(215, 20%, 40%)" }}
        >
          Возможности
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {features.map((f, i) => (
            <div
              key={f.icon}
              className="animate-fade-in rounded-2xl p-5 transition-all duration-200 cursor-default"
              style={{
                background: "hsl(220, 28%, 8%)",
                border: "1px solid hsl(220, 25%, 12%)",
                animationDelay: `${0.1 + i * 0.08}s`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)";
                (e.currentTarget as HTMLElement).style.background = "hsl(220, 28%, 9%)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "hsl(220, 25%, 12%)";
                (e.currentTarget as HTMLElement).style.background = "hsl(220, 28%, 8%)";
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl mb-3"
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.2)",
                }}
              >
                <Icon name={f.icon} size={18} style={{ color: "#60a5fa" }} />
              </div>
              <p className="font-semibold text-sm mb-1" style={{ color: "hsl(210,40%,92%)" }}>{f.title}</p>
              <p className="text-xs" style={{ color: "hsl(215, 20%, 50%)", lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div
        className="mx-6 mb-10 rounded-2xl p-6 flex items-center justify-around"
        style={{
          background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(29,78,216,0.05))",
          border: "1px solid rgba(59,130,246,0.2)",
        }}
      >
        {[
          { val: "∞", label: "Вопросов" },
          { val: "< 2с", label: "Ответ" },
          { val: "24/7", label: "Онлайн" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-montserrat font-black text-2xl text-glow" style={{ color: "#60a5fa" }}>{s.val}</p>
            <p className="text-xs mt-1" style={{ color: "hsl(215, 20%, 50%)" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
