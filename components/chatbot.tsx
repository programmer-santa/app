"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy tu asistente virtual. Te puedo ayudar con información sobre nuestros paquetes de billetes G5. ¿En qué te puedo ayudar?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      const data = await response.json()

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <>
      {/* CHATBOT WIDGET START */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-sm font-medium">Asistente Virtual G5</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start space-x-2",
                    message.sender === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  {message.sender === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-3 w-3 text-blue-600" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-3 py-2 text-sm",
                      message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900",
                    )}
                  >
                    {message.text}
                  </div>
                  {message.sender === "user" && (
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <User className="h-3 w-3 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="icon" className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* CHATBOT WIDGET END */}
    </>
  )
}
