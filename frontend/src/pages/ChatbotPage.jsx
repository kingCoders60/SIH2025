import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Send, Bot, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const initialMessages = [
  {
    id: 1,
    text: "Hello! How can I help you with disaster preparedness today?",
    sender: "ai",
  },
];

const ChatbotPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thanks for your question. Here's what I found...",
          sender: "ai",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-7xl mx-auto flex flex-col flex-1">
        {/* Top Navigation Bar */}
        <div className="bg-white border-b px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-3 ml-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">AI Assistant</h1>
                <p className="text-sm text-gray-500">Your disaster preparedness expert</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex justify-center p-4 md:p-8">
          <Card className="w-full max-w-4xl flex flex-col h-full bg-white/50 backdrop-blur-sm">
            <CardHeader className="border-b pb-4 bg-white">
              <CardTitle className="flex items-center gap-2">
                <span className="text-blue-600 animate-pulse">•</span>
                AI Assistant Online
              </CardTitle>
              <CardDescription>Ask me anything about disaster preparedness and safety</CardDescription>
            </CardHeader>
        <CardContent className="flex-1 overflow-y-auto py-4 px-2" style={{ scrollbarWidth: "thin" }}>
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-xl px-4 py-2 max-w-[80%] text-base shadow-sm"
                      ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"}`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 bg-white">
          <form className="flex w-full gap-2" onSubmit={handleSubmit} autoComplete="off">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              autoFocus
            />
            <Button 
              type="submit" 
              variant="primary" 
              size="icon" 
              aria-label="Send"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  </div>
</div>
  );
};

export default ChatbotPage;
