import { Message } from "../types/chat";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks";

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
}

export const MessageItem = ({ message, isOwnMessage }: MessageItemProps) => {
  const { currentLanguage } = useTranslation();
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const locale = currentLanguage === "en" ? "en-US" : "vi-VN";
    return date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={cn("flex", isOwnMessage ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2 shadow-sm",
          isOwnMessage
            ? "bg-green-primary text-white rounded-br-sm"
            : "bg-white text-gray-dark rounded-bl-sm"
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <p
          className={cn(
            "text-xs mt-1",
            isOwnMessage ? "text-white/80" : "text-gray-light"
          )}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};
