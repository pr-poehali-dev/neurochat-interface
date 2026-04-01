import Icon from "@/components/ui/icon";

const stats = [
  { label: "Чатов", value: "24" },
  { label: "Вопросов", value: "148" },
  { label: "Дней с нами", value: "12" },
];

const achievements = [
  { icon: "MessageCircle", label: "Первый чат", unlocked: true },
  { icon: "Flame", label: "7 дней подряд", unlocked: true },
  { icon: "Star", label: "100 вопросов", unlocked: false },
  { icon: "Zap", label: "Скорострел", unlocked: false },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-6 py-5" style={{ borderBottom: "1px solid hsl(220, 25%, 10%)", background: "hsl(220, 30%, 5%)" }}>
        <h1 className="font-montserrat font-bold text-xl" style={{ color: "hsl(210,40%,95%)" }}>Профиль</h1>
      </div>

      <div className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
        {/* Avatar & info */}
        <div className="flex flex-col items-center mb-10 animate-slide-up">
          <div className="relative mb-5">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 88,
                height: 88,
                background: "linear-gradient(135deg, #1e40af, #2563eb)",
                boxShadow: "0 0 40px rgba(37,99,235,0.4)",
                fontSize: 36,
              }}
            >
              👤
            </div>
            <button
              className="absolute bottom-0 right-0 flex items-center justify-center rounded-full"
              style={{
                width: 28,
                height: 28,
                background: "hsl(220, 28%, 12%)",
                border: "2px solid hsl(220, 35%, 3%)",
                color: "#60a5fa",
              }}
            >
              <Icon name="Pencil" size={12} />
            </button>
          </div>
          <h2 className="font-montserrat font-bold text-xl mb-1" style={{ color: "hsl(210,40%,95%)" }}>
            Пользователь
          </h2>
          <p className="text-sm" style={{ color: "hsl(215, 20%, 50%)" }}>user@example.com</p>
          <div
            className="flex items-center gap-1.5 mt-2 rounded-full px-3 py-1"
            style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}
          >
            <Icon name="Shield" size={12} style={{ color: "#60a5fa" }} />
            <span className="text-xs font-medium" style={{ color: "#60a5fa" }}>Бесплатный план</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center rounded-2xl py-5 animate-fade-in"
              style={{ background: "hsl(220, 28%, 8%)", border: "1px solid hsl(220, 25%, 12%)" }}
            >
              <p className="font-montserrat font-black text-2xl text-glow" style={{ color: "#60a5fa" }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: "hsl(215, 20%, 50%)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "hsl(215, 20%, 45%)" }}>
            Достижения
          </p>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((a) => (
              <div
                key={a.label}
                className="flex items-center gap-3 rounded-xl p-4"
                style={{
                  background: a.unlocked ? "rgba(59,130,246,0.08)" : "hsl(220, 28%, 8%)",
                  border: `1px solid ${a.unlocked ? "rgba(59,130,246,0.25)" : "hsl(220, 25%, 12%)"}`,
                  opacity: a.unlocked ? 1 : 0.45,
                }}
              >
                <div
                  className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{ width: 36, height: 36, background: a.unlocked ? "rgba(59,130,246,0.15)" : "hsl(220, 25%, 12%)" }}
                >
                  <Icon name={a.icon} size={18} style={{ color: a.unlocked ? "#60a5fa" : "hsl(215, 20%, 40%)" }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: a.unlocked ? "hsl(210,40%,92%)" : "hsl(215, 20%, 50%)" }}>
                    {a.label}
                  </p>
                  <p className="text-xs" style={{ color: a.unlocked ? "#60a5fa" : "hsl(215, 20%, 35%)" }}>
                    {a.unlocked ? "Получено" : "Заблокировано"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all duration-200"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
        >
          <Icon name="LogOut" size={16} />
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
