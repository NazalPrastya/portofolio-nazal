"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Bot, X, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";

// Komponen untuk menampilkan animasi teks per-huruf
const TypedMessage = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTyping = currentIndex < text.length;

  useEffect(() => {
    if (isTyping) {
      const timerId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30);

      return () => clearTimeout(timerId);
    }
  }, [currentIndex, isTyping, text]);

  return <>{displayedText}</>;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { text: string; isUser: boolean; isTyping?: boolean }[]
  >([
    {
      text: "Halo! aku asisten Nazal. Tanyakan sesuatu tentang bos saya ya!",
      isUser: false,
      isTyping: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { mutate: sendQuestion } = api.chatBot.chat.useMutation({
    onMutate: () => setIsLoading(true),
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { text: data.reply, isUser: false, isTyping: true },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Maaf, bos saya belum bayar saya, bantu kasi kerjaan bos saya ya biar saya idup! HEHE",
          isUser: false,
          isTyping: true,
        },
      ]);
      setIsLoading(false);
    },
    onSettled: () => setIsLoading(false),
  });

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    sendQuestion({ question: input });
  };

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Chat Popup */}
      <div
        className={cn(
          "absolute right-0 bottom-16 w-80 transform transition-all duration-300 md:w-96",
          isOpen
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <Card className="border-2 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle className="text-md flex items-center gap-2 font-medium">
              <Bot className="h-5 w-5" />
              Chat Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.isUser ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    {message.isUser || !message.isTyping ? (
                      message.text
                    ) : (
                      <TypedMessage text={message.text} />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>

      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={toggleChat}
      >
        <Bot className="h-6 w-6" />
      </Button>
    </div>
  );
}
