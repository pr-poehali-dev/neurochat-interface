import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function SettingsPage() {
  const [voice, setVoice] = useState(true);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [soundFx, setSoundFx] = useState(true);
  const [language, setLanguage] = useState("ru");
  const [speed, setSpeed] = useState("normal");

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className="relative flex-shrink-0 rounded-full transition-all duration-300"
      style={{
        width: 44,
        height: 24,
        background: value ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "hsl(220, 25%, 15%)",
        boxShadow: value ? "0 0 10px rgba(37,99,235,0.4)" : "none",
      }}
    >
      <span
        className="absolute rounded-full transition-all duration-300"
        style={{
          width: 18,
          height: 18,
          top: 3,
          left: value ? 23 : 3,
          background: "white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "hsl(215, 20%, 45%)" }}>
        {title}
      </p>
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid hsl(220, 25%, 12%)" }}>
        {children}
      </div>
    </div>
  );

  const Row = ({ icon, label, desc, right }: { icon: string; label: string; desc?: string; right: React.ReactNode }) => (
    <div
      className="flex items-center justify-between px-5 py-4"
      style={{ background: "hsl(220, 28%, 8%)", borderBottom: "1px solid hsl(220, 25%, 11%)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ width: 34, height: 34, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.15)" }}
        >
          <Icon name={icon} size={16} style={{ color: "#60a5fa" }} />
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: "hsl(210,40%,92%)" }}>{label}</p>
          {desc && <p className="text-xs" style={{ color: "hsl(215, 20%, 48%)" }}>{desc}</p>}
        </div>
      </div>
      {right}
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-6 py-5" style={{ borderBottom: "1px solid hsl(220, 25%, 10%)", background: "hsl(220, 30%, 5%)" }}>
        <h1 className="font-montserrat font-bold text-xl" style={{ color: "hsl(210,40%,95%)" }}>Настройки</h1>
      </div>

      <div className="flex-1 px-6 py-6 max-w-2xl">
        <Section title="Голос и речь">
          <Row icon="Mic" label="Распознавание речи" desc="Голосовой ввод вопросов" right={<Toggle value={voice} onChange={setVoice} />} />
          <Row icon="Volume2" label="Автовоспроизведение" desc="Читать ответы вслух автоматически" right={<Toggle value={autoSpeak} onChange={setAutoSpeak} />} />
          <Row
            icon="Gauge"
            label="Скорость речи"
            right={
              <select
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="rounded-lg px-3 py-1.5 text-sm"
                style={{ background: "hsl(220, 25%, 12%)", border: "1px solid hsl(220, 25%, 18%)", color: "hsl(210,40%,90%)", fontFamily: "'Golos Text', sans-serif" }}
              >
                <option value="slow">Медленно</option>
                <option value="normal">Нормально</option>
                <option value="fast">Быстро</option>
              </select>
            }
          />
        </Section>

        <Section title="Интерфейс">
          <Row icon="Volume1" label="Звуковые эффекты" desc="Звуки при отправке сообщений" right={<Toggle value={soundFx} onChange={setSoundFx} />} />
          <Row
            icon="Globe"
            label="Язык"
            right={
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-lg px-3 py-1.5 text-sm"
                style={{ background: "hsl(220, 25%, 12%)", border: "1px solid hsl(220, 25%, 18%)", color: "hsl(210,40%,90%)", fontFamily: "'Golos Text', sans-serif" }}
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            }
          />
        </Section>

        <Section title="Данные">
          <Row icon="Trash2" label="Очистить историю" desc="Удалить все чаты" right={
            <button className="rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-200" style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
              Очистить
            </button>
          } />
        </Section>

        <div className="text-center py-4">
          <p className="text-xs" style={{ color: "hsl(215, 20%, 35%)" }}>NeuralChat v1.0 · Настройки сохраняются автоматически</p>
        </div>
      </div>
    </div>
  );
}
