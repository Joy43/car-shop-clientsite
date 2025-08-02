

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Helper to parse *Title:* text format
function parseMessage(text: string) {
  // Match pattern *Title:* rest of message
  const match = text.match(/^\*(.+?)\*:\s*(.*)/);
  if (match) {
    const [, title, body] = match;
    return (
      <>
        <p className="font-bold uppercase text-red-600 mb-1 select-text">
          {title}:
        </p>
        <p className="select-text">{body}</p>
      </>
    );
  }
  return <p className="select-text">{text}</p>;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch initial greeting on mount
  useEffect(() => {
    async function fetchGreeting() {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://server-car-industy.vercel.app/api/chatbot"
        );
        const data = await res.json();
        if (data.success && data.data) {
          setMessages([
            {
              id: Date.now().toString(),
              text: data.data,
              sender: "bot",
              timestamp: new Date(),
            },
          ]);
        }
      } catch {
        setMessages([
          {
            id: "error-1",
            text: "Failed to load chatbot. Please try again later.",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGreeting();
  }, []);

  // Scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://server-car-industy.vercel.app/api/chatbot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userMessage.text }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success && data.data) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: data.data,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "error-2",
          text: "Sorry, something went wrong. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Animations
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-gray-200 p-6 sticky top-0 h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-red-600 mb-1">
            Car Expert AI
          </h1>
          <p className="text-gray-600 text-sm font-medium">
            Your 24/7 Automotive Assistant
          </p>
        </header>
        <section className="flex-grow overflow-y-auto">
          <h2 className="font-semibold text-lg mb-6">Quick Guide</h2>
          <ul className="space-y-4 text-sm leading-relaxed">
            <li className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-600 mb-1">
                Maintenance Tips
              </h3>
              <p>Ask about oil changes, tire rotations, or warning lights.</p>
            </li>
            <li className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-600 mb-1">
                Troubleshooting
              </h3>
              <p>Describe symptoms for diagnostic help.</p>
            </li>
            <li className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-600 mb-1">Car Shopping</h3>
              <p>Compare models or get pricing advice.</p>
            </li>
          </ul>
        </section>
        <footer className="mt-8 text-xs text-gray-400 border-t border-gray-200 pt-4 select-none">
          Powered by Carshop | Data updated 2025
        </footer>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-red-500 to-red-400 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
          <h2 className="text-xl font-semibold select-none">
            Carshop AI Assistant
          </h2>
          <div
            className={`flex items-center text-sm font-medium ${
              isLoading ? "text-amber-300" : "text-emerald-300"
            } select-none`}
            aria-live="polite"
          >
            <span
              className={`w-3 h-3 rounded-full mr-2 ${
                isLoading ? "bg-amber-300 animate-pulse" : "bg-emerald-400"
              }`}
            ></span>
            {isLoading ? "Thinking..." : "Online"}
          </div>
        </header>

        {/* Messages */}
        <section
          aria-label="Chat messages"
          className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4"
        >
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={messageVariants}
                className={`max-w-[80%] p-4 rounded-2xl break-words whitespace-pre-wrap
                  ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-red-500 to-blue-600 text-white self-end rounded-br-none"
                      : "bg-white shadow-md text-gray-800 self-start rounded-bl-none"
                  }`}
                role="article"
                aria-live="polite"
                aria-atomic="true"
              >
                <div>{parseMessage(message.text)}</div>
                <time
                  className="block text-xs opacity-50 mt-2 text-right select-none"
                  dateTime={message.timestamp.toISOString()}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </section>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-t border-gray-300 p-4 flex items-center gap-3"
          role="search"
          aria-label="Send message form"
        >
          <input
            type="text"
            placeholder="Ask me anything about cars..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 rounded-full border border-gray-300 px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition disabled:opacity-60 disabled:cursor-not-allowed"
            aria-required="true"
            aria-label="Message input"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
            className="flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 px-5 py-3 text-white font-semibold hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </main>
    </div>
  );
};

export default Chatbot;
