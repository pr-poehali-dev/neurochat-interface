import { useState } from "react";
import Icon from "@/components/ui/icon";

const historyData = [
  { id: "1", title: "Как работают нейросети?", preview: "Нейросети — это математические модели...", time: "Сегодня, 14:23", messages: 6, tag: "Технологии" },
  { id: "2", title: "Помощь с рецептом", preview: "Для приготовления пасты карбонара...", time: "Сегодня, 11:05", messages: 4, tag: "Кулинария" },
  { id: "3", title: "Советы по тайм-менеджменту", preview: "Техника Помодоро — это метод управления...", time: "Вчера, 19:30", messages: 12, tag: "Продуктивность" },
  { id: "4", title: "Квантовые компьютеры", preview: "Квантовые компьютеры используют принципы...", time: "Вчера, 15:11", messages: 8, tag: "Наука" },
  { id: "5", title: "Перевод текста на английский", preview: "Here is the translated version of your text...", time: "2 дня назад", messages: 3, tag: "Языки" },
  { id: "6", title: "Идеи для путешествия в Японию", preview: "Япония — удивительная страна с богатой...", time: "3 дня назад", messages: 15, tag: "Путешествия" },
];

const tagColors: Record<string, { color: string; bg: string }> = {
  "Технологии": { color: "#4f8ef7", bg: "rgba(79,142,247,0.12)" },
  "Кулинария": { color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  "Продуктивность": { color: "#34d399", bg: "rgba(52,211,153,0.12)" },
  "Наука": { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  "Языки": { color: "#f472b6", bg: "rgba(244,114,182,0.12)" },
  "Путешествия": { color: "#fb923c", bg: "rgba(251,146,60,0.12)" },
};

interface HistoryPageProps {
  onNavigate: (page: string) => void;
}

export default function HistoryPage({ onNavigate }: HistoryPageProps) {
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = historyData.filter(
    (h) =>
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="px-5 py-4"
        style={{
          borderBottom: "1px solid rgba(79,142,247,0.09)",
          background: "rgba(10,14,28,0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1
              className="font-unbounded font-bold text-lg"
              style={{ color: "hsl(210,40%,95%)", letterSpacing: "-0.01em" }}
            >
              История
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "hsl(215, 20%, 45%)" }}>
              {historyData.length} диалогов
            </p>
          </div>
          <button
            onClick={() => onNavigate("chat")}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 btn-primary"
          >
            <Icon name="Plus" size={15} />
            Новый чат
          </button>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2.5 rounded-xl px-3.5"
          style={{
            background: "hsl(222, 38%, 9%)",
            border: "1px solid rgba(79,142,247,0.12)",
            transition: "border-color 0.2s",
          }}
          onFocusCapture={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(79,142,247,0.35)";
          }}
          onBlurCapture={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(79,142,247,0.12)";
          }}
        >
          <Icon name="Search" size={15} style={{ color: "hsl(215, 20%, 40%)", flexShrink: 0 }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по истории..."
            className="flex-1 py-3 text-sm outline-none"
            style={{
              background: "transparent",
              color: "hsl(210,40%,90%)",
              fontFamily: "'Golos Text', sans-serif",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="p-1 rounded-lg transition-all"
              style={{ color: "hsl(215, 20%, 40%)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4f8ef7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "hsl(215, 20%, 40%)")}
            >
              <Icon name="X" size={13} />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(79,142,247,0.08)", border: "1px solid rgba(79,142,247,0.15)" }}
            >
              <Icon name="SearchX" size={28} style={{ color: "hsl(215, 20%, 40%)" }} />
            </div>
            <p className="text-sm" style={{ color: "hsl(215, 20%, 45%)" }}>
              Ничего не найдено
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((item, i) => {
              const tc = tagColors[item.tag] || { color: "#4f8ef7", bg: "rgba(79,142,247,0.12)" };
              const isHov = hovered === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate("chat")}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="w-full text-left rounded-2xl p-4 transition-all duration-200 animate-fade-in"
                  style={{
                    background: isHov ? "hsl(222, 36%, 10%)" : "hsl(222, 38%, 7.5%)",
                    border: `1px solid ${isHov ? "rgba(79,142,247,0.22)" : "hsl(222, 30%, 13%)"}`,
                    animationDelay: `${i * 0.04}s`,
                    transform: isHov ? "translateX(3px)" : "translateX(0)",
                    boxShadow: isHov ? "0 4px 20px rgba(79,142,247,0.08)" : "none",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Icon */}
                      <div
                        className="flex items-center justify-center rounded-xl flex-shrink-0 mt-0.5"
                        style={{
                          width: 38,
                          height: 38,
                          background: isHov ? "rgba(79,142,247,0.12)" : "rgba(79,142,247,0.07)",
                          border: `1px solid ${isHov ? "rgba(79,142,247,0.25)" : "rgba(79,142,247,0.12)"}`,
                          transition: "all 0.2s",
                        }}
                      >
                        <Icon name="MessageSquare" size={16} style={{ color: "#4f8ef7" }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p
                            className="font-semibold text-sm truncate"
                            style={{ color: "hsl(210,40%,93%)" }}
                          >
                            {item.title}
                          </p>
                        </div>
                        <p
                          className="text-xs truncate"
                          style={{ color: "hsl(215, 20%, 47%)", lineHeight: 1.5 }}
                        >
                          {item.preview}
                        </p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span
                        className="text-xs font-mono-ibm"
                        style={{ color: "hsl(215, 20%, 38%)", fontSize: "10px" }}
                      >
                        {item.time}
                      </span>
                      <span
                        className="text-xs rounded-full px-2 py-0.5 font-medium"
                        style={{
                          background: tc.bg,
                          color: tc.color,
                          fontSize: "10px",
                        }}
                      >
                        {item.tag}
                      </span>
                      <span
                        className="text-xs rounded-full px-2 py-0.5"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "hsl(215, 20%, 42%)",
                          fontSize: "10px",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {item.messages} сообщ.
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
