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
  "Отличная идея! Вот несколько соображений по этому поводу: во-первых, важно учитывать контекст. Во-вторых, стоит рассмотреть разные точки зрения. Это поможет принять взвешенное решение.",
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
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid hsl(220, 25%, 10%)", background: "hsl(220, 30%, 5%)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="relative flex items-center justify-center rounded-xl"
            style={{ width: 40, height: 40, background: "linear-gradient(135deg, #1e40af22, #2563eb33)", border: "1px solid rgba(59,130,246,0.3)" }}
          >
            <Icon name="Bot" size={20} style={{ color: "#60a5fa" }} />
            <span
              className="absolute bottom-0 right-0 rounded-full"
              style={{ width: 10, height: 10, background: "#22c55e", border: "2px solid hsl(220, 30%, 5%)" }}
            />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "hsl(210,40%,95%)" }}>NeuralChat ИИ</p>
            <p className="text-xs" style={{ color: "#22c55e" }}>● Онлайн</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
          style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "#60a5fa" }}
        >
          <Icon name="RefreshCw" size={14} />
          Новый чат
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className="flex animate-fade-in"
            style={{ justifyContent: msg.role === "user" ? "flex-end" : "flex-start", animationDelay: `${i * 0.05}s` }}
          >
            {msg.role === "ai" && (
              <div
                className="flex items-center justify-center rounded-xl mr-2 flex-shrink-0"
                style={{ width: 32, height: 32, background: "linear-gradient(135deg, #2563eb, #1d4ed8)", alignSelf: "flex-end" }}
              >
                <Icon name="Bot" size={14} />
              </div>
            )}

            <div style={{ maxWidth: "70%" }}>
              <div
                className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}
                style={{ padding: "12px 16px", fontSize: "14px", lineHeight: 1.6 }}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-2 mt-1" style={{ justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <span className="text-xs" style={{ color: "hsl(215, 20%, 40%)" }}>{msg.time}</span>
                {msg.role === "ai" && (
                  <button
                    onClick={() => speakText(msg.text)}
                    className="transition-all duration-200 rounded-md p-0.5"
                    style={{ color: isSpeaking ? "#60a5fa" : "hsl(215, 20%, 40%)" }}
                    title="Озвучить"
                  >
                    <Icon name={isSpeaking ? "VolumeX" : "Volume2"} size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div
              className="flex items-center justify-center rounded-xl"
              style={{ width: 32, height: 32, background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
            >
              <Icon name="Bot" size={14} />
            </div>
            <div
              className="chat-bubble-ai flex items-center gap-1.5"
              style={{ padding: "14px 18px" }}
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <span
                  key={i}
                  className="rounded-full animate-typing"
                  style={{ width: 7, height: 7, background: "#3b82f6", display: "block", animationDelay: `${delay}s` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        className="px-4 py-4"
        style={{ borderTop: "1px solid hsl(220, 25%, 10%)", background: "hsl(220, 30%, 5%)" }}
      >
        <div
          className="flex items-end gap-3 rounded-2xl p-2"
          style={{ background: "hsl(220, 28%, 10%)", border: "1px solid hsl(220, 25%, 16%)" }}
        >
          {/* Mic button */}
          <button
            onClick={startListening}
            className="flex items-center justify-center rounded-xl transition-all duration-200 flex-shrink-0"
            style={{
              width: 40,
              height: 40,
              background: isListening ? "rgba(239,68,68,0.2)" : "rgba(59,130,246,0.1)",
              border: `1px solid ${isListening ? "rgba(239,68,68,0.4)" : "rgba(59,130,246,0.2)"}`,
              color: isListening ? "#f87171" : "#60a5fa",
            }}
            title="Голосовой ввод"
          >
            {isListening ? (
              <span className="relative flex items-center justify-center">
                <span className="animate-ripple absolute inline-flex h-full w-full rounded-full" style={{ background: "rgba(239,68,68,0.3)" }} />
                <Icon name="MicOff" size={16} />
              </span>
            ) : (
              <Icon name="Mic" size={16} />
            )}
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Напишите сообщение... (Enter — отправить)"
            rows={1}
            className="input-chat flex-1"
            style={{ border: "none", background: "transparent", padding: "8px 4px", minHeight: 40, boxShadow: "none" }}
          />

          {/* Send button */}
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="flex items-center justify-center rounded-xl transition-all duration-200 flex-shrink-0 font-semibold text-sm gap-2"
            style={{
              minWidth: 100,
              height: 40,
              background: input.trim() ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "hsl(220, 25%, 12%)",
              color: input.trim() ? "white" : "hsl(215, 20%, 40%)",
              cursor: input.trim() ? "pointer" : "not-allowed",
              boxShadow: input.trim() ? "0 4px 15px rgba(37,99,235,0.35)" : "none",
            }}
          >
            <Icon name="Send" size={15} />
            Спросить
          </button>
        </div>
        <p className="text-center text-xs mt-2" style={{ color: "hsl(215, 20%, 35%)" }}>
          Shift+Enter — новая строка · Enter — отправить
        </p>
      </div>
    </div>
  );
}
