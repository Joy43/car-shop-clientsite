// src/components/Chatbot/Chatbot.tsx
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Fetch initial greeting on component mount
  useEffect(() => {
    const fetchInitialGreeting = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://server-car-industy.vercel.app/api/chatbot');
        const data = await response.json();
        
        if (data.success && data.data) {
          setMessages([
            {
              id: Date.now().toString(),
              text: data.data,
              sender: 'bot',
              timestamp: new Date()
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching greeting:', error);
        setMessages([
          {
            id: 'error-1',
            text: 'Failed to load chatbot. Please try again later.',
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialGreeting();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send to backend API
      const response = await fetch('https://server-car-industy.vercel.app/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: inputValue })
      });

      const data = await response.json();
      
      if (data.success && data.data) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            text: data.data,
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: 'error-2',
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div className='flex h-screen bg-gray-50'>
 <aside className="w-80 bg-white border-r border-gray-200 p-6 flex flex-col">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Car Expert AI</h1>
          <p className="text-gray-600">Your 24/7 automotive assistant</p>
        </header>

        <section className="flex-1 overflow-y-auto">
          <h2 className="font-semibold text-lg mb-4">Quick Guide</h2>
          <ul className="space-y-3 text-sm">
            <li className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-red-600 mb-1">Maintenance Tips</h3>
              <p className="text-gray-600">Ask about oil changes, tire rotations, or warning lights</p>
            </li>
            <li className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-red-600 mb-1">Troubleshooting</h3>
              <p className="text-gray-600">Describe symptoms for diagnostic help</p>
            </li>
            <li className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-red-600 mb-1">Car Shopping</h3>
              <p className="text-gray-600">Compare models or get pricing advice</p>
            </li>
          </ul>
        </section>

        <footer className="pt-4 border-t border-gray-200 text-xs text-gray-500">
          Powered by Carshop | Data updated 2025
        </footer>
      </aside>
      {/* ------------chat here */}
 <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-400 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Carshop AI Assistant</h2>
        <div className={`flex items-center text-sm ${isLoading ? 'text-amber-300' : 'text-emerald-100'}`}>
          <span className={`w-2 h-2 rounded-full mr-2 ${isLoading ? 'bg-amber-300 animate-pulse' : 'bg-emerald-300'}`}></span>
          {isLoading ? 'Thinking...' : 'Online'}
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`max-w-[85%] p-3 rounded-2xl animate-fadeIn ${
              message.sender === 'user' 
                ? 'bg-gradient-to-r from-red-500 to-blue-600 text-white self-end rounded-br-none' 
                : 'bg-white text-gray-800 shadow-sm self-start rounded-bl-none'
            }`}
          >
            <div className="whitespace-pre-wrap">
              {message.text}
            </div>
            <div className="text-xs opacity-70 text-right mt-1">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200 flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me anything..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          type="submit" 
          disabled={!inputValue.trim() || isLoading}
          className="ml-2 w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-500 text-white flex items-center justify-center disabled:opacity-50 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>

   </div>
  );
};

export default Chatbot;