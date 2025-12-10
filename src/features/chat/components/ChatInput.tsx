import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  isConnected: boolean;
  onSendMessage: (content: string) => void;
  onTyping: (isTyping: boolean) => void;
  disabled?: boolean;
}

export const ChatInput = ({
  isConnected,
  onSendMessage,
  onTyping,
  disabled = false,
}: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !isConnected || disabled) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    onTyping(false);

    onSendMessage(inputValue);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (!disabled) {
      onTyping(true);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={
            disabled
              ? "Chọn một user để bắt đầu chat..."
              : isConnected
              ? "Nhập tin nhắn..."
              : "Đang kết nối..."
          }
          disabled={!isConnected || disabled}
          className={cn(
            "flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-green-primary",
            disabled && "bg-gray-100 cursor-not-allowed"
          )}
        />
        <button
          type="submit"
          disabled={!isConnected || !inputValue.trim() || disabled}
          className={cn(
            "px-4 py-2 rounded-lg bg-green-primary text-white hover:bg-green-dark transition-colors",
            "disabled:bg-gray-300 disabled:cursor-not-allowed"
          )}
        >
          <IoSend className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
