import React, { useState } from "react";
import { Send, Bot } from "lucide-react";
import { postData } from "@/api/api";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 p-2">
      <div
        className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );
}

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const { token } = useSelector((state) => state.user);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages([...messages, newMessage]);
      setInputMessage("");
      setIsLoading(true);

      try {
        const response = await postData("/chatbot/ask", {
          question: inputMessage,
        }, token);

        console.log(response);

        if (response) {
          const botResponse = {
            id: messages.length + 2,
            text: response,
            sender: "bot",
            timestamp: new Date(),
          };

          setMessages((prevMessages) => [...prevMessages, botResponse]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: messages.length + 2,
              text: "I'm sorry, I couldn't process that request. Please try again!",
              sender: "bot",
              timestamp: new Date(),
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: messages.length + 2,
            text: "An error occurred while processing your request.",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-90px)] w-full bg-gray-50 my-2 rounded-md">
      <div className="flex-1 overflow-y-scroll p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white shadow-sm border border-gray-200 rounded-bl-none"
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.sender === "bot" && <Bot className="w-5 h-5 mt-1" />}
                  <div>
                    <p
                      className={
                        message.sender === "user"
                          ? "text-white"
                          : "text-gray-800"
                      }
                    >
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.sender === "user"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white shadow-sm border border-gray-200 rounded-lg rounded-bl-none p-2">
                <div className="flex items-start gap-3">
                  <Bot className="w-5 h-5 mt-1" />
                  <TypingIndicator />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 block top-[20px]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className={`text-white p-3 rounded-lg transition-colors flex items-center gap-2 ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              <Send size={20} />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
