import { useState } from "react";
import { askChatbot } from "../askChatbot";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const answer = await askChatbot(input);
      const botMsg = { sender: "bot", text: answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Server error. Try again." }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Chat Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg hover:bg-blue-700"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[420px] w-80 flex-col rounded-xl bg-white shadow-xl">
          {/* Header */}
          <div className="rounded-t-xl bg-blue-600 px-4 py-3 text-white font-semibold">
            AI Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                  msg.sender === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "mr-auto bg-gray-200 text-gray-900"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="mr-auto rounded-lg bg-gray-200 px-3 py-2 text-xs italic">
                Typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2 border-t p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="rounded-lg bg-blue-600 px-4 text-sm text-white hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
