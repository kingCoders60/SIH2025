import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-2 py-8">
      <Card className="w-full max-w-xl flex flex-col h-[70vh]">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-2xl">Gemini AI Assistant</CardTitle>
          <CardDescription>Your friendly disaster preparedness expert</CardDescription>
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
        <CardFooter className="border-t pt-4">
          <form className="flex w-full gap-2" onSubmit={handleSubmit} autoComplete="off">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              autoFocus
            />
            <Button type="submit" variant="primary" size="icon" aria-label="Send">
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatbotPage;
