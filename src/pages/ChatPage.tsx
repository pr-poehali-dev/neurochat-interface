import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  time: string;
}

const AI_RESPONSES = [
  "Это отличный вопрос! Нейросети — это математические модели, вдохновлённые работой человеческого мозга. Они состоят из слоёв нейронов, которые обрабатывают информацию и находят закономерности в данных.",
  "Я здесь, чтобы помочь вам! Могу отвечать на вопросы, писать тексты, объяснять сложные темы простыми словами, помогать с кодом и многим другим.",
  "Интересная мысль! Искусственный интеллект развивается стремительно. Каждый год появляются новые архитектуры и возможности, которые открывают новые горизонты для человечества.",
  "Понимаю вас. Давайте разберём это подробнее. Я готов уделить столько времени, сколько вам нужно, чтобы ответить на ваш вопрос максимально полно и понятно.",
  "Отличная идея! Вот несколько соображений: во-первых, важно учитывать контекст. Во-вторых, стоит рассмотреть разные точки зрения. Это поможет принять взвешенное решение.",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Привет! Я ваш ИИ-ассистент. Задайте мне любой вопрос — я готов помочь 🚀",
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getTime = () =>
    new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const aiText = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "ai", text: aiText, time: getTime() };
    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Распознавание речи не поддерживается в вашем браузере.");
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "ru-RU";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput((prev) => prev + text);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const speakText = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ru-RU";
    utter.rate = 0.95;
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-new",
        role: "ai",
        text: "Новый чат начат! Чем могу помочь?",
        time: getTime(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* ===== HEADER ===== */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{
          borderBottom: "1px solid rgba(79,142,247,0.09)",
          background: "rgba(10,14,28,0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* AI Avatar */}
          <div
            className="relative flex items-center justify-center rounded-xl"
            style={{
              width: 40,
              height: 40,
              background: "linear-gradient(135deg, #1d4ed8, #4f8ef7)",
              boxShadow: "0 0 16px rgba(79,142,247,0.35)",
            }}
          >
            <Icon name="Bot" size={19} style={{ color: "white" }} />
            <span
              className="absolute -bottom-0.5 -right-0.5 rounded-full"
              style={{
                width: 10,
                height: 10,
                background: "#22c55e",
                border: "2px solid hsl(222, 47%, 4%)",
                boxShadow: "0 0 6px #22c55e",
              }}
            />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "hsl(210,40%,95%)" }}>
              NeuralChat
            </p>
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#22c55e", boxShadow: "0 0 4px #22c55e" }}
              />
              <p className="text-xs" style={{ color: "#22c55e" }}>
                Онлайн · GPT-4
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "hsl(215, 20%, 55%)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(79,142,247,0.08)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(79,142,247,0.2)";
              (e.currentTarget as HTMLElement).style.color = "#7ab3ff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLElement).style.color = "hsl(215, 20%, 55%)";
            }}
          >
            <Icon name="RefreshCw" size={13} />
            Очистить
          </button>
        </div>
      </div>

      {/* ===== MESSAGES ===== */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className="flex animate-fade-in"
            style={{
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              animationDelay: `${i * 0.04}s`,
            }}
          >
            {msg.role === "ai" && (
              <div
                className="flex items-center justify-center rounded-xl mr-2.5 flex-shrink-0"
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg, #1d4ed8, #4f8ef7)",
                  boxShadow: "0 0 10px rgba(79,142,247,0.3)",
                  alignSelf: "flex-end",
                  marginBottom: "2px",
                }}
              >
                <Icon name="Bot" size={14} style={{ color: "white" }} />
              </div>
            )}

            <div style={{ maxWidth: "72%" }}>
              <div
                className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}
                style={{ padding: "12px 16px", fontSize: "14px", lineHeight: 1.65 }}
              >
                {msg.text}
              </div>
              <div
                className="flex items-center gap-2 mt-1.5 px-1"
                style={{
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <span
                  className="text-xs font-mono-ibm"
                  style={{ color: "hsl(215, 20%, 36%)", fontSize: "10px" }}
                >
                  {msg.time}
                </span>
                {msg.role === "ai" && (
                  <button
                    onClick={() => speakText(msg.text)}
                    className="p-1 rounded-md transition-all duration-200"
                    style={{ color: isSpeaking ? "#4f8ef7" : "hsl(215, 20%, 36%)" }}
                    title="Озвучить"
                  >
                    <Icon name={isSpeaking ? "VolumeX" : "Volume2"} size={11} />
                  </button>
                )}
              </div>
            </div>

            {msg.role === "user" && (
              <div
                className="flex items-center justify-center rounded-xl ml-2.5 flex-shrink-0"
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg, #374151, #4b5563)",
                  alignSelf: "flex-end",
                  marginBottom: "2px",
                }}
              >
                <Icon name="User" size={14} style={{ color: "hsl(215,20%,80%)" }} />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2.5 animate-fade-in">
            <div
              className="flex items-center justify-center rounded-xl flex-shrink-0"
              style={{
                width: 32,
                height: 32,
                background: "linear-gradient(135deg, #1d4ed8, #4f8ef7)",
                alignSelf: "flex-end",
              }}
            >
              <Icon name="Bot" size={14} style={{ color: "white" }} />
            </div>
            <div
              className="chat-bubble-ai flex items-center gap-1.5"
              style={{ padding: "14px 18px" }}
            >
              {[0, 0.18, 0.36].map((delay, i) => (
                <span
                  key={i}
                  className="rounded-full animate-typing"
                  style={{
                    width: 7,
                    height: 7,
                    background: "#4f8ef7",
                    display: "block",
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ===== INPUT AREA ===== */}
      <div
        className="px-4 py-4"
        style={{
          borderTop: "1px solid rgba(79,142,247,0.08)",
          background: "rgba(10,14,28,0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          className="flex items-end gap-3 rounded-2xl px-4 py-3"
          style={{
            background: "hsl(222, 38%, 9%)",
            border: "1px solid rgba(79,142,247,0.15)",
            boxShadow: "0 0 0 0 rgba(79,142,247,0)",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocusCapture={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(79,142,247,0.4)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(79,142,247,0.08)";
          }}
          onBlurCapture={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(79,142,247,0.15)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(79,142,247,0)";
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Написать сообщение... (Enter — отправить)"
            rows={1}
            className="flex-1 outline-none resize-none bg-transparent text-sm"
            style={{
              color: "hsl(210,40%,95%)",
              fontFamily: "'Golos Text', sans-serif",
              lineHeight: 1.6,
              maxHeight: "160px",
              paddingTop: "2px",
            }}
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Voice button */}
            <button
              onClick={startListening}
              className="flex items-center justify-center rounded-xl transition-all duration-200"
              style={{
                width: 36,
                height: 36,
                background: isListening
                  ? "rgba(239,68,68,0.15)"
                  : "rgba(79,142,247,0.08)",
                border: `1px solid ${isListening ? "rgba(239,68,68,0.3)" : "rgba(79,142,247,0.15)"}`,
                color: isListening ? "#ef4444" : "#4f8ef7",
              }}
              title="Голосовой ввод"
            >
              <Icon name={isListening ? "MicOff" : "Mic"} size={15} />
            </button>

            {/* Send button */}
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="flex items-center justify-center rounded-xl transition-all duration-200"
              style={{
                width: 36,
                height: 36,
                background:
                  input.trim() && !isTyping
                    ? "linear-gradient(135deg, #2563eb, #4f8ef7)"
                    : "rgba(79,142,247,0.08)",
                border: `1px solid ${input.trim() && !isTyping ? "transparent" : "rgba(79,142,247,0.12)"}`,
                color: input.trim() && !isTyping ? "white" : "hsl(215,20%,35%)",
                boxShadow: input.trim() && !isTyping ? "0 4px 14px rgba(37,99,235,0.4)" : "none",
                cursor: !input.trim() || isTyping ? "not-allowed" : "pointer",
              }}
              title="Отправить"
            >
              <Icon name="ArrowUp" size={16} />
            </button>
          </div>
        </div>

        <p
          className="text-center mt-2.5 text-xs"
          style={{ color: "hsl(215, 20%, 30%)", fontFamily: "Golos Text, sans-serif" }}
        >
          ИИ может ошибаться. Проверяйте важную информацию.
        </p>
      </div>
    </div>
  );
}
