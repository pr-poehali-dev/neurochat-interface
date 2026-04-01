import { useState } from "react";
import Icon from "@/components/ui/icon";

const faqs = [
  {
    q: "Как начать общение с нейросетью?",
    a: "Просто нажмите на пункт «Чат» в меню слева и напишите свой вопрос в поле внизу. Нажмите кнопку «Спросить» или клавишу Enter — и ИИ ответит вам в течение нескольких секунд.",
  },
  {
    q: "Как использовать голосовой ввод?",
    a: "В окне чата нажмите иконку микрофона слева от поля ввода. Разрешите браузеру доступ к микрофону, говорите свой вопрос — он автоматически преобразуется в текст.",
  },
  {
    q: "Как включить озвучивание ответов?",
    a: "У каждого ответа нейросети есть кнопка с иконкой звука. Нажмите на неё, чтобы прослушать ответ вслух. Также можно включить автовоспроизведение в Настройках.",
  },
  {
    q: "Где хранится история чатов?",
    a: "Все ваши разговоры сохраняются автоматически. Перейдите в раздел «История», чтобы найти предыдущие чаты. Там доступен поиск по темам и содержанию.",
  },
  {
    q: "Можно ли удалить историю?",
    a: "Да. Перейдите в Настройки → раздел «Данные» → кнопка «Очистить историю». После подтверждения все чаты будут удалены.",
  },
  {
    q: "Какие языки поддерживаются?",
    a: "Нейросеть понимает русский и английский языки. Голосовой ввод настроен на русский по умолчанию, но понимает и английскую речь.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="px-6 py-5" style={{ borderBottom: "1px solid hsl(220, 25%, 10%)", background: "hsl(220, 30%, 5%)" }}>
        <h1 className="font-montserrat font-bold text-xl" style={{ color: "hsl(210,40%,95%)" }}>FAQ</h1>
        <p className="text-sm mt-1" style={{ color: "hsl(215, 20%, 50%)" }}>Часто задаваемые вопросы</p>
      </div>

      <div className="flex-1 px-6 py-6 max-w-2xl">
        {/* Hero */}
        <div
          className="flex items-center gap-4 rounded-2xl p-5 mb-6"
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(29,78,216,0.05))",
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        >
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: 48, height: 48, background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}
          >
            <Icon name="HelpCircle" size={24} style={{ color: "#60a5fa" }} />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "hsl(210,40%,92%)" }}>Не нашли ответ?</p>
            <p className="text-xs mt-0.5" style={{ color: "hsl(215, 20%, 55%)" }}>
              Спросите напрямую в чате — нейросеть ответит на любой вопрос!
            </p>
          </div>
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-2">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all duration-300 animate-fade-in"
              style={{
                background: "hsl(220, 28%, 8%)",
                border: open === i ? "1px solid rgba(59,130,246,0.3)" : "1px solid hsl(220, 25%, 12%)",
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium text-sm pr-4" style={{ color: "hsl(210,40%,92%)" }}>
                  {item.q}
                </span>
                <span
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    color: open === i ? "#60a5fa" : "hsl(215, 20%, 45%)",
                  }}
                >
                  <Icon name="Plus" size={18} />
                </span>
              </button>

              {open === i && (
                <div
                  className="px-5 pb-4 animate-fade-in"
                  style={{ borderTop: "1px solid hsl(220, 25%, 12%)" }}
                >
                  <p className="text-sm pt-3" style={{ color: "hsl(215, 20%, 60%)", lineHeight: 1.7 }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
