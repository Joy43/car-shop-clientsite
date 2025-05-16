import { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import { FaCopy } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

const Chatbot = () => {

  // State Management
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi! Ask me anything about Cars.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  // Refs
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Copy to clipboard functionality
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setError('Failed to copy to clipboard');
      });
  };

  // PDF Download functionality
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(18);
    doc.text('Chat History', 14, 15);
    doc.setFontSize(12);

    messages.forEach((msg) => {
      const roleText = msg.role === 'user' ? 'User' : 'Assistant';
      const timestamp = msg.timestamp?.toLocaleString() || '';
      const text = `${roleText} (${timestamp}): ${msg.content}`;
      
      const splitText = doc.splitTextToSize(text, 180);
      const textHeight = splitText.length * lineHeight;

      if (yPos + textHeight > pageHeight - 20) {
        doc.addPage();
        yPos = 20;
      }

      doc.text(splitText, 14, yPos);
      yPos += textHeight + 5;
    });

    doc.save('chat-history.pdf');
  };

  // API Communication
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
     headers: {
  "Authorization": "Bearer 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" ,
  "Content-Type": "application/json",
  "HTTP-Referer": "https://car-shop-clientsite.vercel.app/carsupport", 
  "X-Title": "car-shop-clientsite"         
},
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-distill-qwen-32b:free",
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content }))
        })
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch response');
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  // Event Handlers
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Knowledge Base Sidebar */}
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

        <footer className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Powered Carshop Automotive data updated 2025
          </p>
        </footer>
      </aside>

      {/* --------------Chat Interface -----------------------*/}
      <main className="flex-1 flex flex-col">
        {/* Header with PDF download */}
        <div className="border-b border-gray-200 bg-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Chat</h2>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <FaFileDownload className="w-5 h-5" />
            Download PDF
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 w-full overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`w-full p-4 rounded-xl relative ${
                  message.role === 'user'
                    ? 'bg-red-600 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <button
                  onClick={() => handleCopy(message.content)}
                  className={`absolute top-2 right-2 p-1 rounded transition-colors ${
                    message.role === 'user' 
                      ? 'text-white hover:bg-white/20' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Copy message"
                >
                  <FaCopy className="w-4 h-4" />
                </button>
                <p className="whitespace-pre-wrap w-full">{message.content}</p>
                <time className="text-xs mt-2 opacity-70 block">
                  {message.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </time>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-xl p-4 bg-white border border-gray-200 rounded-xl animate-pulse">
                Analyzing question...
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="p-3 bg-red-100 text-red-600 rounded-lg max-w-xl">
                ⚠️ Error: {error}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-3xl mx-auto relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about cars..."
              className="w-full p-3 pr-16 border border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 resize-none transition-all"
              rows={Math.min(input.split('\n').length + 1, 4)}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="absolute right-3 bottom-3 p-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 rounded-lg text-white transition-colors"
            >
              <IoMdSend className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Copy Notification */}
        {showCopyNotification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            Copied to clipboard!
          </div>
        )}
      </main>
    </div>
  );
};
export default Chatbot;