import { useState } from "react";
import Icon from "@/components/ui/icon";

const historyData = [
  { id: "1", title: "Как работают нейросети?", preview: "Нейросети — это математические модели...", time: "Сегодня, 14:23", messages: 6 },
  { id: "2", title: "Помощь с рецептом", preview: "Для приготовления пасты карбонара...", time: "Сегодня, 11:05", messages: 4 },
  { id: "3", title: "Советы по тайм-менеджменту", preview: "Техника Помодоро — это метод управления...", time: "Вчера, 19:30", messages: 12 },
  { id: "4", title: "Что такое квантовые компьютеры?", preview: "Квантовые компьютеры используют принципы...", time: "Вчера, 15:11", messages: 8 },
  { id: "5", title: "Перевод текста на английский", preview: "Here is the translated version of your text...", time: "2 дня назад", messages: 3 },
  { id: "6", title: "Идеи для путешествия в Японию", preview: "Япония — удивительная страна с богатой...", time: "3 дня назад", messages: 15 },
];

interface HistoryPageProps {
  onNavigate: (page: string) => void;
}

export default function HistoryPage({ onNavigate }: HistoryPageProps) {
  const [search, setSearch] = useState("");
  const filtered = historyData.filter(
    (h) =>
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.preview.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="px-6 py-5"
        style={{ borderBottom: "1px solid hsl(220, 25%, 10%)", background: "hsl(220, 30%, 5%)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-montserrat font-bold text-xl" style={{ color: "hsl(210,40%,95%)" }}>
            История чатов
          </h1>
          <button
            onClick={() => onNavigate("chat")}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "white",
              boxShadow: "0 4px 15px rgba(37,99,235,0.35)",
            }}
          >
            <Icon name="Plus" size={15} />
            Новый чат
          </button>
        </div>
        {/* Search */}
        <div
          className="flex items-center gap-2 rounded-xl px-4"
          style={{ background: "hsl(220, 28%, 10%)", border: "1px solid hsl(220, 25%, 14%)" }}
        >
          <Icon name="Search" size={16} style={{ color: "hsl(215, 20%, 45%)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по истории..."
            className="flex-1 py-3 text-sm outline-none"
            style={{ background: "transparent", color: "hsl(210,40%,90%)", fontFamily: "'Golos Text', sans-serif" }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ color: "hsl(215, 20%, 45%)" }}>
              <Icon name="X" size={14} />
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3" style={{ color: "hsl(215, 20%, 45%)" }}>
            <Icon name="SearchX" size={40} />
            <p className="text-sm">Ничего не найдено</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((item, i) => (
              <button
                key={item.id}
                onClick={() => onNavigate("chat")}
                className="w-full text-left rounded-2xl p-4 transition-all duration-200 animate-fade-in group"
                style={{
                  background: "hsl(220, 28%, 8%)",
                  border: "1px solid hsl(220, 25%, 12%)",
                  animationDelay: `${i * 0.05}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)";
                  (e.currentTarget as HTMLElement).style.background = "hsl(220, 28%, 10%)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(220, 25%, 12%)";
                  (e.currentTarget as HTMLElement).style.background = "hsl(220, 28%, 8%)";
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className="flex items-center justify-center rounded-xl flex-shrink-0 mt-0.5"
                      style={{
                        width: 36,
                        height: 36,
                        background: "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.2)",
                      }}
                    >
                      <Icon name="MessageCircle" size={16} style={{ color: "#60a5fa" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: "hsl(210,40%,93%)" }}>
                        {item.title}
                      </p>
                      <p className="text-xs truncate mt-0.5" style={{ color: "hsl(215, 20%, 50%)" }}>
                        {item.preview}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-xs" style={{ color: "hsl(215, 20%, 40%)" }}>{item.time}</span>
                    <span
                      className="text-xs rounded-full px-2 py-0.5"
                      style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa", fontSize: "10px" }}
                    >
                      {item.messages} сообщ.
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
