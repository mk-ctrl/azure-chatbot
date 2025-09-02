import React, { useState, useEffect, useRef } from 'react';
import { axiosInstance } from '../axios/axios';
// Send Icon SVG Component
const SendIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to get response from Gemini API
  const getBotResponse = async (userMessage) => {
    setIsLoading(true);
    try {
        const result = await axiosInstance.post('/msg/bot',{message : userMessage});
        
        setMessages(prev => [...prev, { id: Date.now(), text: result.data.response, sender: "bot" }]);

    } catch (error) {
        console.error("Error fetching bot response:", error);
        setMessages(prev => [...prev, { id: Date.now(), text: "Oops! Something went wrong. Please try again.", sender: "bot" }]);
    } finally {
        setIsLoading(false);
    }
  };


  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user"
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    
    // Get response from the bot
    getBotResponse(inputValue);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 shadow-md p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Chat with AI</h1>
        <p className="text-sm text-green-400">● Online</p>
      </header>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex my-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-lg p-3 rounded-2xl shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 rounded-br-none'
                    : 'bg-slate-700 rounded-bl-none'
                }`}
              >
                <p className="text-white">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start my-4">
                <div className="max-w-lg p-3 rounded-2xl shadow-md bg-slate-700 rounded-bl-none">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-400">AI is typing</span>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <footer className="bg-slate-800 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 bg-slate-700 border border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="p-3 bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition duration-300"
            >
              <SendIcon className="w-6 h-6 text-white" />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
